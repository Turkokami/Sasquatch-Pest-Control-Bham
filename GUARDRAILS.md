# Guardrails — Sasquatch Pest Control (Bellingham, WA)

Keystone v2, Part 14 asks for one file per client that records the decisions a
future session would otherwise "fix" back. This is that file. Each entry says
what the decision is, where the code enforces it, and whether it is settled or
still waiting on the owner.

Written 10 Sep 2026, when Keystone v2 arrived; brought to Keystone v3.2 on 14 Sep 2026 (§11). If you change one of these, change
the entry here in the same commit.

---

## 1. Site separation — settled

This site is the Bellingham / Whatcom business only. No content, media, schema,
phone number, city or license number from Sasquatch TX, Coastal K9 or Guardian
Canine lands here, and nothing from here lands there. `/network/` links to the
Texas site as a separate business; it does not describe or borrow from it.

One exception, the owner's: Coastal K9 is listed on `/trusted-partners/` and
`/es/socios-de-confianza/` as a separate company Sasquatch contracts in. See §6.

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
Check 2c carries the Spanish regulated terms as well (INSPECTION_CLAIMS_ES and the
WDO rules), added before the Spanish termite and WDO pages were published.

**Client-attested, per Keystone v3.2 prime directive 9 and Part 14.** Every licence
number, credential, award and business fact on this site is written as the owner
supplied it, attributed to the business: the four WSDA licence numbers (owner, 10
Sep 2026), the Associate Certified Entomologist credential and the award rows
(owner, early Sep 2026), 360-410-2199 as the GBP number and Tyson Elling handling
Spanish calls (owner, 12 Sep 2026). None of it waits on independent verification,
and nothing the owner did not state is written. The `via` fields in
`src/data/business.ts` keep who supplied what.

## 3. Call tracking versus NAP (Part 4A.3) — settled

**Current state, measured 10 Sep 2026:** one number everywhere. 360-410-2199 is the
LocalBusiness `telephone`, the footer NAP, the contact page and every `tel:`
link. There is no dynamic number insertion and no tracking number on the site.
Harness check 6 fails any page where the displayed number and the schema number
differ, or where the number appears as plain text instead of a link.

**Owner confirmed, 12 Sep 2026:** 360-410-2199 is the number on the Google
Business Profile. That is v2's recommended arrangement — one number, everywhere —
so nothing changes. If a call-tracking number is ever wanted for ads, v2's rule
is: the GBP number stays in the schema node, the footer and the contact page; a
tracking number may only be swapped in client-side for paid and referral traffic.

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

## 6. Coastal K9 on /trusted-partners/ — settled, owner's call

Keystone Parts 1.3 and 1.4 say K9 detection is "exclusive to Coastal K9 and
Guardian — never on Sasquatch", list "any K9 service" as out of scope for
Sasquatch WA, and bar cross-linking Coastal K9 "as the same operator".
`src/data/services.ts` records the same brand wall.

On 8 Sep 2026 the owner asked for Coastal K9 & Pest Solutions (ck9ps.com) to be
listed on `/trusted-partners/` as a specialist Sasquatch contracts in for K9 bed
bug and rodent detection. The page does that. It presents them as a separate
company, not as the same operator, and the link is `rel="nofollow"`. That puts K9
detection content on a Sasquatch page, which Keystone forbids.

**Owner's decision, 12 Sep 2026: Coastal K9 stays.** The listing remains a
separate company contracted in — never the same operator, linked nofollow — and
`/es/socios-de-confianza/` now carries it too, with its own standard. Sasquatch
still sells no K9 service of its own; the retired `k9-bed-bug-detection` slug
stays retired. Keystone Parts 1.3 and 1.4 should be updated to match — v3.2
(14 Sep 2026) still says K9 detection is "never on Sasquatch". The owner's decision
here stands until the master is amended.

## 7. Word counts (M1) — settled by v2

