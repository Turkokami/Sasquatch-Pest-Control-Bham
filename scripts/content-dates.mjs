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
/* src/pages is watched alongside the content collections because the hubs and
   the utility pages are written directly as .astro — there is no markdown or
   data file behind /about/, /our-guarantee/ or /reviews/, so before this they
   had no honest date available and showed none. The same forward-only rule
   covers them: the date is the last commit that touched that .astro file, so
   a hub re-dates itself when its own copy changes and not when a page it
   links to does. A routing-only edit will move the date too, which is the
   price of reading git rather than trusting a hand-typed value; v3.2 §6.6
   forbids the hand-typed version, not an honest date that moved for a small
   edit. */
const WATCH = ['src/content', 'src/pages', 'src/data/es-servicios', 'src/data/es-problemas',
  'src/data/es-areas', 'src/data/es-plagas', 'src/data/es-comercial', 'src/data/es-guias'];

const sh = (cmd) => { try { return execSync(cmd, { cwd: root, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }); } catch { return ''; } };

/* A SHALLOW CLONE DOES NOT JUST SEE LESS HISTORY — IT REPORTS THE WRONG THING,
   and this went unnoticed in production from the day the script was written
   until 12 Nov 2026.

   The forward-only rule above was designed on the assumption that a shallow
   clone would simply show fewer commits, so the committed JSON would supply
   the dates git could not see. It does not work that way. In a clone of
   depth 1 the only commit has no parent, so git treats it as a ROOT commit
   and `--name-only` lists every file in the tree as added. Measured on this
   repo: 306 files under the watched paths, all reported as changed, all dated
   at the tip commit. The forward-only rule then faithfully took the later of
   the two values — today — for all 306.

   The visible effect was that every page on the live site displayed the DEPLOY
   date as its "Last updated" date, and carried it as dateModified in schema.
   That is precisely the bump-to-fake-freshness that Keystone v3.2 §6.6
   forbids, shipped on 404 pages, and it also meant scripts/sitemap.mjs could
   never produce an honest lastmod no matter what it read.

   So on a shallow clone the git half is skipped outright and the committed
   JSON is used as it stands. That file is the reason this is committed at all:
   on the host it is the authority, not a fallback. It is kept current by the
   local build, which runs on a full clone and which the gate requires before
   anything is pushed. The failure direction is now safe either way — a stale
   JSON understates a page's freshness, which §6.6 permits, where the old
   behaviour overstated it, which §6.6 forbids. */
const shallow = sh('git rev-parse --is-shallow-repository').trim() === 'true';

const prev = fs.existsSync(out) ? JSON.parse(fs.readFileSync(out, 'utf8')) : {};
const next = { ...prev };
const later = (a, b) => (!a ? b : !b ? a : a > b ? a : b);

/* Newest commit first; the first time a file appears is its last change.
   Empty on a shallow clone — see above; there it would name every file. */
const log = shallow ? '' : sh(`git log --format=@%cs --name-only -- ${WATCH.join(' ')}`);
let day = '';
const seen = new Set();
for (const line of log.split('\n')) {
  if (line.startsWith('@')) { day = line.slice(1); continue; }
  const f = line.trim().replace(/\\/g, '/');
  if (!f || seen.has(f)) continue;
  seen.add(f);
  next[f] = later(next[f], day);
}

/* Uncommitted edits are dated today. Skipped on a shallow clone too: a deploy
   checkout has no local edits by definition, so anything reported there would
   be a build artifact, and dating a page from one is how this bug worked. */
const today = new Date().toLocaleDateString('en-CA', { timeZone: 'America/Los_Angeles' });
for (const line of (shallow ? '' : sh(`git status --porcelain -- ${WATCH.join(' ')}`)).split('\n')) {
  const f = line.slice(3).trim().replace(/\\/g, '/').replace(/^"|"$/g, '');
  if (f && fs.existsSync(path.join(root, f))) next[f] = later(next[f], today);
}

/* Drop files that no longer exist, so the map cannot name a deleted page. */
for (const f of Object.keys(next)) if (!fs.existsSync(path.join(root, f))) delete next[f];

const sorted = Object.fromEntries(Object.entries(next).sort(([a], [b]) => a.localeCompare(b)));
fs.writeFileSync(out, JSON.stringify(sorted, null, 1) + '\n');
/* Says which half ran, so a host that silently stops seeing git is visible in
   the build log rather than discovered on the live site months later. */
console.log(`content-dates: ${Object.keys(sorted).length} source files dated` +
  (shallow ? ' (shallow clone — committed dates used as-is)' : ' (from git history)'));
