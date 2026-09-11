# Guardrails — Sasquatch Pest Control (Bellingham, WA)

Keystone v2, Part 14 asks for one file per client that records the decisions a
future session would otherwise "fix" back. This is that file. Each entry says
what the decision is, where the code enforces it, and whether it is settled or
still waiting on the owner.

Written 10 Sep 2026, when Keystone v2 arrived. If you change one of these, change
the entry here in the same commit.

---

## 1. Site separation — settled

This site is the Bellingham / Whatcom business only. No content, media, schema,
phone number, city or license number from Sasquatch TX, Coastal K9 or Guardian
Canine lands here, and nothing from here lands there. `/network/` links to the
Texas site as a separate business; it does not describe or borrow from it.

The Spanish tier under `/es/` is for Spanish speakers in Whatcom and Skagit. It is
**not** the site for a future El Salvador branch: it cites WSDA licensing,
Washington statute and a Pacific Northwest climate, and its hreflang is `es-US`.
A Salvadoran branch gets its own property. See the header of `src/data/i18n.ts`.

## 2. Credentials — settled

The company holds treatment licenses and does not hold, and is not pursuing, the
Structural Pest Inspector or SPI company license. So no page offers a WDO
inspection or a written record of findings in timber. A general free visit or
free inspection offer is the owner's confirmed policy and is permitted; the
regulated terms are not. Enforced by harness check 2c and `src/lib/seo.ts`.
**Open item:** check 2c only knows the regulated terms in English. It has to learn
the Spanish ones before any Spanish termite or WDO page is published.

## 3. Call tracking versus NAP (Part 4A.3) — waiting on the owner

**Current state, measured 10 Sep 2026:** one number everywhere. 360-410-2199 is the
LocalBusiness `telephone`, the footer NAP, the contact page and every `tel:`
link. There is no dynamic number insertion and no tracking number on the site.
Harness check 6 fails any page where the displayed number and the schema number
differ, or where the number appears as plain text instead of a link.

**What the owner needs to confirm:** that 360-410-2199 is the number on the
Google Business Profile. If it is, this is v2's recommended arrangement (one
number, everywhere) and nothing changes. If the GBP carries a different number,
or a call-tracking number is wanted for ads, v2's rule is: the GBP number stays
in the schema node, the footer and the contact page; a tracking number may only
be swapped in client-side for paid and referral traffic.

## 4. AI crawler policy (Part 14) — settled

Block nothing. `robots.txt` is `User-agent: * / Allow: /` and must stay that way.
For a local service business there is no licensing revenue to protect and being
cited is the whole point. Google-Extended does not control AI Overviews or AI
Mode anyway; those follow ordinary Googlebot indexing.

There is no `llms.txt` and none should be built — v2 records it as unused by the
crawlers it is meant for. IndexNow, if it is ever turned on, is a Bing and
AI-search measure, not a Google one, and must not be described as a Google tactic.

## 5. Reviews (Part 14) — owner acknowledgment wanted

The FTC Rule on Consumer Reviews and Testimonials is in active enforcement. The
company must not: offer anything in exchange for a review, send only happy
customers to a review site (gating), have staff or family write reviews, or
suppress negative ones. Asking every customer at job completion is fine and is
what v2 recommends. What moves rankings is **review cadence, not the total**: set
a monthly target and ask at every completed job.

On the site: the rating is shown as attributed copy linked to the Google profile.
It is not emitted as review or AggregateRating markup, because a business's own
reviews on its own site are not eligible for review rich results.

## 6. Coastal K9 on /trusted-partners/ — open, owner decision

Keystone Parts 1.3 and 1.4 say K9 detection is "exclusive to Coastal K9 and
Guardian — never on Sasquatch", list "any K9 service" as out of scope for
Sasquatch WA, and bar cross-linking Coastal K9 "as the same operator".
`src/data/services.ts` records the same brand wall.

On 8 Sep 2026 the owner asked for Coastal K9 & Pest Solutions (ck9ps.com) to be
listed on `/trusted-partners/` as a specialist Sasquatch contracts in for K9 bed
bug and rodent detection. The page does that. It presents them as a separate
company, not as the same operator, and the link is `rel="nofollow"`. But it does
put K9 detection content on a Sasquatch page, and the two instructions cannot
both be followed in full. Nothing has been changed; the owner decides which one
gives way.

## 7. Word counts (M1) — settled by v2

There is no word floor. Pages carry a word band per page type as a diagnostic
(harness check 4). Nothing is to be stripped to fit a band before launch; after
launch, the consolidation queue is the Search Console "crawled / discovered – not
indexed" list plus pages with six months of zero clicks.
