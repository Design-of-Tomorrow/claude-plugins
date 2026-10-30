#!/usr/bin/env node
// Checks recommendations.md against SKILL.md and the public marketplaces.
// Usage: node scripts/check-recommendations.mjs [--offline]
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { validate, checkExistence } from './lib/recommendations.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dir = join(root, 'drafts/onboarding');

async function fetchJson(url) {
  const res = await fetch(url, { signal: AbortSignal.timeout(20000) });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

const offline = process.argv.includes('--offline');
const skillText = await readFile(join(dir, 'SKILL.md'), 'utf8');
const recText = await readFile(join(dir, 'recommendations.md'), 'utf8');

const errors = validate(skillText, recText);
if (offline) {
  console.log('--offline: skipping the marketplace existence check.');
} else {
  errors.push(...(await checkExistence(recText, fetchJson)));
}

if (errors.length > 0) {
  console.error(`check-recommendations: ${errors.length} problem(s)\n`);
  for (const e of errors) console.error(`  - ${e}`);
  process.exit(1);
}
console.log('check-recommendations: OK');
