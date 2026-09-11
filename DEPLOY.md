# Deploying

The site is a static Astro build. `npm run build` writes `dist/`, and that
directory is the whole site — no server, no database, no runtime.

## Before every deploy

```
npm run gate
```

That runs, in order: the test suites, a clean build, the harness, the
redirect-map check, and the pending-fields report. **It exits non-zero if
anything is wrong.** Do not deploy on a non-zero exit — every check in it
exists because something it now catches once shipped broken.

What the gate covers, briefly:

- **tests** — inspection-claim rules, the WDO findings-report rule, the
  credential gate, the guide matcher, the JSON-LD graph fixtures, and US
  spelling across 440 files.
- **harness** — dead links, missing assets, per-page SEO (including duplicate
  H1s), price drift against `business.ts`, credential and claim rules on built
  HTML, duplicate sentences sitewide and between sibling pages, graph
  integrity, word bands (a diagnostic since Keystone v2 — nothing fails on
  length), structural performance, and the phone-number rule.
- **redirects:check** — that `vercel.json` still carries all 286 redirect rules
  the data files produce. This check exists because for the whole of Phase 0
  the map was validated and never actually emitted; every legacy URL would have
  404'd on launch day and every check was green.
- **pending** — what the owner still owes. Advisory items do not block.

### Two more, outside the gate — run them before the domain cutover

```
npm run lab-gate
node scripts/check-leadform.mjs
```

Both need a running server and Chrome, so they are not in `npm run gate`.

- **lab-gate** is Keystone v2's performance launch gate: the median of five
  mobile Lighthouse runs per template, against LCP ≤ 2.0s, TBT ≤ 200ms,
  CLS ≤ 0.05 and a score of 90. v2 says a page that fails it is not
  published. Results are written to `reports/lab-gate-<date>.json`. Run it
  again after any change to layout, fonts, images or third-party scripts.
- **check-leadform** proves the GoHighLevel form still renders now that it
  loads on the reader's first interaction instead of with the page. The
  failure it guards against — a form that silently never appears — would cost
  leads on every page, so run it after any change to `LeadForm.astro` or
  `business.crmForm`.

The field check v2 asks for comes 28 days after launch: Core Web Vitals from
real users (CrUX, where the origin is eligible), not from the lab.

## Deploying to Vercel

`vercel.json` is committed and configured: framework `astro`, output `dist`,
`trailingSlash: true`, and the 286 redirects.

Either connect this repository to a Vercel project through the dashboard, or
from a machine that is logged in:

```
npx vercel --prod
```

The first run asks which scope and project to use and writes `.vercel/`, which
is gitignored.

**Redirects are data, not configuration.** They are generated from
`src/data/legacy-urls.json` and `src/data/services.ts`. After changing either,
run `npm run redirects:emit` and commit the updated `vercel.json`. The gate
fails if you forget.

## After the first deploy

1. **Verify a handful of legacy URLs 301 rather than 404.** Spot-check across
   the shapes — a service (`/rodent-control/`), a neighborhood
   (`/edgemoor-bellingham-wa-pest-control/`), a blog post
   (`/more-spiders-fall-bellingham/`), and a retired slug
   (`/mosquito-control/`).
2. **Submit `https://www.sasquatchpestcontrol.com/sitemap.xml`** in Google
   Search Console. It lists 147 indexable URLs and deliberately excludes the
   60 that are noindex or canonicalled elsewhere.
3. **Check the maps render.** The 27 location pages embed Google Maps. The URLs
   were verified by hand but could not be loaded in the build environment,
   which blocks `maps.google.com`.
4. **Test a share.** Paste the homepage URL into Facebook or Slack and confirm
   the card shows the crew-and-trucks image.

## What is deliberately not automated

There is no CI. For a site this size, `npm run gate` on the machine doing the
deploy is the honest amount of process — a pipeline nobody maintains is worse
than a command somebody actually runs.
