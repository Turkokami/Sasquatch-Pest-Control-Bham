#!/usr/bin/env node
/**
 * harness.mjs — the verification harness. Keystone Part 9.2.
 *
 * Run between every content wave and before every push. This is the reason
 * builds ship with zero dead links and consistent metadata.
 *
 *   node scripts/harness.mjs            # all checks against ./dist
 *   node scripts/harness.mjs --dir dist --only seo,words
 *
 * Exit code 1 on any hard failure, so it gates CI and the deploy.
 *
 * Checks:
 *   1  dead-link crawler      every internal <a href> resolves to a built file
 *   1b asset-reference        every img/og:image/script/icon/JSON-LD image too
 *   2  per-page SEO audit     one H1, no duplicate H1, unique title (≤60) and
 *                             description (110–165), alt on every image
 *   2b price-drift            no dollar figure that is not in business.ts
 *   2c credential & claims    no inspection authority, no WDO findings reports
 *   2d JSON-LD graph          every @id resolves, no node declared twice
 *   3  duplicate-sentence     any 10+ word sentence appearing on 3+ pages
 *   3b sibling duplicates     v2 substance gate: no 10+ word sentence on 2
 *                             sibling pages in one cluster
 *   4  word-band auditor      v2 M1: bands by page type, a diagnostic only —
 *                             thin pages warn, nothing fails on length
 *   5  structural performance v2: HTML < 2MB, own JS < 300KB, images sized,
 *                             one high-priority image; the lab gate is separate
 *   6  conversion contract    v2 Part 4A: phone is a tel: link everywhere, and
 *                             the schema number is the displayed number
 *   6b same-page anchors      every href="#id" lands on an element that exists
 *   6c Spanish chrome         no English interface strings on /es/ pages, and
 *                             no Spanish WebPage declaring itself en-US
 *
 * Aligned to Keystone v2 on 10 Sep 2026. What v2 asks for that this file does
 * NOT do, so nobody reads the list above as complete: the keyword→URL map
 * checker (Part 6A) needs a measured keyword map that does not exist yet, and
 * the lab performance gate needs Lighthouse against a running server.
 *
 * 1b exists because 1 did not cover what its name implied. Twice now a check
 * on this project has been narrower than it sounded — the dead-link crawler
 * walked anchors only while 201 pages advertised two images that were never
 * built, and the redirect map reported full coverage of an artifact that was
 * never emitted to vercel.json. When adding a check here, write down what it
 * does NOT cover.
 */

import fs from 'node:fs';
import path from 'node:path';

const args = process.argv.slice(2);
const arg = (k, d) => { const i = args.indexOf(k); return i > -1 ? args[i + 1] : d; };
const DIR = arg('--dir', 'dist');
const ONLY = arg('--only', '')?.split(',').filter(Boolean);
const run = (n) => !ONLY?.length || ONLY.includes(n);

/* M1, KEYSTONE v2 (10 Sep 2026): THERE IS NO WORD FLOOR ANY MORE.

   Until v2 this block set a 3,000-word floor on every content page, a 1,200
   hub floor, 900 for imported blog posts and 400 for Spanish, with exemptions
   argued out one page at a time — /trusted-partners/ joining UTILITY and being
   thrown back out, /awards/ and /gallery/ being reclassified as hubs. v2
   retires all of it. The standard carries its own reasons; the one that
   matters for this file is that Google's helpful-content guidance lists
   writing to a word count as something to avoid, and a floor pushes geo pages
   toward the scaled-content profile it was written to defend against.

   What replaced it, and where this harness carries each part:

     1. THE SUBSTANCE GATE — four binary items. Only the fourth can be read
        out of built HTML, and check 3b does it: zero sentences shared between
        sibling pages in the same cluster. The other three — three verifiable
        local specifics, one first-party proof from that geography, one fact
        the current top five do not carry — need a person or a SERP, and this
        harness does not pretend it can check them.

     2. WORD BANDS BY PAGE TYPE — check 4. A diagnostic, not a gate. A page
        under its band is WARNED as thin; nothing fails on length. The numbers
        are v2's defaults, which the standard itself labels SERP-parity
        heuristics with no public dataset behind them.

     3. PADDING — v2 defines it as more than twice the SERP median for the
        page's target query. That median is a MEASUREMENT, and prime directive
        8 says an agent never generates one. So SERP_MEDIAN starts empty and
        the padding warning fires only for pages somebody has measured. Pages
        above a default band are counted per type and printed, not warned one
        by one: sitting above a heuristic band is not the same finding as being
        padded, and 200 identical warnings would bury the ones that matter.

   WHAT NOT TO DO WITH THIS. v2 says no agent may treat the band numbers as a
   new floor, and that a site built under v1 is not stripped to fit — for an
   existing site the consolidation queue is its GSC "crawled / discovered –
   currently not indexed" list plus six-month zero-click pages, and nothing
   more. This site is not live yet, so that list does not exist yet. The
   above-band counts are the input to that conversation, not a to-do list.

   THE SPANISH RATCHET added earlier on 10 Sep 2026 — holding the
   /es/servicios/<slug>/ pages to 3,000 words once they had reached it — lasted
   about four hours. It was correct under v1 and is precisely what v2 forbids,
   so it is removed rather than converted into a band. */
const BANDS = {
  home:         { label: 'T1 home / hub',         min: 600,  max: 1200 },
  servicesHub:  { label: 'services hub',          min: 800,  max: 1500 },
  service:      { label: 'T2 service spoke',      min: 1200, max: 2500 },
  problem:      { label: 'T3 problem page',       min: 700,  max: 1400 },
  city:         { label: 'T4 city page',          min: 800,  max: 1600 },
  neighborhood: { label: 'T5 neighborhood page',  min: 400,  max: 900 },
  pest:         { label: 'T6 pest library',       min: 1200, max: 2500 },
  vertical:     { label: 'T7 industry vertical',  min: 1200, max: 2000 },
  /* /guides/ carries sources and review dates and several of its pages are
     compliance pages outright (school notification, rentals, WDO reports), so
     the set takes the T8 band. It is a classification made here, not one v2
     makes, and it is the first thing to revisit if a guide is ever measured. */
  compliance:   { label: 'T8 compliance / guide', min: 900,  max: 1800 },
  blog:         { label: 'blog post',             min: 700,  max: 1500 },
};
/* Measured SERP medians, keyed by page URL:
     '/services/rodent-control/': { query: '…', median: 0, measuredOn: 'YYYY-MM-DD', source: '…' }
   EMPTY ON PURPOSE. A row goes in only from a real measurement of the top five
   organic results for that page's target query, with the date and the tool
   named — never from an estimate. */
const SERP_MEDIAN = {};

/* Pages that take no band at all: they exist to be acted on, not read.
   '/es/contacto/' sits here beside '/contact/' because it is the same page in
   the other language, and classifying a pair differently is the single-source
   split this codebase keeps getting bitten by. */
const UTILITY = new Set(['/contact/', '/network/', '/404.html', '/404/', '/thank-you/', '/es/contacto/']);
const isSpanish = (url) => url === '/es/' || url.startsWith('/es/');
/* Hubs take the T1 band. '/gallery/' and '/awards/' are here by
   classification, not exemption: each one's job is routing plus an answer —
   the images, the verifiable recognition and the two state lookups — which is
   what this set means. The Spanish hubs are the same pages in the other
   language and are classified with their English twins. */
const HUBS = new Set([
  '/', '/locations/', '/commercial/', '/pest-library/', '/about/', '/our-guarantee/',
  '/guides/', '/blog/', '/gallery/', '/what-we-use/', '/awards/',
  '/es/', '/es/areas-de-servicio/', '/es/garantia/', '/es/nosotros/',
]);
const isBlogPost = (url) => url.startsWith('/blog/') && url !== '/blog/';
/* A page type per URL, from the URL taxonomy in Keystone Part 3.3. null means
   no v2 page type fits — /trusted-partners/ is the case today — and such pages
   are listed rather than banded, because inventing a band for them would be
   generating a threshold nobody measured. */
