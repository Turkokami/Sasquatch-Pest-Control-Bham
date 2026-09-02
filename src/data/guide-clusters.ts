/**
 * The guide clusters — single source of truth.
 *
 * These used to exist twice: as a Zod enum in `src/content/config.ts` and as a
 * literal array of `{ key, name, blurb }` inside `src/pages/guides/index.astro`.
 * Adding a fourth cluster meant editing both, and forgetting either one gives
 * you a guide that validates but never appears on its hub, or a hub section
 * that renders empty forever. That is the same defect the pest enumeration had
 * before `src/data/pests.ts`, and the blog rail had before `LinkRail` was
 * marked boilerplate — one list, two homes, quietly drifting.
 *
 * So: the keys live here, the schema derives its enum from here, and the hub
 * renders from here.
 */

export const GUIDE_CLUSTERS = [
  {
    key: 'compliance',
    name: 'Rules and obligations',
    blurb:
      'What the law actually says about pests in rentals, in schools and in buildings that change hands — with the statute quoted and linked, so you are not taking our word for it.',
  },
  {
    key: 'building',
    name: 'Buildings and moisture',
    blurb:
      'Why buildings in this climate fail where they do, and how that decides which pests you get. Most of the pest problems here start as water problems.',
  },
  {
    key: 'seasonal',
    name: 'The Whatcom County pest year',
    blurb:
      'What arrives when, and the weeks in which doing something about it is cheap rather than expensive.',
  },
  {
    key: 'practice',
    name: 'How the work is done, and how to buy it',
    blurb:
      'What the trade’s words actually mean, what a treatment can and cannot achieve, what moves the price, and how to tell a company worth hiring from one that is selling fear.',
  },
] as const;

export type GuideClusterKey = (typeof GUIDE_CLUSTERS)[number]['key'];

/** The keys, in declaration order — what the collection schema validates against. */
export const GUIDE_CLUSTER_KEYS = GUIDE_CLUSTERS.map((c) => c.key) as unknown as [
  GuideClusterKey,
  ...GuideClusterKey[],
];
