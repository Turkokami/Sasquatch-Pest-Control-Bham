/**
 * Keystone Part 3.3 — the Spanish problem pages serve no problem the English
 * ones do not, sit under a service that has a Spanish page, and are paired
 * both ways.
 *
 * Pinned:
 *   1. every Spanish problem names a live English service and a problem that
 *      service publishes, and that service has a Spanish page — the route
 *      throws on this too; the test says so before a build has to;
 *   2. no problem has two Spanish pages, and Spanish slugs are plain
 *      lowercase ASCII and unique under their service;
 *   3. PAGE_PAIRS sends each English problem page to exactly its Spanish page;
 *   4. Keystone M2 and M5 on the data;
 *   5. no free-visit offer on a page under a service that is excepted from
 *      it (bed bugs today) — the exception list is read from business.ts, the
 *      same list the harness and src/lib/offer.ts read;
 *   6. no bird-work wording, for the reason es-comercial.test.ts gives.
 */
import { esProblemas, esProblemaPath, enProblemaPath, esServicioSlugOf } from '../../src/data/es-problemas';
import { liveServices } from '../../src/data/services';
import { PAGE_PAIRS } from '../../src/data/i18n';
import { freeInspectionForSlug } from '../../src/lib/offer';

const problems: string[] = [];
const seen = new Set<string>();
const seenPath = new Set<string>();
const BIRDS = /(^|[^\p{L}])(aves?|pájaros?|gaviotas?|palomas?|golondrinas?)(?![\p{L}])/iu;
const FREE = /(revisión|visita|inspección|evaluación) (es )?(gratis|gratuita|sin costo)/iu;

for (const p of esProblemas) {
  const id = `${p.service}/${p.problem}`;
  const s = liveServices().find((x) => x.slug === p.service);
  if (!s) problems.push(`${id}: "${p.service}" is not a live English service`);
  else if (!s.problems?.some((x) => x.slug === p.problem)) problems.push(`${id}: "${p.problem}" is not a problem of ${p.service}`);
  if (!esServicioSlugOf(p)) problems.push(`${id}: the service has no Spanish page`);
  if (seen.has(id)) problems.push(`two Spanish pages for ${id}`);
  seen.add(id);
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(p.slug)) problems.push(`${id}: slug "${p.slug}" is not lowercase ASCII`);
  if (seenPath.has(esProblemaPath(p))) problems.push(`${id}: ${esProblemaPath(p)} is used twice`);
  seenPath.add(esProblemaPath(p));

  const got = PAGE_PAIRS[enProblemaPath(p)];
  if (got !== esProblemaPath(p)) problems.push(`${id}: PAGE_PAIRS sends ${enProblemaPath(p)} to ${got}, not ${esProblemaPath(p)}`);

  const words = p.answer.trim().split(/\s+/).length;
  if (words < 40 || words > 60) problems.push(`${id}: Quick Answer is ${words} words (M2: 40–60)`);
  if (p.title.length > 60) problems.push(`${id}: title is ${p.title.length} characters (M5: ≤ 60)`);
  const d = p.description.trim();
  if (d.length < 110 || d.length > 165) problems.push(`${id}: description is ${d.length} characters (M5: 110–165)`);
  if (!/[.!?]$/.test(d)) problems.push(`${id}: description does not end on punctuation`);
  if (p.faqs.length === 0) problems.push(`${id}: no FAQ block (M2)`);

  const text = [p.h1, p.title, p.description, p.answer,
    ...p.secciones.flatMap((x) => [x.h2, ...x.parrafos, ...(x.lista ?? [])]),
    ...p.faqs.flatMap((f) => [f.q, f.a])].join('\n');
  const bird = text.match(BIRDS);
  if (bird) problems.push(`${id}: mentions "${bird[2]}" — bird work is retired (owner, 12 Sep 2026)`);
  if (!freeInspectionForSlug(p.service)) {
    const m = text.match(FREE);
    if (m) {
      const at = text.indexOf(m[0]);
      if (!/(no|salvo|excepto|menos|excepción)/i.test(text.slice(Math.max(0, at - 90), at)))
        problems.push(`${id}: offers "${m[0]}", but ${p.service} is excepted from the free visit`);
    }
  }
}

for (const p of problems) console.log(`WRONG: ${p}`);
console.log(problems.length === 0
  ? `\x1b[32mSpanish problem pages: ${esProblemas.length} pages, every one paired both ways\x1b[0m`
  : `\x1b[31m${problems.length} Spanish problem page problem(s)\x1b[0m`);
process.exit(problems.length ? 1 : 0);
