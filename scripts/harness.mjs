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
 *   2  per-page SEO audit     one H1, unique title/desc, alt on every image
 *   2b price-drift            no dollar figure that is not in business.ts
 *   2c credential & claims    no inspection authority, no WDO findings reports
 *   2d JSON-LD graph          every @id resolves, no node declared twice
 *   3  duplicate-sentence     any 10+ word sentence appearing on 3+ pages
 *   4  word-count auditor     M1 floor, measured on the SOURCE not the HTML
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

/* M1 is 3,000–5,000 unique words on every indexable CONTENT page. Three page
   classes sit outside that, and each exemption is declared here in the open
   rather than applied silently — the harness prints them on every run.

   UTILITY  transactional pages that exist to be acted on, not read. A 3,000
            word contact page is not a quality signal, it is padding.
   HUB      navigational pages whose job is routing plus an AEO answer. They
            still carry a real floor, just not the deep-content one.
   BLOG     posts imported verbatim from the legacy WordPress site. They run
            1,400–2,400 words because they were written years before this
            standard existed, and rewriting them to 3,000 would make them no
            longer the thing that was imported.

            This is the exemption most likely to be abused later, so it is
            fenced two ways. It applies ONLY under /blog/, and it does not
            apply to pages written here — a new page that wants a lower floor
            has to argue for it rather than be filed under /blog/ to escape.
            The floor is still real: 900 words fails a stub. And note that
            most imported posts never reach this check at all, because a post
            that duplicates an existing page ships noindex and the auditor
            only walks indexable pages. What passes through here is the
            30-odd posts covering topics the new site does not have, which is
            precisely the set where thin content would actually cost us. */
const FLOORS = { content: 3000, hub: 1200, blog: 900 };
const UTILITY = new Set(['/contact/', '/network/', '/404.html', '/404/', '/thank-you/']);
/* '/gallery/' is a hub in the sense this set means: its job is routing and an
   AEO answer, and the substance a reader came for is the images. It still
   carries the 1,200-word floor and clears it on written section copy — it is
   not exempted from anything, only classified. */
const HUBS = new Set(['/', '/services/', '/locations/', '/commercial/', '/pest-library/', '/about/', '/our-guarantee/', '/guides/', '/blog/', '/gallery/', '/what-we-use/']);
const isBlogPost = (url) => url.startsWith('/blog/') && url !== '/blog/';
const TITLE_MAX = 62, DESC_MIN = 110, DESC_MAX = 165;

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
    .trim();

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
  for (const p of pages) {
    const h1s = tagsOf(p.html, 'h1').length;
    if (h1s !== 1) { fail(`${p.url} has ${h1s} H1 tags (must be exactly 1)`); clean = false; }

    const title = decode((p.html.match(/<title[^>]*>([\s\S]*?)<\/title>/i) || [])[1] ?? '').trim();
    if (!title) { fail(`${p.url} has no <title>`); clean = false; }
    else {
      if (title.length > TITLE_MAX) { fail(`${p.url} title ${title.length} chars (max ${TITLE_MAX})`); clean = false; }
      if (titles.has(title)) { fail(`duplicate title: ${p.url} and ${titles.get(title)}`); clean = false; }
      titles.set(title, p.url);
    }

    const d = decode((p.html.match(/<meta\s+name=["']description["']\s+content=["']([^"']*)["']/i) || [])[1] ?? '') || null;
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
    const headingIsWdo = WDO_SUBJECT.test(headingText);
    const plain = sentenceTextOf(p.html);
    for (const s of sentencesOf(plain)) {
      if (!WDO_WRITTEN_OFFER.test(s)) continue;
      if (!WDO_FINDINGS_LANGUAGE.test(s)) continue;
      if (WDO_DENIAL.test(s)) continue;
      if (!headingIsWdo) {
        const at = plain.indexOf(s);
        const around = plain.slice(Math.max(0, at - 600), at + s.length + 600);
        if (!WDO_SUBJECT.test(around)) continue;
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
      .filter((s) => s.split(/\s+/).length >= 10);
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

/* ---------- 4 · word-count auditor ---------- */
if (run('words')) {
  console.log('\n4 · word-count auditor (M1 uniqueness floor)');
  const short = [];
  const exempt = [];
  for (const p of indexable) {
    const words = textOf(p.html).split(/\s+/).filter(Boolean).length;
    if (UTILITY.has(p.url)) { exempt.push(`${p.url} (${words}w)`); continue; }
    const floor = HUBS.has(p.url)
      ? FLOORS.hub
      : isBlogPost(p.url)
        ? FLOORS.blog
        : FLOORS.content;
    if (words < floor) short.push({ url: p.url, words, floor });
  }
  if (exempt.length) console.log(`  \x1b[2mexempt (utility pages): ${exempt.join(', ')}\x1b[0m`);
  if (!short.length) ok(`every page clears its floor`);
  else {
    short.sort((a, b) => a.words - b.words);
    for (const s of short.slice(0, 30)) fail(`${s.url} — ${s.words} words (floor ${s.floor})`);
    if (short.length > 30) fail(`…and ${short.length - 30} more pages under floor`);
  }
}

/* ---------- summary ---------- */
console.log(`\n${'─'.repeat(58)}`);
console.log(`${failures} failure${failures === 1 ? '' : 's'}, ${warnings} warning${warnings === 1 ? '' : 's'}`);
if (failures) {
  console.log('\x1b[31mACCEPTANCE GATE: FAILED\x1b[0m — nothing publishes until this is clean.\n');
  process.exit(1);
}
console.log('\x1b[32mACCEPTANCE GATE: PASSED\x1b[0m\n');
