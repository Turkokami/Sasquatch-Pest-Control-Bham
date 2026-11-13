#!/usr/bin/env node
/**
 * sitemap.mjs — writes the sitemap index, one sitemap per page type, and
 * dist/robots.txt after a build.
 *
 * Runs from `npm run build`, so the sitemaps can never be one build stale.
 * Written by hand rather than pulled in as an integration, for one reason
 * that matters on this site: the rule for what belongs in a sitemap here is
 * not "every route". It is "every route we are asking Google to index", and
 * this build deliberately ships pages that are noindex —
 *
 *   - archived blog posts, canonicalled to the page that supersedes them
 *   - species profiles and other routes whose content has not landed
 *   - the 404
 *
 * Listing a noindex page in a sitemap is a contradiction: it asks a crawler
 * to index a page the page itself refuses. Off-the-shelf sitemap integrations
 * enumerate routes and would do exactly that, so this reads the built HTML and
 * asks each page what it says about itself.
 *
 * SEGMENTED BY PAGE TYPE, Keystone v3.2 Part 9.4 (14 Sep 2026). One sitemap
 * per tier under a sitemap index at /sitemap.xml, so Search Console reports
 * indexation per tier: "the neighborhood tier is 40% indexed and the service
 * tier is 100%" becomes a number rather than an inference from one site-wide
 * total, and the M1 consolidation question (Part 16.4: a tier below roughly
 * 70% indexed is a consolidation candidate as a tier) can be read directly.
 * Both languages share a tier: a Spanish city page is a city page.
 *
 * lastmod is the date the page itself declares as dateModified — the last
 * real edit to its source, read from that file's git history by
 * scripts/content-dates.mjs (Keystone v3.2 §6.6). It is taken out of the built
 * HTML for the same reason the title and the robots meta are: what the page
 * says about itself, not a second copy of it.
 *
 * IT USED TO BE THE FILE'S mtime, and that was wrong in a way that was costing
 * us something (fixed 12 Nov 2026). After a clean build every file's mtime is
 * the build time, so all 404 URLs claimed to have changed on every build. The
 * sitemap was telling the truth about nothing — and scripts/indexnow.mjs, which
 * submits the difference between one build and the next, therefore submitted
 * every URL every day. Its own run log reads 388, 388, 388. That is what Bing
 * was reporting back as "IndexNow is in batch mode", and it is the half of
 * that bug which the fix in .github/workflows/indexnow.yml did not reach.
 */
import fs from 'node:fs';
import path from 'node:path';

const DIR = 'dist';
const SITE = 'https://www.sasquatchpestcontrol.com';

function walk(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (e.name.endsWith('.html')) out.push(p);
  }
  return out;
}

const files = walk(DIR);
if (!files.length) {
  console.error(`No built HTML in ./${DIR} — run the build first.`);
  process.exit(1);
}

/* The tiers, in the order the index lists them. The same URL taxonomy the
   harness classifies pages by (Keystone Part 3.3), English and Spanish. */
const TIERS = [
  ['services', (u) => /^\/(services|es\/servicios)\/[^/]+\/$/.test(u)],
  ['problems', (u) => /^\/(services|es\/servicios)\/[^/]+\/[^/]+\/$/.test(u)],
  ['cities', (u) => /^\/(locations|es\/areas-de-servicio)\/[^/]+\/$/.test(u)],
  ['neighborhoods', (u) => /^\/(locations|es\/areas-de-servicio)\/[^/]+\/[^/]+\/$/.test(u)],
  ['library', (u) => /^\/(pest-library|es\/plagas)\/[^/]+\/$/.test(u)],
  ['commercial', (u) => /^\/(commercial|es\/comercial)\/[^/]+\/$/.test(u)],
  ['guides', (u) => /^\/(guides|es\/guias)\/[^/]+\/$/.test(u)],
  ['blog', (u) => /^\/blog\/[^/]+\/$/.test(u)],
  ['pages', () => true],
];
const tierOf = (url) => TIERS.find(([, test]) => test(url))[0];

