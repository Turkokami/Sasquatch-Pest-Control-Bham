#!/usr/bin/env node
/**
 * redirects.mjs — generates the migration map from data, so the 39 → 23
 * service consolidation and the redirect table can never drift apart.
 *
 *   node scripts/redirects.mjs            # print the table and run all checks
 *   node scripts/redirects.mjs --json     # write redirects.json for vercel.json
 *
 * Keystone Part 12: "Blog permalink migration 404s — /blog/x moved to /x;
 * old paths 404 in GSC. 301 each old path to its migrated post."
 * Part 18 J: "verify every redirect resolves to a live 200 (source 301s → 200;
 * target already 200)" — no chains, ever.
 *
 * THE MAP HAS TWO HALVES.
 *   1. Service and category URLs, generated here from the legacy[] arrays in
 *      services.ts plus RETIRED_TO_EXCLUSION and RETIRED_TO_LIBRARY. Generated
 *      rather than listed so a service consolidation cannot silently orphan a
 *      URL — the enumeration lives in exactly one place.
 *   2. Geo, blog and page URLs, listed in src/data/legacy-urls.json, which was
 *      populated on 31 Aug 2026 from the live WordPress sitemap index.
 *
 * FOUR CHECKS RUN ON EVERY INVOCATION.
 *   - no self-loops, no duplicate sources, no chains
 *   - every URL in the live inventory is either mapped or recorded as an
 *     unchanged path (the coverage check — this is what gates cutover)
 *   - every target resolves to a page that exists in dist/, when dist/ is built
 *   - rules covering paths absent from today's sitemap are reported, not hidden
 *
 * Any of the first three failing exits non-zero.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dir = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dir, '..');

/* Read the TS data files without a compile step — they are plain enough to
   parse for the fields we need. Keeping this dependency-free means the map
   can be regenerated in a sandbox with no npm install. */
const src = fs.readFileSync(path.join(root, 'src/data/services.ts'), 'utf8');

const rows = [];
const re = /slug:\s*'([^']+)',\s*name:\s*'([^']*)'[\s\S]*?category:\s*'([^']+)',\s*confirmed:\s*(true|false),\s*legacy:\s*\[([^\]]*)\]/g;
let m;
while ((m = re.exec(src))) {
  const [, slug, name, category, confirmed, legacyRaw] = m;
  const legacy = [...legacyRaw.matchAll(/'([^']+)'/g)].map((x) => x[1]);
  rows.push({ slug, name, category, confirmed: confirmed === 'true', legacy });
}

const redirects = [];
for (const r of rows) {
  if (!r.confirmed) continue; // unconfirmed services neither build nor redirect
  for (const old of r.legacy) {
    redirects.push({ from: `/${old}/`, to: `/services/${r.slug}/`, code: 301 });
  }
}

/* Retired services (owner decision 30 Aug 2026): bird work and nuisance
   wildlife, bats and squirrels included, are out of scope. Their legacy URLs
   301 to the exclusion spoke rather than 404ing. Read from services.ts so the
   list cannot drift from the record there. */
const retired = (src.match(/RETIRED_TO_EXCLUSION = \[([^\]]*)\]/) || [, ''])[1];
for (const old of [...retired.matchAll(/'([^']+)'/g)].map((x) => x[1])) {
  redirects.push({ from: `/${old}/`, to: '/services/exclusion-and-repairs/', code: 301 });
}

/* Pests with no spoke of their own (see RETIRED_TO_LIBRARY in services.ts).
   These 301 to the pest library rather than 404ing or being pointed at a
   service line that does not exist. */
const lib = (src.match(/RETIRED_TO_LIBRARY = \[([^\]]*)\]/) || [, ''])[1];
for (const old of [...lib.matchAll(/'([^']+)'/g)].map((x) => x[1])) {
  redirects.push({ from: `/${old}/`, to: '/pest-library/', code: 301 });
}

/* Category hubs — the four /x-bellingham/ pages become real category hubs. */
const cats = {
  'rodents-birds-bellingham': 'rodents-birds',
  'stinging-flying-insects-bellingham': 'stinging-flying',
  'household-bugs-bellingham': 'household',
  'termites-structural-bellingham': 'structural',
};
for (const [old, cat] of Object.entries(cats)) {
  redirects.push({ from: `/${old}/`, to: `/services/?category=${cat}`, code: 301 });
}

