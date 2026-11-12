---
# ─────────────────────────────────────────────────────────────────────────────
# UNPUBLISHED. ready: false means this page builds, renders for review, and
# publishes noindex with no entry on the guides hub. DO NOT SET ready: true
# until every [PENDING] marker below has been replaced with a real figure from
# a GorillaDesk export. The entire value of this page is that the numbers are
# first-party and true; a calendar carrying invented counts would be worse
# than no calendar, and would undo the one thing no competitor in this market
# can copy.
#
# WHAT IS NEEDED, exactly — one export, then this page can go live:
#   A CSV of completed jobs, 1 Jan 2023 to 31 Dec 2026, with one row per job
#   and these columns: job date, target pest (or job type where no pest is
#   recorded), city or town, and whether it was a first visit or a recurring
#   service stop. No names, no addresses, no phone numbers, no invoice values.
#   Anonymized at export: the page reports counts by pest by month and
#   nothing else.
#
#   From that we derive: jobs per pest per month, the first and last week of
#   each pest's season, the three-year average so one odd summer does not
#   distort a month, and the share of first-time calls versus recurring stops.
#
#   Put the export in private/gsc/ or another gitignored folder and tell me
#   the path. It never gets committed — this repository is public.
# ─────────────────────────────────────────────────────────────────────────────
cluster: seasonal
title: "The Whatcom County Pest Calendar"
description: "Which pests we are actually called out for in each month of the year in Whatcom County, counted from our own completed job records rather than estimated."
h1: "The Whatcom County Pest Calendar"
answer: "This calendar is built from Sasquatch Pest Control's own completed job records across Whatcom and Skagit counties, counted by pest and by month. It is not a regional estimate or a national seasonal chart — it is what one company was actually called out for here, and the months it was called."
ready: false
expert: kristofer-elling
reviewBy: 2027-11-12
# The job data itself is first-party and has no external source by definition —
# that is the whole point of the page. These are the references the seasonal
# biology in each month is checked against, so a count and an explanation never
# drift apart.
sources:
  - label: "PNW Insect Management Handbook — structural and health pests"
    url: "https://pnwhandbooks.org/insect/structural-health/public-health/public-health-spider"
    read: 2026-11-12
  - label: "WSU Pestsense — full alphabetic pest list"
    url: "https://pestsense.cahnrs.wsu.edu/alphabetic-list/"
    read: 2026-11-12
# NOTE WHEN THIS PUBLISHES: the-whatcom-county-pest-year already claims
# "/services/*", and two seasonal guides on the rail of all 24 service pages is
# one too many. Decide then which of the two is the wildcard and pin the other.
relatedTo:
  - "/services/*"
factsTable:
  - label: "What the data is"
    value: "Completed job records from one pest control company working Whatcom and Skagit counties"
  - label: "Period covered"
    value: "[PENDING — fill from the export, e.g. January 2023 to December 2026]"
  - label: "Jobs counted"
    value: "[PENDING — total number of completed jobs in the dataset]"
  - label: "What is counted"
    value: "One row per completed job: date, target pest, town, and first visit or recurring stop"
  - label: "What is not in it"
    value: "No names, no addresses, no invoice values. Counts by pest by month, and nothing else"
  - label: "What it is not"
    value: "Not a regional estimate, not a national seasonal chart, and not a forecast"
steps:
  - "Find the month you are in and read the two or three pests at the top of it — those are what this county is actually calling about now."
  - "Look one month ahead as well, because almost everything here is cheaper to prevent than to treat."
  - "Check whether your pest shows a sharp peak or a long flat season; the sharp ones have a narrow window where work pays off."
  - "Treat a first-visit spike as a sign the pest is newly active, and a recurring-stop spike as a sign it is being managed rather than discovered."
  - "Follow the links from each month into the service or species page for what to actually do about it."
