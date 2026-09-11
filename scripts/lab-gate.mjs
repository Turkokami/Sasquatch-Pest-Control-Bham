#!/usr/bin/env node
/**
 * lab-gate.mjs — Keystone v2's performance launch gate, measured.
 *
 * v2 (Part 1.1 #4, Part 9.1) rewrote the performance gate as a LAB
 * measurement: mobile, simulated throttling, the median of five Lighthouse
 * runs, per template —
 *
 *     LCP ≤ 2.0s · TBT ≤ 200ms · CLS ≤ 0.05 · performance score ≥ 90
 *
 * and "a page that fails the lab gate is not published." Budgets are
 * deliberately tighter than Google's field thresholds because real phones are
 * slower than the machine running this. The FIELD check is separate and comes
 * 28 days after launch (CrUX where the origin is eligible), because a lab run
 * on launch day cannot answer a question about real users.
 *
 * Harness check 5 covers what can be read from HTML alone — document size,
 * JS weight, sized images, one high-priority image. This covers what cannot.
 * It is NOT part of `npm run gate`: it needs a running server and Chrome, and
 * takes several minutes. Run it before the domain cutover and after any change
 * to layout, fonts, images or third-party scripts:
 *
 *     npm run build && npm run lab-gate
 *
 * It serves ./dist with `astro preview` on a spare port, runs Lighthouse
 * headless (its own Chrome instance — never the in-app preview pane), writes
 * the medians to reports/lab-gate-<date>.json and exits 1 if any template
 * fails. One representative page per template, because v2 gates per template
 * and every page of a type renders through the same layout.
 */
