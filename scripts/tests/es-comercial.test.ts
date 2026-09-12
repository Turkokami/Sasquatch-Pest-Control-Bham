/**
 * Keystone Part 3.3 — the Spanish commercial pages serve no industry the
 * English ones do not, and every one is paired both ways.
 *
 * Pinned:
 *   1. every Spanish vertical names an industry with an English page in
 *      src/content/industries/ — the route throws on this too; the test says
 *      so before a build has to;
 *   2. no industry has two Spanish pages, no two share a slug, and Spanish
 *      slugs are plain lowercase ASCII;
 *   3. PAGE_PAIRS sends the hub and each English vertical to exactly its
 *      Spanish page;
 *   4. Keystone M2 and M5 on the data, as es-areas.test.ts holds them;
 *   5. no bird-work wording. The owner retired bird work on 12 Sep 2026
 *      (GUARDRAILS.md §8); a Spanish page that names birds is where an offer
 *      would creep back in.
 */
import fs from 'node:fs';
import { esGiros, esGiroPath, enGiroPath } from '../../src/data/es-comercial';
import { PAGE_PAIRS } from '../../src/data/i18n';

const problems: string[] = [];
const industries = new Set(
  fs.readdirSync('src/content/industries').filter((f) => f.endsWith('.md')).map((f) => f.replace(/\.md$/, '')),
);
const seenIndustry = new Set<string>();
const seenSlug = new Set<string>();
const BIRDS = /(^|[^\p{L}])(aves?|pájaros?|gaviotas?|palomas?|golondrinas?)(?![\p{L}])/iu;

if (PAGE_PAIRS['/commercial/'] !== '/es/comercial/') problems.push('PAGE_PAIRS does not send /commercial/ to /es/comercial/');

for (const g of esGiros) {
  const id = g.industry;
  if (!industries.has(g.industry)) problems.push(`${id}: no English page in src/content/industries/`);
  if (seenIndustry.has(g.industry)) problems.push(`two Spanish pages for ${id}`);
  seenIndustry.add(g.industry);
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(g.slug)) problems.push(`${id}: slug "${g.slug}" is not lowercase ASCII`);
  if (seenSlug.has(g.slug)) problems.push(`${id}: slug "${g.slug}" is used twice`);
  seenSlug.add(g.slug);

  const got = PAGE_PAIRS[enGiroPath(g)];
  if (got !== esGiroPath(g)) problems.push(`${id}: PAGE_PAIRS sends ${enGiroPath(g)} to ${got}, not ${esGiroPath(g)}`);

  const words = g.answer.trim().split(/\s+/).length;
  if (words < 40 || words > 60) problems.push(`${id}: Quick Answer is ${words} words (M2: 40–60)`);
  if (g.title.length > 60) problems.push(`${id}: title is ${g.title.length} characters (M5: ≤ 60)`);
  const d = g.description.trim();
  if (d.length < 110 || d.length > 165) problems.push(`${id}: description is ${d.length} characters (M5: 110–165)`);
  if (!/[.!?]$/.test(d)) problems.push(`${id}: description does not end on punctuation`);
  if (g.faqs.length === 0) problems.push(`${id}: no FAQ block (M2)`);
  if (g.secciones.length === 0) problems.push(`${id}: no sections`);

  const text = [g.h1, g.title, g.description, g.answer,
    ...g.secciones.flatMap((s) => [s.h2, ...s.parrafos, ...(s.lista ?? [])]),
    ...g.faqs.flatMap((f) => [f.q, f.a])].join('\n');
  const bird = text.match(BIRDS);
  if (bird) problems.push(`${id}: mentions "${bird[2]}" — bird work is retired (owner, 12 Sep 2026)`);
}

for (const p of problems) console.log(`WRONG: ${p}`);
console.log(problems.length === 0
  ? `\x1b[32mSpanish commercial pages: ${esGiros.length} verticals plus the hub, every one paired both ways\x1b[0m`
  : `\x1b[31m${problems.length} Spanish commercial page problem(s)\x1b[0m`);
process.exit(problems.length ? 1 : 0);
