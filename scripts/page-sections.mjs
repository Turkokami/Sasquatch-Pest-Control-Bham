/**
 * The list of pages and their sections, written out for src/lib/page-photos.ts.
 *
 * WHY A FILE AND NOT A DIRECTORY READ. page-photos.ts is imported from two
 * different worlds: astro.config.mjs (plain Node, for the Markdown plugin) and
 * the page templates (bundled by Vite). Reading src/content with node:fs works
 * in the first and silently finds nothing in the second — which is exactly what
 * happened: every English Markdown page had its photographs and every Spanish
 * page had none, because the Spanish templates went through the bundle. A JSON
 * manifest is read identically by both.
 *
 * Run by npm run build, before Astro. The output is committed so a build never
 * depends on having run this first.
 */
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const CONTENT = path.join(ROOT, 'src/content');
const OUT = path.join(ROOT, 'src/data/page-sections.json');

/** A section's heading and the first words under it — what a photograph placed
    beside it has to be about. */
const sectionsOf = (body) =>
  body.split(/^## /m).slice(1).map((p) => p.split(/\n\s*\n/).slice(0, 2).join(' ').slice(0, 400));

const dirs = [
  ['services', (slug) => `/services/${slug}/`],
  ['problems', (slug, fm) => (fm.service ? `/services/${fm.service}/${slug}/` : null)],
  ['pests', (slug) => `/pest-library/${slug}/`],
  ['industries', (slug) => `/commercial/${slug}/`],
  ['guides', (slug) => `/guides/${slug}/`],
  ['blog', (slug) => `/blog/${slug}/`],
  ['locations', (slug, fm) => (fm.town ? (fm.neighborhood ? `/locations/${fm.town}/${fm.neighborhood}/` : `/locations/${fm.town}/`) : null)],
];

const out = [];
for (const [dir, toPath] of dirs) {
  const abs = path.join(CONTENT, dir);
  if (!fs.existsSync(abs)) continue;
  for (const name of fs.readdirSync(abs).sort()) {
    if (!name.endsWith('.md')) continue;
    const raw = fs.readFileSync(path.join(abs, name), 'utf8');
    const fmEnd = raw.indexOf('\n---', 3);
    const fm = {};
    for (const line of raw.slice(0, Math.max(fmEnd, 0)).split('\n')) {
      const m = line.match(/^(\w+):\s*["']?([^"'\n]+?)["']?\s*$/);
      if (m) fm[m[1]] = m[2];
    }
    const page = toPath(name.replace(/\.md$/, ''), fm);
    if (!page) continue;
    out.push({ page, title: fm.title ?? fm.h1 ?? '', sections: sectionsOf(raw.slice(fmEnd + 4)) });
  }
}
out.sort((a, b) => a.page.localeCompare(b.page));
fs.writeFileSync(OUT, JSON.stringify(out) + '\n');
console.log(`page-sections — ${out.length} pages, ${out.reduce((n, p) => n + p.sections.length, 0)} sections`);
