#!/usr/bin/env node
/**
 * check-tap-targets.mjs — Keystone v3.2 Dimension 14: every standalone tap
 * target at least 44 x 44px, measured in a real (headless) Chrome at 390px.
 *
 * The harness's accessibility check (section 7) decides what can be read from
 * HTML and CSS. Size cannot: it depends on layout, fonts and the viewport, so it
 * is measured here, one page per template — v3.2 runs Dimension 14 per template,
 * not per page, and a finding on a template blocks that template's first publish.
 *
 * Inline links inside running prose are exempt, as WCAG 2.5.8 exempts them: a
 * link in the middle of a sentence cannot be 44px tall without breaking the
 * sentence. Everything else — masthead, menus, breadcrumbs, footer, buttons —
 * is measured. Menu bars are opened first so the links inside them are counted.
 *
 *     npm run build && node scripts/check-tap-targets.mjs
 *
 * Uses puppeteer-core (installed with Lighthouse) and the machine's own Chrome.
 * It never opens the in-app preview pane.
 */
import { spawn, execFileSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import puppeteer from 'puppeteer-core';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const PORT = 4335;
const ORIGIN = `http://localhost:${PORT}`;
const CHROME = process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const MIN = 44;

const server = spawn(process.platform === 'win32' ? 'npx.cmd' : 'npx',
  ['astro', 'preview', '--port', String(PORT), '--host', '127.0.0.1'],
  { cwd: root, stdio: 'ignore', shell: process.platform === 'win32' });
const stopServer = () => { try { process.platform === 'win32' ? execFileSync('taskkill', ['/pid', String(server.pid), '/t', '/f'], { stdio: 'ignore' }) : server.kill(); } catch {} };
process.on('exit', stopServer);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
for (let i = 0; i < 60; i++) { try { if ((await fetch(ORIGIN + '/')).ok) break; } catch {} await sleep(500); }

/* One page per template, the same set the lab gate uses, plus the hubs and
   the Spanish home. */
const TEMPLATES = ['/', '/services/', '/services/rodent-control/', '/services/ant-control/carpenter-ants-in-a-window-frame/',
  '/locations/bellingham/', '/locations/bellingham/fairhaven/', '/pest-library/norway-rat/', '/commercial/',
  '/commercial/restaurants-and-food-service/', '/guides/the-whatcom-county-pest-year/',
  '/blog/apartment-pest-control-bellingham/', '/contact/', '/awards/', '/es/', '/es/servicios/control-de-roedores/'];

const browser = await puppeteer.launch({ executablePath: CHROME, headless: true, args: ['--no-first-run'] });
const summary = new Map();
for (const url of TEMPLATES) {
  const page = await browser.newPage();
  await page.setViewport({ width: 390, height: 844, isMobile: true, deviceScaleFactor: 1 });
  await page.goto(ORIGIN + url, { waitUntil: 'networkidle2', timeout: 60000 });
  await page.evaluate(() => document.querySelectorAll('details').forEach((d) => (d.open = true)));
  const small = await page.evaluate((min) => {
    const out = [];
    for (const el of document.querySelectorAll('a[href], button, summary, input, select, textarea')) {
      const cs = getComputedStyle(el);
      if (cs.display === 'none' || cs.visibility === 'hidden') continue;
      const r = el.getBoundingClientRect();
      if (r.width === 0 || r.height === 0) continue;
      const block = el.closest('p, li, td, dd, figcaption, blockquote');
      const inlineInProse = cs.display === 'inline' && block &&
        (block.textContent || '').trim().length > (el.textContent || '').trim().length + 20;
      if (inlineInProse) continue;
      if (r.height < min - 0.5 || r.width < min - 0.5) {
        const zone = el.closest('header, footer, .quick-menu, .top-actions, .crumbs, .rail, .phonebar, .actionbar, main');
        const zoneName = zone ? (zone.tagName.toLowerCase() + (typeof zone.className === 'string' && zone.className ? '.' + zone.className.split(' ')[0] : '')) : 'page';
        out.push({ key: `${zoneName} ${el.tagName.toLowerCase()}`, w: Math.round(r.width), h: Math.round(r.height), text: (el.textContent || el.getAttribute('aria-label') || '').trim().slice(0, 30) });
      }
    }
    return out;
  }, MIN);
  for (const s of small) {
    const e = summary.get(s.key) ?? { count: 0, minH: 999, minW: 999, pages: new Set(), sample: s.text };
    e.count++; e.minH = Math.min(e.minH, s.h); e.minW = Math.min(e.minW, s.w); e.pages.add(url);
    summary.set(s.key, e);
  }
  await page.close();
}
await browser.close();

console.log(`\nTap targets at 390px — ${TEMPLATES.length} templates, minimum ${MIN} x ${MIN}px\n`);
if (!summary.size) {
  console.log(`  \x1b[32m ok \x1b[0m every standalone tap target is at least ${MIN} x ${MIN}px`);
  process.exit(0);
}
for (const [k, e] of [...summary.entries()].sort((a, b) => b[1].count - a[1].count)) {
  console.log(`  \x1b[31mFAIL\x1b[0m ${String(e.count).padStart(4)} × ${k} — smallest ${e.minW}x${e.minH}px, on ${e.pages.size} template${e.pages.size === 1 ? '' : 's'} (e.g. "${e.sample}")`);
}
process.exit(1);