There is no word floor. Pages carry a word band per page type as a diagnostic
(harness check 4). Nothing is to be stripped to fit a band before launch; after
launch, the consolidation queue is the Search Console "crawled / discovered – not
indexed" list plus pages with six months of zero clicks.

## 8. Bird work — settled: retired

**Owner's decision, 12 Sep 2026: "No bird work, drop it."** Retired outright,
residential and commercial. Every offer came out the same day: the berry and food
processing, marina, retail and dairy verticals; the Sumas, Lynden North Prairie and
Semiahmoo pages; the beetle-control page's nest removal; the commercial service
and hub photographs and captions; and all sixteen gallery images
(`src/data/retired-photos.ts`). Sentences saying we do not do bird work stay. The
Spanish tests keep failing any Spanish page that names birds. Keystone Part 1.4
still calls bird exclusion the standout local edge — v3.2 (14 Sep 2026) did not change
that line — and should be updated. The owner's decision here stands.

The history, for the record — three sources disagreed, and the site said both
things:

- **The owner's decision of 30 Aug 2026** (`RETIRED_TO_EXCLUSION` in
  `src/data/services.ts`): bird work and nuisance wildlife are out of scope.
  `/about/`, `/services/home-protection-plan/`, and the Sumas and Whatcom Falls
  pages say so to the reader.
- **Keystone v2, Part 1.4** still lists "bird exclusion as the standout local
  edge" for Sasquatch WA, and Part 1.3 names it as a differentiator to lead with.