import { spawn, execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const PORT = 4329;
const ORIGIN = `http://localhost:${PORT}`;
const RUNS = Number(process.env.LAB_RUNS || 5);

const TEMPLATES = [
  ['T1 home', '/'],
  ['services hub', '/services/'],
  ['T2 service spoke', '/services/rodent-control/'],
  ['T3 problem page', '/services/ant-control/carpenter-ants-in-a-window-frame/'],
  ['T4 city page', '/locations/bellingham/'],
  ['T5 neighborhood', '/locations/bellingham/fairhaven/'],
  ['T6 pest library', '/pest-library/norway-rat/'],
  ['T7 vertical', '/commercial/restaurants-and-food-service/'],
  ['T8 guide', '/guides/the-whatcom-county-pest-year/'],
  ['blog post', '/blog/apartment-pest-control-bellingham/'],
  ['Spanish spoke', '/es/servicios/control-de-roedores/'],
  ['contact', '/contact/'],
];
/* LAB_ONLY=/,/blog/x/ measures just those URLs — for re-checking a fix
   without the whole run. A partial run never counts as passing the gate:
   it writes no report, and says so. */
const ONLY = (process.env.LAB_ONLY || '').split(',').map((s) => s.trim()).filter(Boolean);
if (ONLY.length) {
  const keep = TEMPLATES.filter(([, u]) => ONLY.includes(u));
  TEMPLATES.length = 0;
  TEMPLATES.push(...keep);
}
const LIMITS = { lcp: 2000, tbt: 200, cls: 0.05, score: 0.9 };

const median = (xs) => { const s = [...xs].sort((a, b) => a - b); return s[s.length >> 1]; };

async function waitFor(url, ms = 30000) {
  const end = Date.now() + ms;
  while (Date.now() < end) {
    try { const r = await fetch(url); if (r.ok) return; } catch {}
    await new Promise((r) => setTimeout(r, 400));
  }
  throw new Error(`server at ${url} did not come up`);
}

for (const [, u] of TEMPLATES) {
  const f = path.join(root, 'dist', u, 'index.html');
  if (!fs.existsSync(f)) { console.error(`no built page for ${u} — run npm run build first`); process.exit(1); }
}

const server = spawn(process.platform === 'win32' ? 'npx.cmd' : 'npx',
  ['astro', 'preview', '--port', String(PORT), '--host', '127.0.0.1'],
  { cwd: root, stdio: 'ignore', shell: process.platform === 'win32' });
const stop = () => { try { process.platform === 'win32' ? execFileSync('taskkill', ['/pid', String(server.pid), '/t', '/f'], { stdio: 'ignore' }) : server.kill(); } catch {} };
process.on('exit', stop);

const results = [];
let failed = 0;
try {
  await waitFor(ORIGIN + '/');
  const lhBin = path.join(root, 'node_modules', 'lighthouse', 'cli', 'index.js');
  console.log(`\nKeystone v2 lab gate — ${TEMPLATES.length} templates × ${RUNS} runs, mobile, simulated throttling\n`);
  for (const [label, u] of TEMPLATES) {
    const runs = [];
    for (let i = 0; i < RUNS; i++) {
      /* On Windows, Lighthouse regularly finishes the run, prints a complete
         report, and THEN exits 1 because it cannot delete Chrome's temporary
         profile while Chrome still holds it (EPERM in chrome-launcher's
         destroyTmp). The measurement is fine; the cleanup is not. So a
         non-zero exit with a parseable report is a result, and only a missing
         or unparseable report is an error. */
      let out;
      try {
        out = execFileSync(process.execPath, [
          lhBin, ORIGIN + u,
          '--only-categories=performance', '--output=json', '--quiet',
          '--chrome-flags=--headless=new --no-first-run --disable-extensions',
        ], { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024, stdio: ['ignore', 'pipe', 'ignore'] });
      } catch (e) {
        out = e.stdout;
        if (!out || !String(out).trim().startsWith('{')) throw new Error(`Lighthouse produced no report for ${u}: ${String(e.message).split('\n')[0]}`);
      }
      const j = JSON.parse(out);
      const a = j.audits;
      const lcpEl = a['largest-contentful-paint-element']?.details?.items?.[0]?.items?.[0]?.node;
      runs.push({
        lcp: a['largest-contentful-paint'].numericValue,
        tbt: a['total-blocking-time'].numericValue,
        cls: a['cumulative-layout-shift'].numericValue,
        score: j.categories.performance.score,
        lcpElement: lcpEl ? `${lcpEl.nodeLabel ?? ''} ${lcpEl.snippet ?? ''}`.trim().slice(0, 160) : null,
      });
    }
    const m = {
      lcp: median(runs.map((r) => r.lcp)), tbt: median(runs.map((r) => r.tbt)),
      cls: median(runs.map((r) => r.cls)), score: median(runs.map((r) => r.score)),
    };
    const bad = [];
    if (m.lcp > LIMITS.lcp) bad.push(`LCP ${(m.lcp / 1000).toFixed(2)}s`);
    if (m.tbt > LIMITS.tbt) bad.push(`TBT ${Math.round(m.tbt)}ms`);
    if (m.cls > LIMITS.cls) bad.push(`CLS ${m.cls.toFixed(3)}`);
    if (m.score < LIMITS.score) bad.push(`score ${Math.round(m.score * 100)}`);
    if (bad.length) failed++;
    const line = `${label.padEnd(18)} LCP ${(m.lcp / 1000).toFixed(2)}s · TBT ${String(Math.round(m.tbt)).padStart(4)}ms · CLS ${m.cls.toFixed(3)} · score ${Math.round(m.score * 100)}`;
    console.log(`  ${bad.length ? '\x1b[31mFAIL\x1b[0m' : '\x1b[32m ok \x1b[0m'} ${line}${bad.length ? '  ← ' + bad.join(', ') : ''}`);
    console.log(`       \x1b[2mLCP element: ${runs[0].lcpElement ?? 'n/a'}\x1b[0m`);
    results.push({ template: label, url: u, median: m, runs });
  }
} finally {
  stop();
}

if (ONLY.length) {
  console.log(`\npartial run (LAB_ONLY) — ${failed} of ${TEMPLATES.length} over budget; no report written, and this is not a gate result.\n`);
  process.exit(failed ? 1 : 0);
}
const date = new Date().toISOString().slice(0, 10);
fs.mkdirSync(path.join(root, 'reports'), { recursive: true });
const file = path.join(root, 'reports', `lab-gate-${date}.json`);
fs.writeFileSync(file, JSON.stringify({ date, limits: LIMITS, runsPerTemplate: RUNS, lighthouse: 'mobile, simulated throttling', results }, null, 2));
console.log(`\n${failed} of ${TEMPLATES.length} templates over budget · written to ${path.relative(root, file)}`);
console.log(failed ? '\x1b[31mLAB GATE: FAILED\x1b[0m — v2: a page that fails the lab gate is not published.\n' : '\x1b[32mLAB GATE: PASSED\x1b[0m\n');
process.exit(failed ? 1 : 0);
