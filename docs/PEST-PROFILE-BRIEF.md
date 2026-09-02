# Pest library profile brief

You are writing species profiles for `/pest-library/`. Work in
`/root/sasquatch-wa`. One file per species at
`src/content/pests/<species-slug>.md`.

Read `src/pages/pest-library/index.astro` before you start. The hub sets out
what this library is for and what it refuses to do, and your profiles have to
be consistent with it. Read one existing guide — `src/content/guides/` — for
the house voice and the sourcing discipline. Read `src/data/business.ts` for
what the company does and does not do.

---

## What a profile is for

Somebody has an insect in front of them, or a sound in a wall, and wants to
know what it is and whether it matters. The profile answers that in order:
what it is, how to tell it from the thing it gets confused with, when it shows
up here, what it actually does, and only then what treatment involves.

**The differentiator of this library is that it is honest about when nothing
needs doing.** Most pest content exists to sell a treatment. If the answer for
your species is "this is seasonal, it will stop, seal the gap in August", say
that plainly and at length. That is the page's value, and a customer who reads
it and does not call is a customer who calls next year instead of a
competitor.

Write for Whatcom County, Washington — Bellingham, Ferndale, Lynden, Blaine,
Sudden Valley, and the Skagit towns south of there. Wet winters, no hard
freeze, about 35 inches of rain, a long gray season. That climate is the
reason for most of what happens here and should shape the whole page.

---

## Frontmatter

```yaml
---
title: 'Under 60 characters'
description: 'Between 110 and 165 characters, ending on . ! or ?'
h1: 'The page headline'
species: 'carpenter-ant'          # must match a slug in src/data/pests.ts
treatment: 'treat'                # treat | depends | rarely-warranted | we-do-not
answer: '...'                     # 40–60 words, hard limit, counted
confusedWith: ['moisture-ant']    # slugs from pests.ts; [] if none
faqs:
  - q: 'A real question ending in a question mark?'
    a: 'At least 40 characters.'
sources:
  - label: 'WSU Extension — Carpenter ants'
    url: 'https://...'
    read: 2026-09-01
reviewBy: 2027-09-01
ready: true
---
```

Every field above is enforced by the collection schema in
`src/content/config.ts` and by the route, which throws on an unknown `species`
or `confusedWith` slug. Get them exactly right or the build fails for everyone.

The tight ones, in the order they most often go wrong:

- **`description`** — ≥110 and ≤165 characters, must end on punctuation. Count.
- **`title`** — ≤60 characters. Brand is appended automatically; do not add it.
- **`answer`** — 40–60 **words**, counted. It must *answer* the page's
  question, not instruct ("Tap here to…" is rejected outright).
- **`faqs`** — 3 to 8 items. Every `q` ends in `?`, every `a` is 40+
  characters, no two questions the same. No CTAs in the FAQ block.
- **`sources`** — at least one, and it must be real. See sourcing below.
- **`ready: true`** — set it only when the body genuinely clears 3,000 words.
  Without it the page ships noindex.

`treatment` is published on the page as a one-line verdict above the body, so
choose it honestly:

- `treat` — we treat this and finding it usually warrants treating
- `depends` — genuinely varies; the body must say on what
- `rarely-warranted` — we can, but it is usually a sealing or cleaning job
- `we-do-not` — out of scope or protected; the body says where to go instead

---

## Length and sourcing

**3,000 words minimum of body.** This is the M1 floor every indexable page on
this site clears. Aim for 3,100–3,600 so a later refactor does not put you
under it. Do not pad — if you are reaching, you have not researched enough.

**Research before you write.** Use WebSearch and WebFetch. Prefer, in order:
WSU Extension and other land-grant extension services; Washington State
Department of Health; USDA; peer-reviewed sources; a state agency. Do not cite
another pest control company, and do not cite a content farm.

Every factual claim about biology, distribution, risk or law needs to be
traceable to something in `sources`, with the date you read it. Do not cite a
page you did not open.

**If a source contradicts the received wisdom, follow the source and say so on
the page.** That is the single most valuable thing these profiles can do. The
hobo spider is the standing example: the necrosis reputation is not supported,
the CDC removed it from its venomous-spider list in 2017, and the Washington
State Department of Health says plainly it is not considered dangerous as
previously thought.

---

## Hard constraints — the build enforces most of these

- **No inspection authority.** Never offer, promise or imply a WDO inspection,
  wood-destroying-organism inspection, structural pest inspection, or a written
  report of *findings* — what we found, what we observed, what the damage is. A
  written record of the **treatment performed** is the correct substitute. The
  owner holds treatment licenses, not an inspector credential, and the company
  holds no inspection company license. This bites hardest on the termite and
  wood-boring beetle profiles.
- **No guarantee or elimination language.** No "guaranteed", "eliminate",
  "permanent solution", "pest-free", "eradicate". Describe the treatment and
  the follow-up instead.
- **No prices.** Any dollar figure not in `business.ts` fails the build.
- **No review counts, ratings, awards, founding year or customer counts.**
- **No birds, bats, squirrels, raccoons, opossums or other nuisance wildlife
  as services**, and no mosquito, tick, cricket or springtail *service* offers.
  A tick profile describes the tick and says we do not treat for it.
- **No staff names, license numbers or credentials in body copy.**
- **No species that is not established in Whatcom County presented as a local
  threat.** No brown recluse, no black widow, no fire ants, no Formosan or
  drywood termites. Naming one to correct a misconception is fine and often
  useful; presenting one as a local risk is not.
- **US spelling.** The most repeated defect in this build: neighborhood,
  recognize, gray, defense, program, judgment, center, behavior, color, fiber,
  story (of a building), curb, traveling, meter.
- **No sentence you write may appear on three or more pages sitewide.** The
  harness scans for any 10+ word sentence repeated across pages. Species
  profiles are the highest-risk page type for this — resist the boilerplate
  paragraph about our approach.

---

## When you are done

Run `npm run build && npm run gate`. Fix anything you caused. Do not "fix"
failures on pages outside your batch — report those instead.

Report one line per species: slug, body word count, the `treatment` verdict you
chose, and the sources you used. Then anything you found that contradicts what
is published elsewhere on this site, because that is worth acting on.
