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
  /* RETURNS NOTHING SINCE 7 NOV 2026, and the reason is structural rather
     than a change of mind about the idea.
     ----------------------------------------------------------------------
     This filtered for posts whose supersededBy equals THIS page — so every
     post it ever returned was, by definition, a superseded one. Those posts
     are no longer built: they 301 to the page that replaced them, which is
     the page this rail renders on. Every link it produced would therefore be
     a link from a page, through a redirect, back to itself.
     The site's own dead-link check caught all 59 of them.

     The relationship the rail was built to express is now carried by the
     redirect itself, which is a stronger signal than a rail link: the old
     post's rankings and inbound links are handed to this page outright
     rather than pointed at from it.

     Kept as a function returning an empty array rather than deleted, because
     five templates call it and their rails already handle an empty list by
     rendering nothing. Delete it and its call sites together when somebody
     is next in these files for another reason. */
  void path;
  return [] as ReturnType<typeof href>[];
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
  /* Superseded posts are not built any more — they 301 to the page that
     replaced them (see getStaticPaths in blog/[post].astro). A rail linking
     to one would be a link to a redirect at best and a dead link at worst,
     so they are filtered out of the candidate pool here rather than caught
     later by the harness. `me` is still looked up in the unfiltered list,
     because the post being rendered may itself be superseded in a build
     where that changes. */
  const built = (await getCollection('blog')).sort((a, b) => a.slug.localeCompare(b.slug));
  const me = built.find((p) => p.slug === slug);
  const all = built.filter((p) => !p.data.supersededBy);
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