/* Known one-offs found in the audit. */
redirects.push(
  { from: '/pest-control-services/', to: '/services/', code: 301 },
  { from: '/service-areas/', to: '/locations/', code: 301 },
  { from: '/whatcom-county-pest-control/', to: '/locations/whatcom-county/', code: 301 },
  { from: '/skagit-county-pest-control/', to: '/locations/skagit-county/', code: 301 },
  { from: '/pest-control-bellingham-wa/', to: '/locations/bellingham/', code: 301 },
  /* P0 from the audit: /lynden-wa/ returns 200 as a non-canonical duplicate
     and is internally linked from the services hub. */
  { from: '/lynden-wa/', to: '/locations/lynden/', code: 301 },
  /* P0: /blaine-wa-pest-control/ 404s today while every sibling city uses
     that pattern; /blaine-wa/ is the live canonical. Both retire. */
  { from: '/blaine-wa/', to: '/locations/blaine/', code: 301 },
  { from: '/blaine-wa-pest-control/', to: '/locations/blaine/', code: 301 },
  { from: '/guarantee/', to: '/our-guarantee/', code: 301 },
);

/* PATH COLLISION — deliberate, not a redirect.
   Legacy /locations/ is the brand-network page (HQ + the Houston TX franchise).
   The new taxonomy claims /locations/ for the geo hub, which is the stronger
   use of that path. So the legacy CONTENT moves to /network/ and /locations/
   becomes a live 200 serving the geo hub.

   A 301 here would create /service-areas/ → /locations/ → /network/, which is
   a chain — the exact defect this script exists to catch. Anyone with the old
   /locations/ URL lands on the geo hub, which links to /network/. */


/* ---- the geo + blog + page half of the map ------------------------------
   legacy-urls.json holds a flat { legacy-slug: target } object, populated in
   Phase 0 from the live sitemap index. It deliberately does NOT list service
   URLs: those come from the legacy[] arrays in services.ts above, so the
   39 → 23 consolidation and this table cannot drift apart.

   Sources whose path is UNCHANGED between the old site and the new one live
   under `unchanged` rather than `map`. They need no rule; they are recorded
   so the inventory reconciles to completion rather than to approximately. */
const legacyFile = path.join(root, 'src/data/legacy-urls.json');
let legacyCount = 0;
let unchanged = [];
let liveInventory = [];
if (fs.existsSync(legacyFile)) {
  const legacy = JSON.parse(fs.readFileSync(legacyFile, 'utf8'));
  for (const [from, to] of Object.entries(legacy.map ?? {})) {
    redirects.push({ from: `/${from}/`, to, code: 301 });
    legacyCount++;
  }
  unchanged = legacy.unchanged ?? [];
  liveInventory = legacy.live ?? [];
}

/* ---- integrity checks: no chains, no duplicate sources, no self-loops ---- */
const bySource = new Map();
const targets = new Set(redirects.map((r) => r.to));
const problems = [];
for (const r of redirects) {
  if (r.from === r.to) problems.push(`self-loop: ${r.from}`);
  if (bySource.has(r.from)) problems.push(`duplicate source: ${r.from} → ${bySource.get(r.from)} and ${r.to}`);
  bySource.set(r.from, r.to);
}
for (const r of redirects) {
  if (bySource.has(r.to)) problems.push(`CHAIN: ${r.from} → ${r.to} → ${bySource.get(r.to)}`);
}

/* ---- emitting the map into the thing that actually serves it ----
   Until 2 Sep 2026 this script BUILT the map, CHECKED the map, printed the
   map — and stopped. vercel.json contained zero redirect rules. Every run
   was green, the coverage line said all 240 legacy URLs were accounted for,
   and on launch day all 240 would have returned 404, because nothing ever
   carried the map to the edge.

   That is the most expensive class of bug in this repo and it is worth
   naming: a check that verifies an artifact nobody ships. The map was
   correct. It was just inert.

   So the map is emitted here, into vercel.json, from the same in-memory
   array the integrity checks just ran against — and `--check` fails when
   the committed vercel.json has drifted from what the data files produce.
   The gate runs --check, so the two can never separate again. */
const vercelFile = path.join(root, 'vercel.json');

function vercelRedirects() {
  /* Vercel matches `source` against the path. trailingSlash:true is set, so
     sources carry the trailing slash the map already uses. permanent:true is
     a 308, which preserves the method; every rule here is a 301-equivalent
     for a GET, which is all a browser or crawler will send at these URLs. */
  return redirects.map((r) => ({ source: r.from, destination: r.to, permanent: true }));
}

