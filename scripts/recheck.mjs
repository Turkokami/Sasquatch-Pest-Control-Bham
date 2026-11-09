#!/usr/bin/env node
/**
 * recheck.mjs — the 30-day search and AI-visibility scan.
 *
 *     npm run recheck              scan the live site, write a dated report
 *     npm run recheck -- --local   use ./dist instead of fetching the live site
 *     npm run recheck -- --quiet   write the report, print only the summary
 *
 * WHY THIS EXISTS. The acceptance gate (scripts/harness.mjs) answers "is this
 * build fit to publish". It says nothing about whether the published site is
 * actually reachable by the crawlers that feed AI answers, whether it is in
 * anybody's index, or whether the queries that earn money are moving. Those
 * four questions have different answers every month and none of them can be
 * answered from the repo alone, so they get their own pass on their own clock.
 *
 * WHAT IT CAN AND CANNOT TELL YOU, stated plainly because the whole file is
 * worthless if this gets blurred:
 *
 *   It CAN tell you: which crawlers get a 200 on the real domain today, what
 *   robots.txt actually says, whether the sitemaps resolve and how fresh they
 *   are, whether the pages still render without JavaScript, how much structured
 *   data each page type carries, where the §6.5/§6.6 backlog stands, and how
 *   the query set has moved since the last Search Console export.
 *
 *   It CANNOT tell you your "AI visibility score". There is no such number.
 *   Nothing here asks an assistant what it thinks of us, because the answer
 *   varies run to run and a single run proves nothing. It also cannot tell you
 *   your Google or Bing rank: position in a Search Console export is an average
 *   over impressions, not a rank, and treating it as one is how people end up
 *   reporting movement that did not happen.
 *
 *   It will NOT invent a figure to fill a column. A field it could not measure
 *   prints as "not measured" and says why.
 *
 * KEYWORDS. The query data comes from a Search Console export in private/gsc/
 * (gitignored — it is the owner's data and this repo is public). The export is
 * a manual download, so this script reads the newest one present and says how
 * old it is. There is no API path here on purpose: wiring one needs the owner's
 * OAuth and that is a decision, not a script.
 *
 * The money/brand/informational split is config, not cleverness — it lives in
 * scripts/keywords.json so the owner can correct it without touching code. A
 * query this script cannot classify is reported as unclassified rather than
 * quietly filed under one of the three.
 */
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

const args = process.argv.slice(2);
const has = (f) => args.includes(f);
const arg = (k, d) => { const i = args.indexOf(k); return i > -1 ? args[i + 1] : d; };

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1')), '..');
const ORIGIN = arg('--origin', 'https://www.sasquatchpestcontrol.com');
const LOCAL = has('--local');
const QUIET = has('--quiet');
/* private/, not reports/, and this is a data-protection decision rather than a
   filing preference. reports/ is tracked and this repository is public. A
   recheck report quotes the owner's Search Console queries, clicks and average
   positions — derived from the gitignored export in private/gsc/, and no less
   theirs for having passed through this script. It belongs behind the same
   exclusion as its source. The diff-against-last-month mechanism is unaffected:
   private/ is ignored by git, not deleted. */
const REPORTS = path.join(ROOT, 'private/recheck');
const today = new Date().toLocaleDateString('en-CA', { timeZone: 'America/Los_Angeles' });

const C = { dim: '\x1b[2m', red: '\x1b[31m', yel: '\x1b[33m', grn: '\x1b[32m', off: '\x1b[0m' };
const out = [];
const say = (s = '') => { out.push(s); if (!QUIET) console.log(s); };
const head = (s) => say(`\n${s}\n${'─'.repeat(Math.min(s.length, 62))}`);

/* Findings carry a severity so the report can be ranked by impact rather than
   by the order the checks happen to run in. */
const findings = [];
const finding = (sev, what, detail) => findings.push({ sev, what, detail });

/* ────────────────────────── fetch helper ────────────────────────── */
/* curl rather than fetch: this runs on Windows against a CDN, and curl's
   timeout and redirect behaviour is the one already used by the crawler probe
   in DEPLOY.md, so the two agree. Returns null on any failure — an unreachable
   URL is a finding, never an exception that kills the run. */