const pageType = (url) => {
  if (url === '/services/' || url === '/es/servicios/') return 'servicesHub';
  if (HUBS.has(url)) return 'home';
  if (/^\/services\/[^/]+\/$/.test(url) || /^\/es\/servicios\/[^/]+\/$/.test(url)) return 'service';
  if (/^\/services\/[^/]+\/[^/]+\/$/.test(url)) return 'problem';
  if (/^\/locations\/[^/]+\/$/.test(url)) return 'city';
  if (/^\/locations\/[^/]+\/[^/]+\/$/.test(url)) return 'neighborhood';
  if (/^\/pest-library\/[^/]+\/$/.test(url)) return 'pest';
  if (/^\/commercial\/[^/]+\/$/.test(url)) return 'vertical';
  if (/^\/guides\/[^/]+\/$/.test(url)) return 'compliance';
  if (isBlogPost(url)) return 'blog';
  return null;
};
/* M5 (v2): title ≤ 60, description 110–165. The harness enforced 62 until v2,
   which let through titles the client-facing standard would have failed. The
   site had none between 61 and 62 when this tightened, so nothing moved. */
const TITLE_MAX = 60, DESC_MIN = 110, DESC_MAX = 165;

let failures = 0, warnings = 0;
const fail = (m) => { failures++; console.log(`  \x1b[31mFAIL\x1b[0m ${m}`); };
const warn = (m) => { warnings++; console.log(`  \x1b[33mWARN\x1b[0m ${m}`); };
const ok = (m) => console.log(`  \x1b[32m ok \x1b[0m ${m}`);

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
  console.error(`No built HTML found in ./${DIR} — run \`npm run build\` first.`);
  process.exit(1);
}
console.log(`\nKeystone harness — ${files.length} pages in ./${DIR}\n`);