faqs:
  - q: "Where does this data come from?"
    a: "From our own completed job records across Whatcom and Skagit counties, exported and anonymized. Every figure on the page is a count of jobs we were actually called out for. Nothing here is modeled, estimated from regional averages, or taken from a national pest calendar."
  - q: "Why does a pest control company publish its own job numbers?"
    a: "Because nobody else in this market has them, and because the seasonal advice everywhere else is copied from national templates written for a different climate. What a Whatcom County house needs in March is not what a national chart says March is for."
  - q: "Does this include customer information?"
    a: "No. The export carries a date, a pest, a town and whether the visit was a first call or a recurring stop. No names, no addresses, no contact details and no invoice values leave our system, and none of that is published here."
  - q: "Does a busy month mean that pest is worse that month?"
    a: "Usually, but not always, and the difference matters. Call volume reflects when people notice a pest as much as when it is most active. Yellowjackets are a good example: the nest has been there since spring, and August is when somebody walks into it."
  - q: "How often is it updated?"
    a: "Once a year, with the previous year's completed jobs added and the averages recalculated. The review date in the page footer is when it is next due, and the figures are dated so you can see how current they are."
  - q: "Can I use these numbers?"
    a: "Yes, with attribution and a link back to this page. If you are a reporter, a researcher or another company working this region and you want the underlying monthly table rather than the page, get in touch and we will send it."
---

## What this is

A count of what one pest control company in Whatcom County was actually called
out for, month by month, taken from its own completed job records.

Every seasonal pest calendar you can find for this region is either a national
chart with the state names changed, or somebody's recollection. Neither is
much use here. Whatcom County has a maritime climate with wet winters and a
short dry summer, a housing stock heavy on vented crawlspaces, and a rural
edge of farms, woodland and seasonal cabins — and the pest year that produces
is genuinely different from the one a national template describes.

So this page does the only honest version: it counts the jobs.

**[PENDING]** — the figures below are not yet filled in. This page is
unpublished until a GorillaDesk export is loaded, and it carries no invented
numbers in the meantime.

## How it was counted, and what the numbers can and cannot tell you

Worth stating before any figure, because a number without its method is
decoration.

**What is counted.** One row per completed job: the date, the target pest, the
town, and whether it was a first visit or a stop on a recurring program.
Counts are aggregated by pest and by month across **[PENDING — number of
years]** years, so a single unusual summer does not distort a month.

**What is not counted.** Calls that did not become jobs, quotes that were not
accepted, and anything that was identified over the phone and needed no visit.
That last one matters: a good share of what this company does is telling
somebody they do not need a treatment, and none of that appears here.

**The limitation to keep in mind.** This measures when people call, which is
close to but not identical to when a pest is most active. A yellowjacket nest
counted in August has usually been there since May; what changed in August is
that somebody mowed over it. Where that gap is large, the month's entry says
so.

**Who is in it.** Customers across Whatcom and Skagit counties. It reflects
one company's customer base rather than the county as a whole, which is a real
limitation and an honest one.

## The year, month by month

**[PENDING]** — each month below takes its top pests and job counts from the
export. The seasonal narrative in
[the Whatcom County pest year](/guides/the-whatcom-county-pest-year/) is the
written version of the same year and does not depend on these figures.

### January — **[PENDING]**

### February — **[PENDING]**

### March — **[PENDING]**

### April — **[PENDING]**

### May — **[PENDING]**

### June — **[PENDING]**

### July — **[PENDING]**

### August — **[PENDING]**

### September — **[PENDING]**

### October — **[PENDING]**

### November — **[PENDING]**

### December — **[PENDING]**

## Using this

If you are a homeowner, the useful move is to read one month ahead rather than
the month you are in. Almost everything on this calendar is cheaper to prevent
than to treat, and the prevention window for most of it closes before the
problem becomes visible — which is the entire argument of
[sealing a building before fall](/guides/sealing-a-building-before-fall/).

If you are a reporter, a researcher, or another company working this region,
the numbers on this page are free to use with attribution and a link. The
underlying monthly table is available on request; we would rather it was
quoted accurately than approximated.

And if a month here does not match what you are seeing at your own property,
that is worth a phone call rather than a shrug. The calendar describes the
county. Your building has its own reasons.
