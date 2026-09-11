#!/usr/bin/env node
/**
 * check-leadform.mjs — proves the deferred GoHighLevel form still works, in a
 * real (headless) Chrome.
 *
 * The lead form used to load eagerly on every page, and the note in
 * LeadForm.astro refused to defer it "without a real browser in front of you"
 * because the failure mode — a form that silently never renders — would cost
 * leads on 200 pages. On 10 Sep 2026 it was deferred to cut the Keystone v2
 * lab-gate LCP, and this is the browser check that note asked for. Run it
 * after any change to LeadForm.astro or business.crmForm:
 *
 *     npm run build && node scripts/check-leadform.mjs
 *
 * Three assertions:
 *   1. On a long page, nothing from the form host loads while the reader is
 *      only looking — the first paint, and a second and a half after it, with
 *      no interaction. Otherwise GHL's 2MB is competing with the page for the
 *      network during the paint Keystone's lab gate measures. (The loader
 *      also starts on a five-second fallback after load; this looks well
 *      inside that.)
 *   2. After scrolling to the form, GHL's form renders inside the frame (it has
 *      input fields) and form_embed.js has run its resize handshake (the frame
 *      carries a pixel height instead of the 100% it starts with).
 *   3. On /contact/, where the form is the point of the page, it loads without
 *      any scrolling at all.
 *
 * Uses puppeteer-core (installed with Lighthouse) and the machine's own Chrome.
 * It never opens the in-app preview pane.
 */
import { spawn, execFileSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import puppeteer from 'puppeteer-core';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const PORT = 4331;
const ORIGIN = `http://localhost:${PORT}`;
const CHROME = process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe';

const server = spawn(process.platform === 'win32' ? 'npx.cmd' : 'npx',
  ['astro', 'preview', '--port', String(PORT), '--host', '127.0.0.1'],
  { cwd: root, stdio: 'ignore', shell: process.platform === 'win32' });
const stopServer = () => { try { process.platform === 'win32' ? execFileSync('taskkill', ['/pid', String(server.pid), '/t', '/f'], { stdio: 'ignore' }) : server.kill(); } catch {} };
process.on('exit', stopServer);

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
for (let i = 0; i < 60; i++) { try { if ((await fetch(ORIGIN + '/')).ok) break; } catch {} await sleep(500); }

const browser = await puppeteer.launch({ executablePath: CHROME, headless: true, args: ['--no-first-run'] });
let failures = 0;
const ok = (m) => console.log(`  \x1b[32m ok \x1b[0m ${m}`);
const bad = (m) => { failures++; console.log(`  \x1b[31mFAIL\x1b[0m ${m}`); };

async function probe(url, scroll) {
  const page = await browser.newPage();
  await page.setViewport({ width: 390, height: 844, isMobile: true });
  const formHits = [];
  page.on('request', (r) => { if (/leadconnectorhq|sasquatchpestcontrol\.com\/(widget|js\/form_embed)|challenges\.cloudflare/.test(r.url())) formHits.push(r.url()); });
  await page.goto(ORIGIN + url, { waitUntil: 'networkidle2', timeout: 60000 });
  await sleep(1500);
  /* When did the form start, relative to the page's load event? Both numbers
     come from the page's own clock, so they are comparable. */
  const timing = await page.evaluate(() => {
    const nav = performance.getEntriesByType('navigation')[0];
    const form = performance.getEntriesByType('resource')
      .filter((e) => /\/widget\/form\/|form_embed\.js/.test(e.name))
      .map((e) => e.startTime);
    return { loadEnd: nav?.loadEventEnd ?? null, formStart: form.length ? Math.min(...form) : null };
  });
  const before = formHits.length;
  if (scroll) {
    await page.evaluate(() => document.getElementById('lead-form')?.scrollIntoView());
  }
  // wait for GHL's frame to render a form
  let rendered = false, height = null;
  for (let i = 0; i < 40 && !rendered; i++) {
    await sleep(500);
    const f = page.frames().find((fr) => /\/widget\/form\//.test(fr.url()));
    if (f) {
      try { rendered = (await f.$$('input, textarea, select')).length > 0; } catch {}
    }
  }
  /* The resize handshake arrives a moment AFTER the form renders — GHL's
     frame posts its height once it has laid itself out. Poll for it rather
     than reading once, and fail only if it never comes. */
  for (let i = 0; i < 20; i++) {
    height = await page.evaluate(() => {
      const el = document.querySelector('.leadform-frame iframe');
      return el ? { style: el.style.height, src: el.getAttribute('src') } : null;
    });
    if (/^\d+(\.\d+)?px$/.test(height?.style ?? '')) break;
    await sleep(500);
  }
  await page.close();
  return { before, rendered, height, timing };
}

console.log('\nLead form — deferred-load check in headless Chrome\n');
const long = await probe('/services/rodent-control/', true);
long.before === 0
  ? ok(`long page: no form requests during the first paint or the idle second after it`)
  : bad(`long page: ${long.before} form requests before the reader did anything — the form is back on the critical path`);
long.rendered ? ok(`long page: GHL form rendered inside the frame after scrolling`) : bad(`long page: the form never rendered after scrolling`);
/^\d+(\.\d+)?px$/.test(long.height?.style ?? '') ? ok(`long page: resize handshake ran (frame height ${long.height.style})`) : bad(`long page: frame height is "${long.height?.style}" — form_embed.js did not size it`);

const contact = await probe('/contact/', false);
contact.rendered ? ok(`/contact/: form rendered with no scrolling`) : bad(`/contact/: form did not render on load`);

await browser.close();
stopServer();
console.log(failures ? `\n\x1b[31m${failures} failure(s)\x1b[0m\n` : '\n\x1b[32mLead form works deferred.\x1b[0m\n');
process.exit(failures ? 1 : 0);