if (process.argv.includes('--emit') || process.argv.includes('--check')) {
  const current = JSON.parse(fs.readFileSync(vercelFile, 'utf8'));
  const want = vercelRedirects();
  const have = current.redirects ?? [];
  const same = JSON.stringify(have) === JSON.stringify(want);

  if (process.argv.includes('--check')) {
    if (same) {
      console.log(`\x1b[32mvercel.json carries all ${want.length} redirect rules\x1b[0m`);
    } else {
      console.log(
        `\x1b[31mFAIL\x1b[0m vercel.json is out of date: it has ${have.length} rules, the data files produce ${want.length}.\n` +
        `        Run \`npm run redirects:emit\` and commit the result.\n` +
        `        This check exists because the map was validated but never shipped for the whole of Phase 0.`,
      );
      process.exit(1);
    }
  } else {
    current.redirects = want;
    fs.writeFileSync(vercelFile, JSON.stringify(current, null, 2) + '\n');
    console.log(`wrote ${want.length} redirect rules into vercel.json`);
  }
} else if (process.argv.includes('--json')) {
  fs.writeFileSync(path.join(root, 'redirects.json'), JSON.stringify(redirects, null, 2));
  console.log(`wrote redirects.json — ${redirects.length} rules`);
} else {
  console.log(`\nMigration map — ${redirects.length} rules (${rows.filter((r) => r.confirmed).length} confirmed services)\n`);
  for (const r of redirects) console.log(`  ${r.code}  ${r.from.padEnd(42)} → ${r.to}`);
}

/* ---- reconciliation against the live sitemap ----------------------------
   Counting rules and comparing totals is not a coverage check — a map can
   have the right number of rules and still miss a URL while double-covering
   another. So we check each live URL individually against the rule set.

   Cutover does not happen until this reports zero unmapped. */
if (!fs.existsSync(legacyFile)) {
  console.log(
    `\n\x1b[33mNOTE\x1b[0m src/data/legacy-urls.json not present — this is the SERVICE map only.` +
    `\n     The geo, blog and page URLs are added in Phase 0 from the live sitemap.` +
    `\n     The map is not complete, and cutover does not happen, until every` +
    `\n     live URL is either mapped or recorded as an unchanged path.\n`,
  );
} else {
  console.log(
    `\n${legacyCount} geo/blog/page redirects from legacy-urls.json` +
    `\n${redirects.length - legacyCount} service and hub redirects generated from services.ts` +
    `\n${unchanged.length} paths unchanged between the two sites (no rule needed)`,
  );

  const unchangedSet = new Set(unchanged);
  const unmapped = liveInventory.filter(
    (slug) => !unchangedSet.has(slug) && !bySource.has(`/${slug}/`),
  );
  /* Rules whose source is not in the live sitemap. These are legitimate —
     the audit found paths that 404 today, non-canonical duplicates, and
     retired services whose URLs never made the current sitemap — but they
     are worth listing rather than absorbing silently. */
  const liveSet = new Set(liveInventory);
  const extra = [...bySource.keys()]
    .map((from) => from.replace(/^\/|\/$/g, ''))
    .filter((slug) => !liveSet.has(slug));

  if (unmapped.length === 0) {
    console.log(
      `\x1b[32mcoverage: all ${liveInventory.length} live URLs accounted for\x1b[0m` +
      (extra.length
        ? `\n\x1b[2m${extra.length} rules cover paths absent from today's sitemap ` +
          `(known 404s, non-canonical duplicates, retired service slugs)\x1b[0m`
        : ''),
    );
  } else {
    console.log(
      `\x1b[31mcoverage: ${unmapped.length} of ${liveInventory.length} live URLs UNMAPPED\x1b[0m`,
    );
    for (const slug of unmapped.slice(0, 40)) console.log(`  /${slug}/`);
    if (unmapped.length > 40) console.log(`  …and ${unmapped.length - 40} more`);
    process.exitCode = 1;
  }
}

/* ---- every target must be a page that actually exists -------------------
   Keystone Part 18 J: a redirect is only done when the source 301s to a live
   200. A map can be internally consistent and still send half the old site to
   a URL nobody built. When dist/ is present we check every target against it. */
const dist = path.join(root, 'dist');
if (fs.existsSync(dist)) {
  const deadTargets = [];
  for (const r of redirects) {
    const clean = r.to.split('?')[0];
    const file = clean === '/'
      ? path.join(dist, 'index.html')
      : path.join(dist, clean.replace(/^\/|\/$/g, ''), 'index.html');
    if (!fs.existsSync(file)) deadTargets.push(`${r.from} → ${r.to}`);
  }
  if (deadTargets.length) {
    problems.push(...deadTargets.map((d) => `target does not exist: ${d}`));
  } else {
    console.log(`\x1b[32mall ${redirects.length} targets resolve to a built page\x1b[0m`);
  }
} else {
  console.log('\x1b[2mdist/ not built — target existence not checked this run\x1b[0m');
}

if (problems.length) {
  console.log('\n\x1b[31mMAP INTEGRITY FAILURES\x1b[0m');
  for (const p of problems) console.log(`  ${p}`);
  process.exit(1);
}
console.log('\x1b[32mmap integrity: no chains, no duplicate sources, no self-loops\x1b[0m\n');
