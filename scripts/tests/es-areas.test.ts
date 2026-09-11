/**
 * Keystone Part 3.3 — the Spanish place pages serve no place the English
 * ones do not, and every one is paired both ways.
 *
 * Pinned:
 *   1. every Spanish town names a town in builtTowns(), every Spanish
 *      neighborhood a paged neighborhood of that town, and every county one of
 *      the two county pages — the route throws on these too; the test says so
 *      before a build has to;
 *   2. no place has two Spanish pages (two hreflang targets for one English
 *      page), and Spanish county slugs are plain lowercase ASCII;
 *   3. PAGE_PAIRS sends each English place page to exactly its Spanish page;
 *   4. Keystone M2 and M5 on the data, as es-plagas.test.ts holds them;
 *   5. a Spanish neighborhood never exists without its town's Spanish page,
 *      because its breadcrumb and its "Más de <pueblo>" rail need one.
 */
import { esLugares, esPathOf, enPathOf, isCounty, esPueblo } from '../../src/data/es-areas';
import { builtTowns, pagedNeighborhoods } from '../../src/lib/geo';
import { PAGE_PAIRS } from '../../src/data/i18n';

const problems: string[] = [];
const seen = new Set<string>();
const built = builtTowns();

for (const l of esLugares) {
  const id = l.barrio ? `${l.town}/${l.barrio}` : l.town;
  if (isCounty(l)) {
    if (l.barrio) problems.push(`${id}: a county page cannot have a neighborhood`);
    if (!l.slugEs || !/^[a-z0-9]+(-[a-z0-9]+)*$/.test(l.slugEs)) problems.push(`${id}: county needs a lowercase ASCII slugEs`);
  } else {
    const town = built.find((t) => t.slug === l.town);
    if (!town) problems.push(`${id}: "${l.town}" has no English town page (builtTowns)`);
    if (l.slugEs) problems.push(`${id}: only county pages take a slugEs — a town keeps its English slug`);
    if (l.barrio) {
      if (town && !pagedNeighborhoods(town).some((n) => n.slug === l.barrio))
        problems.push(`${id}: "${l.barrio}" is not a paged neighborhood of ${l.town}`);
      if (!esPueblo(l.town)) problems.push(`${id}: neighborhood registered before its town's Spanish page`);
    }
  }

  if (seen.has(id)) problems.push(`two Spanish pages for ${id}`);
  seen.add(id);

  const got = PAGE_PAIRS[enPathOf(l)];
  if (got !== esPathOf(l)) problems.push(`${id}: PAGE_PAIRS sends ${enPathOf(l)} to ${got}, not ${esPathOf(l)}`);

  const words = l.answer.trim().split(/\s+/).length;
  if (words < 40 || words > 60) problems.push(`${id}: Quick Answer is ${words} words (M2: 40–60)`);
  if (l.title.length > 60) problems.push(`${id}: title is ${l.title.length} characters (M5: ≤ 60)`);
  const d = l.description.trim();
  if (d.length < 110 || d.length > 165) problems.push(`${id}: description is ${d.length} characters (M5: 110–165)`);
  if (!/[.!?]$/.test(d)) problems.push(`${id}: description does not end on punctuation`);
  if (l.faqs.length === 0) problems.push(`${id}: no FAQ block (M2)`);
  if (l.secciones.length === 0) problems.push(`${id}: no sections`);
}

for (const p of problems) console.log(`WRONG: ${p}`);
console.log(problems.length === 0
  ? `\x1b[32mSpanish place pages: ${esLugares.length} pages, every one paired both ways\x1b[0m`
  : `\x1b[31m${problems.length} Spanish place page problem(s)\x1b[0m`);
process.exit(problems.length ? 1 : 0);
