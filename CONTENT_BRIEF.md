# Content brief — Sasquatch WA

Every writer gets this file, the page-type spec for their batch, one finished
exemplar, and their exact slugs/titles/categories/order plus the full valid
internal-link slug list so cross-links resolve.

Writers output directly into the content collection. Bad data fails fast
against the collection schema.

---

## The floor

**3,000–5,000 words of unique, hyper-local content on every indexable page,
before any global block renders.** Nothing ships under 3,000.

This supersedes the older 400/300 minimums. If the data to write 3,000 unique
local words doesn't exist for a place, **don't publish the page** — a thin geo
page is worse than no geo page. Say so and it gets dropped to an `areaServed`
mention instead.

## Research before writing — this is the anti-slop engine, not a nicety

Every writer pulls real local facts *before* writing a word: rivers, housing
era, local industry, landmarks, season-specific pest behavior. Ten substantive
differentiated pages beat eighty templated near-duplicates that never get
indexed.

"Crawled/Discovered – currently not indexed" is a **content-quality signal**,
not a technical bug. The fix is consolidation, not more pages.

### Cite the extension service that covers this county — owner's steer, 22 Sep 2026

> "I like us citing the extension offices lets make sure we follow that trend
> so we are citable online."

Every page carries one primary authority named in a visible sentence and linked
at the point of the claim (Keystone v3.2 §6.5). WHICH authority is now a house
rule rather than a free choice, because a regional land-grant source is both
more useful to a reader here and more quotable by the answer engines that are
starting to send traffic:

**Regional first, for anything about pests, buildings or seasons in this
county.** In order of preference:
1. WSU Extension — the county offices, Hortsense, Pestsense, the publications
   store (PNW bulletins such as PNW 624), and its specialists' factsheets.
2. The Pacific Northwest Insect Management Handbook, which WSU, Oregon State
   and the University of Idaho publish together.
3. Oregon State — including NPIC, which OSU runs with the EPA, and Solve Pest
   Problems.

**National or state-agency where the claim is genuinely theirs**, and it often
is — do not force a regional source onto a federal fact:
- EPA for pesticide law, label rules, rodenticide restrictions and the
  definition of IPM.
- FDA for the Food Code; USDA's Forest Products Laboratory for wood, moisture
  and decay thresholds.
- Washington DOH for disease and public health; WSDA for licensing; NOAA and
  the National Weather Service for climate and rainfall.
- UC IPM is a good source and is already used widely here. It is California:
  prefer a PNW equivalent for anything seasonal or distributional, and keep UC
  IPM for biology and method that does not change with the state line.

The mix is reported per page type by harness check 9 ("of those PNW"). It is a
diagnostic, never a quota — a page citing the EPA for a federal rule is correct
and should not be "upgraded" to look regional.

## Hard rules

1. **No template variables in body copy.** Ever. The current live site renders
   `[company]` and `[phone]` in a production meta description and a title that
   reads "Pest Control in Fairhaven Pest Control, WA". The harness fails the
   build on any token.
2. **The page title never appears verbatim inside a sentence.** Generated
   sentences must read as if written by a person who has been to that place.
3. **Boilerplate lives in components, not bodies.** Process/CTA/positioning
   prose that repeats across pages is rendered from `Cta`/`Footer`. Page
   bodies stay unique.
4. **No sentence of 10+ words may appear on 3 or more pages.** The harness
   scans for this. NAP lines, legal statements and headings are legitimate
   survivors; prose is not.
5. **One H1 per page**, matching the page's core query. City goes in the H1
   for a city page; a neighborhood H1 names the neighborhood.
6. **One FAQ block per page.** It feeds the FAQPage node from the same array.
   Never two blocks, never a referral CTA counted as a question — the live
   site does both on eight of twelve service pages.
7. **Quick Answer: 40–60 words, at the very top, a real answer.** Not an
   instruction. The current homepage opens "Tap any category below to see the
   full details" — 15 words, and an instruction. That is the failure mode.

## Claims, credentials and the guarantee

- **Never invent a service or a vertical.** Build only the confirmed set in
  `src/data/services.ts`. A page for work Sasquatch doesn't do is a liability.
