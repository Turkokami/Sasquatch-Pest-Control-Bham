/**
 * Keystone Part 3.3 — the Spanish guides serve no guide the English ones do
 * not, carry no sources of their own, and every one is paired both ways.
 *
 * Pinned:
 *   1. every Spanish guide names a guide in src/content/guides/ — the route
 *      throws on this too; the test says so before a build has to;
 *   2. no guide has two Spanish pages, no two share a slug, and Spanish slugs
 *      are plain lowercase ASCII;
 *   3. PAGE_PAIRS sends the hub and each English guide to exactly its Spanish
 *      page;
 *   4. Keystone M2 and M5 on the data, as es-comercial.test.ts holds them;
 *   5. a quoted legal text carries a Spanish rendering beside it — the quote
 *      stays in English, as its author published it, and is never left
 *      untranslated for a Spanish reader;
 *   6. no bird-work wording, for the reason es-comercial.test.ts gives.
 */
import fs from 'node:fs';
import { esGuias, esGuiaPath, enGuiaPath, ES_CLUSTERS } from '../../src/data/es-guias';
import { GUIDE_CLUSTERS } from '../../src/data/guide-clusters';
import { PAGE_PAIRS } from '../../src/data/i18n';

const problems: string[] = [];
const guides = new Set(
  fs.readdirSync('src/content/guides').filter((f) => f.endsWith('.md')).map((f) => f.replace(/\.md$/, '')),
);
const seenGuide = new Set<string>();
const seenSlug = new Set<string>();
const BIRDS = /(^|[^\p{L}])(aves?|pájaros?|gaviotas?|palomas?|golondrinas?)(?![\p{L}])/iu;

if (PAGE_PAIRS['/guides/'] !== '/es/guias/') problems.push('PAGE_PAIRS does not send /guides/ to /es/guias/');
for (const c of GUIDE_CLUSTERS) if (!ES_CLUSTERS[c.key]?.name) problems.push(`cluster "${c.key}" has no Spanish name`);

for (const g of esGuias) {
  const id = g.guide;
  if (!guides.has(g.guide)) problems.push(`${id}: no English guide in src/content/guides/`);
  if (seenGuide.has(g.guide)) problems.push(`two Spanish pages for ${id}`);
  seenGuide.add(g.guide);
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(g.slug)) problems.push(`${id}: slug "${g.slug}" is not lowercase ASCII`);
  if (seenSlug.has(g.slug)) problems.push(`${id}: slug "${g.slug}" is used twice`);
  seenSlug.add(g.slug);

  const got = PAGE_PAIRS[enGuiaPath(g)];
  if (got !== esGuiaPath(g)) problems.push(`${id}: PAGE_PAIRS sends ${enGuiaPath(g)} to ${got}, not ${esGuiaPath(g)}`);

  const words = g.answer.trim().split(/\s+/).length;
  if (words < 40 || words > 60) problems.push(`${id}: Quick Answer is ${words} words (M2: 40–60)`);
  if (g.title.length > 60) problems.push(`${id}: title is ${g.title.length} characters (M5: ≤ 60)`);
  const d = g.description.trim();
  if (d.length < 110 || d.length > 165) problems.push(`${id}: description is ${d.length} characters (M5: 110–165)`);
  if (!/[.!?]$/.test(d)) problems.push(`${id}: description does not end on punctuation`);
  if (g.faqs.length === 0) problems.push(`${id}: no FAQ block (M2)`);
  if (g.secciones.length === 0) problems.push(`${id}: no sections`);

  for (const s of g.secciones) {
    if (s.cita && (!s.cita.en.trim() || !s.cita.es.trim())) problems.push(`${id}: "${s.h2}" quotes a text without both the original and a Spanish rendering`);
  }

  const text = [g.h1, g.title, g.description, g.answer,
    ...g.secciones.flatMap((s) => [s.h2, ...s.parrafos, ...(s.lista ?? []), ...(s.despues ?? []), s.cita?.es ?? '']),
    ...g.faqs.flatMap((f) => [f.q, f.a])].join('\n');
  const bird = text.match(BIRDS);
  if (bird) problems.push(`${id}: mentions "${bird[2]}" — bird work is retired (owner, 12 Sep 2026)`);
}

for (const p of problems) console.log(`WRONG: ${p}`);
console.log(problems.length === 0
  ? `\x1b[32mSpanish guides: ${esGuias.length} guides plus the hub, every one paired both ways\x1b[0m`
  : `\x1b[31m${problems.length} Spanish guide problem(s)\x1b[0m`);
process.exit(problems.length ? 1 : 0);