const pages = files.map((f) => {
  const html = fs.readFileSync(f, 'utf8');
  return {
    file: f,
    url: '/' + path.relative(DIR, f).replace(/index\.html$/, '').replace(/\\/g, '/'),
    html,
    noindex: /<meta\s+name=["']robots["'][^>]*noindex/i.test(html),
  };
});

/* Indexable pages only — these carry the uniqueness floor and the dedup rule. */
const indexable = pages.filter((p) => !p.noindex);
console.log(`${indexable.length} indexable, ${pages.length - indexable.length} noindex (routes awaiting content)\n`);

const decode = (s = '') =>
  s.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
   .replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&nbsp;/g, ' ')
   .replace(/&#(\d+);/g, (_, d) => String.fromCharCode(+d));

/* Attribute extraction, and the regex shape matters more than it looks.

   The original was `${name}=["']([^"']*)["']` — open on either quote, then
   consume anything that is not EITHER quote. That silently truncates at the
   first apostrophe inside a double-quoted attribute, so a perfectly good
   description like `it carries the world's deadliest venom is folklore` was
   read as `it carries the world` and then failed check 2 for ending
   mid-word. The page was fine; the check was broken, and it cost a writer a
   full cycle chasing a defect that did not exist.

   The fix is a backreference: capture the opening quote, then consume
   anything that is not THAT quote until it closes. Which is what the
   duplicate-sentence scanner's own tag-stripper already had to learn — see
   the backreference note in textOf. Same lesson, second place. */
const attr = (tag, name) => {
  const v = (tag.match(new RegExp(`\\b${name}=(["'])((?:(?!\\1)[\\s\\S])*)\\1`, 'i')) || [])[2];
  return v === undefined ? undefined : decode(v);
};
const tagsOf = (html, tag) => html.match(new RegExp(`<${tag}\\b[^>]*>`, 'gi')) || [];
const textOf = (html) =>
  html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<nav[\s\S]*?<\/nav>/gi, ' ')
    .replace(/<footer[\s\S]*?<\/footer>/gi, ' ')
    .replace(/<header[\s\S]*?<\/header>/gi, ' ')
    /* Backreference the tag name: a lazy match to ANY closing tag stops at the
       first nested one and strips only a fragment of the component. */
    .replace(/<([a-z]+)[^>]*\sdata-boilerplate\b[^>]*>[\s\S]*?<\/\1>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&[a-z#0-9]+;/gi, ' ')
    .replace(/\s+/g, ' ')
    /* Close the gap the tag strip opens before punctuation. "<a>360-410-2199</a>."
       becomes "360-410-2199 ." above, and the lone full stop was then counted as
       a word — which on 10 Sep 2026 pushed a nine-word Spanish sentence over the
       ten-word duplicate threshold the moment the phone number became a link.
       A full stop is not a word. This restores the text the reader sees; it
       does not narrow what either duplicate check looks for. */
    .replace(/ ([.,;:!?])(?=\s|$)/g, '$1')
    .trim();

/* Words in a sentence, for the ten-word duplicate threshold (checks 3 and 3b).
   A token that is nothing but full stops is punctuation the block-edge splitter
   left behind, not a word — "360-410-2199 .." counted as ten words once the
   number became a link. Only that is excluded: an em dash still counts exactly
   as it always has, so no sentence moves under the threshold that was over it
   before 10 Sep 2026 for any other reason. */
const wordsIn = (s) => s.split(/\s+/).filter((w) => w && !/^[.!?]+$/.test(w)).length;

/* Like textOf, but preserves SENTENCE BOUNDARIES at block-element edges.
   textOf concatenates the title straight onto body copy with no punctuation
   between them, so a naive sentence split merges unrelated elements into one
   chunk. That matters for check 2c: a legitimate "We are not structural pest
   inspectors." in one paragraph would otherwise whitelist a real violation in
   the next. Only 2c uses this — word counts and dedup keep using textOf. */
const BLOCK = 'p|div|section|article|li|h1|h2|h3|h4|h5|h6|td|th|tr|blockquote|figcaption|dd|dt|title|summary|details';
const sentenceTextOf = (html) =>
  textOf(
    html
      .replace(new RegExp(`</(${BLOCK})>`, 'gi'), '. ')
      .replace(new RegExp(`<(${BLOCK})\\b[^>]*>`, 'gi'), '. '),
  );

/* ---------- 1 · dead-link crawler ---------- */
if (run('links')) {
  console.log('1 · dead-link crawler');
  const built = new Set(pages.map((p) => p.url));
  const assets = new Set(
    walk(DIR, []).concat(
      fs.existsSync(DIR)
        ? (function all(d, o = []) {
            for (const e of fs.readdirSync(d, { withFileTypes: true })) {
              const p = path.join(d, e.name);
              e.isDirectory() ? all(p, o) : o.push('/' + path.relative(DIR, p).replace(/\\/g, '/'));
            }
            return o;
          })(DIR)
        : [],
    ),
  );
  let bad = 0;
  for (const p of pages) {
    for (const a of tagsOf(p.html, 'a')) {
      const href = attr(a, 'href');
      if (!href || /^(https?:|tel:|mailto:|#|javascript:)/i.test(href)) continue;
      const clean = href.split('#')[0].split('?')[0];
      if (!clean) continue;
      const target = clean.endsWith('/') ? clean : clean + '/';
      if (!built.has(target) && !built.has(clean) && !assets.has(clean)) {
        fail(`${p.url} → ${clean} (no built file)`);
        bad++;
      }
    }
  }
  if (!bad) ok('every internal href resolves');
}

/* ---------- 1b · asset-reference crawler ---------- */
if (run('assets')) {
  console.log('\n1b · asset-reference crawler');
  /* WHY THIS EXISTS, because it is the same lesson twice in two days.

     Check 1 crawls <a href> and only <a href>. So the site could — and did —
     ship 201 pages where every single one carried

         <meta property="og:image" content=".../img/sasquatch-social.jpg">

     and a schema graph whose Organization logo pointed at
     /img/sasquatch-pest-control-logo.png, while public/ contained zero files.
     Every share card would have been blank, the logo node would have
     resolved to nothing, and the harness would have reported all green,
     because nobody was looking at anything but anchor tags.

     The pattern to watch for: a check whose NAME is broader than its SCOPE.
     "dead-link crawler" sounds like it covers references; it covered links.
     The redirect map had the same shape — "coverage: all 240 URLs accounted
     for" was true of the map and false of what shipped.

     This walks every reference a page makes to a file this build is supposed
     to serve: img/src and srcset, source/src, video and audio, link/href for
     icons and manifests, script/src, og:image, twitter:image, and the image
     URLs inside the JSON-LD graph. External URLs are skipped — we do not
     police somebody else's CDN — but our own absolute URLs are resolved back
     to a path and checked, because that is exactly the form og:image takes. */
  const served = new Set();
  (function all(d) {
    if (!fs.existsSync(d)) return;
    for (const e of fs.readdirSync(d, { withFileTypes: true })) {
      const fp = path.join(d, e.name);
      if (e.isDirectory()) all(fp);
      else served.add('/' + path.relative(DIR, fp).replace(/\\/g, '/'));
    }
  })(DIR);

  const SITE_ORIGINS = [/^https?:\/\/(www\.)?sasquatchpestcontrol\.com/i];
  const localize = (u) => {
    if (!u) return null;
    const v = u.trim();
    if (!v || v.startsWith('data:') || v.startsWith('#')) return null;
    for (const o of SITE_ORIGINS) if (o.test(v)) return v.replace(o, '') || '/';
    if (/^(https?:|tel:|mailto:|javascript:)/i.test(v)) return null;   // someone else's
    if (!v.startsWith('/')) return null;                                // relative, rare here
    return v.split('#')[0].split('?')[0];
  };

  /* refs: [url, whatItWas] pairs, deduped per page so one missing shared
     asset reports once per page rather than once per reference. */
  const missing = new Map();
  for (const p of pages) {
    const refs = [];
    for (const tag of tagsOf(p.html, 'img')) {
      refs.push([attr(tag, 'src'), 'img src']);
      const set = attr(tag, 'srcset');
      if (set) for (const c of set.split(',')) refs.push([c.trim().split(/\s+/)[0], 'img srcset']);
    }
    for (const tag of tagsOf(p.html, 'source')) refs.push([attr(tag, 'src'), 'source src']);
    for (const tag of tagsOf(p.html, 'video')) refs.push([attr(tag, 'poster'), 'video poster']);
    for (const tag of tagsOf(p.html, 'script')) refs.push([attr(tag, 'src'), 'script src']);
    for (const tag of tagsOf(p.html, 'link')) {
      const rel = (attr(tag, 'rel') || '').toLowerCase();
      if (/icon|manifest|apple-touch/.test(rel)) refs.push([attr(tag, 'href'), `link rel="${rel}"`]);
    }
    for (const tag of tagsOf(p.html, 'meta')) {
      const key = (attr(tag, 'property') || attr(tag, 'name') || '').toLowerCase();
      if (key === 'og:image' || key === 'twitter:image') refs.push([attr(tag, 'content'), key]);
    }
    /* JSON-LD image and logo nodes. Parsed as text rather than JSON so a
       graph shape change cannot silently stop the check from looking. */
    const ld = p.html.match(/<script[^>]*application\/ld\+json[^>]*>([\s\S]*?)<\/script>/i);
    if (ld) {
      for (const m of ld[1].matchAll(/"(?:url|contentUrl|image|logo)"\s*:\s*"([^"]+)"/g)) {
        if (/\.(png|jpe?g|gif|svg|webp|avif|ico)$/i.test(m[1])) refs.push([m[1], 'JSON-LD image']);
      }
    }

    const seenHere = new Set();
    for (const [raw, what] of refs) {
      const u = localize(raw);
      if (!u || served.has(u)) continue;
      const key = `${u}|${what}`;
      if (seenHere.has(key)) continue;
      seenHere.add(key);
      if (!missing.has(key)) missing.set(key, { u, what, pages: [] });
      missing.get(key).pages.push(p.url);
    }
  }

  if (!missing.size) ok('every referenced image, icon and script resolves to a built file');
  else {
    for (const { u, what, pages: ps } of [...missing.values()].slice(0, 20)) {
      fail(`${u} (${what}) — referenced by ${ps.length} page${ps.length === 1 ? '' : 's'}, not built`);
    }
    if (missing.size > 20) fail(`…and ${missing.size - 20} more missing assets`);
  }
}

/* ---------- 2 · per-page SEO audit ---------- */
if (run('seo')) {
  console.log('\n2 · per-page SEO audit');
  const titles = new Map(), descs = new Map();
  /* Collected rather than warned per page. Every page is missing og:image for
     the SAME reason — business.socialImage is owed and the layout correctly
     emits nothing rather than a broken path — so 201 identical warnings would
     bury the one-off warnings this check exists to surface. One line, with
     the count and the cause. A report nobody reads is a report that does not
     exist. */
  const noOgImage = [];
  let clean = true;
  /* Duplicate H1s, from Keystone Part 9.4's sweep. Two indexable pages with the
     same H1 are two pages claiming the same query — the cannibalization smoking
     gun — and until 10 Sep 2026 nothing here looked. It found exactly one: the
     home page and /locations/bellingham/, both "Pest Control in Bellingham,
     Washington". Titles were already checked for uniqueness; H1s were not. */
  const h1Seen = new Map();
  for (const p of pages) {
    const h1s = tagsOf(p.html, 'h1').length;
    if (h1s !== 1) { fail(`${p.url} has ${h1s} H1 tags (must be exactly 1)`); clean = false; }
    if (!p.noindex && h1s === 1) {
      const h1 = decode(textOf((p.html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i) || [])[1] ?? '')).trim().toLowerCase();
      if (h1Seen.has(h1)) { fail(`duplicate H1 "${h1}": ${p.url} and ${h1Seen.get(h1)}`); clean = false; }
      else h1Seen.set(h1, p.url);
    }

    const title = decode((p.html.match(/<title[^>]*>([\s\S]*?)<\/title>/i) || [])[1] ?? '').trim();
    if (!title) { fail(`${p.url} has no <title>`); clean = false; }
    else {
      if (title.length > TITLE_MAX) { fail(`${p.url} title ${title.length} chars (max ${TITLE_MAX})`); clean = false; }
      if (titles.has(title)) { fail(`duplicate title: ${p.url} and ${titles.get(title)}`); clean = false; }
      titles.set(title, p.url);
    }

    /* THIRD PLACE, SAME BUG, 4 Sep 2026. The comment above attr() explains at
       length why `content=["']([^"']*)["']` is wrong — it opens on either
       quote and then consumes anything that is not EITHER quote, so it
       truncates at the first apostrophe inside a double-quoted attribute. That
       comment ends "Same lesson, second place."

       This line was the third place, and it was never fixed. attr() got the
       backreference; check 2 kept its own private copy of the broken regex and
       has been mis-measuring every description containing an apostrophe ever
       since — reading "Homestead — golf-course lots on Lynden" out of a
       perfectly good 152-character sentence and then failing the page twice,
       once for length and once for ending mid-word.

       Nobody noticed because no description on the site had an apostrophe in
       it. That is not a coincidence: writers hit this, could not see why a
       good sentence failed, and quietly rewrote around it. A broken check does
       not announce itself — it just bends the work.

       Use attr() rather than a fourth copy of the pattern. If a fifth place
       ever needs an attribute out of a tag, use attr() too. */
    const metaDesc = tagsOf(p.html, 'meta').find((t) => attr(t, 'name') === 'description');
    const d = (metaDesc && attr(metaDesc, 'content')?.trim()) || null;
    if (!d) { fail(`${p.url} has no meta description`); clean = false; }
    else {
      if (d.length < DESC_MIN || d.length > DESC_MAX) { fail(`${p.url} description ${d.length} chars (${DESC_MIN}–${DESC_MAX})`); clean = false; }
      if (!/[.!?]$/.test(d.trim())) { fail(`${p.url} description does not end on punctuation (mid-word cut)`); clean = false; }
      if (descs.has(d)) { fail(`duplicate description: ${p.url} and ${descs.get(d)}`); clean = false; }
      descs.set(d, p.url);
    }

    for (const img of tagsOf(p.html, 'img')) {
      const alt = attr(img, 'alt');
      if (alt === undefined || !alt.trim()) { fail(`${p.url} has an <img> with no alt`); clean = false; }
      else if (/needs review|placeholder|^step \d|^image\d*$|^untitled/i.test(alt)) {
        fail(`${p.url} placeholder alt shipped: "${alt}"`); clean = false;
      }
    }

    if (!/rel=["']canonical["']/i.test(p.html)) { fail(`${p.url} missing canonical`); clean = false; }
    if (!/property=["']og:image["']/i.test(p.html)) noOgImage.push(p.url);
    if (/\.jpg["'][^>]*>\s*<\/picture>/i.test(p.html)) warn(`${p.url} leftover .jpg reference`);

    /* exactly one JSON-LD emitter */
    const ld = (p.html.match(/<script[^>]*application\/ld\+json/gi) || []).length;
    if (ld === 0) { fail(`${p.url} emits no JSON-LD`); clean = false; }
    if (ld > 1) { fail(`${p.url} emits ${ld} JSON-LD blocks (must be exactly 1)`); clean = false; }

    /* unreplaced template tokens — the live-site defect this build must never repeat */
    const tok = p.html.match(/\[(company|phone|city|service|state)\]|\{\{[^}]+\}\}/gi);
    if (tok) { fail(`${p.url} unreplaced token(s): ${[...new Set(tok)].join(', ')}`); clean = false; }
  }
  if (noOgImage.length) {
    if (noOgImage.length === pages.length) {
      warn(
        `no page emits og:image — business.socialImage is PENDING, so the layout ` +
        `emits nothing rather than a path that 404s. See \`npm run pending\`.`,
      );
    } else {
      for (const u of noOgImage.slice(0, 10)) warn(`${u} missing og:image`);
      if (noOgImage.length > 10) warn(`…and ${noOgImage.length - 10} more pages missing og:image`);
    }
  }

  if (clean) ok('titles, descriptions, H1s, alt text, canonicals and JSON-LD all pass');
}

/* ---------- 2b · price-drift check ---------- */
if (run('prices')) {
  console.log('\n2b · price-drift check');
  /* Every dollar figure rendered anywhere must appear in business.ts pricing.
     A price changed in the data file but left stale in a page body is a
     published commitment the business no longer honors. */
  const biz = fs.readFileSync('src/data/business.ts', 'utf8');
  const approved = new Set(
    [...biz.matchAll(/(?:bedBugVerification|bedBugPerRoom|referralCredit):\s*(\d+)/g)].map((m) => m[1]),
  );
  if (!approved.size) { warn('no pricing block found in business.ts — skipping'); }
  else {
    let stale = 0;
    for (const p of pages) {
      for (const m of textOf(p.html).matchAll(/\$(\d[\d,]*)/g)) {
        const n = m[1].replace(/,/g, '');
        if (!approved.has(n)) { fail(`${p.url} renders $${m[1]}, which is not in business.ts pricing`); stale++; }
      }
    }
    if (!stale) ok(`every published figure matches business.ts (${[...approved].map((n) => '$' + n).join(', ')})`);
  }
}

/* ---------- 2c · credential & claim rules ---------- */
if (run('claims')) {
  console.log('\n2c · credential & claim rules');
  /* Mirrors INSPECTION_CLAIMS / FORBIDDEN_WARRANTY in src/lib/seo.ts. The rule
     lives in code there for authoring; this enforces it on built output, which
     is what the public actually sees.

     Keystone Part 14: "If the operator holds a treatment license but not an
     inspector credential, no inspection pages or implied inspection authority
     anywhere, including in FAQs. Encode it as a content rule, not a one-off." */
  const biz = fs.readFileSync('src/data/business.ts', 'utf8');

  /* POSITIVE MATCH, NOT NEGATIVE — and this line has already failed once.
     -----------------------------------------------------------------------
     It used to read `!/structuralPestInspector:\s*PENDING/`, i.e. "we may
     claim inspection authority unless the field literally says PENDING".
     That is a default-open rule wearing the costume of a default-closed one,
     and on 2 Sep 2026 it did exactly what a default-open rule always
     eventually does. The sentinel on those two fields changed from PENDING to
     NOT_HELD — a change meaning "we will NEVER hold this" — and because
     NOT_HELD is not the string PENDING, this check silently decided
     inspection claims were permitted and stopped enforcing the rule sitewide.
     One harness run reported "inspector credential is set — inspection claims
     permitted" on a company that holds no inspector credential at all.

     Now it matches what a HELD credential looks like: the field assigned a
     quoted string. Anything else — PENDING, NOT_HELD, a sentinel nobody has
     invented yet, a typo — leaves the rule ON. A guard that fails closed is
     worth more than one that reads elegantly.

     The deeper defect is that this re-derives state from business.ts by
     regex, which makes it a second source of truth for something the data
     file already knows via `isReady`. It stays a regex because the harness
     reads built output and must not import the app, but see
     scripts/tests/inspection-claims.test.ts, which now pins this behavior so
     the next sentinel change cannot repeat this quietly. */
  const heldCredential = (field) =>
    new RegExp(`${field}:\\s*'[^']+'`).test(biz);
  const canInspect =
    heldCredential('structuralPestInspector') && heldCredential('inspectionCompany');

  /* Mirrors INSPECTION_CLAIMS in src/lib/seo.ts. These are the REGULATED terms
     describing a WSDA structural pest / wood-destroying-organism inspection.
     A general "free inspection" offer is NOT here — it is the owner's confirmed
     policy and asserts no WDO authority. Its exception list is checked below. */
  const INSPECTION_CLAIMS = [
    'wdo inspection',
    'wood destroying organism inspection', 'wood-destroying organism inspection',
    'structural pest inspection', 'escrow inspection', 'real estate inspection',
    'inspection report',
  ];

  /* IDENTIFY vs TREAT (owner clarification 30 Aug 2026). We are not structural
     pest inspectors, but we ARE certified to treat WDO findings. So a regulated
     term is permitted in a sentence that either disclaims in the first person,
     or attributes the inspection to somebody else WITHOUT also claiming we
     performed it. Attribution alone is not enough — that second condition is
     what keeps this from becoming a loophole.
     Mirrors CLAIM_* in src/lib/seo.ts. Change both or neither. */
  const CLAIM_DISCLAIMER =
    /\b(we|sasquatch)\b[^.?!]{0,60}\b(are not|aren't|is not|isn't|do not|don't|does not|doesn't|cannot|can't|never|no longer)\b/i;
  const CLAIM_ATTRIBUTION =
    /\b(your|my|their|its|his|her|the buyer'?s?|the seller'?s?|the lender'?s?|a licensed|another|third[- ]party|someone else'?s?|somebody else'?s?|independent|outside)\b[^.?!]{0,60}\b(inspector|inspection|report)\b|\binspector'?s\b/i;
  const CLAIM_SOLICITATION =
    /\b(call|contact|text|phone|schedule|book|request|order|get)\b[^.?!]{0,40}\b(us|sasquatch|today|now|yours?|an appointment|scheduled|booked)\b/i;
  /* Any first-person reference to us. A sentence with none of these is not
     claiming anything about Sasquatch — see the descriptive condition below. */
  const CLAIM_FIRST_PERSON = /\b(we|we'?re|we'?ve|us|our|ours|sasquatch)\b/i;
  const CLAIM_PERFORMANCE =
    /\b(we|our|sasquatch)\b[^.?!]{0,80}\b(perform|performs|performed|provide|provides|provided|offer|offers|offered|conduct|conducts|conducted|complete|completes|completed|carry out|issue|issues|issued|write|writes|wrote|prepare|prepares|prepared|supply|supplies|supplied|handle|handles)\b/i;
  const sentencesOf = (t) => t.split(/(?<=[.?!])\s+|\n+/).filter((s) => s.trim());

  /* Services that must NEVER offer a free inspection. Read from business.ts so
     the page copy and the policy cannot drift apart. */
  const noFreeInspection = [...biz.matchAll(/exceptions:\s*\[([^\]]*)\]/g)]
    .flatMap((m) => [...m[1].matchAll(/'([^']+)'/g)].map((x) => x[1]));
  /* WDO findings-report rule — mirrors checkWdoFindingsReports() in
     src/lib/seo.ts. Change both or neither.

     SOURCE: WAC 16-228-2045 (read 31 Aug 2026). A report identifying damage
     or infestation by wood destroying organisms must be a complete WDO
     inspection report, with a WSDA Inspection Control Number under
     RCW 15.58.450, the inspector's WSDA license number, diagrams and a list
     of excluded areas. Offering the customer a written account of what we
     found in their timber is therefore a regulated act, whatever the page
     calls the document. Promising a record of the TREATMENT is not.

     The identify-vs-treat rules above police the regulated WORDS. This one
     polices the regulated ACT described in plain English, which is how a
     bad sentence got published on 31 Aug 2026 with every other check green. */
  const WDO_SUBJECT =
    /\b(wood[- ]destroying|wdo|termite|termites|carpenter ant|carpenter ants|wood[- ]boring beetle|powderpost|powder[- ]post|dampwood|drywood)\b/i;
  /* Both patterns carry a SECOND ordering, added 2 Sep 2026 after a second
     live miss. The first version required the actor before the noun ("we give
     you a report"); the sentence that got through was "The report you get says
     which of those is driving the problem", document-first with the actor
     trailing. Widened here and in src/lib/seo.ts together — these two copies
     must stay identical, and scripts/tests/wdo-findings.test.ts pins the
     semantics of the version in seo.ts. */
  const WDO_WRITTEN_OFFER =
    /(\b(we|our|sasquatch|you get|you'?ll get|you will get|we'?ll give|we will give|we give|we provide|we supply|we issue)\b[^.?!]{0,80}\b(written|in writing|document|documentation|record|report|letter|statement|paperwork)\b)|(\b(the|a|your|our)\s+(written\s+)?(document|documentation|record|report|letter|statement|paperwork|write[- ]?up)\b[^.?!]{0,60}\b(you|we|us|sasquatch)\b)/i;
  const WDO_FINDINGS_LANGUAGE =
    /(\b(what we (saw|found|observed|noted|identified)|our findings|the findings we|what was found|damage we (saw|found|observed)|conditions we (saw|found|observed)|infestation we (saw|found|observed))\b)|(\b(says|say|sets out|tells you|shows you|explains|details|lists|identifies|describes|documents)\b[^.?!]{0,40}\b(which of (those|these|them)|what is wrong|what you have|what is driving|what caused|the cause|the extent|the damage|the infestation|conducive conditions)\b)/i;
  const WDO_DENIAL =
    /\b(we|sasquatch)\b[^.?!]{0,80}\b(do not|don'?t|does not|doesn'?t|cannot|can'?t|will not|won'?t|never|not something we)\b/i;

  /* SPANISH MIRRORS of INSPECTION_CLAIMS_ES, CLAIM_*_ES and WDO_*_ES in
     src/lib/seo.ts — added 10 Sep 2026, before the first Spanish termite or
     WDO page. The reasoning (dropped subjects, \p{L} because \b splits
     accented words) is written there. Change both or neither. */
  const INSPECTION_CLAIMS_ES = [
    'inspección wdo', 'inspecciones wdo',
    'inspección de organismos que destruyen la madera',
    'inspecciones de organismos que destruyen la madera',
    'inspección de organismos destructores de madera',
    'inspección de organismos destructores de la madera',
    'inspección estructural de plagas', 'inspecciones estructurales de plagas',
    'informe de inspección', 'reporte de inspección',
    'inspección para escrow', 'inspección de escrow',
    'inspección de bienes raíces', 'inspección para la venta', 'inspección de compraventa',
  ];
  const CLAIM_DISCLAIMER_ES =
    /(^|[^\p{L}])(no|nunca)(\s+[\p{L}]+){0,3}?\s+(somos|hacemos|realizamos|emitimos|ofrecemos|presentamos|producimos|damos|entregamos|preparamos|escribimos|firmamos|tenemos|es|son|hace|realiza|emite|ofrece|produce)(?![\p{L}])/iu;
  const CLAIM_ATTRIBUTION_ES =
    /(^|[^\p{L}])(su|sus)\s+(inspector|inspectora|inspección|informe|reporte)(?![\p{L}])|(^|[^\p{L}])(inspector|inspectora)\s+(independiente|con licencia|del comprador|del vendedor|del prestamista)(?![\p{L}])|(^|[^\p{L}])(un|una|otro|otra)\s+(inspector|inspectora)(?![\p{L}])|(del comprador|del vendedor|del prestamista|de otra persona|de un tercero)(?![\p{L}])/iu;
  const CLAIM_SOLICITATION_ES =
    /(^|[^\p{L}])(llame|llámenos|llamenos|mande|escríbanos|escribanos|pida|pídanos|pidanos|agende|programe|solicite|reserve|contrate)(?![\p{L}])/iu;
  const CLAIM_FIRST_PERSON_ES =
    /(^|[^\p{L}])(nosotros|nuestro|nuestra|nuestros|nuestras|nos|sasquatch)(?![\p{L}])|[\p{L}]{2,}(amos|emos|imos)(?![\p{L}])/iu;
  const CLAIM_PERFORMANCE_ES =
    /(^|[^\p{L}])(hacemos|realizamos|ofrecemos|emitimos|entregamos|preparamos|escribimos|firmamos|completamos|proporcionamos|damos|hicimos|haremos|realizaremos|llevamos a cabo)(?![\p{L}])/iu;
  const WDO_SUBJECT_ES =
    /(organismos? que destruyen? la madera|organismos? destructores? de (la )?madera|(^|[^\p{L}])wdo(?![\p{L}])|termitas?(?![\p{L}])|hormigas? carpinteras?|escarabajos? (barrenadores?|de la madera|que perforan)|carcoma|pudrición)/iu;
  const WDO_WRITTEN_OFFER_ES =
    /((^|[^\p{L}])(le (entregamos|damos|mandamos|enviamos|dejamos)|usted recibe|va a recibir|recibirá|le llega)(?![\p{L}])[^.?!]{0,80}(por escrito|documento|registro|reporte|informe|constancia|carta))|((^|[^\p{L}])(el|un|su|nuestro)\s+(documento|registro|reporte|informe|escrito)(?![\p{L}])[^.?!]{0,60}(dice|explica|muestra|detalla|describe|documenta|identifica)(?![\p{L}]))/iu;
  const WDO_FINDINGS_ES =
    /(lo que (encontramos|vimos|observamos|identificamos|hallamos)|nuestros hallazgos|los hallazgos|qué encontramos|el daño que (encontramos|vimos)|qué (tiene|está causando|causó)|la causa(?![\p{L}])|el alcance del daño|la infestación)/iu;
  const WDO_DENIAL_ES =
    /(^|[^\p{L}])(no|nunca)(\s+[\p{L}]+){0,3}?\s+(somos|hacemos|emitimos|entregamos|damos|producimos|escribimos|firmamos|es)(?![\p{L}])/iu;
  /* PAGE_PAIRS, read as text for the same reason business.ts is: the harness
     reads built output and does not import the app. Used to find the Spanish
     twin of a service that is excepted from the free-visit offer. */
  const i18nText = fs.readFileSync('src/data/i18n.ts', 'utf8');
  const FORBIDDEN_WARRANTY = [
    'if the pests come back, we come back', 'guaranteed forever',
    'lifetime guarantee', '100% guaranteed results', 'we guarantee no pests',
  ];

  let bad = 0;
  for (const p of pages) {
    const low = textOf(p.html).toLowerCase();
    if (!canInspect) {
      for (const s of sentencesOf(sentenceTextOf(p.html))) {
        const sl = s.toLowerCase();
        const term = INSPECTION_CLAIMS.find((c) => sl.includes(c));
        if (!term) continue;
        if (CLAIM_DISCLAIMER.test(s)) continue;
        if (CLAIM_ATTRIBUTION.test(s) && !CLAIM_PERFORMANCE.test(s) && !CLAIM_SOLICITATION.test(s)) continue;
        /* THIRD CONDITION — descriptive text. A sentence making no
           first-person reference to Sasquatch is describing the regulation,
           not claiming authority under it. Needed once the guides started
           explaining the rules rather than only working within them.
           Solicitation stays a hard disqualifier: "Book a WDO inspection now"
           has no first person either, and is exactly what this rule stops. */
        if (!CLAIM_FIRST_PERSON.test(s) && !CLAIM_SOLICITATION.test(s)) continue;
        fail(`${p.url} uses "${term}" without attribution, disclaimer or descriptive framing — ${s.trim().slice(0, 110)}`);
        bad++;
      }
      /* The same rule in Spanish — mirrors INSPECTION_CLAIMS_ES and the
         CLAIM_*_ES patterns in src/lib/seo.ts, added 10 Sep 2026. Change both
         or neither; scripts/tests/inspection-claims.test.ts pins seo.ts. */
      for (const s of sentencesOf(sentenceTextOf(p.html))) {
        const sl = s.toLowerCase();
        const term = INSPECTION_CLAIMS_ES.find((c) => sl.includes(c));
        if (!term) continue;
        if (CLAIM_DISCLAIMER_ES.test(s)) continue;
        if (CLAIM_ATTRIBUTION_ES.test(s) && !CLAIM_PERFORMANCE_ES.test(s) && !CLAIM_SOLICITATION_ES.test(s)) continue;
        if (!CLAIM_FIRST_PERSON_ES.test(s) && !CLAIM_SOLICITATION_ES.test(s)) continue;
        fail(`${p.url} usa "${term}" sin atribución, negación ni marco descriptivo — ${s.trim().slice(0, 110)}`);
        bad++;
      }
    }
    /* SCOPE IS NEITHER SENTENCE NOR WHOLE PAGE — mirrors seo.ts.

       Sentence-scoped is too narrow: the sentence that prompted this rule
       ("the treatment we carried out and what we observed") carries no WDO
       vocabulary of its own and sat on a dampwood termite page.

       Whole-page-scoped is too broad: the bed bug page mentions termites once
       in passing, and that must not fail a legitimate sentence about bed bug
       service records in care settings.

       So the heading counts as subject context for the whole page, and
       otherwise a WDO term has to appear within 600 characters of the
       sentence — near enough that a reader connects the document being offered
       to the organism. */
    const headingText = ((p.html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i) || [, ''])[1] +
      ' ' + (p.html.match(/<title[^>]*>([\s\S]*?)<\/title>/i) || [, ''])[1]).replace(/<[^>]+>/g, ' ');
    const isWdo = (t) => WDO_SUBJECT.test(t) || WDO_SUBJECT_ES.test(t);
    const headingIsWdo = isWdo(headingText);
    const plain = sentenceTextOf(p.html);
    for (const s of sentencesOf(plain)) {
      const en = WDO_WRITTEN_OFFER.test(s) && WDO_FINDINGS_LANGUAGE.test(s) && !WDO_DENIAL.test(s);
      const es = WDO_WRITTEN_OFFER_ES.test(s) && WDO_FINDINGS_ES.test(s) && !WDO_DENIAL_ES.test(s);
      if (!en && !es) continue;
      if (!headingIsWdo) {
        const at = plain.indexOf(s);
        const around = plain.slice(Math.max(0, at - 600), at + s.length + 600);
        if (!isWdo(around)) continue;
      }
      fail(`${p.url} offers a written record of findings in a WDO context — that is a regulated report under WAC 16-228-2045 — ${s.trim().slice(0, 110)}`);
      bad++;
    }
    for (const w of FORBIDDEN_WARRANTY) {
      if (low.includes(w)) { fail(`${p.url} unqualified warranty language: "${w}"`); bad++; }
    }
    /* The free-inspection exception, enforced rather than trusted. */
    for (const slug of noFreeInspection) {
      if (p.url === `/services/${slug}/` && /\bfree inspection\b/.test(low)
          && !/not|except|other than|do not offer/.test(low.slice(Math.max(0, low.indexOf('free inspection') - 90), low.indexOf('free inspection')))) {
        fail(`${p.url} offers a free inspection, but ${slug} is an enumerated exception`);
        bad++;
      }
      /* …and on its Spanish twin, read from the PAGE_PAIRS text in i18n.ts. */
      const esPath = (i18nText.match(new RegExp(`'/services/${slug}/':\\s*'([^']+)'`)) || [])[1];
      const offer = /(inspección|visita|revisión) (gratuita|gratis|sin costo)/;
      if (esPath && p.url === esPath && offer.test(low)) {
        const i = low.search(offer);
        if (!/(no|salvo|excepto|menos|excepción)/.test(low.slice(Math.max(0, i - 90), i))) {
          fail(`${p.url} ofrece una visita gratuita, pero ${slug} es una excepción enumerada`);
          bad++;
        }
      }
    }
  }
  if (!bad) {
    ok(canInspect
      ? 'inspector credential is set — inspection claims permitted; no unqualified warranty language'
      : 'WDO treatment copy attributed correctly; no inspection-authority claims; no WDO findings reports offered; no unqualified warranty language');
  }
}

/* ---------- 2d · JSON-LD graph integrity ---------- */
if (run('graph')) {
  console.log('\n2d · JSON-LD graph integrity');
  /* WHAT THIS COVERS, AND WHAT IT DOES NOT — the rule from 1b, applied here.
     -----------------------------------------------------------------------
     Check 2 already counts the JSON-LD blocks and fails on zero or two. It
     never opens one. So until now nothing in this build had confirmed that the
     graph PARSES, let alone that its internal references resolve — and the
     graph is now around 120 @id-anchored nodes and 35 cross-references per
     page, well past the size where a person can eyeball it.

     A dangling @id is the classic failure of a graph this size and it is
     invisible: the page renders, the markup is valid JSON, and a consumer
     silently drops half the relationships. src/lib/schema.ts exports
     validateGraph() with exactly this logic for authoring; this runs the same
     rules over what actually shipped.

     COVERED: JSON parses; there is an @graph array; every top-level node
     carries an @id; no @id is defined twice anywhere in the document, nested
     definitions included; every bare {"@id": …} reference resolves to a
     definition in the SAME page's graph; every on-site url/item/contentUrl in
     the graph resolves to a built page.

     NOT COVERED: whether the types are the right types, whether a property
     belongs on the type it is attached to, or anything Google's Rich Results
     Test would say. This is referential integrity, not validation. It also
     does not compare graphs BETWEEN pages, so a sitewide node that changed
     shape on one page would pass here.

     The re-implementation in plain JS is deliberate and follows the precedent
     set by 2c: the harness reads built output and must not import the app. */
  const ORIGIN = /^https?:\/\/(www\.)?sasquatchpestcontrol\.com/i;
  const builtPages = new Set(pages.map((p) => p.url));
  /* Astro writes the 404 route to /404.html while the page correctly
     canonicals itself as /404/. Same accommodation the UTILITY set makes. */
  if (builtPages.has('/404.html')) builtPages.add('/404/');

  let bad = 0;
  for (const p of pages) {
    const blocks = [...p.html.matchAll(/<script[^>]*application\/ld\+json[^>]*>([\s\S]*?)<\/script>/gi)];
    if (blocks.length !== 1) continue;               // check 2 already failed this page
    let graph;
    try {
      graph = JSON.parse(blocks[0][1]);
    } catch (e) {
      fail(`${p.url} JSON-LD does not parse — ${e.message}`);
      bad++;
      continue;
    }
    const nodes = graph['@graph'];
    if (!Array.isArray(nodes)) { fail(`${p.url} JSON-LD has no @graph array`); bad++; continue; }

    const ids = new Set(), refs = new Set(), dupes = new Set(), urls = new Set();
    /* A node is DEFINED where @id appears with anything alongside it, and
       REFERENCED where @id stands alone. Definitions nest legitimately — the
       Service nodes live inside hasOfferCatalog and the species DefinedTerms
       inside knowsAbout — so this walks the whole document rather than the top
       level only. Collecting definitions from the top level alone would report
       every reference to those as dangling, i.e. fail on a correct graph. */
    const walkNode = (v) => {
      if (Array.isArray(v)) return v.forEach(walkNode);
      if (!v || typeof v !== 'object') return;
      const id = v['@id'];
      if (typeof id === 'string') {
        if (Object.keys(v).length === 1) { refs.add(id); return; }
        if (ids.has(id)) dupes.add(id);
        ids.add(id);
      }
      for (const [k, val] of Object.entries(v)) {
        if ((k === 'url' || k === 'item' || k === 'contentUrl') && typeof val === 'string') urls.add(val);
        else walkNode(val);
      }
    };
    for (const n of nodes) {
      if (!n || typeof n !== 'object' || !n['@id']) {
        fail(`${p.url} top-level node ${JSON.stringify(n?.['@type'] ?? n)} has no @id`);
        bad++;
      }
    }
    walkNode(nodes);

    for (const d of dupes) { fail(`${p.url} duplicate @id: ${d}`); bad++; }
    for (const r of refs) if (!ids.has(r)) { fail(`${p.url} dangling @id reference: ${r}`); bad++; }
    /* Our own URLs inside the graph have to be pages we built. This is the
       reference class check 1 and 1b both miss — 1 walks anchors, 1b walks
       images — and it is what keeps knowsAbout honest: every species term
       carries the URL of the profile that backs it, so a species added to
       pests.ts with no profile written fails here rather than publishing a
       topical claim pointing at nothing. */
    for (const u of urls) {
      if (!ORIGIN.test(u)) continue;
      const raw = u.replace(ORIGIN, '') || '/';
      if (/\.(png|jpe?g|gif|svg|webp|avif|ico|pdf)$/i.test(raw)) continue;   // 1b's job
      const target = raw.endsWith('/') ? raw : raw + '/';
      if (!builtPages.has(target)) { fail(`${p.url} JSON-LD url ${raw} has no built page`); bad++; }
    }
  }
  if (!bad) ok('every @id resolves, no node declared twice, every on-site graph URL is a built page');
}

/* ---------- 3 · duplicate-sentence scanner ---------- */
if (run('dupes')) {
  console.log('\n3 · duplicate-sentence scanner');
  const seen = new Map();
  for (const p of indexable) {
    const sentences = textOf(p.html)
      .split(/(?<=[.!?])\s+/)
      .map((s) => s.trim())
      .filter((s) => wordsIn(s) >= 10);
    for (const s of new Set(sentences)) {
      if (!seen.has(s)) seen.set(s, []);
      seen.get(s).push(p.url);
    }
  }
  const offenders = [...seen.entries()].filter(([, u]) => u.length >= 3);
  if (!offenders.length) ok('no 10+ word sentence appears on 3 or more pages');
  else {
    for (const [s, urls] of offenders.slice(0, 25)) {
      fail(`on ${urls.length} pages: "${s.slice(0, 90)}${s.length > 90 ? '…' : ''}"`);
    }
    if (offenders.length > 25) fail(`…and ${offenders.length - 25} more duplicated sentences`);
  }
}

/* ---------- 3b · sibling duplicate scanner (v2 substance gate, item 4) ---------- */
if (run('siblings')) {
  console.log('\n3b · sibling duplicate scanner (v2 substance gate)');
  /* v2 tightened the duplicate rule for the substance gate from "a sentence on
     3+ pages" to "a sentence on 2+ SIBLING pages inside the same cluster".
     Check 3 still runs the sitewide 3+ rule; this is the stricter one, scoped
     to where near-duplication actually costs something — two neighborhood
     pages in one town, two service spokes, two species profiles.

     A cluster is a URL's parent path, so /locations/lynden/<n>/ pages are
     siblings of each other and /services/<s>/ pages are siblings of each
     other. Hubs and the home page have no siblings in this sense.

     SENTENCES ARE SPLIT AT BLOCK EDGES, not only at punctuation. textOf runs a
     heading straight into the paragraph under it with no full stop between,
     so a four-word H2 plus a seven-word lead-in reads as one eleven-word
     "sentence" and two pages that share only a heading and a list label look
     duplicated. That is a measurement fault, not a finding. Boilerplate,
     nav, header and footer are removed BEFORE block edges are marked, because
     sentenceTextOf rewrites opening tags first and would otherwise break the
     data-boilerplate strip — which is why this does not just call it. */
  const stripChrome = (html) =>
    html
      .replace(/<script[\s\S]*?<\/script>/gi, ' ')
      .replace(/<style[\s\S]*?<\/style>/gi, ' ')
      .replace(/<nav[\s\S]*?<\/nav>/gi, ' ')
      .replace(/<footer[\s\S]*?<\/footer>/gi, ' ')
      .replace(/<header[\s\S]*?<\/header>/gi, ' ')
      .replace(/<([a-z]+)[^>]*\sdata-boilerplate\b[^>]*>[\s\S]*?<\/\1>/gi, ' ');
  const parentOf = (url) => {
    const seg = url.split('/').filter(Boolean);
    return seg.length >= 1 ? '/' + seg.slice(0, -1).map((x) => x + '/').join('') : null;
  };
  const byCluster = new Map();
  for (const p of indexable) {
    if (UTILITY.has(p.url)) continue;
    const cluster = parentOf(p.url);
    if (!cluster) continue;
    const sentences = sentenceTextOf(stripChrome(p.html))
      .split(/(?<=[.!?])\s+/)
      .map((x) => x.replace(/^[.\s]+/, '').trim())
      .filter((x) => wordsIn(x) >= 10);
    for (const sen of new Set(sentences)) {
      const key = `${cluster}\u0000${sen}`;
      if (!byCluster.has(key)) byCluster.set(key, []);
      byCluster.get(key).push(p.url);
    }
  }
  const shared = [...byCluster.entries()].filter(([, u]) => u.length >= 2);
  if (!shared.length) ok('no 10+ word sentence is shared by two sibling pages');
  else {
    for (const [key, urls] of shared.slice(0, 40)) {
      const sen = key.split('\u0000')[1];
      fail(`siblings ${urls.join(' + ')}: "${sen.slice(0, 90)}${sen.length > 90 ? '…' : ''}"`);
    }
    if (shared.length > 40) fail(`…and ${shared.length - 40} more sentences shared between siblings`);
  }
}

/* ---------- 4 · word-band auditor (v2 M1 — diagnostic, never a gate) ---------- */
if (run('words')) {
  console.log('\n4 · word-band auditor (v2 M1 — diagnostic only)');
  const byType = new Map();
  const unbanded = [];
  const exempt = [];
  for (const p of indexable) {
    const words = textOf(p.html).split(/\s+/).filter(Boolean).length;
    if (UTILITY.has(p.url)) { exempt.push(`${p.url} (${words}w)`); continue; }
    const type = pageType(p.url);
    if (!type) { unbanded.push(`${p.url} (${words}w)`); continue; }
    const band = BANDS[type];
    const row = byType.get(type) ?? { n: 0, below: 0, inside: 0, above: 0, words: [] };
    row.n++; row.words.push(words);
    if (words < band.min) {
      row.below++;
      warn(`${p.url} — ${words} words, under the ${band.label} band (${band.min}–${band.max}): thin`);
    } else if (words > band.max) row.above++;
    else row.inside++;
    const m = SERP_MEDIAN[p.url];
    if (m && words > 2 * m.median) {
      warn(`${p.url} — ${words} words is over twice the measured SERP median (${m.median}, "${m.query}", ${m.measuredOn}): padded`);
    }
    byType.set(type, row);
  }
  if (exempt.length) console.log(`  \x1b[2mno band (utility pages): ${exempt.join(', ')}\x1b[0m`);
  if (unbanded.length) console.log(`  \x1b[2mno v2 page type fits, so no band: ${unbanded.join(', ')}\x1b[0m`);
  for (const [type, r] of [...byType.entries()].sort((a, b) => b[1].n - a[1].n)) {
    const b = BANDS[type];
    const med = r.words.sort((x, y) => x - y)[r.words.length >> 1];
    console.log(
      `  \x1b[2m${b.label.padEnd(22)} ${String(r.n).padStart(3)} pages · band ${b.min}–${b.max} · median ${med}` +
      ` · ${r.inside} inside, ${r.above} above, ${r.below} under\x1b[0m`,
    );
  }
  const measured = Object.keys(SERP_MEDIAN).length;
  console.log(
    `  \x1b[2mpadding is only asserted against a measured SERP median; ${measured} page${measured === 1 ? '' : 's'} measured.\x1b[0m`,
  );
}

/* ---------- 5 · structural performance (v2 lab-gate preconditions) ---------- */
if (run('perf')) {
  console.log('\n5 · structural performance (v2 Part 9.1 preconditions)');
  /* v2's performance gate is a LAB measurement — LCP ≤ 2.0s, TBT ≤ 200ms,
     CLS ≤ 0.05, score ≥ 90, median of five mobile Lighthouse runs — and a
     static file cannot answer it. That is scripts/lab-gate.mjs. What CAN be
     read from built HTML are the structural conditions v2 attaches to it, and
     each one here is binary:

       · the HTML document is under 2MB (Googlebot truncates past it);
       · the page's own JavaScript is under 300KB;
       · every image in <main> declares width and height, or an aspect-ratio,
         so nothing shifts when it arrives;
       · at most one image asks for fetchpriority="high", and that one is not
         also lazy — two "highest priority" images is none.

     And one warning, because it is a heuristic: a first image that sits in
     the opening 150 words of <main> is very probably the LCP element, and v2
     wants the LCP element eager with fetchpriority="high". The lab gate is
     what settles it. External scripts are listed, not summed — their weight
     lives on somebody else's server and has to be measured there. */
  const MAX_HTML = 2 * 1024 * 1024, MAX_JS = 300 * 1024;
  const external = new Set();
  let clean = true;
  for (const p of pages) {
    if (Buffer.byteLength(p.html) > MAX_HTML) { fail(`${p.url} HTML is ${Buffer.byteLength(p.html)} bytes (max 2MB)`); clean = false; }

    let js = 0;
    for (const m of p.html.matchAll(/<script\b[^>]*\ssrc=(["'])([^"']+)\1[^>]*>/gi)) {
      const src = m[2];
      if (/^(https?:)?\/\//i.test(src)) { external.add(src); continue; }
      const f = path.join(DIR, src.split(/[?#]/)[0]);
      if (fs.existsSync(f)) js += fs.statSync(f).size;
    }
    for (const m of p.html.matchAll(/<script\b(?![^>]*application\/ld\+json)(?![^>]*\ssrc=)[^>]*>([\s\S]*?)<\/script>/gi)) js += Buffer.byteLength(m[1]);
    if (js > MAX_JS) { fail(`${p.url} ships ${js} bytes of its own JavaScript (max 300KB)`); clean = false; }

    const main = (p.html.match(/<main\b[\s\S]*<\/main>/i) || [''])[0];
    const imgs = tagsOf(main, 'img');
    for (const t of imgs) {
      if (!((attr(t, 'width') && attr(t, 'height')) || /aspect-ratio/i.test(t))) {
        fail(`${p.url} <img src="${attr(t, 'src')}"> has no width/height or aspect-ratio`); clean = false;
      }
    }
    const high = tagsOf(p.html, 'img').filter((t) => attr(t, 'fetchpriority') === 'high');
    if (high.length > 1) { fail(`${p.url} has ${high.length} images at fetchpriority="high" (max 1)`); clean = false; }
    for (const t of high) if (attr(t, 'loading') === 'lazy') { fail(`${p.url} image is both fetchpriority="high" and lazy`); clean = false; }

    /* Likely-LCP image, by position. The first version of this warned on any
       lazy image within the first 150 words of <main>. The lab gate showed that
       was wrong for this site: with an H1 and a 40–60 word Quick Answer ahead
       of it, the photo below is NOT the LCP element — the answer paragraph is —
       and giving that photo high priority only slowed the paragraph. So the
       signal now is structural and narrow: an image that comes before the
       page's first paragraph is the hero, and a hero must not be lazy. */
    if (imgs.length) {
      const i = main.search(/<img\b/i);
      const firstP = main.search(/<p\b/i);
      if ((firstP === -1 || i < firstP) && attr(imgs[0], 'loading') === 'lazy') {
        warn(`${p.url} first image renders before any paragraph and is lazy — it is the hero, and probably the LCP element`);
      }
    }
  }
  if (external.size) console.log(`  \x1b[2mexternal scripts (weight measured at the source, not here): ${[...external].join(', ')}\x1b[0m`);
  if (clean) ok('HTML under 2MB, own JS under 300KB, every image sized, at most one high-priority image');
}

/* ---------- 6 · conversion contract (v2 Part 4A) ---------- */
if (run('convert')) {
  console.log('\n6 · conversion contract (v2 Part 4A)');
  /* Part 4A.2: "The phone number is a real tel: link everywhere it appears,
     including the footer NAP." Six pages failed this when v2 arrived, all
     because a sentence stored as data rendered as one text node —
     src/components/PhoneText.astro is the fix and carries the history.

     The number is read from business.ts rather than typed here, for the same
     reason 2c reads its credentials from there: a second copy of a fact is a
     second place for it to be wrong. Every digit grouping the site writes is
     matched — 360-410-2199, (360) 410-2199, 360.410.2199.

     Part 4A.3 is also checked: the LocalBusiness telephone must BE the
     number the site displays. A tracking number in the schema node is the
     NAP break v2 names outright. What cannot be checked here is whether that
     number is the one on the Google Business Profile — that is recorded as an
     owner confirmation in GUARDRAILS.md and in `npm run pending`.

     NOT COVERED: the first-touch form's field count (≤ 5). The form is the
     GoHighLevel embed inside an iframe, so its fields are not in our HTML.
     It is the owner's form, which is exactly what 4A.2 asks for on a static
     build; its length is a GHL setting and is noted in GUARDRAILS.md. */
  const biz = fs.readFileSync('src/data/business.ts', 'utf8');
  const phone = (biz.match(/\bphone:\s*'([^']+)'/) || [])[1];
  let clean = true;
  if (!phone) { fail('could not read business.phone from business.ts'); clean = false; }
  else {
    const d = phone.replace(/\D/g, '');
    const rx = new RegExp(String.raw`\(?${d.slice(0, 3)}\)?[-. ]?${d.slice(3, 6)}[-. ]?${d.slice(6)}`);
    for (const p of pages) {
      const body = p.html
        .replace(/<head[\s\S]*?<\/head>/i, ' ')
        .replace(/<script[\s\S]*?<\/script>/gi, ' ')
        .replace(/<a\b[^>]*href=(["'])tel:[^"']*\1[^>]*>[\s\S]*?<\/a>/gi, ' ');
      if (rx.test(textOf(body))) { fail(`${p.url} shows ${phone} as plain text — it must be a tel: link`); clean = false; }
      const tel = (p.html.match(/"telephone"\s*:\s*"([^"]+)"/) || [])[1];
      if (tel && tel.replace(/\D/g, '').slice(-10) !== d.slice(-10)) {
        fail(`${p.url} schema telephone ${tel} is not the displayed number ${phone} (Part 4A.3)`); clean = false;
      }
    }
  }
  if (clean) ok(`${phone} is a tel: link everywhere it appears, and the schema telephone matches it`);

  /* 6b · EVERY SAME-PAGE ANCHOR LANDS, added 10 Sep 2026. The sticky mobile
     bar's second button is href="#lead-form" on every page, and twenty-eight
     pages had no element with that id: all twenty-seven Spanish pages without
     a form, and /trusted-partners/. On a phone that is the primary action
     doing nothing at all — the worst kind of dead control, because it looks
     like it worked. The dead-link crawler (check 1) resolves paths and never
     looked at fragments. This does, for every href="#…" on every page. */
  let anchorsOk = true;
  for (const p of pages) {
    const ids = new Set([...p.html.matchAll(/\sid=(["'])([^"']+)\1/g)].map((m) => m[2]));
    for (const m of p.html.matchAll(/\shref=(["'])#([^"']+)\1/g)) {
      if (!ids.has(decodeURIComponent(m[2]))) {
        fail(`${p.url} links to #${m[2]}, which is not an id on that page`); anchorsOk = false;
      }
    }
  }
  if (anchorsOk) ok('every same-page #anchor lands on an element that exists');

  /* 6c · A SPANISH PAGE IS SPANISH ALL THE WAY DOWN, added 10 Sep 2026.
     Twenty-nine Spanish pages shipped with an English footer, an English
     "Call now" bar, an English FAQ heading and WebPage.inLanguage "en-US" —
     every one of them chrome, rendered by a component that had never been
     told a Spanish page existed. The body copy was checked; the furniture
     around it was not.

     What this catches: the English UI strings those components render,
     appearing in the visible text of any /es/ page, and a Spanish page whose
     graph declares itself English. Text inside an element marked lang="en"
     is skipped — a cited English publication title is correctly English.
     What it does NOT catch: an English sentence nobody put on this list. It
     is a regression test for the chrome, not a language detector. */
  const EN_CHROME = [
    'Frequently asked questions', 'Call now', 'Free inspection', 'Free estimate',
    'Request a free', 'Form not loading', 'Google reviews', 'WSDA-licensed applicators',
    'All services', 'All areas', 'What we apply', 'Our network', 'Trusted partners',
    'Guarantee & terms', 'Awards & press', 'Service areas', 'Skip to content',
    'as of ', 'Rated ', 'Sources', 'Hours', 'Contact actions', 'Breadcrumb',
  ];
  let esOk = true;
  for (const p of pages.filter((x) => isSpanish(x.url))) {
    const visible = textOf(
      p.html
        .replace(/<head[\s\S]*?<\/head>/i, ' ')
        .replace(/<(\w+)\b[^>]*\slang=(["'])en[^"']*\2[^>]*>[\s\S]*?<\/\1>/gi, ' '),
    );
    const attrs = [...p.html.matchAll(/\s(?:aria-label|alt|title)=(["'])([^"']*)\1/g)].map((m) => m[2]).join(' | ');
    const hay = `${visible} | ${attrs}`.replace(/&amp;/g, '&');
    for (const s of EN_CHROME) {
      if (hay.includes(s)) { fail(`${p.url} shows English interface text "${s.trim()}"`); esOk = false; }
    }
    if (/"@type":"WebPage"[^{}]*"inLanguage":"en-US"|"inLanguage":"en-US"[^{}]*"@type":"WebPage"/.test(p.html)) {
      fail(`${p.url} declares WebPage inLanguage en-US`); esOk = false;
    }
  }
  if (esOk) ok('no English interface text on any Spanish page, and every Spanish WebPage declares es-US');
}

/* ---------- summary ---------- */
console.log(`\n${'─'.repeat(58)}`);
console.log(`${failures} failure${failures === 1 ? '' : 's'}, ${warnings} warning${warnings === 1 ? '' : 's'}`);
if (failures) {
  console.log('\x1b[31mACCEPTANCE GATE: FAILED\x1b[0m — nothing publishes until this is clean.\n');
  process.exit(1);
}
console.log('\x1b[32mACCEPTANCE GATE: PASSED\x1b[0m\n');
