# Sasquatch WA — Keystone v1 build

Tier 3.0 Enterprise hub. Build track **7A · static (Astro)**, deployed to
Vercel. Replaces the WordPress site at sasquatchpestcontrol.com, whose
sitemap index yielded 240 unique URLs when pulled on 31 Aug 2026.

Phases 0 through 3 are complete: the entity and schema layer, the data spine,
the content contract, the verification harness, the full migration map, and
every service, location and problem page written to the M1 floor.

## Why static

The single highest-leverage decision in the build is separating content (typed
data) from presentation (thin route + shared components). Almost every
efficiency traces back to it: one template edit changes 300 pages, one field
edit swaps the phone number across the whole site, and hundreds of pages
generate from structured data plus markdown.

## Layout

```
src/data/business.ts     one NAP, phones, licenses, socials — read by everything
src/data/services.ts     the 39 → 23 service tree AND half the migration map
src/data/legacy-urls.json the geo/blog/page half, pulled from the live sitemap
src/data/towns.ts        geo spine; tier function decides what earns a page
src/lib/schema.ts        the single 7-node @graph emitter, @id-anchored
src/lib/geo.ts           differentiated local copy + genericLocal() fallback
src/lib/seo.ts           title/description trim + encoded content rules
scripts/harness.mjs      the acceptance gate — run between every wave
scripts/redirects.mjs    generates the migration map from data
scripts/pending.mjs      what the client still owes; blocks publish
CONTENT_BRIEF.md         the anti-slop rules every writer gets
```

## Commands

```bash
npm install
npm run dev          # local
npm run build        # static output to dist/
npm run harness      # the six acceptance checks against dist/
npm run redirects    # print the migration map (--json to write it)
npm run pending      # what the client still owes
npm run gate         # build + harness + publish gate, in order
```

## Current state

**89 routes build. 88 are indexable and complete.** The single noindex page is
the 404, which is correct. There are no stubs left: every route has real
content behind it.

- 23 service spokes
- 25 location pages — 2 county hubs, 11 towns, 12 Bellingham neighborhoods
- 23 problem pages beneath the service spokes
- 5 guides plus a hub — Phase 5, all three clusters open
- 7 utility and trust pages

265,079 words of rendered text, every indexable page clearing the 3,000-word M1
uniqueness floor (hubs clear 1,200).

**ACCEPTANCE GATE: PASSED — 0 failures, 0 warnings.** Dead-link crawler,
per-page SEO audit, price-drift check, credential and claim rules,
duplicate-sentence scanner and word-count auditor all clean.

**Unit tests run first in the gate.** 45 cases across `scripts/tests/`,
covering the inspection-claim rules, the WDO findings-report rule and the guide
relatedTo matcher. All three have been subtly wrong at some point while every
other check stayed green, which is why they are pinned. The comments in
`src/lib/seo.ts` and `src/lib/guides.ts` record what each one missed and why it
is shaped the way it is — including one test case that deliberately fails a
sentence a human would read as fine, with the reasoning for not widening the
rule to admit it.

**MIGRATION MAP: COMPLETE.** 286 rules. All 240 URLs in the live sitemap are
either mapped or recorded as unchanged paths, every target resolves to a page
that exists in `dist/`, and there are no chains, duplicate sources or
self-loops. `npm run redirects` proves all four on every run and exits non-zero
if any of them regresses.

**Publish gate is intentionally BLOCKED** on three license fields — see
`npm run pending`.

`src/content/services/exclusion-and-repairs.md` is the reference exemplar for
the page-type contract.

**Phase 5 is under way.** `/guides/` carries all three clusters:

- *compliance* — landlord duties under RCW 59.18.060(4), school notification
  under RCW 17.21.415, WDO reports in a sale under WAC 16-228-2045
- *building* — why crawlspaces here stay wet, against WAC 51-51-0408 and the
  USDA Forest Products Laboratory wood handbook
- *seasonal* — the Whatcom County pest year

Every guide cites the sources it was written from with the date each was read,
and carries a review date. Both are required by the collection schema, so a
guide without citations fails at author time rather than at review time.
`docs/COMPLIANCE-SOURCES.md` holds the research spine.

Guides declare in their own frontmatter which pages they are relevant to
(`relatedTo`), and the service, location and commercial routes query that —
one list, read from both directions, rather than a second list to drift.

**Phase 4 is blocked on the owner, not on effort.** Case studies are claims
about specific jobs and there is no job history in this repo. See
`docs/PHASE-4-INTAKE.md` for what is needed and why nothing is being written
speculatively.

## Two things still unverified on the live site

Neither blocks this repo — a replacement discards the old graph anyway — but
both are open audit items:

1. **The JSON-LD layer was never read.** WebFetch strips `<script>` tags and
   `robots.txt` disallows `/wp-`, which also blocks `/wp-json/`. The browser
   route crashes the desktop app and is off the table. Resolve with a
   view-source paste or a check run outside this session.
2. **Core Web Vitals were never measured logged-out.**

Per Keystone 9.3, both stay scored *provisional* until confirmed against the
live site. A prior handoff spec asserted a schema diagnosis that was wrong in
three of four claims; we don't repeat that.

## Deployment notes

Set the Vercel **Framework Preset explicitly** — if it's unset every route
returns a platform 404 even though the build "succeeded". Check that before
debugging routing.

Ship the `.gitignore` from day one and `git add -A`: a prior first deploy built
zero pages because only the six root config files had been committed and
`src/`/`public/` were never pushed.

Verify before declaring done: `git ls-files "src/pages/**"` must be > 0, and a
from-scratch `npm ci && npm run build` must report the expected page count. "It
builds on my machine" is not "it's deployed".