- **Pages that offer it anyway:** the berry & food processing vertical (its FAQ
  answers "Is bird work available?" with "Exclusion and deterrence, yes —
  netting…"), the marinas and retail verticals, the photo caption on
  `/services/commercial-pest-control/` ("Bird exclusion on a commercial
  building"), and sixteen gallery images of bird netting and ledge work —
  thirteen whose alt text says so, and three (g27714, g27716, g27731) whose alt
  says only "exclusion" or "commercial work" but which show the same netting job
  when looked at. The Spanish gallery leaves all sixteen out.

A plausible reading is that residential bird work was retired and commercial
bird exclusion was not — but nothing on file says that, so nothing has been
changed. Once decided: if commercial bird exclusion is offered, the retirement
note and `/about/` need to say "residential"; if it is not, the three vertical
sections, the caption and the gallery captions come out. Either way, update
Keystone Part 1.4 to match so the standard stops contradicting the site.

## 9. Menus at the top, the form at the foot — settled, owner's call

On 11 Sep 2026 the owner asked for the selection menus (services, service areas
and the like) near the top of every page, "not buried under 3k worth of words",
and for the contact form to move down or become a button.

What the site does now, on every page from one component (`QuickNav.astro`):
the Quick Answer, then a call button and an estimate button, then the page's
menus as compact buttons.

On 12 Sep 2026 the owner asked to lessen the visual load, so each menu is a
collapsible bar (native `<details>`) with its link count: menus of six links or
fewer start open, longer ones start closed. Services are grouped by category and
Bellingham neighborhoods by area (North, Central, South, East & Lake Whatcom —
the `area` field in `src/data/towns.ts`, built in `src/lib/menus.ts`). ZIP
codes were considered and rejected: Bellingham's three residential ZIPs cut
across neighborhoods, and no verifiable source maps one to the other. The one lead form is rendered by `BaseLayout` at the
foot of `<main>`; the estimate button and the sticky mobile bar both jump to
it. Contact, 404 and `/network/` opt out with `leadForm={false}`. Reading
lists ("Guides", "From the blog", "Related guides", "Related posts") stay at
the foot of each page.

This departs from Keystone v2 Part 4.2, whose template orders place link blocks
mid-page or late. It was changed the way Part 4 says a contract changes — once,
for every page, from one place — and Part 4A's "primary CTA above the fold at
390px" is met by the action row. Do not move the rails back down to match the
Keystone order without asking the owner; update Part 4.2 instead.

Keystone v3.2 Part 3.5 (14 Sep 2026) also caps the masthead at four to seven
primary items. It held twelve; it now holds seven (Home, Services, Commercial,
Service areas, Pest library, About, Contact, and the Spanish equivalents). Guides
and the guarantee sit in the utility row beneath; Blog, Gallery, Awards and What we
apply are in the footer colophon on every page.

## 10. The Spanish tier — settled, owner's answers of 12 Sep 2026

- **Spanish calls:** Tyson Elling, Office Manager, handles Spanish-speaking
  callers on 360-410-2199. The schema's ContactPoint lists English and Spanish,
  and the Organization's `knowsLanguage` carries both.
- **No Spanish lead form yet.** The CRM form stays English; the Spanish pages say
  so beside the phone number. When a Spanish copy exists in the CRM, its form ID
  replaces that line.
- **The blog is not translated.** Its posts are archived or already covered by
  Spanish pages; the Spanish onward note lists it as English.

## 11. Keystone v3.2 intake — 14 Sep 2026

v3.2 consolidates v3.0–v3.2 and the v2.1 amendment. What it changed for this site,
and where each change now lives:

**Done at intake.**
- Social tags checked by value, not presence: og:url equals the canonical,
  twitter:card is summary_large_image (M5; harness check 2).
- Segmented XML sitemaps: `/sitemap.xml` is an index of one sitemap per page type,
  so Search Console reports indexation per tier (9.4, 16.4).
- Accessibility per template (Dimension 14): harness check 7 decides the mechanical
  subset from HTML and CSS; `scripts/check-tap-targets.mjs` measures 44px tap
  targets at 390px. Tap targets were fixed site-wide (global.css §24).
- Writer-register scanner (9.2 #6): harness check 8, flag for review, never a failure.
- Machine-readable prices (5.3): the bed bug Offer carries both published figures.
  priceValidUntil is omitted until the owner states a validity date.
- Masthead capped at seven primary items (3.5); see §9.
- Transport and AI-crawler access (9.1) checked on the deployed site: HSTS set,
  HTTP 308s to HTTPS, no mixed content, and GPTBot, OAI-SearchBot, ChatGPT-User,
  PerplexityBot, ClaudeBot and Bingbot all get a 200. Re-check on the real domain at
  cutover, because a WAF or host rule there can differ from Vercel's.

**The content backlog v3.2 created.** Three per-page gate items were added after
every page here was written. They gate new pages; for the live inventory they are a
backlog worked in batches of about ten (Part 13), reported per page type by harness
check 9 so the numbers fall as batches land. Baseline at intake:
- Snippet shape (4.3): the page type's real markup — an ordered list of three to
  seven steps on problem pages (0 of 46 had one), a cost-or-scope table on service
  spokes (0 of 46), an identification table plus a signs list on pest profiles (0 of
  106), an auditor table on verticals (0 of 18), a rule table on compliance guides.
- Citability (6.5): one primary authority named in a visible sentence and linked at
  the point of the claim. Almost every page cites sources in a block at the foot,
  which v3.2 no longer counts.
- A visible last-updated date tied to a substantive edit (6.6), never bumped to
  fake freshness. Almost no page shows one.
- Offer structure (4A.5): a two-column included / not-included scope block on each
  money service, and FAQs derived from the owner's real objections.

**Not applicable here, on the record.** Dataset and ClaimReview nodes (5.1 — a
service site does not get them); the React/Next rules (16.5 — Astro); the WordPress
tracks; popups and lead magnets (none exist, and 4A.5 keeps it that way).

**Limits worth stating.** The lead form is the CRM's iframe, so field-level form
instrumentation (4A.6) and an agent-actionable booking path (14) are not ours to
build inside it; the tel: link is the path an assistant can complete. The
measurement basis is search data, not call tracking (16.6), which matches §3.