function get(url, ua = 'Mozilla/5.0 (compatible; SasquatchRecheck/1.0)') {
  try {
    const body = execFileSync('curl', ['-sS', '-L', '--max-time', '30', '-A', ua, url], { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 });
    return body;
  } catch { return null; }
}
function status(url, ua) {
  try {
    return execFileSync('curl', ['-sS', '-o', process.platform === 'win32' ? 'NUL' : '/dev/null',
      '-w', '%{http_code}', '-A', ua, '-L', '--max-time', '25', url], { encoding: 'utf8' }).trim();
  } catch { return 'ERR'; }
}

/* ───────────────────── 1 · AI and search crawler access ───────────────────── */
/* The single highest-impact thing on this list and the one most likely to break
   without anybody touching the repo: a WAF rule, a host default or a bot-
   management toggle at the CDN can start refusing these overnight. Keystone
   v3.2 §9.1 asked for this to be re-checked on the real domain, not on a
   preview deployment, because that is exactly where the two differ. */
const BOTS = [
  'GPTBot/1.0', 'OAI-SearchBot/1.0', 'ChatGPT-User/1.0',
  'PerplexityBot/1.0', 'Perplexity-User/1.0',
  'ClaudeBot/1.0', 'Claude-SearchBot/1.0', 'Claude-User/1.0',
  'Googlebot/2.1', 'Google-Extended', 'bingbot/2.0',
  'Applebot/0.1', 'Applebot-Extended', 'Amazonbot/0.1',
  'meta-externalagent/1.1', 'DuckAssistBot/1.0', 'MistralAI-User/1.0',
  'cohere-ai', 'YouBot/1.0', 'Bytespider',
];

head('1 · crawler access on the live domain');
let botResults = [];
if (LOCAL) {
  say(`${C.dim}skipped: --local was passed, and this check only means anything against the real host${C.off}`);
  finding('info', 'crawler access not measured', '--local run; re-run without it before trusting the report');
} else {
  for (const ua of BOTS) {
    const code = status(`${ORIGIN}/`, ua);
    botResults.push({ ua, code });
    const bad = code !== '200';
    say(`  ${bad ? C.red + code + C.off : C.dim + code + C.off}  ${ua}`);
    if (bad) finding('critical', `${ua} does not get a 200`, `got ${code} from ${ORIGIN}/ — a crawler that cannot fetch the page cannot cite it`);
  }
  const blocked = botResults.filter((b) => b.code !== '200');
  if (!blocked.length) say(`${C.grn} ok ${C.off} all ${BOTS.length} agents get a 200`);
}

/* ───────────────────────── 2 · robots and sitemaps ───────────────────────── */
head('2 · robots.txt and sitemaps');
const robotsTxt = LOCAL ? readLocal('robots.txt') : get(`${ORIGIN}/robots.txt`);
if (!robotsTxt) {
  say(`${C.red}FAIL${C.off} robots.txt could not be read`);
  finding('critical', 'robots.txt unreadable', `nothing served at ${ORIGIN}/robots.txt`);
} else {
  const disallowAll = /^\s*disallow:\s*\/\s*$/im.test(robotsTxt);
  const hasSitemap = /^\s*sitemap:\s*http/im.test(robotsTxt);
  say(`  ${robotsTxt.trim().split('\n').map((l) => l.trim()).join(' | ')}`);
  if (disallowAll) {
    say(`${C.red}FAIL${C.off} robots.txt disallows everything`);
    finding('critical', 'robots.txt blocks the whole site', 'GUARDRAILS §4 settles this as Allow: / — something has overwritten it');
  } else say(`${C.grn} ok ${C.off} nothing site-wide is disallowed`);
  if (!hasSitemap) finding('warn', 'robots.txt names no sitemap', 'add a Sitemap: line so a crawler finds the index without guessing');
}

