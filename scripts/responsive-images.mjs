#!/usr/bin/env node
/**
 * responsive-images.mjs — WebP width variants for every photograph, generated
 * before `astro build`.
 *
 * WHY THIS EXISTS. Keystone v2's lab gate (median of five mobile Lighthouse
 * runs, simulated throttling) measured the home page's LCP at over six seconds
 * on 10 Sep 2026. Its LCP element is the hero banner: an 1,800-pixel, 450KB
 * JPEG sent to a phone that shows it 390 pixels wide. Every service page did the
 * same thing with a 1,125-pixel photo at 275KB, and every page with the logo
 * sent a 62KB PNG to draw a mark 57 pixels wide. On a throttled connection
 * those bytes are the render delay.
 *
 * WHAT IT DOES. For every JPEG and PNG under public/img it writes WebP copies at
 * the standard widths narrower than the original, plus one at the original
 * width, into public/img/_r/ — same relative path, width in the name:
 *
 *     public/img/work/foo.jpg  →  public/img/_r/work/foo-400w.webp
 *                                 public/img/_r/work/foo-800w.webp  …
 *
 * src/lib/images.ts builds each <img srcset> from the variants that ACTUALLY
 * EXIST on disk at build time. So if this script never ran, or failed on one
 * file, the page falls back to the original src and is merely slower — it can
 * never point at a variant that is not there. The original files are not
 * touched and stay the src fallback.
 *
 * public/img/_r/ is gitignored: it is derived, it is ~all regenerable, and
 * committing it would put thousands of binary files in the history. Vercel runs
 * this in its build like any other step. Locally, a variant newer than its
 * source is skipped, so only the first run is slow.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const SRC = path.join(root, 'public', 'img');
const OUT = path.join(SRC, '_r');

/* Photographs get 400/800/1200/1600. Small images — the logo, badges — get
   120 and 240 as well, because their display size is a fraction of 400. */
const WIDTHS = [400, 800, 1200, 1600];
const SMALL_WIDTHS = [120, 240];
const QUALITY = 72;

const walk = (dir, out = []) => {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) { if (p !== OUT) walk(p, out); }
    else if (/\.(jpe?g|png)$/i.test(e.name)) out.push(p);
  }
  return out;
};

const files = walk(SRC);
let made = 0, skipped = 0, failed = 0;
const started = Date.now();
for (const file of files) {
  const rel = path.relative(SRC, file).replace(/\.(jpe?g|png)$/i, '');
  let meta;
  try { meta = await sharp(file).metadata(); } catch (e) { failed++; console.warn(`  skip ${rel}: ${e.message}`); continue; }
  const w0 = meta.width;
  const widths = [...new Set([
    ...(w0 < 400 ? SMALL_WIDTHS : []),
    ...WIDTHS,
  ].filter((w) => w < w0).concat(w0))].sort((a, b) => a - b);
  const srcTime = fs.statSync(file).mtimeMs;
  for (const w of widths) {
    const target = path.join(OUT, `${rel}-${w}w.webp`);
    if (fs.existsSync(target) && fs.statSync(target).mtimeMs >= srcTime) { skipped++; continue; }
    fs.mkdirSync(path.dirname(target), { recursive: true });
    try {
      await sharp(file).resize({ width: w, withoutEnlargement: true }).webp({ quality: QUALITY }).toFile(target);
      made++;
    } catch (e) { failed++; console.warn(`  failed ${rel} @${w}: ${e.message}`); }
  }
}
console.log(`responsive images: ${files.length} sources · ${made} variants written · ${skipped} up to date · ${failed} failed · ${((Date.now() - started) / 1000).toFixed(1)}s`);
