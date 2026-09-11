/**
 * Keystone Part 3.3 — the Spanish pest library claims nothing the English
 * one does not, and every profile is paired both ways.
 *
 * Pinned:
 *   1. every Spanish profile names a species in src/data/pests.ts that has an
 *      English profile file — the inclusion standard in pests.ts, applied to
 *      the second language (the route throws on this too; the test says so
 *      before a build has to);
 *   2. slugs are unique, species are unique (two Spanish pages for one
 *      species would be two hreflang targets for one English page), and
 *      slugs are plain lowercase ASCII, because an accented URL is one a
 *      reader cannot type from a phone keyboard reliably;
 *   3. PAGE_PAIRS sends each English profile to exactly its Spanish page;
 *   4. Keystone M2 and M5 on the data — the same limits es-servicios.test.ts
 *      holds, for the same reason: these modules are plain TypeScript and
 *      the content-collection schema never sees them.
 */
import { existsSync } from 'node:fs';
import { esPlagas } from '../../src/data/es-plagas';
import { pestBySlug } from '../../src/data/pests';
import { PAGE_PAIRS } from '../../src/data/i18n';

const problems: string[] = [];
const slugs = new Set<string>();
const species = new Set<string>();

for (const p of esPlagas) {
  if (!pestBySlug(p.species)) problems.push(`${p.slug}: species "${p.species}" is not in src/data/pests.ts`);
  if (!existsSync(`src/content/pests/${p.species}.md`))
    problems.push(`${p.slug}: no English profile src/content/pests/${p.species}.md`);

  if (slugs.has(p.slug)) problems.push(`duplicate slug ${p.slug}`);
  slugs.add(p.slug);
  if (species.has(p.species)) problems.push(`two Spanish profiles for ${p.species}`);
  species.add(p.species);
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(p.slug)) problems.push(`${p.slug}: slug is not lowercase ASCII kebab-case`);

  const want = `/es/plagas/${p.slug}/`;
  const got = PAGE_PAIRS[`/pest-library/${p.species}/`];
  if (got !== want) problems.push(`${p.slug}: PAGE_PAIRS sends /pest-library/${p.species}/ to ${got}, not ${want}`);

  const words = p.answer.trim().split(/\s+/).length;
  if (words < 40 || words > 60) problems.push(`${p.slug}: Quick Answer is ${words} words (M2: 40–60)`);
  if (p.title.length > 60) problems.push(`${p.slug}: title is ${p.title.length} characters (M5: ≤ 60)`);
  const d = p.description.trim();
  if (d.length < 110 || d.length > 165) problems.push(`${p.slug}: description is ${d.length} characters (M5: 110–165)`);
  if (!/[.!?]$/.test(d)) problems.push(`${p.slug}: description does not end on punctuation`);
  if (p.faqs.length === 0) problems.push(`${p.slug}: no FAQ block (M2)`);
  if (p.secciones.length === 0) problems.push(`${p.slug}: no sections`);
}

for (const p of problems) console.log(`WRONG: ${p}`);
console.log(problems.length === 0
  ? `\x1b[32mSpanish pest library: ${esPlagas.length} profiles, every one paired both ways\x1b[0m`
  : `\x1b[31m${problems.length} Spanish pest library problem(s)\x1b[0m`);
process.exit(problems.length ? 1 : 0);
