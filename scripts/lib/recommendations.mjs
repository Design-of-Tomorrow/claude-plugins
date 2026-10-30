// Parser and rules for recommendations.md and SKILL.md. No dependencies.

export const SEPARATOR = ' > ';
export const GENERAL_OPTION = 'Something else';
export const INSTALL_PATTERN = /^\/plugin install ([a-z0-9][a-z0-9._-]*)@([a-z0-9][a-z0-9._-]*)$/i;
export const ADD_PATTERN = /^\/plugin marketplace add ([A-Za-z0-9._-]+\/[A-Za-z0-9._-]+)$/;
export const OFFICIAL_MARKETPLACE = 'claude-plugins-official';
export const KNOWN_MARKETPLACE_URLS = {
  [OFFICIAL_MARKETPLACE]:
    'https://raw.githubusercontent.com/anthropics/claude-plugins-official/main/.claude-plugin/marketplace.json',
};

const stripTicks = (s) => s.trim().replace(/^`+|`+$/g, '').trim();
const lines = (text) => text.replace(/\r\n/g, '\n').split('\n');

/** Parse SKILL.md: question 1 options and the question 2 options for each answer. */
export function parseSkill(text) {
  const result = { q1: [], q2: {} };
  let section = null; // 'q1' | 'q2' | null
  let current = null; // key into q2
  let inFence = false;
  for (const line of lines(text)) {
    if (line.startsWith('```')) inFence = !inFence;
    if (inFence) continue;
    let m;
    if ((m = line.match(/^## (.+)$/))) {
      const h = m[1].trim();
      section = h === 'Question 1' ? 'q1' : h === 'Question 2' ? 'q2' : null;
      current = null;
      continue;
    }
    if (section === 'q2' && (m = line.match(/^### If (.+)$/))) {
      current = m[1].trim();
      result.q2[current] = [];
      continue;
    }
    if ((m = line.match(/^\d+\.\s+(.+)$/))) {
      const option = m[1].trim();
      if (section === 'q1') result.q1.push(option);
      else if (section === 'q2' && current) result.q2[current].push(option);
    }
  }
  return result;
}

/** Answer paths SKILL.md promises, plus structural errors in SKILL.md itself. */
export function expectedPaths(skill) {
  const paths = [];
  const errors = [];
  if (skill.q1.length === 0) errors.push('SKILL.md: no question 1 options found under "## Question 1".');
  for (const opt of skill.q1) {
    const q2 = skill.q2[opt];
    if (q2 && q2.length > 0) {
      for (const o2 of q2) paths.push(`${opt}${SEPARATOR}${o2}`);
    } else if (opt === GENERAL_OPTION) {
      paths.push(opt);
    } else {
      errors.push(`SKILL.md: question 1 option "${opt}" has no question 2 options (expected "### If ${opt}" under "## Question 2").`);
    }
  }
  for (const key of Object.keys(skill.q2)) {
    if (!skill.q1.includes(key)) {
      errors.push(`SKILL.md: question 2 block "If ${key}" does not match any question 1 option.`);
    }
  }
  return { paths, errors };
}

/** Parse recommendations.md into { paths: [{ heading, entries: [...] }] }. */
export function parseRecommendations(text) {
  const paths = [];
  let path = null;
  let entry = null;
  for (const line of lines(text)) {
    let m;
    if ((m = line.match(/^## (.+)$/))) {
      path = { heading: m[1].trim(), entries: [] };
      paths.push(path);
      entry = null;
    } else if (path && (m = line.match(/^### (.+)$/))) {
      entry = { name: m[1].trim().replace(/^\d+\.\s*/, ''), fields: {} };
      path.entries.push(entry);
    } else if (entry && (m = line.match(/^- ([A-Za-z ]+):\s*(.*)$/))) {
      entry.fields[m[1].trim().toLowerCase()] = m[2].trim();
    }
  }
  return { paths };
}

const wordCount = (s) => s.split(/\s+/).filter(Boolean).length;

/** Offline rules. Returns an array of error strings. */
export function validate(skillText, recText) {
  const errors = [];
  const skill = parseSkill(skillText);
  const { paths: expected, errors: skillErrors } = expectedPaths(skill);
  errors.push(...skillErrors);
  const rec = parseRecommendations(recText);
  const headings = rec.paths.map((p) => p.heading);

  for (const want of expected) {
    if (!headings.includes(want)) {
      errors.push(`SKILL.md option has no path in recommendations.md: expected a section "## ${want}".`);
    }
  }
  const seenHeadings = new Set();
  for (const p of rec.paths) {
    if (seenHeadings.has(p.heading)) errors.push(`Path "${p.heading}": heading appears more than once.`);
    seenHeadings.add(p.heading);
    if (!expected.includes(p.heading)) {
      errors.push(`Path "${p.heading}" has no matching option in SKILL.md.`);
    }
    if (p.entries.length !== 3) {
      errors.push(`Path "${p.heading}": expected exactly 3 entries, found ${p.entries.length}.`);
    }
    const seen = new Set();
    for (const e of p.entries) {
      const where = `Path "${p.heading}", entry "${e.name}"`;
      for (const f of ['maintainer', 'marketplace', 'good for', 'install', 'run']) {
        if (!e.fields[f]) errors.push(`${where}: missing "${f}" line.`);
      }
      const install = e.fields.install ? stripTicks(e.fields.install) : '';
      if (install) {
        const m = install.match(INSTALL_PATTERN);
        if (!m) {
          errors.push(`${where}: install command "${install}" does not match "/plugin install <name>@<marketplace>".`);
        } else {
          if (m[1] !== e.name) errors.push(`${where}: install command names "${m[1]}", not "${e.name}".`);
          if (e.fields.marketplace && m[2] !== e.fields.marketplace) {
            errors.push(`${where}: install command uses marketplace "${m[2]}", but the Marketplace line says "${e.fields.marketplace}".`);
          }
        }
      }
      if (e.fields['add marketplace'] && !ADD_PATTERN.test(stripTicks(e.fields['add marketplace']))) {
        errors.push(`${where}: "Add marketplace" must be "/plugin marketplace add <owner>/<repo>".`);
      }
      if (e.fields['good for'] && wordCount(e.fields['good for']) >= 20) {
        errors.push(`${where}: "Good for" line must be under 20 words (has ${wordCount(e.fields['good for'])}).`);
      }
      const key = `${e.name}@${e.fields.marketplace || ''}`;
      if (seen.has(key)) errors.push(`Path "${p.heading}": duplicate entry "${key}".`);
      seen.add(key);
    }
  }
  return errors;
}

/** Work out where each marketplace's public marketplace.json lives. */
export function marketplaceSources(rec) {
  const sources = new Map(); // marketplace name -> { url, error? }
  for (const p of rec.paths) {
    for (const e of p.entries) {
      const name = e.fields.marketplace;
      if (!name || sources.has(name)) continue;
      if (KNOWN_MARKETPLACE_URLS[name]) {
        sources.set(name, { url: KNOWN_MARKETPLACE_URLS[name] });
        continue;
      }
      const add = e.fields['add marketplace'] && stripTicks(e.fields['add marketplace']).match(ADD_PATTERN);
      if (add) {
        sources.set(name, { url: `https://raw.githubusercontent.com/${add[1]}/HEAD/.claude-plugin/marketplace.json` });
      }
    }
  }
  return sources;
}

/** Online check: every listed plugin exists in its marketplace's public marketplace.json. */
export async function checkExistence(recText, fetchJson) {
  const errors = [];
  const rec = parseRecommendations(recText);
  const sources = marketplaceSources(rec);
  const catalogs = new Map(); // marketplace -> Set of plugin names | null
  for (const [name, src] of sources) {
    try {
      const json = await fetchJson(src.url);
      if (json.name !== name) {
        errors.push(`Marketplace "${name}": ${src.url} is named "${json.name}".`);
      }
      catalogs.set(name, new Set((json.plugins || []).map((p) => p.name)));
    } catch (err) {
      errors.push(`Marketplace "${name}": could not fetch ${src.url} (${err.message}).`);
      catalogs.set(name, null);
    }
  }
  const reported = new Set();
  for (const p of rec.paths) {
    for (const e of p.entries) {
      const mp = e.fields.marketplace;
      if (!mp) continue;
      if (!sources.has(mp)) {
        if (!reported.has(mp)) {
          errors.push(`Marketplace "${mp}": no known public marketplace.json. Add an "Add marketplace:" line to its entries.`);
          reported.add(mp);
        }
        continue;
      }
      const catalog = catalogs.get(mp);
      if (catalog && !catalog.has(e.name)) {
        errors.push(`Path "${p.heading}": plugin "${e.name}" does not exist in marketplace "${mp}".`);
      }
    }
  }
  return errors;
}