- **Credentials are a hard boundary, and IDENTIFY is not TREAT.** This is the
  easiest thing on the site to get legally wrong, so learn the split once:

  - **We do not INSPECT.** While `business.license.structuralPestInspector` is
    unset, no page — including FAQs — may claim or imply authority to perform a
    WDO / structural pest / escrow / real-estate inspection, or to issue a
    report. That is separately licensed under RCW 15.58.
  - **We do TREAT.** Owner-confirmed 30 Aug 2026: the crew is certified to
    treat wood-destroying organisms that somebody else's inspection identified.
    `business.canTreatWdo` gates that copy, and the scope lives in
    `business.wdo.organisms` so pages cannot quietly invent organisms.

  Enforcement is per-sentence rather than a vocabulary ban, because a flat ban
  blocks legitimate and valuable copy. A sentence using a regulated inspection
  term must EITHER disclaim in the first person ("We are not structural pest
  inspectors") OR attribute the inspection to someone else without also
  claiming we performed or are selling it ("we treat what your inspector
  found"). The rules are `CLAIM_*` in `src/lib/seo.ts`, mirrored in harness
  check 2c — change both or neither. Write escrow copy in that shape and it
  passes; write "call us for your WDO inspection" and the build fails.
- **"Guarantee" is a defined term** — the 100% Service Guarantee — and every
  use links to `/our-guarantee/`. No unqualified warranty language. We do not
  write "If the pests come back, we come back."
- **Every factual, legal or regulatory claim carries a source and a review
  date.** Especially the compliance cluster (BMC 6.15, RCW 59.18.060, WAC
  16-228-2045, the Healthy Schools Act) and the mole-trapping refusal page.
- **No fabricated reviews, stats, pricing or dates.** Bed bug pricing is
  $150 verification (credited against treatment if they proceed) + $395 per
  room, owner-confirmed 30 Aug 2026. Figures live in `business.pricing` and
  harness check 2b fails on any `$NNN` in built HTML that is not from there.
- **No client or partner names published without permission.** Jorge Bedoya's
  ACE credential does not publish until `publishable` is `true`.

## Site separation is absolute

Sasquatch and the K9 brands are walled off. No K9 detection content on this
site, no crossover, no cross-links. No photo, phone number, license number or
city from the Texas franchise ever lands here. Double-check the domain in
every call and every write.

Territory is a hard filter: geo pages are built only inside
`business.territory`. A neighboring partner's turf stays untouched even when
the surface area is tempting.

## Imagery

- **Judge images by sight, never by filename.** On these sites filenames are
  SEO-keyword-stuffed and routinely wrong — a file named `spider-control-15.jpg`
  is a photo of a truck. Never automate from filenames.
- **Real field photos are E-E-A-T gold.** Lead with the job photos: crawlspace
  evidence, exclusion work, damage, technicians, trucks, wasp and hornet nests.
- **Alt formula:** [what's shown] + [action/context] + [local, where the page
  is city-specific]. Unique, ≤125 chars, natural, no stuffing. Alt describes
  the image, not the keyword. The logo's alt is the business name. No text
  baked into images.
- **Never rename a live media file's slug or URL** — it breaks every page
  already embedding it, for no SEO gain once Title and Alt are good.
- Placement: hero (on-topic) + one inline image per ~300–400 words + an
  optional before/after pair on service pages. Geo-match the photo to the
  page's city.

## Page-type specs

### Service spoke (`/services/{slug}/`)
Quick Answer → what it is here → how we treat it (real method, not a promise)
→ signs → what it costs to ignore → named-expert block with the credential
shown → local proof / case study link → prevention → one FAQ block →
market-named CTA. Links up to `/services/`, laterally to sibling services,
down to its problem pages.

### Problem micro page (`/services/{slug}/{problem}/`)
Written for the problem-aware query, not the species query. "Scratching in the
walls at night", not "rodent control". Answers the question in the first 60
words, then diagnosis → what it usually turns out to be → what we do → when to
call. Links up to its parent spoke.

### City page (`/locations/{city}/`)
Quick Answer → placement and distance → why pests press here (real climate,
housing era, industry) → what we actually get called for in this city →
neighborhoods served with real notes → services, linked → local proof → one
FAQ block, city-specific → CTA naming the city. Never a token-swapped copy of
another city — Ferndale currently shares Bellingham's opener and all six FAQs
verbatim.

### Neighborhood page (`/locations/{city}/{neighborhood}/`)
The most templated tier on the live site and the one that most needs real
detail: housing stock and era, specific streets or landmarks, the pest
pressure that actually differs from the next neighborhood over. If those three
things aren't real, don't build the page.

### Compliance page (`/compliance/{topic}/`)
Plain-language explanation → what the code actually says, quoted and cited →
what it means for an owner/landlord/manager → what we do about it → when it
applies → sources with review dates. These are the highest-trust pages on the
site and the most legally sensitive. Nothing is paraphrased loosely.

## Waves

Structure → moat towns → guides → library → verticals → hygiene. Build,
dead-link-check and dedup-scan *between* waves, and deliver each wave so the
owner can redirect early. Standard batch is 10 pages. Every batch passes the
acceptance gate before the next begins.

## Before you call a batch done

```
npm run build && npm run harness
```

Zero failures, or it isn't done.
