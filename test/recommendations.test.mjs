import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import {
  parseSkill,
  parseRecommendations,
  expectedPaths,
  validate,
  checkExistence,
} from '../scripts/lib/recommendations.mjs';

const read = (f) => readFileSync(new URL(`./fixtures/good/${f}`, import.meta.url), 'utf8');
const SKILL = read('SKILL.md');
const REC = read('recommendations.md');

const hasError = (errors, re) => assert.ok(errors.some((e) => re.test(e)), `expected an error matching ${re}, got:\n${errors.join('\n')}`);

test('parseSkill reads both questions and ignores fenced output', () => {
  const s = parseSkill(SKILL);
  assert.deepEqual(s.q1, ['Alpha work', 'Something else']);
  assert.deepEqual(s.q2, { 'Alpha work': ['First part', 'Second part'] });
  assert.deepEqual(expectedPaths(s).paths, [
    'Alpha work > First part',
    'Alpha work > Second part',
    'Something else',
  ]);
});

test('parseRecommendations reads paths, entries and fields', () => {
  const r = parseRecommendations(REC);
  assert.equal(r.paths.length, 3);
  assert.equal(r.paths[0].entries.length, 3);
  assert.equal(r.paths[0].entries[0].name, 'one');
  assert.equal(r.paths[0].entries[0].fields.install, '`/plugin install one@claude-plugins-official`');
});

test('good fixture passes', () => {
  assert.deepEqual(validate(SKILL, REC), []);
});

test('fails when a path has fewer than 3 entries', () => {
  const broken = REC.replace(/\n### 3\. four\n(?:- .*\n)+$/, '\n');
  hasError(validate(SKILL, broken), /Path "Something else": expected exactly 3 entries, found 2/);
});

test('fails when a path has more than 3 entries', () => {
  const extra = '\n### 1. five\n- Maintainer: X\n- Marketplace: claude-plugins-official\n- Good for: Fine.\n- Install: `/plugin install five@claude-plugins-official`\n- Run: `/five:five`\n';
  hasError(validate(SKILL, REC + extra), /expected exactly 3 entries, found 4/);
});

test('fails when an install command is malformed', () => {
  const broken = REC.replace('`/plugin install one@claude-plugins-official`', '`/plugin install one`');
  hasError(validate(SKILL, broken), /does not match "\/plugin install <name>@<marketplace>"/);
});

test('fails when an install command uses the wrong prefix', () => {
  const broken = REC.replace('`/plugin install one@claude-plugins-official`', '`plugin add one@claude-plugins-official`');
  hasError(validate(SKILL, broken), /does not match/);
});

test('fails when the install command names a different plugin', () => {
  const broken = REC.replace('`/plugin install one@claude-plugins-official`', '`/plugin install other@claude-plugins-official`');
  hasError(validate(SKILL, broken), /names "other", not "one"/);
});

test('fails on duplicates in a path', () => {
  const broken = REC.replace(/(## Something else[\s\S]*?)### 2\. three/, '$1### 2. one').replace(
    /(### 2\. one\n- Maintainer: Someone\n- Marketplace: claude-plugins-official\n- Good for: Does a useful thing\.\n- Install: `\/plugin install )three/,
    '$1one',
  );
  hasError(validate(SKILL, broken), /duplicate entry "one@claude-plugins-official"/);
});

test('fails when a SKILL.md option has no path', () => {
  const skill = SKILL.replace('2. Second part', '2. Second part\n3. Third part');
  hasError(validate(skill, REC), /option has no path in recommendations.md: expected a section "## Alpha work > Third part"/);
});

test('fails when a path has no SKILL.md option', () => {
  const skill = SKILL.replace('2. Second part\n', '');
  hasError(validate(skill, REC), /Path "Alpha work > Second part" has no matching option in SKILL.md/);
});

test('fails when a question 1 option has no question 2 block', () => {
  const skill = SKILL.replace('2. Something else', '2. Something else\n3. Beta work');
  hasError(validate(skill, REC), /"Beta work" has no question 2 options/);
});

test('fails when a Good for line is 20 words or more', () => {
  const long = Array(20).fill('word').join(' ');
  const broken = REC.replace('Does a useful thing.', long);
  hasError(validate(SKILL, broken), /under 20 words/);
});

test('fails when a field is missing', () => {
  const broken = REC.replace('- Run: `/one:one`\n', '');
  hasError(validate(SKILL, broken), /missing "run" line/);
});

const catalog = (names, name = 'claude-plugins-official') => async () => ({
  name,
  plugins: names.map((n) => ({ name: n })),
});

test('existence check passes when every plugin is listed', async () => {
  const errors = await checkExistence(REC, catalog(['one', 'two', 'three', 'four']));
  assert.deepEqual(errors, []);
});

test('existence check fails when a plugin is not in its marketplace', async () => {
  const errors = await checkExistence(REC, catalog(['one', 'two', 'three']));
  hasError(errors, /plugin "four" does not exist in marketplace "claude-plugins-official"/);
});

test('existence check fails when the marketplace cannot be fetched', async () => {
  const errors = await checkExistence(REC, async () => {
    throw new Error('HTTP 404');
  });
  hasError(errors, /could not fetch .* \(HTTP 404\)/);
});

test('existence check fails for an unknown marketplace with no add line', async () => {
  const other = REC.replaceAll('claude-plugins-official', 'mystery');
  const errors = await checkExistence(other, catalog([]));
  hasError(errors, /Marketplace "mystery": no known public marketplace.json/);
});

test('existence check uses the add line for other marketplaces', async () => {
  const other = REC.replaceAll('claude-plugins-official', 'mystery').replace(
    '- Marketplace: mystery\n',
    '- Marketplace: mystery\n- Add marketplace: `/plugin marketplace add some-org/some-repo`\n',
  );
  const urls = [];
  const errors = await checkExistence(other, async (url) => {
    urls.push(url);
    return { name: 'mystery', plugins: ['one', 'two', 'three', 'four'].map((name) => ({ name })) };
  });
  assert.deepEqual(errors, []);
  assert.deepEqual(urls, ['https://raw.githubusercontent.com/some-org/some-repo/HEAD/.claude-plugin/marketplace.json']);
});
