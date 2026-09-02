import { defineCollection, z } from 'astro:content';
import { GUIDE_CLUSTER_KEYS } from '../data/guide-clusters';

/**
 * Content collections hold the 3–5k word bodies with rich frontmatter,
 * matched to the data row by slug. Bad data fails fast here rather than
 * shipping — Keystone Part 6.2: "Writers output directly into the content
 * collection. Bad data fails fast against the collection schema."
 *
 * A page renders its markdown body when one exists and falls back to a
 * generated stub when it doesn't. That is what lets all routes stand up
 * first and content pour in waves without the site ever being broken.
 */

/** The AEO Quick Answer — 40–60 words, enforced at parse time. */
const answer = z
  .string()
  .refine((s) => {
    const w = s.trim().split(/\s+/).filter(Boolean).length;
    return w >= 40 && w <= 60;
  }, { message: 'answer must be 40–60 words (Keystone AEO contract)' })
  .refine((s) => !/^(tap|click|scroll|select|choose)\b/i.test(s.trim()), {
    message: 'answer must answer the question, not give an instruction',
  });

/** Exactly the questions rendered on the page. One block, never two. */
const faqs = z
  .array(z.object({ q: z.string().min(8), a: z.string().min(40) }))
  .min(3)
  .max(8)
  .refine((list) => new Set(list.map((f) => f.q.toLowerCase().trim())).size === list.length, {
    message: 'duplicate FAQ question in the same block',
  })
  .refine((list) => list.every((f) => /\?$/.test(f.q.trim())), {
    message: 'every FAQ item must be a question — no referral CTAs in the FAQ block',
  });

const seo = {
  title: z.string().max(60, 'title must be ≤ 60 characters'),
  description: z
    .string()
    .min(110, 'description must be ≥ 110 characters')
    .max(165, 'description must be ≤ 165 characters')
    .refine((s) => /[.!?]$/.test(s.trim()), { message: 'description must end on punctuation' }),
};

const image = z.object({
  src: z.string(),
  alt: z.string().min(10).max(125, 'alt ≤ 125 chars, describes the image not the keyword'),
  width: z.number().optional(),
  height: z.number().optional(),
});

const base = {
  ...seo,
  h1: z.string(),
  answer,
  faqs,
  hero: image.optional(),
  /** Named expert whose credential is shown on this page. */
  expert: z.enum(['kristofer-elling', 'jorge-bedoya']).optional(),
  updated: z.coerce.date().optional(),
  /** Set true only once the page clears 3,000 unique words. */
  ready: z.boolean().default(false),
};

