# The legacy blog — what was brought across, and how

Owner asked on 31 Aug 2026 for the blog posts and their schema to be copied
onto the new site. This is the record of what was done. The per-post decisions
live in `src/data/blog-manifest.json`; the rules the import was held to live in
`docs/BLOG-IMPORT-BRIEF.md`. Both are kept, not deleted, because six months
from now the question will be "why isn't this post indexed" and the answer
needs to be findable.

---

## The short version

**70 posts imported, 8 excluded, 0 fabricated.** 14 publish indexable; 56 ship
`noindex` with a canonical pointing at the page that already covers the topic.
The acceptance gate passes and all 240 legacy URLs still resolve.

---

## Schema: could not be copied, and should not have been

Two separate findings, and both point the same way.

**Could not.** WebFetch strips `<script>` tags, so the old site's JSON-LD has
never been readable from this build. A verbatim fetch of
`/what-is-integrated-pest-management/` on 31 Aug 2026 also reported no JSON-LD
block present in the source at all.

**Should not.** This site emits one `@id`-anchored `@graph` from
`src/lib/schema.ts`, on every page, with `aggregateRating` structurally
impossible while the rating is PENDING. Pasting WordPress plugin schema
alongside it would produce duplicate and conflicting nodes — the exact defect
the single-emitter design exists to prevent.

Every imported post therefore gets schema from the emitter automatically, which
is better markup than the old site was carrying.

---

## The tier, and why it is built this way

`src/content/config.ts` defines a `blog` collection that deliberately does not
inherit `base`. Imported posts run 400–2,400 words and predate the AEO answer
contract, the FAQ contract and the 3,000-word floor by years. The two ways to
avoid saying that plainly were both worse: rewrite 70 posts to a standard they
were never built for, or quietly lower the floor sitewide.

So the blog is a declared separate class with a declared separate floor — 900
words, in `FLOORS.blog` in `scripts/harness.mjs`, alongside the existing
UTILITY and HUB exemptions and printed on every run.

**What is not relaxed:** the claim rules. Every imported post went through
harness check 2c exactly like everything else, and check 2b for prices.

### The `supersededBy` mechanism

Set it on a post and the post ships `noindex` with `<link rel="canonical">`
pointing at the page named. The text stays live and readable at its own URL; a
banner at the top links the reader to the current page; the ranking signal is
assigned to the page that earned it.

`BaseLayout` throws at build time if `canonicalTo` is passed without `noindex`,
because a page that declares itself a duplicate while asking to be indexed is a
contradiction that would otherwise be discovered in a crawl report months
later.

**This mechanism is the whole reason the import was safe to do.** Roughly 56 of
the 70 posts cover a topic the new site already handles at 3,000+ words. The
old site's core defect was near-duplicate URLs splitting their own signal;
importing those posts as ordinary indexable pages would have rebuilt that
defect on the content side immediately after it was fixed on the service side.

---

## What was excluded, and on what grounds

Eight URLs. Five bird, two mosquito, one held.

| Slug | Grounds |
|---|---|
| `seagull-swallow-exclusion-washington` | bird work, out of scope 30 Aug 2026 |
| `bird-exclusion` | same |
| `bird-exclusion-bellingham-wa` | same |
| `bird-nesting-solar-panels-washington` | same |
| `rodents-birds-bellingham` | half bird exclusion; the rodent half duplicates `/services/rodent-control/`, so nothing is left |
| `battling-mosquitoes` | mosquito control is not offered — `RETIRED_TO_LIBRARY` |
| `mosquito-control-bellingham-wa` | same |
| `free-pest-inspection-bellingham` | **held, not dropped** — pending the owner's decision |

All eight keep their existing 301s.

---

## What had to be edited, and why "verbatim" has limits

The brief made nine categories of edit mandatory, overriding verbatim import.
Every one is either something the build rejects or something no longer true.
The full per-post list of removals is in the import agents' reports; the
categories:

- **Prices** — the legacy pages were still publishing **$350 per room**, which
  `business.ts` shows was raised to $395 on 30 Aug. Every figure was removed
  rather than corrected; prices publish from one file only.
- **Inspection authority** — offers of a written report of *findings* were
  reworded to a record of the *treatment performed*, sitewide. The termite and
  wood-boring-beetle posts were the worst offenders, and they are precisely the
  context where such an offer becomes a regulated WDO report under
  WAC 16-228-2045.
- **Guarantee language** — "100% service guarantee" appeared on more than
  twenty of the imported posts and is gone from all of them.
- **Awards, ratings, review counts, founding year, customer counts** — none
  verified, all removed.
- **Bird, wildlife, mosquito, tick, cricket and springtail service offers** —
  out of scope.
- **Staff names and credentials in body copy** — those publish from
  `business.ts`.

### Factual corrections made during the import

These were wrong on the live site and are worth listing, because they are the
part of this job with the most real-world consequence:

- **Brown recluse spiders** presented as a local threat. Not established in
  Washington; verified records essentially absent.
- **Hobo spider** necrosis. Unsupported; the CDC removed it from its venomous
  spider list in 2017.
- **Subterranean termites and mud tubes** presented as the local termite story
  across five posts. That is Southern-US content. The Pacific dampwood termite
  is the local species; the wood destroyers that matter here are decay fungi,
  carpenter ants and dampwood termites.
- **Powderpost beetles (Lyctidae)** presented as the threat to flood-soaked
  framing. Lyctids need hardwood sapwood; Douglas fir and hemlock framing here
  is attacked by anobiids.
- **Heat treatment at 120°F** stated as lethal for wood-boring insects. Below
  lethal; the lumber standard is ~133°F core for 30 minutes.
- **Bed bug bite patterns** presented as identification. Bites are not
  diagnostic — reactions vary and many people never react at all.
- **Quarter-inch gaps described as "the size of a dime"** in three posts, twice
  self-contradictorily. A dime is roughly 0.7 inch.
- **Hantavirus** attributed to rodents generally. Carried here by native deer
  mice, not house mice or rats.
- **Eastern yellowjacket** and **European hornet** described as local. Neither
  occurs in Washington.
- **Mothballs** recommended as a rodent repellent. Ineffective, and an
  off-label use.
- **Wasp stings** — readers told to remove the stinger. Wasps have smooth
  stingers and do not leave one; that is a honey bee.

---

## Word floors, and one honest consequence

Seven posts planned as standing came back under the 900-word floor at source.
None was padded. Each was given the `supersededBy` that fits it, which is what
section 5 of the brief calls for. `blog-manifest.json` marks those seven with a
note so the change is visible rather than silent.

Separately, marking `LinkRail` as `data-boilerplate` — a rail of sibling links
is navigation, not writing, and should never have counted toward a uniqueness
floor — dropped every page's measured word count by 30–60 and put 17 existing
pages just under their floors. Those pages were brought back over with real
added substance, page by page, not filler. The reasoning is recorded in the
component itself.

---

## Redirects

The 14 standing posts now 301 from their legacy URL to `/blog/<slug>/`, which
is a strict improvement on the fuzzy targets they had.

The 56 superseded posts keep their 301 to the strong new page rather than
redirecting to their own archived copy. That is deliberate: the equity belongs
on the page that earned it, and a redirect into a `noindex` page would waste
it. The archived text is reachable from `/blog/` and from the site's internal
links; it is simply not what the old URL resolves to.

---

*Written 31 Aug 2026. Unlike the version this replaces, this file is a record
rather than a proposal — keep it.*
