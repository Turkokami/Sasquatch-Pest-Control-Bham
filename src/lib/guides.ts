import { getCollection, type CollectionEntry } from 'astro:content';

/**
 * Guide cross-linking, resolved in ONE place.
 *
 * Each guide declares in its own frontmatter which paths it is relevant to.
 * Every route that wants to show related guides calls guidesFor(path) — so the
 * relationship is written once and read from both directions, and there is no
 * second list on the service or location side to drift out of step with it.
 *
 * That is not a stylistic preference. Duplicate enumeration is the defect that
 * has bitten this build repeatedly: neighborhoods listed in three places
 * produced thirteen dead links, and areaServed keeping its own filter
 * republished a town the owner had excluded. One list, queried.
 */

export type Guide = CollectionEntry<'guides'>;

/**
 * A relatedTo entry matches a page in one of two ways, and which one is meant
 * is stated explicitly rather than inferred:
 *
 *   '/services/wdo-treatment/'  — that page, and only that page.
 *   '/services/*'               — every page one level under /services/,
 *                                 i.e. the service tier, NOT the problem
 *                                 pages beneath it.
 *
 * The explicit star exists because implicit prefixing is ambiguous in exactly
 * the way that produces quiet wrong answers. Without it, '/services/' has to
 * mean "the tier" while '/services/rodent-control/' has to mean "that page" —
 * two rules distinguished only by how many segments the author happened to
 * type, which put a guide about school pesticide notification onto a page
 * about rats in a crawlspace. A character that has to be typed on purpose is
 * cheaper than a convention people have to remember.
 */
function matches(pattern: string, path: string): boolean {
  if (pattern.endsWith('/*')) {
    const base = pattern.slice(0, -1); // keep the trailing slash
    if (!path.startsWith(base)) return false;
    const rest = path.slice(base.length).replace(/\/$/, '');
    return rest.length > 0 && !rest.includes('/');
  }
  return pattern === path;
}


/**
 * Published guides relevant to `path`, most specific first — an exact match
 * beats a section prefix, so a guide written for one service outranks one
 * written for all of them.
 */
export async function guidesFor(path: string): Promise<Guide[]> {
  const all = await getCollection('guides');
  return all
    .filter((g) => g.data.ready === true)
    .map((g) => {
      const hit = g.data.relatedTo.find((r) => matches(r, path));
      return hit ? { g, exact: hit === path } : null;
    })
    .filter((x): x is { g: Guide; exact: boolean } => x !== null)
    .sort((a, b) => Number(b.exact) - Number(a.exact))
    .map((x) => x.g);
}

/** Ready-made link rail items. */
export async function guideLinksFor(path: string) {
  return (await guidesFor(path)).map((g) => ({
    href: `/guides/${g.slug}/`,
    label: g.data.h1,
  }));
}