const smIndex = LOCAL ? readLocal('sitemap.xml') : get(`${ORIGIN}/sitemap.xml`);
if (!smIndex) {
  finding('critical', 'sitemap index unreachable', `nothing served at ${ORIGIN}/sitemap.xml`);
  say(`${C.red}FAIL${C.off} sitemap.xml could not be read`);
} else {
  const children = [...smIndex.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  const lastmods = [...smIndex.matchAll(/<lastmod>([^<]+)<\/lastmod>/g)].map((m) => m[1]);
  const newest = lastmods.sort().at(-1) ?? null;
  say(`  ${children.length} tier sitemaps, newest lastmod ${newest ?? 'none'}`);
  const ageDays = newest ? Math.round((Date.now() - Date.parse(newest)) / 86400000) : null;
  if (ageDays !== null && ageDays > 90) {
    finding('warn', `sitemaps have not changed in ${ageDays} days`, 'not a fault on its own, but a site that never changes gets crawled less often');
  }
  /* Count URLs across the tiers, so a tier silently emptying itself shows up. */
  let total = 0;
  const tiers = [];
  for (const c of children) {
    const xml = LOCAL ? readLocal(c.replace(/^https?:\/\/[^/]+\//, '')) : get(c);
    const n = xml ? [...xml.matchAll(/<loc>/g)].length : 0;
    tiers.push({ sitemap: c.replace(/^https?:\/\/[^/]+/, ''), urls: n });
    total += n;
    if (!n) finding('warn', `${c} lists no URLs`, 'a tier sitemap that resolves but is empty hides a whole page type from crawlers');
  }
  for (const t of tiers) say(`  ${C.dim}${String(t.urls).padStart(4)}  ${t.sitemap}${C.off}`);
  say(`  ${total} URLs in total`);
}

/* IndexNow key file. Bing gates Copilot, and the submission protocol needs the
   key reachable at the site root or the whole thing silently no-ops. */
const keyFile = fs.existsSync(path.join(ROOT, 'public'))
  ? fs.readdirSync(path.join(ROOT, 'public')).find((f) => /^[a-f0-9]{8,}\.txt$/i.test(f))
  : null;
if (!keyFile) {
  finding('warn', 'no IndexNow key file found in public/', 'npm run indexnow cannot authenticate without it');
} else if (!LOCAL) {
  const code = status(`${ORIGIN}/${keyFile}`, 'bingbot/2.0');
  say(`  IndexNow key ${keyFile} → ${code}`);
  if (code !== '200') finding('critical', 'IndexNow key file not served', `${ORIGIN}/${keyFile} returned ${code}; submissions will be rejected`);
}

/* ───────────────── 3 · renderability and structured data ───────────────── */
/* If the text only exists after JavaScript runs, most of the agents in section
   1 see an empty page even though they got a 200. Astro ships static HTML, so
   this should always pass — which is the reason to check it: it would break
   silently on a framework or island change, and nothing else here would notice. */
head('3 · renders without JavaScript, and carries structured data');
/* One live page per type, discovered from ./dist rather than hardcoded. An
   earlier version listed the URLs literally and reported two of them as
   unfetchable the moment a slug changed — a false alarm that trains you to
   ignore the report, which is worse than not checking at all. */
const SAMPLE = (() => {
  const want = [
    ['home', (u) => u === '/'],
    ['service', (u) => /^\/services\/[^/]+\/$/.test(u)],
    ['problem', (u) => /^\/services\/[^/]+\/[^/]+\/$/.test(u)],
    ['pest', (u) => /^\/pest-library\/[^/]+\/$/.test(u)],
    ['city', (u) => /^\/locations\/[^/]+\/$/.test(u)],
    ['compliance', (u) => /^\/guides\/[^/]+\/$/.test(u)],
    ['vertical', (u) => /^\/commercial\/[^/]+\/$/.test(u)],
  ];
  const urls = [];
  (function walk(dir) {
    if (!fs.existsSync(dir)) return;
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      const p = path.join(dir, e.name);
      if (e.isDirectory()) walk(p);
      else if (e.name === 'index.html') urls.push('/' + path.relative(path.join(ROOT, 'dist'), p).replace(/index\.html$/, '').replace(/\\/g, '/'));
    }
  })(path.join(ROOT, 'dist'));
  urls.sort();
  const picked = [];
  for (const [label, test] of want) {
    /* Skip the Spanish tier here: it is sampled by its own twin, and a Spanish
       page standing in for "service" would make the English column look wrong. */
    const hit = urls.find((u) => !u.startsWith('/es/') && test(u));
    if (hit) picked.push([label, hit]);
    else finding('info', `no ${label} page found in ./dist to sample`, 'the type may have been renamed, or the build is incomplete');
  }
  return picked;
})();
const rendered = [];
for (const [label, url] of SAMPLE) {
  const html = LOCAL ? readLocal(path.join(url.replace(/^\//, ''), 'index.html')) : get(`${ORIGIN}${url}`, 'PerplexityBot/1.0');
  if (!html) { finding('warn', `${url} could not be fetched`, 'sampled for the renderability check'); continue; }
  const text = html.replace(/<script[\s\S]*?<\/script>/gi, ' ').replace(/<style[\s\S]*?<\/style>/gi, ' ').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  const types = [...html.matchAll(/"@type":\s*(\[[^\]]*\]|"[A-Za-z]+")/g)].map((m) => m[1]);
  const headings = [...html.matchAll(/<h2\b/gi)].length;
  const row = {
    url, label,
    words: text.split(' ').length,
    schemaNodes: types.length,
    h2: headings,
    hasLocalBusiness: /"@type":\s*\[[^\]]*LocalBusiness/.test(html),
    dated: /(last updated|actualizad[oa])/i.test(html),
  };
  rendered.push(row);
  say(`  ${C.dim}${label.padEnd(11)} ${String(row.words).padStart(5)} words  ${String(row.schemaNodes).padStart(3)} schema nodes  ${String(row.h2).padStart(2)} h2  ${row.dated ? 'dated' : 'NO DATE'}${C.off}`);
  if (row.words < 150) finding('critical', `${url} has almost no text in raw HTML`, `${row.words} words with scripts stripped — a non-JS crawler sees nothing`);
  if (!row.schemaNodes) finding('warn', `${url} carries no JSON-LD`, 'facts have to be inferred from prose instead of read');
}
if (rendered.length && !rendered.some((r) => r.hasLocalBusiness)) {
  finding('warn', 'no sampled page carries the LocalBusiness node', 'the primary entity should be Organization+LocalBusiness+HomeAndConstructionBusiness');
}

/* ───────────────────── 4 · the §6.5 / §6.6 backlog ───────────────────── */
/* Delegated to the harness so there is exactly one copy of the regexes. */
head('4 · cited authority and visible date (from the acceptance gate)');
let backlog = null;
const blPath = path.join(REPORTS, '.backlog.json');
try {
  execFileSync(process.execPath, [path.join(ROOT, 'scripts/harness.mjs'), '--only', 'backlog', '--backlog-json', blPath],
    { cwd: ROOT, stdio: 'ignore' });
  backlog = JSON.parse(fs.readFileSync(blPath, 'utf8'));
} catch {
  say(`${C.yel}WARN${C.off} could not run the gate's backlog check — is ./dist built?`);
  finding('warn', 'backlog not measured', 'run npm run build, then npm run recheck');
}
if (backlog) {
  say(`  ${C.dim}page type        pages  authority   of those PNW  visible date${C.off}`);
  const gaps = { auth: [], regional: [], dated: [] };
  for (const [type, r] of Object.entries(backlog.byType).sort((a, b) => b[1].n - a[1].n)) {
    const owed = r.n - (r.noClaim ?? 0);
    say(`  ${C.dim}${type.padEnd(16)} ${String(r.n).padStart(5)}  ${String(r.auth).padStart(4)}/${String(owed).padEnd(4)}  ${String(r.regional).padStart(12)}  ${String(r.dated).padStart(12)}${C.off}`);
  }
  for (const p of backlog.pages) {
    if (!p.auth && !p.noClaim) gaps.auth.push(p.url);
    if (p.auth && !p.regional) gaps.regional.push(p.url);
    if (!p.dated) gaps.dated.push(p.url);
  }
  if (gaps.auth.length) finding('warn', `${gaps.auth.length} pages cite no primary authority`, gaps.auth.slice(0, 12).join(' ') + (gaps.auth.length > 12 ? ` …and ${gaps.auth.length - 12} more` : ''));
  if (gaps.dated.length) finding('warn', `${gaps.dated.length} pages show no visible date`, gaps.dated.slice(0, 12).join(' '));
  if (gaps.regional.length) finding('info', `${gaps.regional.length} pages cite an authority but no Pacific Northwest one`, 'owner steer 22 Sep 2026: prefer the extension service that covers this county. A national source is often correct, so this is a mix to watch, not a target');
  backlog.gaps = gaps;
}

/* ───────────────────────────── 5 · keywords ───────────────────────────── */
head('5 · queries — what earns, and what is close');
const gscDir = path.join(ROOT, 'private/gsc');
const cfgPath = path.join(ROOT, 'scripts/keywords.json');
let keywords = null;

if (!fs.existsSync(cfgPath)) {
  say(`${C.yel}WARN${C.off} scripts/keywords.json is missing — cannot classify queries`);
  finding('warn', 'keyword config missing', 'scripts/keywords.json defines the money/brand/informational split');
} else if (!fs.existsSync(gscDir)) {
  say(`${C.dim}no private/gsc/ directory — nothing to read${C.off}`);
  finding('warn', 'no Search Console export present', 'export Performance → last 16 months and drop the file in private/gsc/');
} else {
  const cfg = JSON.parse(fs.readFileSync(cfgPath, 'utf8'));
  /* Two shapes, because Search Console hands you a ZIP of CSVs and the first
     export in this repo had been converted to JSON by hand. Supporting the
     CSV folder natively means the next export is drag-and-drop: unzip into
     private/gsc/gsc-performance-YYYY-MM-DD/ and this reads it. Both forms are
     listed together and the newest date in the name wins, so a hand-converted
     file and a dropped folder cannot disagree about which is current. */
  const exports_ = fs.readdirSync(gscDir, { withFileTypes: true })
    .filter((e) => (e.isFile() && /gsc-performance.*\.json$/i.test(e.name))
      || (e.isDirectory() && /gsc-performance/i.test(e.name) && fs.existsSync(path.join(gscDir, e.name, 'Queries.csv'))))
    .map((e) => ({ name: e.name, dir: e.isDirectory() }))
    .sort((a, b) => (a.name.match(/\d{4}-\d{2}-\d{2}/)?.[0] ?? '').localeCompare(b.name.match(/\d{4}-\d{2}-\d{2}/)?.[0] ?? ''));
  if (!exports_.length) {
    say(`${C.dim}private/gsc/ has no export (no gsc-performance*.json, no gsc-performance*/ folder with Queries.csv)${C.off}`);
    finding('warn', 'no Search Console export present', 'Search Console → Performance → last 16 months → Export → unzip into private/gsc/gsc-performance-YYYY-MM-DD/');
  } else {
    const newestEntry = exports_.at(-1);
    const newest = newestEntry.name;
    const stamp = newest.match(/(\d{4}-\d{2}-\d{2})/)?.[1] ?? null;
    const age = stamp ? Math.round((Date.now() - Date.parse(stamp)) / 86400000) : null;
    say(`  export: ${newest}${age !== null ? `  (${age} days old)` : ''}`);
    if (age !== null && age > 45) {
      finding(age > 120 ? 'warn' : 'info', `Search Console export is ${age} days old`,
        'the query half of this report describes the past, not the present — re-export before reading movement into it');
    }

    /* A query can contain a comma, so this is a real CSV reader rather than a
       split(','): it tracks quotes and unescapes the doubled "" form. GSC
       writes CTR as "0.48%" in CSV and as 0.0048 in the JSON export, so the
       percent form is divided back to a fraction — otherwise CTR would read
       100x high for one shape and nobody would notice, because nothing in
       this report keys off CTR. */
    const parseCsv = (text) => {
      const rows = [];
      let row = [], field = '', q = false;
      for (let i = 0; i < text.length; i++) {
        const c = text[i];
        if (q) {
          if (c === '"' && text[i + 1] === '"') { field += '"'; i++; }
          else if (c === '"') q = false;
          else field += c;
        } else if (c === '"') q = true;
        else if (c === ',') { row.push(field); field = ''; }
        else if (c === '\n') { row.push(field); rows.push(row); row = []; field = ''; }
        else if (c !== '\r') field += c;
      }
      if (field !== '' || row.length) { row.push(field); rows.push(row); }
      return rows.filter((r) => r.length > 1 || (r[0] ?? '').trim() !== '');
    };
    const num = (v) => {
      const s = String(v ?? '').trim();
      if (s.endsWith('%')) return parseFloat(s) / 100;
      return parseFloat(s.replace(/,/g, '')) || 0;
    };

    let rowsQ;
    if (newestEntry.dir) {
      const csv = parseCsv(fs.readFileSync(path.join(gscDir, newest, 'Queries.csv'), 'utf8'));
      rowsQ = csv.slice(1).map(([q, clicks, impr, ctr, pos]) => ({
        q, clicks: num(clicks), impr: num(impr), ctr: num(ctr), pos: num(pos),
      })).filter((r) => r.q);
    } else {
      const data = JSON.parse(fs.readFileSync(path.join(gscDir, newest), 'utf8'));
      rowsQ = (data.Queries ?? []).slice(1).map(([q, clicks, impr, ctr, pos]) => ({
        q, clicks: num(clicks), impr: num(impr), ctr: num(ctr), pos: num(pos),
      })).filter((r) => r.q);
    }

    const brandRe = new RegExp(cfg.brand.join('|'), 'i');
    const moneyRe = new RegExp(cfg.moneyIntent.join('|'), 'i');
    const infoRe = new RegExp(cfg.informational.join('|'), 'i');
    const geoRe = new RegExp(cfg.geo.join('|'), 'i');

    const classify = (q) => {
      if (brandRe.test(q)) return 'brand';
      /* Money = commercial intent, or a service term next to a place we serve.
         Informational is checked first only when it carries no commercial or
         geographic signal, because "rat exterminator bellingham cost" is a
         money query that happens to contain a question word. */
      if (moneyRe.test(q) || geoRe.test(q)) return 'money';
      if (infoRe.test(q)) return 'informational';
      return 'unclassified';
    };
    for (const r of rowsQ) r.kind = classify(r.q);

    const sum = (rs, k) => rs.reduce((a, b) => a + b[k], 0);
    const groups = ['money', 'brand', 'informational', 'unclassified'];
    say(`  ${C.dim}class            queries   clicks  impressions   avg pos${C.off}`);
    const summary = {};
    for (const g of groups) {
      const rs = rowsQ.filter((r) => r.kind === g);
      if (!rs.length) continue;
      const clicks = sum(rs, 'clicks'), impr = sum(rs, 'impr');
      /* Impression-weighted, because averaging the averages of a 90k-impression
         query and a 10-impression query gives a number that means nothing. */
      const pos = impr ? rs.reduce((a, b) => a + b.pos * b.impr, 0) / impr : 0;
      summary[g] = { queries: rs.length, clicks, impressions: impr, avgPosition: +pos.toFixed(2) };
      say(`  ${g.padEnd(16)} ${String(rs.length).padStart(6)}  ${String(clicks).padStart(7)}  ${String(impr).padStart(11)}  ${pos.toFixed(2).padStart(8)}`);
    }

    const money = rowsQ.filter((r) => r.kind === 'money');
    say(`\n  ${C.dim}top money queries by impressions${C.off}`);
    for (const r of [...money].sort((a, b) => b.impr - a.impr).slice(0, 12)) {
      say(`  ${C.dim}${String(r.impr).padStart(7)} impr  pos ${r.pos.toFixed(1).padStart(5)}  ${String(r.clicks).padStart(4)} clicks  ${r.q}${C.off}`);
    }

    /* The opportunity list. Plenty of impressions means the query is being
       shown to real people; a position off the first page means almost nobody
       is clicking it. That gap is where a page edit has somewhere to go. It is
       a shortlist to look at, not a promise that any of them will move. */
    const opp = money
      .filter((r) => r.impr >= cfg.opportunity.minImpressions && r.pos >= cfg.opportunity.minPosition)
      .sort((a, b) => b.impr - a.impr)
      .slice(0, cfg.opportunity.show);
    say(`\n  ${C.dim}money queries with demand but no position (impressions ≥ ${cfg.opportunity.minImpressions}, avg pos ≥ ${cfg.opportunity.minPosition})${C.off}`);
    if (!opp.length) say(`  ${C.dim}none${C.off}`);
    for (const r of opp) {
      say(`  ${C.dim}${String(r.impr).padStart(7)} impr  pos ${r.pos.toFixed(1).padStart(5)}  ${String(r.clicks).padStart(4)} clicks  ${r.q}${C.off}`);
    }
    if (opp.length) {
      finding('info', `${opp.length} money queries have demand but sit off the first page`,
        opp.slice(0, 5).map((r) => `${r.q} (${r.impr} impr, pos ${r.pos.toFixed(1)})`).join('; '));
    }

    keywords = { export: newest, exportAgeDays: age, summary, money: money.slice(0, 50), opportunities: opp };

    /* Movement against the previous recheck, if there is one. Compared query by
       query: a change in the site-wide average is usually a change in the query
       mix, not a change in how any page is doing. */
    const prior = fs.existsSync(REPORTS)
      ? fs.readdirSync(REPORTS).filter((f) => /^recheck-\d{4}-\d{2}-\d{2}\.json$/.test(f)).sort().at(-1)
      : null;
    if (prior) {
      const prev = JSON.parse(fs.readFileSync(path.join(REPORTS, prior), 'utf8'));
      if (prev.keywords?.export === newest) {
        say(`\n  ${C.dim}movement: not computed — ${prior} read the same export (${newest}). Re-export to see change.${C.off}`);
        finding('info', 'no new Search Console data since the last recheck', `both runs read ${newest}; the query section cannot show movement`);
      } else if (prev.keywords?.money) {
        const was = new Map(prev.keywords.money.map((r) => [r.q, r]));
        const moved = money.map((r) => ({ q: r.q, posNow: r.pos, posWas: was.get(r.q)?.pos }))
          .filter((r) => r.posWas != null && Math.abs(r.posNow - r.posWas) >= 1)
          .sort((a, b) => (a.posNow - a.posWas) - (b.posNow - b.posWas));
        say(`\n  ${C.dim}movement since ${prior} (avg position, lower is better)${C.off}`);
        for (const m of moved.slice(0, 8)) say(`  ${C.dim}${(m.posWas).toFixed(1)} → ${(m.posNow).toFixed(1)}   ${m.q}${C.off}`);
        for (const m of moved.slice(-5)) if (m.posNow > m.posWas) say(`  ${C.dim}${(m.posWas).toFixed(1)} → ${(m.posNow).toFixed(1)}   ${m.q}${C.off}`);
        keywords.movementAgainst = prior;
      }
    }
  }
}

/* ───────────────────── 6 · what only the owner can do ───────────────────── */
/* These are read out of pending.mjs rather than restated here, so there is one
   list of outstanding owner input and it does not fall out of date in two
   places. Only the ones that gate this report's subject are surfaced. */
head('6 · blocked on the owner, and relevant to this report');
const OWNER_GATES = [
  ['Bing Webmaster Tools + first IndexNow run', 'Bing gates Copilot and feeds ChatGPT search. Ten minutes with the login. The key file is already live.'],
  ['GA4 with referrer segments', 'Without it there is no way to see a perplexity.ai or chatgpt.com referral, or the #:~:text= fragments AI Overview clicks arrive with. Until then this report cannot measure outcome, only surface.'],
  ['Review cadence acknowledgment (GUARDRAILS §5)', 'Directories and the Business Profile are where the commercial queries get answered, and cadence moves them more than total.'],
];
for (const [what, why] of OWNER_GATES) {
  say(`  ${C.yel}·${C.off} ${what}\n    ${C.dim}${why}${C.off}`);
  finding('owner', what, why);
}

/* ────────────────────────────── the report ────────────────────────────── */
const rank = { critical: 0, warn: 1, owner: 2, info: 3 };
findings.sort((a, b) => rank[a.sev] - rank[b.sev]);

head('summary');
const counts = findings.reduce((a, f) => ({ ...a, [f.sev]: (a[f.sev] ?? 0) + 1 }), {});
say(`  ${counts.critical ?? 0} critical · ${counts.warn ?? 0} to fix · ${counts.owner ?? 0} owner · ${counts.info ?? 0} for information`);
for (const f of findings.filter((f) => f.sev === 'critical' || f.sev === 'warn')) {
  say(`  ${f.sev === 'critical' ? C.red + 'critical' + C.off : C.yel + 'fix     ' + C.off}  ${f.what}`);
}

/* The 1st of next month, matching the scheduled task's cron (0 9 1 * *) rather
   than today + 30 days. The two disagreeing by a week in the first report is
   exactly the small inconsistency that makes somebody stop trusting the rest of
   it. GUARDRAILS §12 records why the schedule is a fixed day of the month. */
const nextDue = (() => {
  const n = new Date();
  return new Date(Date.UTC(n.getUTCFullYear(), n.getUTCMonth() + 1, 1)).toISOString().slice(0, 10);
})();
say(`\n  next recheck due ${nextDue}`);
say(`  ${C.dim}search and AI visibility move slowly — 30 days is the earliest a change here shows up anywhere${C.off}`);

fs.mkdirSync(REPORTS, { recursive: true });
const report = {
  generated: new Date().toISOString(),
  origin: LOCAL ? '(local ./dist)' : ORIGIN,
  nextDue,
  crawlers: botResults,
  robots: robotsTxt ? robotsTxt.trim() : null,
  rendered,
  backlog: backlog ? { byType: backlog.byType, gaps: backlog.gaps } : null,
  keywords,
  findings,
};
const jsonPath = path.join(REPORTS, `recheck-${today}.json`);
fs.writeFileSync(jsonPath, JSON.stringify(report, null, 1) + '\n');

/* The markdown twin is what a person reads; the JSON is what the next run
   diffs against. Both are written every time so neither can go stale. */
const md = [
  `# Search and AI visibility recheck — ${today}`,
  '',
  `Target: ${report.origin}. Next due: **${nextDue}**.`,
  '',
  `${counts.critical ?? 0} critical · ${counts.warn ?? 0} to fix · ${counts.owner ?? 0} owner · ${counts.info ?? 0} for information`,
  '',
  '## Findings, worst first',
  '',
  '| Severity | Finding | Detail |',
  '|---|---|---|',
  ...findings.map((f) => `| ${f.sev} | ${f.what} | ${String(f.detail).replace(/\|/g, '\\|')} |`),
  '',
  '## Crawler access',
  '',
  botResults.length
    ? botResults.map((b) => `- \`${b.ua}\` → ${b.code}`).join('\n')
    : '_not measured in this run._',
  '',
  '## Raw-HTML render and structured data',
  '',
  '| Page type | URL | Words (no JS) | Schema nodes | h2 | Visible date |',
  '|---|---|---|---|---|---|',
  ...rendered.map((r) => `| ${r.label} | ${r.url} | ${r.words} | ${r.schemaNodes} | ${r.h2} | ${r.dated ? 'yes' : 'no'} |`),
  '',
  '## Queries',
  '',
  keywords
    ? [
      `Export: \`${keywords.export}\`${keywords.exportAgeDays != null ? ` (${keywords.exportAgeDays} days old)` : ''}.`,
      '',
      '| Class | Queries | Clicks | Impressions | Avg position |',
      '|---|---|---|---|---|',
      ...Object.entries(keywords.summary).map(([k, v]) => `| ${k} | ${v.queries} | ${v.clicks} | ${v.impressions} | ${v.avgPosition} |`),
      '',
      '### Demand without position — where an edit has somewhere to go',
      '',
      keywords.opportunities.length
        ? ['| Query | Impressions | Avg position | Clicks |', '|---|---|---|---|',
          ...keywords.opportunities.map((r) => `| ${r.q} | ${r.impr} | ${r.pos.toFixed(1)} | ${r.clicks} |`)].join('\n')
        : '_none at the configured thresholds._',
    ].join('\n')
    : '_No Search Console export read._',
  '',
  '## What this report cannot tell you',
  '',
  '- There is no AI visibility score, and none is given here. Nothing in this run asks an assistant what it thinks of the site, because that answer varies run to run.',
  '- Average position in a Search Console export is an impression-weighted average, not a rank.',
  '- Without GA4 there is no referral or AI-Overview-click measurement, so this report describes the surface, not the outcome.',
  '',
].join('\n');
const mdPath = path.join(REPORTS, `recheck-${today}.md`);
fs.writeFileSync(mdPath, md);

console.log(`\nwritten:\n  ${path.relative(ROOT, jsonPath)}\n  ${path.relative(ROOT, mdPath)}\n`);

/* A critical finding exits non-zero so this can gate a scheduled job without
   needing anybody to read the output. Warnings do not: a 30-day review that
   fails on a content backlog would cry wolf every month until the backlog is
   finished, and then nobody reads it. */
process.exit(findings.some((f) => f.sev === 'critical') ? 1 : 0);

function readLocal(rel) {
  const p = path.join(ROOT, 'dist', rel);
  return fs.existsSync(p) ? fs.readFileSync(p, 'utf8') : null;
}
