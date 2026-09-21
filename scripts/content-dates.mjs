/**
 * content-dates.mjs — when each page's source was last actually changed.
 *
 * Keystone v3.2 §6.6 asks for a visible last-updated date tied to a
 * substantive edit and never bumped to fake freshness. The only honest source
 * for that is the history of the file itself, so this reads git rather than
 * trusting a date anybody typed.
 *
 * WHY THE RESULT IS COMMITTED (src/data/content-dates.json), like the photo
 * fingerprints and the page sections: the deploy host builds from a shallow
 * clone, and `git log` there sees only the last few commits. Regenerating from
 * scratch on the host would forget every date older than that. So the rule is
 * that a date only ever moves FORWARD:
 *
 *   date = the latest of
 *     - the date already recorded in the JSON,
 *     - the last commit that touched the file, if git can see it,
 *     - today, if the file has uncommitted changes (it is about to be
 *       committed, which is what "last updated" means).
 *
 * Nothing here can make a page look newer than its last edit, and nothing here
 * can make it look older than the history says.
 */
import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1')), '..');
const out = path.join(root, 'src/data/content-dates.json');
const WATCH = ['src/content', 'src/data/es-servicios', 'src/data/es-problemas', 'src/data/es-areas',
  'src/data/es-plagas', 'src/data/es-comercial', 'src/data/es-guias'];

const sh = (cmd) => { try { return execSync(cmd, { cwd: root, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }); } catch { return ''; } };

const prev = fs.existsSync(out) ? JSON.parse(fs.readFileSync(out, 'utf8')) : {};
const next = { ...prev };
const later = (a, b) => (!a ? b : !b ? a : a > b ? a : b);

/* Newest commit first; the first time a file appears is its last change. */
const log = sh(`git log --format=@%cs --name-only -- ${WATCH.join(' ')}`);
let day = '';
const seen = new Set();
for (const line of log.split('\n')) {
  if (line.startsWith('@')) { day = line.slice(1); continue; }
  const f = line.trim().replace(/\\/g, '/');
  if (!f || seen.has(f)) continue;
  seen.add(f);
  next[f] = later(next[f], day);
}

/* Uncommitted edits are dated today. */
const today = new Date().toLocaleDateString('en-CA', { timeZone: 'America/Los_Angeles' });
for (const line of sh(`git status --porcelain -- ${WATCH.join(' ')}`).split('\n')) {
  const f = line.slice(3).trim().replace(/\\/g, '/').replace(/^"|"$/g, '');
  if (f && fs.existsSync(path.join(root, f))) next[f] = later(next[f], today);
}

/* Drop files that no longer exist, so the map cannot name a deleted page. */
for (const f of Object.keys(next)) if (!fs.existsSync(path.join(root, f))) delete next[f];

const sorted = Object.fromEntries(Object.entries(next).sort(([a], [b]) => a.localeCompare(b)));
fs.writeFileSync(out, JSON.stringify(sorted, null, 1) + '\n');
console.log(`content-dates: ${Object.keys(sorted).length} source files dated`);