export const collections = {
  services: defineCollection({
    type: 'content',
    schema: z.object({ ...base, service: z.string() }),
  }),
  problems: defineCollection({
    type: 'content',
    schema: z.object({ ...base, service: z.string(), problem: z.string() }),
  }),
  locations: defineCollection({
    type: 'content',
    schema: z.object({ ...base, town: z.string(), neighborhood: z.string().optional() }),
  }),
  pages: defineCollection({
    type: 'content',
    schema: z.object({ ...base, path: z.string() }),
  }),
  /**
   * GUIDES — the Phase 5 blue-ocean clusters. Reference content on rules,
   * obligations and building science that nobody else in this market publishes
   * accurately, if at all.
   *
   * `sources` is REQUIRED and non-empty. A guide makes factual, legal or
   * regulatory claims, and CONTENT_BRIEF requires every one of those to carry a
   * source and a review date. Making the field mandatory in the schema means a
   * guide without citations fails at author time rather than at review time.
   *
   * `reviewBy` is REQUIRED for the same reason: a regulatory page with no
   * expiry silently rots into a liability. Dated in the frontmatter, surfaced
   * on the page, and checkable in bulk.
   */
  guides: defineCollection({
    type: 'content',
    schema: z.object({
      ...base,
      /* Derived from src/data/guide-clusters.ts — see the note there. */
      cluster: z.enum(GUIDE_CLUSTER_KEYS),
      /** Primary sources, read directly. Title + URL + the date it was read. */
      sources: z
        .array(
          z.object({
            label: z.string().min(4),
            url: z.string().url(),
            read: z.coerce.date(),
          }),
        )
        .min(1, 'a guide must cite at least one source it was written from'),
      /** When this page must be re-checked against the source. */
      reviewBy: z.coerce.date(),
      /** Guides touching law carry an explicit not-legal-advice line. */
      legalDisclaimer: z.boolean().default(false),
      /**
       * Paths this guide is relevant to. Declared ONCE, here, and read from
       * both directions: the guide links out to these pages, and those pages
       * pull in this guide.
       *
       * The recurring defect in this codebase is the same list existing in two
       * places and drifting. A `related` array on the guide plus a `guides`
       * array on every service would be exactly that bug. So the relationship
       * lives on the guide and the routes query it.
       *
       * Two forms, and which is meant is explicit rather than inferred:
       *   '/services/wdo-treatment/'  — that page only
       *   '/services/*'               — every page one level under /services/,
       *                                 the service tier, not the problem
       *                                 pages beneath it.
       */
      relatedTo: z.array(z.string()).default([]),
    }),
  }),

  /**
   * PESTS — the species profiles under /pest-library/.
   *
   * These carry the full `base` contract, unlike the blog: a profile is new
   * writing at the site standard, not an import, so there is no reason to
   * exempt it from anything.
   *
   * `species` must match a slug in `src/data/pests.ts`, checked in the route.
   * The enumeration lives there and only there — the hub renders from it and
   * the profiles are matched against it, so a profile for a species the site
   * does not claim lives here cannot quietly appear.
   *
   * `sources` is required for the same reason it is required on guides: a
   * profile makes claims about biology, risk and regional distribution, and
   * the whole value of this library over a national template is that its
   * claims are checkable. `reviewBy` is required because a species page that
   * silently rots is worse than no species page — distributions change, and
   * the hobo spider entry is a standing reminder of what happens when
   * out-of-date risk claims stay online for a decade.
   */
  pests: defineCollection({
    type: 'content',
    schema: z.object({
      ...base,
      /** Slug in src/data/pests.ts. The route fails the build if it is unknown. */
      species: z.string(),
      /**
       * The honest headline answer on whether this species warrants treating.
       * Stated as an enum rather than left to prose, because "does this need
       * treating" is the question every visitor arrives with and the one a
       * pest control company has the strongest incentive to fudge.
       */
      treatment: z.enum([
        'treat',            // we treat this, and it usually warrants it
        'depends',          // sometimes warranted, sometimes not — the profile says which
        'rarely-warranted', // we can, but usually it is a caulking or cleaning job
        'we-do-not',        // out of scope, or protected — the profile says where to go
      ]),
      /** Species this one is routinely confused with. Slugs from pests.ts. */
      confusedWith: z.array(z.string()).default([]),
      sources: z
        .array(z.object({ label: z.string().min(4), url: z.string().url(), read: z.coerce.date() }))
        .min(1, 'a species profile must cite at least one source it was written from'),
      reviewBy: z.coerce.date(),
    }),
  }),

  /**
   * BLOG — the 76 posts imported from the legacy WordPress site, kept because
   * the owner asked for them to come across and because several of them are
   * genuinely decent writing that predates this build.
   *
   * This collection deliberately does NOT inherit `base`, and the reason
   * matters. `base` carries the M1 contract: a 40–60 word AEO answer, a 3–8
   * item FAQ block, a `ready` flag standing for 3,000 unique words. Imported
   * posts run 1,400–2,400 words and were written years before any of those
   * rules existed. Bolting `base` on would mean either rewriting all 76 to hit
   * a floor they were never built for, or quietly lowering the floor for the
   * whole site. Both are worse than saying plainly that blog posts are a
   * separate class of page with a separate, lower, still-real floor.
   *
   * What is NOT relaxed: the claim rules. Every imported post goes through
   * harness check 2c exactly like everything else. Copy written before
   * `src/lib/seo.ts` existed should be assumed to violate it until it doesn't.
   */
  blog: defineCollection({
    type: 'content',
    schema: z.object({
      ...seo,
      h1: z.string(),
      hero: image.optional(),
      /**
       * The legacy URL this was imported from — root-level path, trailing
       * slash. Required: an imported post carrying no provenance is
       * indistinguishable from one written here, and the two need different
       * treatment on every question that follows.
       */
      legacyUrl: z
        .string()
        .regex(/^\/[a-z0-9-]+\/$/, 'legacyUrl is a root-level path with a trailing slash'),
      /** Date the post was imported into this build. */
      imported: z.coerce.date(),
      /**
       * The new-site page that owns this topic, where one does.
       *
       * Set it and the post publishes `noindex` with its canonical pointing at
       * that page — the text stays live and readable, the ranking signal stays
       * with the page that earned it. Roughly 45 of the 76 land here, and that
       * is the whole reason this tier is safe to build: the old site split its
       * own signal across near-duplicate URLs, and importing those as ordinary
       * indexable pages would rebuild that defect on the content side
       * immediately after we finished fixing it on the service side.
       *
       * Leave unset only when nothing on the new site covers the topic.
       */
      supersededBy: z
        .string()
        .regex(/^\/[a-z0-9/-]*\/$/, 'supersededBy is a site path with a trailing slash')
        .optional(),
      /** Optional — imported posts mostly predate the AEO answer contract. */
      answer: answer.optional(),
      /** Optional — kept verbatim where the original carried an FAQ block. */
      faqs: faqs.optional(),
      updated: z.coerce.date().optional(),
    }),
  }),
};
