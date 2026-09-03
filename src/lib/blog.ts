import { getCollection, type CollectionEntry } from 'astro:content';

/**
 * Blog cross-linking, resolved in ONE place — the same discipline as
 * src/lib/guides.ts, and for the same reason.
 *
 * WHAT THIS FIXES. The imported blog is seventy posts and it was very nearly
 * an orphan tier. Measured across the built site, sixty-four of the seventy
 * had exactly one inbound link — the /blog/ index — and nothing else on the
 * site pointed at them at all. The six that did have links had seventy each.
 *
 * The cause was one predicate. The sibling rail on a post read
 *
 *     all.filter((x) => x.slug !== p.slug && !x.data.supersededBy).slice(0, 6)
 *
 * and fifty-six of the seventy posts declare supersededBy, so the pool it drew
 * from was the same fourteen posts on every page — and .slice(0, 6) then took
 * the same six of those fourteen, in collection order, seventy times. Every
 * post linked to an identical list. A rail that shows the same six links from
 * every page of a tier is not cross-linking, it is a footer.
 *
 * WHAT supersededBy IS, AND WHY IT IS THE RIGHT KEY. It names the page on the
 * new site that owns the post's topic — '/services/rodent-control/' for a post
 * about fall rodent-proofing. It was written as an import decision record, but
 * it is also the only topical classification the blog has, and it is a good
 * one, because it was assigned per post by reading the post. Using it here
 * means the relationship is declared once and read from both directions:
 * posts find their topical siblings through it, and the service, location and
 * guide pages find their posts through it.
 */

export type Post = CollectionEntry<'blog'>;

const href = (p: Post) => ({ href: `/blog/${p.slug}/`, label: p.data.h1 ?? p.data.title });

/**
 * Posts whose topic this page owns, for a rail on the owning page.
 *
 * This is the direction that did not exist before. Fifty-six posts declared a
 * target and no target ever linked back, so the declaration was carrying no
 * weight at all. Now the strongest pages on the site — the service spokes —
 * pass some of it down to the posts about them.
 */
export async function blogPostsFor(path: string) {
  const all = await getCollection('blog');
  return all
    .filter((p) => p.data.supersededBy === path)
    .sort((a, b) => (a.data.h1 ?? a.data.title).localeCompare(b.data.h1 ?? b.data.title))
    .map(href);
}

/**
 * Siblings for a post's own rail: topical first, then a rotating fill.
 *
 * TOPICAL FIRST. Other posts pointing at the same target are genuinely related
 * — five posts share /services/wasp-control/ — and they are the ones a reader
 * who got here from a search about wasps would want next.
 *
 * THEN ROTATED, NOT SLICED. Topical alone leaves the fourteen unclassified
 * posts with no siblings and the singleton topics with none either, so the
 * remainder is filled from the full list starting at this post's own index and
 * wrapping. That is the property the old code lacked: because every post
 * starts its window at a different place, the inbound links spread evenly
 * across the tier instead of pooling on whichever six sorted first. Seventy
 * posts times six links, distributed, rather than concentrated on six pages.
 */
export async function blogSiblings(slug: string, limit = 6) {
  const all = (await getCollection('blog')).sort((a, b) => a.slug.localeCompare(b.slug));
  const me = all.find((p) => p.slug === slug);
  const rest = all.filter((p) => p.slug !== slug);
  const target = me?.data.supersededBy;

  const topical = target ? rest.filter((p) => p.data.supersededBy === target) : [];
  const picked = [...topical];

  const start = Math.max(0, all.findIndex((p) => p.slug === slug));
  for (let i = 0; i < rest.length && picked.length < limit; i++) {
    const cand = rest[(start + i) % rest.length];
    if (!picked.some((p) => p.slug === cand.slug)) picked.push(cand);
  }
  return picked.slice(0, limit).map(href);
}
