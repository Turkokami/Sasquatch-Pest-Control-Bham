import { getCollection } from 'astro:content';
import { towns, type Town } from '../data/towns';
import { builtTowns, areaServedOnly, inTerritory } from './geo';

/**
 * geo-content.ts — the two geo questions that need the content collection.
 *
 * These live here rather than in geo.ts for a concrete reason: geo.ts is
 * imported by scripts/tests/*, which run under tsx outside Astro, and tsx
 * cannot resolve the `astro:content` scheme. Putting a content import in
 * geo.ts took the whole test suite down before the build even started.
 *
 * The split is a real boundary, not a workaround. geo.ts answers questions
 * about places from data that is always available; this file answers questions
 * that depend on what has been written, which only exists inside a build.
 */

/**
 * Towns whose page is actually WRITTEN, as opposed to merely routed.
 *
 * builtTowns() answers "does this town earn a URL", which is a capacity
 * question about the town. It does not answer "is there anything on that URL
 * yet", which is a question about us, and the two had been treated as one.
 *
 * The consequence was live: Acme, Custer, Deming and Nooksack earn a page on
 * tier and have no content file, so the route ships them noindex with a
 * "Route live, content pending" notice — correct — and then the homepage, the
 * locations hub and the county page each linked to them twice anyway. Google
 * was told not to index them and every visitor was invited in. A reader who
 * clicked Acme got a stub with a build note on it.
 *
 * So the public rails read this instead. The routes still build, nothing
 * 404s, and the four towns keep being claimed by name through
 * mentionOnlyTowns() below — we do serve them, we just have not written the
 * page. When one is written, it appears here on its own with no list to
 * update, which is the whole point of deriving it.
 */
export async function writtenTowns(): Promise<Town[]> {
  const entries = await getCollection('locations');
  const written = new Set(entries.map((e) => e.id.replace(/\.md$/, '')));
  return builtTowns().filter((t) => written.has(t.slug));
}

/**
 * Everything we serve and do not currently link: the mention-only tier, plus
 * any town that earns a page and has not had one written yet.
 *
 * Keeping the second group in here is what makes the change above honest
 * rather than a quiet retreat. Dropping an unwritten town from the rails
 * without saying it anywhere would be narrowing the service area by accident.
 */
export async function mentionOnlyTowns(): Promise<string[]> {
  const written = new Set((await writtenTowns()).map((t) => t.slug));
  const unwritten = builtTowns()
    .filter((t) => !written.has(t.slug))
    .map((t) => t.name);
  return [...new Set([...areaServedOnly(towns.filter(inTerritory)), ...unwritten])].sort();
}
