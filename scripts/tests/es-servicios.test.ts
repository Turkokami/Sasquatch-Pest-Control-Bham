/**
 * Keystone Part 3.3 — every Spanish service page has an English twin, and
 * every twin knows about it.
 *
 * The Spanish services moved from one flat file to a module per service when
 * they grew to full depth. That is exactly the kind of change where a page
 * quietly falls out of the list, or gets a slug that no longer matches the
 * hreflang pair, and nothing looks wrong: the Spanish page still builds, it
 * just stops pointing at its English counterpart, and crawlers ignore an
 * hreflang pair that only points one way.
 *
 * Four things are pinned:
 *   1. every Spanish service's enPath is a key in PAGE_PAIRS, and PAGE_PAIRS
 *      sends it to exactly /es/servicios/<slug>/;
 *   2. every /es/servicios/<x>/ value in PAGE_PAIRS has a Spanish service
 *      behind it — no hreflang pointing at a 404;
 *   3. slugs are unique;
 *   4. the English page each one claims to mirror actually exists as a
 *      content file. This is services.ts's rule — never invent a service —
 *      applied to the second language.
 */
import { existsSync } from 'node:fs';
import { esServicios } from '../../src/data/es-servicios';
import { PAGE_PAIRS } from '../../src/data/i18n';

const problems: string[] = [];

for (const s of esServicios) {
  const want = `/es/servicios/${s.slug}/`;
  const got = PAGE_PAIRS[s.enPath];
  if (got === undefined) problems.push(`${s.slug}: enPath ${s.enPath} is not in PAGE_PAIRS`);
  else if (got !== want) problems.push(`${s.slug}: PAGE_PAIRS sends ${s.enPath} to ${got}, not ${want}`);

  const m = s.enPath.match(/^\/services\/([^/]+)\/$/);
  if (!m) problems.push(`${s.slug}: enPath ${s.enPath} is not a /services/<slug>/ path`);
  else if (!existsSync(`src/content/services/${m[1]}.md`))
    problems.push(`${s.slug}: no English content file src/content/services/${m[1]}.md`);
}

const have = new Set(esServicios.map((s) => `/es/servicios/${s.slug}/`));
for (const es of Object.values(PAGE_PAIRS)) {
  if (/^\/es\/servicios\/[^/]+\/$/.test(es) && !have.has(es))
    problems.push(`PAGE_PAIRS points at ${es}, which no Spanish service builds`);
}

const seen = new Set<string>();
for (const s of esServicios) {
  if (seen.has(s.slug)) problems.push(`duplicate slug ${s.slug}`);
  seen.add(s.slug);
}

/* Keystone M2 and M5 on the Spanish data, added 10 Sep 2026. English pages
   get these from the content-collection schema; these modules are plain
   TypeScript and got nothing, which is how three Quick Answers ran to 68–73
   words and a description to 170 characters without anything noticing. The
   rendered-page harness trims a long description rather than failing it, so
   the source has to be held here. */
for (const s of esServicios) {
  const words = s.answer.trim().split(/\s+/).length;
  if (words < 40 || words > 60) problems.push(`${s.slug}: Quick Answer is ${words} words (M2: 40–60)`);
  if (s.title.length > 60) problems.push(`${s.slug}: title is ${s.title.length} characters (M5: ≤ 60)`);
  const d = s.description.trim();
  if (d.length < 110 || d.length > 165) problems.push(`${s.slug}: description is ${d.length} characters (M5: 110–165)`);
  if (!/[.!?]$/.test(d)) problems.push(`${s.slug}: description does not end on punctuation`);
  if (s.faqs.length === 0) problems.push(`${s.slug}: no FAQ block (M2)`);
}

for (const p of problems) console.log(`WRONG: ${p}`);
console.log(problems.length === 0
  ? `\x1b[32mSpanish services: ${esServicios.length} pages, every one paired both ways\x1b[0m`
  : `\x1b[31m${problems.length} Spanish service pairing problem(s)\x1b[0m`);
process.exit(problems.length ? 1 : 0);