/* Priority is a hint, not a ranking lever, and Google has said for years that
   it largely ignores it. It is set here anyway because it costs nothing and
   because expressing the site's own hierarchy in one place is a useful
   sanity check on that hierarchy: if a page's priority looks wrong, the
   information architecture is usually what is wrong. */
const priorityFor = (url) => {
  if (url === '/') return '1.0';
  if (/^\/(services|locations|commercial|pest-library|guides|about)\/$/.test(url)) return '0.9';
  if (/^\/services\/[^/]+\/$/.test(url)) return '0.8';
  if (/^\/locations\/[^/]+\/$/.test(url)) return '0.8';
  if (/^\/blog\//.test(url)) return '0.4';
  return '0.6';
};

/* The page's own dateModified, which BaseLayout writes into its JSON-LD from
   content-dates.json. A page that declares none falls back to the mtime — in
   practice only the 404 and any page passed no `source` prop. */
const declaredDate = (html) => (html.match(/"dateModified":\s*"(\d{4}-\d{2}-\d{2})/) || [])[1] || null;

const byTier = new Map(TIERS.map(([name]) => [name, []]));
let excluded = 0;
for (const f of files) {
  const html = fs.readFileSync(f, 'utf8');
  if (/<meta\s+name=["']robots["'][^>]*noindex/i.test(html)) { excluded++; continue; }

  const url = '/' + path.relative(DIR, f).replace(/index\.html$/, '').replace(/\\/g, '/');
  if (url === '/404.html' || url === '/404/') { excluded++; continue; }

  /* A page canonicalled elsewhere does not belong here either, even if it
     somehow escaped the noindex check — same contradiction, second guard. */
  const canon = (html.match(/<link\s+rel=["']canonical["'][^>]*href=(["'])((?:(?!\1).)*)\1/i) || [])[2];
  if (canon && canon !== `${SITE}${url}`) { excluded++; continue; }

  /* The page's own title, brand suffix stripped, for llms.txt below. Taken
     from the built HTML for the same reason the rest of this file is: it is
     what the page actually says about itself, not a second copy of it. */
  const title = ((html.match(/<title>([^<]*)<\/title>/i) || [])[1] || '')
    .replace(/\s*\|\s*Sasquatch(?: Pest Control)?\s*$/, '')
    .replace(/&amp;/g, '&')
    .replace(/&#39;|&rsquo;/g, "'")
    .trim();
  byTier.get(tierOf(url)).push({
    url,
    title,
    lastmod: declaredDate(html) ?? fs.statSync(f).mtime.toISOString().slice(0, 10),
  });
}

/* Stale single-file output from before segmentation, so a leftover can never
   be served beside the index. */
for (const f of fs.readdirSync(DIR)) if (/^sitemap-.*\.xml$/.test(f)) fs.unlinkSync(path.join(DIR, f));

/* Pacific, not UTC: at 4pm in Bellingham, toISOString() already reads tomorrow,
   and a sitemap dated in the future is a sitemap a crawler is right to doubt. */
const today = new Date().toLocaleDateString('en-CA', { timeZone: 'America/Los_Angeles' });
const written = [];
let total = 0;
for (const [tier, entries] of byTier) {
  if (!entries.length) continue;
  entries.sort((a, b) => a.url.localeCompare(b.url));
  const name = `sitemap-${tier}.xml`;
  const xml =
    '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    entries
      .map(
        (e) =>
          `  <url>\n    <loc>${SITE}${e.url}</loc>\n` +
          `    <lastmod>${e.lastmod}</lastmod>\n` +
          `    <priority>${priorityFor(e.url)}</priority>\n  </url>`,
      )
      .join('\n') +
    '\n</urlset>\n';
  fs.writeFileSync(path.join(DIR, name), xml);
  const lastmod = entries.reduce((m, e) => (e.lastmod > m ? e.lastmod : m), '0000-00-00');
  written.push({ name, count: entries.length, lastmod: lastmod === '0000-00-00' ? today : lastmod });
  total += entries.length;
}

const index =
  '<?xml version="1.0" encoding="UTF-8"?>\n' +
  '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
  written.map((w) => `  <sitemap>\n    <loc>${SITE}/${w.name}</loc>\n    <lastmod>${w.lastmod}</lastmod>\n  </sitemap>`).join('\n') +
  '\n</sitemapindex>\n';
fs.writeFileSync(path.join(DIR, 'sitemap.xml'), index);

/* robots.txt. Nothing here is clever, and that is intentional — a robots file
   is the easiest place on a site to accidentally deindex everything, so it
   stays minimal and obvious. No Disallow rules: the pages we do not want
   indexed carry noindex, which is the correct mechanism. Disallowing a URL
   in robots.txt prevents the crawl, which prevents the crawler from ever
   SEEING the noindex — the opposite of the intent. */
/* ONE Disallow, and it is the exception the paragraph above does not cover.
   vercel.json rewrites /office/* to the Squatch-Bot Dispatch board on another
   Vercel project. That HTML is not ours and never passes through BaseLayout,
   so it cannot carry a noindex meta tag — the mechanism the note above
   correctly prefers is simply not available on those URLs. Meanwhile the
   proxy makes them look like part of this site to a crawler.

   The board holds customer names, money figures and drafted replies. The
   right answer is that it should not be reachable from the public domain at
   all; until it moves to its own subdomain this keeps crawlers off it. The
   board's own login gate is the real protection and this is the belt. */
const robots = `User-agent: *
Allow: /
Disallow: /office/

Sitemap: ${SITE}/sitemap.xml
`;
fs.writeFileSync(path.join(DIR, 'robots.txt'), robots);

console.log(
  `sitemap.xml — index of ${written.length} tier sitemaps, ${total} indexable URLs ` +
    `(${excluded} excluded: noindex, canonicalled elsewhere, or the 404): ` +
    written.map((w) => `${w.name.replace(/^sitemap-|\.xml$/g, '')} ${w.count}`).join(' · '),
);
console.log('robots.txt — written');
/* llms.txt — added 11 Nov 2026, and it reverses a settled decision, so the
   reasoning belongs here as well as in GUARDRAILS §4.

   The old position was that no llms.txt should be built because v2 recorded
   it as unused by the crawlers it is meant for. That was true and is still
   mostly true: no major AI crawler has committed to reading this file, and
   nothing here should be described to the owner as a ranking or citation
   measure. What changed is that Lighthouse's Agentic Browsing category now
   audits for its presence at the domain root. So the file has one known
   consumer — an audit — and the honest claim for it is exactly that.

   WHY IT IS GENERATED RATHER THAN HAND-WRITTEN. A hand-written llms.txt is
   the second copy of the site, and the recurring defect in this codebase is
   one list living in two places and drifting. Within a month a static file
   would be naming a service that has been renamed and omitting pages that
   have been written. Everything below comes from the built output that the
   sitemaps are made from, so a page cannot be in one and missing from the
   other, and the titles are the titles the pages actually carry.

   WHAT IS CURATED, AND WHY IT IS WORTH THE WORDS. The scope block is the
   one part not derived from the build, and it is the most useful thing in
   the file. An assistant asked "does Sasquatch do squirrel removal" should
   be able to find out that the answer is no without inferring it from the
   absence of a page. Bird work and nuisance wildlife were retired by the
   owner on 30 Aug and 12 Sep 2026 (RETIRED_TO_EXCLUSION in services.ts,
   GUARDRAILS §8); moles are refused on the published reasoning; complete
   WDO inspections are a credential boundary, not a preference. Each line
   restates something the site already says in prose on a page a reader can
   open — nothing here is a new claim. */
const biz = fs.readFileSync('src/data/business.ts', 'utf8');
const bizName = (biz.match(/^ {2}name: '([^']+)'/m) || [])[1];
const bizPhone = (biz.match(/^ {2}phone: '([^']+)'/m) || [])[1];
const bizEmail = (biz.match(/^ {2}email: '([^']+)'/m) || [])[1];
if (!bizName || !bizPhone || !bizEmail) {
  console.error('llms.txt — could not read name, phone and email from src/data/business.ts');
  process.exit(1);
}

const en = (tier) => (byTier.get(tier) || []).filter((e) => !e.url.startsWith('/es/'));
const list = (entries) =>
  entries
    .slice()
    .sort((a, b) => a.url.localeCompare(b.url))
    .map((e) => `- [${e.title || e.url}](${SITE}${e.url})`)
    .join('\n');

/* The two county hubs sit at /locations/<slug>/ and so land in the cities
   tier, which is right for a sitemap and wrong for a list of towns. The
   title pattern is "… in <Town>, WA" everywhere except Lummi Island, which
   is "on". */
const COUNTY_HUBS = new Set(['/locations/whatcom-county/', '/locations/skagit-county/']);
const cityNames = en('cities')
  .filter((e) => !COUNTY_HUBS.has(e.url))
  .map((e) => e.title.replace(/^Pest Control(?: & Exterminator)? (?:in|on) /, '').replace(/,? WA$/, ''))
  .filter(Boolean)
  .sort();

const llms = `# ${bizName}

> Pest control, rodent exclusion and crawlspace work in Bellingham and the rest
> of Whatcom County, Washington. Family-run, exclusion-first, and willing to say
> when a problem does not need treating.

Phone and text: ${bizPhone}
Email: ${bizEmail}
Service area: Whatcom County and northern Skagit County, Washington. Service-area
business with no public storefront.
Languages: English, and Spanish at ${SITE}/es/
Licensing: Washington State Department of Agriculture pesticide licenses, numbered
on ${SITE}/about/ beside a link to the state's own free license lookup.

## What this company does not do

Stated here so it does not have to be inferred from the absence of a page. Each
line is explained on the site at the page linked.

- No bird work of any kind, residential or commercial. Retired by the owner in
  2026. See ${SITE}/services/exclusion-and-repairs/
- No nuisance wildlife: no raccoons, opossums, squirrels or bats.
- No mole trapping. The reasoning is published rather than hidden, and it is
  about what is legal and what actually works in this state.
- No complete WDO inspections, the kind carrying a WSDA inspection control
  number for a sale or refinance. That needs a Structural Pest Inspector
  credential this company does not hold. We treat what somebody else
  identified. See ${SITE}/guides/wdo-reports-in-a-property-sale/
- No written record of findings in a wood-destroying-organism context, for the
  same reason.
- No star ratings published as structured data, and no review gating. See
  ${SITE}/reviews/ and ${SITE}/review/

## Services

${list(en('services'))}

## Guides

Reference pages written from primary sources, each carrying its citations and a
review date.

${list(en('guides'))}

## Pest library

Species profiles for the pests found in this county specifically. A species
appears here only if it would be expected on a Whatcom County job, which is why
there is no brown recluse and no black widow entry.

${list(en('library'))}

## Commercial

${list(en('commercial'))}

## Towns with their own page

${cityNames.map((n) => `- ${n}`).join('\n')}

Every one of them is linked from ${SITE}/locations/

## Also available

- Full URL list, segmented by page type: ${SITE}/sitemap.xml
- Crawler policy: ${SITE}/robots.txt — nothing is blocked except the staff board
`;
fs.writeFileSync(path.join(DIR, 'llms.txt'), llms);
console.log(
  `llms.txt — written (${en('services').length} services, ${en('guides').length} guides, ` +
    `${en('library').length} library, ${cityNames.length} towns)`,
);

