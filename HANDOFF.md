# Handoff — read this first

This is a finished, launch-ready static site. It is not a work in progress and
it does not need refactoring. The job in front of you is: install, verify,
deploy.

```
npm install
npm run gate          # must exit 0
npx vercel --prod
```

If `npm run gate` exits 0, the site is ready. If it does not, **stop and read
the failure** — every check in that gate exists because something it now
catches was once shipped broken, and each one prints the reason.

---

## What this is

A complete rebuild of sasquatchpestcontrol.com in Astro 4, static output, no
runtime. 207 pages, 147 indexable.

- 23 service pages plus 23 problem pages beneath them
- 24 location pages across Whatcom and Skagit County, each with an embedded map
- 41 pest library species profiles, every one written from land-grant extension
  and state health department sources, each carrying its citations and a review
  date
- 11 guides on rules, buildings, seasons and how the work is bought
- 70 blog posts imported from the legacy WordPress site
- 286 redirect rules covering all 240 legacy URLs

---

## The five things most likely to trip you up

**1. `npm run gate` is the contract.** It runs the test suites, a clean build,
the harness, the redirect check and the pending-fields report. Nothing ships on
a non-zero exit. Do not add `--force`, do not comment out a check, and do not
"fix" a failure by loosening the rule that caught it.

**2. Redirects are generated, not hand-written.** `vercel.json` contains 286
rules emitted from `src/data/legacy-urls.json` and `src/data/services.ts`. If
you change either, run `npm run redirects:emit` and commit the result.
`npm run redirects:check` fails if they drift. This check exists because for
the entire first phase of the project the map was built, validated, and never
actually emitted — every legacy URL would have 404'd on launch day while every
check reported green.

**3. There are claims this site is not allowed to make.** The company holds
WSDA treatment licenses but **not** a Structural Pest Inspector license or an
SPI company license, and is not seeking them. RCW 15.58.205 attaches a penalty
to advertising structural pest inspection services without them. So:

- No page may offer, promise or imply a WDO or structural pest inspection.
- No page may offer a written record of *findings* — what we found, what we
  observed, the extent of damage. A record of the **treatment performed** is
  the correct substitute and is used throughout.
- The sitewide CTA says "Book a free visit", not "free inspection". That is
  deliberate.

`business.canClaimInspection` gates this, `src/lib/seo.ts` holds the rules,
harness check 2c enforces them on built HTML, and
`scripts/tests/inspection-claims.test.ts` pins the gate itself. **Do not route
around any of it.**

**4. `aggregateRating` is suppressed on purpose.** The rating is real (4.9 from
342 Google reviews) and is displayed as visible attributed copy. It is not
emitted as structured data, because Google's Review Snippet guidance makes
self-serving LocalBusiness ratings ineligible for stars *and* separately
forbids aggregating another site's ratings. `business.rating.schemaEligible`
is the explicit flag. Emitting it would buy nothing and risk a manual action.

**5. Word floors are enforced.** 3,000 body words on indexable content pages,
1,200 on hubs, 900 on imported blog posts, measured on rendered text with
`data-boilerplate` chrome excluded. Do not remove prose. Do not remove a
`data-boilerplate` attribute — the harness uses it to exclude navigation from
both the word count and the duplicate-sentence scanner, and stripping one will
fail the gate on forty pages at once.

---

## Architecture, briefly

- **Single source of truth is the governing principle**, and violating it is
  the defect this codebase kept hitting. `src/data/*.ts` owns every
  enumeration — services, pests, locations, guide clusters, business facts —
  and pages render from those files. If you find yourself writing a list that
  already exists somewhere else, stop.
- **`src/data/business.ts`** holds everything about the company. Fields the
  owner still owes are `PENDING`; credentials he deliberately does not hold are
  `NOT_HELD`. Both are falsy to `isReady()`, so guarded output renders nothing,
  but they mean different things and the publish gate treats them differently.
- **One JSON-LD emitter**, `src/lib/schema.ts`, one `@graph` per page, every
  node `@id`-anchored. Never add a second `<script type="application/ld+json">`.
- **`src/styles/global.css`** is the design system and the only place a color
  is written anywhere in `src/`. No scoped `<style>` blocks with hex values, no
  inline styles. Add tokens, don't hardcode.

## The scripts

| command | what it does |
|---|---|
| `npm run gate` | everything below, in order. The one to run. |
| `npm run build` | Astro build, then writes `sitemap.xml` and `robots.txt` |
| `npm run harness` | dead links, assets, SEO, price drift, claim rules, duplicate sentences, JSON-LD graph, word floors |
| `npm test` | six suites including the US-spelling check |
| `npm run redirects:check` | verifies `vercel.json` matches the data files |
| `npm run redirects:emit` | regenerates the redirect rules |
| `npm run pending` | what the owner still owes |

## Still outstanding, none of it blocking

Run `npm run pending` for the current list. As of handoff: GBP coordinates and
the canonical profile URL, founding year, and four WSDA record screenshots to
upgrade licenses from owner-verified to record-held.

## Read these before changing anything substantive

- `docs/COMPLIANCE-SOURCES.md` — every regulatory claim, its primary source,
  and the date it was read
- `DEPLOY.md` — the deploy runbook and post-launch checks
- `docs/BLOG-MIGRATION.md` — why the imported posts are structured as they are
- `docs/PHASE-4-INTAKE.md` — the case studies that were deliberately not
  written, because they would have been claims about real jobs with no job
  history to back them

The comments in `src/data/business.ts`, `src/lib/seo.ts` and
`scripts/harness.mjs` are long on purpose. They record decisions and the
mistakes that produced them. Read them before overruling them.
