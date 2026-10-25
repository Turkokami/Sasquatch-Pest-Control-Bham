#!/usr/bin/env node
/**
 * indexnow.mjs — tell Bing (and Yandex, Seznam, Naver) about pages that are
 * new or have changed, instead of waiting to be crawled.
 *
 *     npm run indexnow            submit what changed since last time
 *     npm run indexnow -- --dry   show what would be submitted, send nothing
 *     npm run indexnow -- --all   submit every indexable URL (first run only)
 *
 * WHAT THIS IS AND IS NOT. IndexNow is a real, open submission protocol that
 * Microsoft Bing, Yandex, Seznam and Naver all consume. Submitting a URL is a
 * request to recrawl, not a promise of indexing — the engines still decide.
 *
 * GOOGLE IS NOT HERE, AND THAT IS NOT AN OVERSIGHT. Google does not
 * participate in IndexNow and has no public API for submitting ordinary
 * pages. Their Indexing API accepts JobPosting and BroadcastEvent only, and
 * using it for anything else is against its terms; the old sitemap ping
 * endpoint was retired in 2023. For Google the mechanism is the sitemap,
 * which scripts/sitemap.mjs already regenerates on every build, plus the
 * Request Indexing button in Search Console for a page that genuinely cannot
 * wait. Anything claiming to "instantly index on Google" is selling
 * something. See DEPLOY.md.
 *
 * WHAT COUNTS AS CHANGED. The sitemaps carry a lastmod derived from each
 * file's own git history (content-dates.mjs), so this compares the current
 * sitemap against the last state we successfully submitted and sends only the
 * difference. Submitting all 378 URLs every day would be the kind of noise
 * that gets a host ignored.
 *
 * THE STATE FILE IS COMMITTED on purpose. It is a record of what was sent and
 * when; keeping it out of the repo would mean every machine and every CI run
 * believed the whole site was new.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const DIST = path.join(root, 'dist');
const STATE = path.join(root, 'src/data/indexnow-state.json');
const HOST = 'www.sasquatchpestcontrol.com';
const KEY = '71a6faccb532ad39cbb971256e961755';
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;
const ENDPOINT = 'https://api.indexnow.org/indexnow';

const dry = process.argv.includes('--dry');
const all = process.argv.includes('--all');

if (!fs.existsSync(DIST)) {
  console.error('dist/ not found — run `npm run build` first.');
  process.exit(1);
}

/* The key file has to be reachable at the host root or every submission is
   rejected as unverified. Checked here rather than discovered in a 403. */
const keyFile = path.join(root, 'public', `${KEY}.txt`);
if (!fs.existsSync(keyFile) || fs.readFileSync(keyFile, 'utf8').trim() !== KEY) {
  console.error(`key file missing or wrong: public/${KEY}.txt must contain exactly ${KEY}`);
  process.exit(1);
}

/* Every <loc> and its <lastmod>, from the tier sitemaps. The index itself
   lists sitemaps rather than pages, so it is skipped. */
const current = new Map();
for (const f of fs.readdirSync(DIST).filter((n) => /^sitemap-.*\.xml$/.test(n))) {
  const xml = fs.readFileSync(path.join(DIST, f), 'utf8');
  for (const m of xml.matchAll(/<url>\s*<loc>([^<]+)<\/loc>\s*(?:<lastmod>([^<]*)<\/lastmod>)?/g)) {
    current.set(m[1], m[2] || '');
  }
}
if (!current.size) {
  console.error('no URLs found in dist/sitemap-*.xml — nothing to do.');
  process.exit(1);
}

const previous = fs.existsSync(STATE)
  ? JSON.parse(fs.readFileSync(STATE, 'utf8'))
  : { submitted: {}, runs: [] };

const changed = [];
for (const [url, lastmod] of current) {
  if (all || previous.submitted[url] !== lastmod) changed.push(url);
}

console.log(`sitemap: ${current.size} indexable URLs`);
console.log(`new or changed since last submission: ${changed.length}`);
if (changed.length) {
  for (const u of changed.slice(0, 12)) console.log(`  ${u}`);
  if (changed.length > 12) console.log(`  … and ${changed.length - 12} more`);
}

if (!changed.length) {
  console.log('nothing to submit.');
  process.exit(0);
}
if (dry) {
  console.log('\n--dry: nothing sent.');
  process.exit(0);
}

/* 10,000 URLs per request is the documented ceiling; batching well under it
   keeps a single failure small. */
const BATCH = 2000;
let sent = 0;
for (let i = 0; i < changed.length; i += BATCH) {
  const urlList = changed.slice(i, i + BATCH);
  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'content-type': 'application/json; charset=utf-8' },
    body: JSON.stringify({ host: HOST, key: KEY, keyLocation: KEY_LOCATION, urlList }),
  });
  /* 200 accepted, 202 accepted but key still being validated. Both are fine
     and both mean the URLs were taken. */
  if (res.status !== 200 && res.status !== 202) {
    const body = await res.text().catch(() => '');
    console.error(`\nFAILED: HTTP ${res.status} ${body.slice(0, 200)}`);
    console.error('State not updated, so the next run retries these.');
    process.exit(1);
  }
  sent += urlList.length;
  console.log(`submitted ${urlList.length} URLs — HTTP ${res.status}`);
}

for (const [url, lastmod] of current) {
  if (all || previous.submitted[url] !== lastmod) previous.submitted[url] = lastmod;
}
previous.runs = [{ at: new Date().toISOString(), count: sent }, ...(previous.runs || [])].slice(0, 20);
fs.writeFileSync(STATE, JSON.stringify(previous, null, 2) + '\n');
console.log(`\ndone — ${sent} URLs submitted, state recorded in src/data/indexnow-state.json`);
console.log('Commit that file so the next run does not resubmit the same pages.');
