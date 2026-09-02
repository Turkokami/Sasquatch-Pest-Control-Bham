# Compliance sources

Every regulatory claim on this site traces to a source read directly, with the
date it was read. Nothing here comes from memory, from a competitor's site, or
from a summary of a summary.

Review the whole file annually, or sooner if a rule changes.

---

## WAC 16-228-2045 — Complete wood destroying organism inspection reports

**Read:** 31 Aug 2026, via app.leg.wa.gov.
**Review by:** 31 Aug 2027.

A report identifying damage or infestation by wood destroying organisms must be
a **complete** WDO inspection report. A complete report requires, among other
elements:

- a WSDA Inspection Control Number obtained under RCW 15.58.450, displayed in
  the upper third of the front page
- the date of inspection on the first page
- the name of the property owner, representative or purchaser on the first page
- the complete property address
- the inspector's name and WSDA license number on the first page
- documented findings of damage, infestation and conditions conducive to either
- diagrams showing locations of findings and of inaccessible areas
- a list of all excluded areas

**How this is enforced in the build:** `checkWdoFindingsReports()` in
`src/lib/seo.ts`, mirrored in harness check 2c. It fails any copy offering the
customer a written account of *findings* in a wood-destroying-organism context.
Offering a record of the *treatment performed* passes. Unit tests live in
`scripts/tests/wdo-findings.test.ts` and run as part of `npm run gate`.

**What this rule caught on the day it was written:** three published sentences,
on `/services/wdo-treatment/`, `/services/termite-control/dampwood-termites-in-a-crawlspace/`
and `/locations/sudden-valley/`, all offering the customer a written account of
what we found. Every other check was green. All three were reworded.

---

## Specific vs complete WDO inspections — CLOSED 2 Sep 2026

**Decided by:** the owner, stating his own scope.
**Review by:** only if the company decides to seek the SPI licenses.

The owner's position, in his words: we can treat specific pest problems
identified during a WDO inspection, but we do not provide those inspections
for real estate. He holds neither the Structural Pest Inspector license nor
the SPI company license and is not seeking either.

That settles the question the site had been carrying as open, and it settles
it in favor of the conservative posture the site already had. Nothing about
the copy changes. What changed is the bookkeeping: those two fields moved from
`PENDING` — which in this codebase means somebody owes us a value — to
`NOT_HELD`, which means no value is coming. They no longer block a publish,
because blocking on them was waiting for a delivery nobody had ordered.

**What was NOT relied on, and why it matters.** The owner also forwarded a
screenshot of an AI assistant's answer laying out the specific-vs-complete
distinction and stating that a PCO Structural endorsement permits specific WDO
inspections. That may well be correct, and it agrees with the WSDA category
tooltip recorded here previously. It is still not a source. It is a language
model's summary, of the same kind that produced two of the factual errors this
project has already had to correct on published pages. No claim on this site
rests on it, and the site does not assert that it may perform specific WDO
inspections. Should the company want that capability advertised, get it in
writing from WSDA — the downside of being wrong is a license rather than a
paragraph, and that arithmetic has not changed.

**The regulatory line the site continues to observe:** we treat what somebody
else identified, and we do not produce the report. `canClaimInspection` is
false, every rule in `src/lib/seo.ts` fires, harness check 2c fails any copy
offering a written record of findings, and the sitewide CTA offers a free
visit rather than a free inspection.

**One near-miss worth recording.** Changing the sentinel on those two fields
broke the harness's inspection guard, which had been written as "permitted
unless the field literally says PENDING". NOT_HELD is not PENDING, so for one
run the harness reported that inspection claims were permitted for a company
with no inspector. The rule is now positive — permitted only when the field
holds a quoted license number — and `scripts/tests/inspection-claims.test.ts`
pins that with ten cases so a future sentinel cannot repeat it. A guard should
fail closed; this one had been failing open since it was written, and only an
unrelated edit revealed it.

---

## RCW 59.18.060(4) — Landlord duties, pest control

**Read:** 31 Aug 2026, via Justia and WashingtonLawHelp.
**Review by:** 31 Aug 2027.

Landlords must "provide a reasonable program for the control of infestation by
insects, rodents, and other pests at the initiation of the tenancy and, except
in the case of a single-family residence, control infestation during tenancy
except where such infestation is caused by the tenant."

Two things follow, and the second is the interesting one:

1. In a multi-unit rental, ongoing pest control is the landlord's duty unless
   the tenant caused the infestation.
2. In a **single-family** rental, the RLTA does not require the landlord to
   maintain an ongoing pest control program. But the landlord's structural
   duties remain — roofs, walls, foundations — so defects that let pests in are
   still the landlord's to repair.

**Not legal advice.** Any page using this must say plainly that we are not
attorneys and point to WashingtonLawHelp and to city or county code
enforcement.

---

## Bellingham Municipal Code ch. 6.15 — Rental Registration and Safety Inspection

**Read:** 31 Aug 2026, via bellingham.municipal.codes and cob.org.
**Review by:** 31 Aug 2027.

- Annual registration required for residential rental property inside city
  limits — apartments, houses, duplexes and ADUs.
- Most non-exempt units are inspected once every 3 to 3.5 years. Up to 20 units
  on a property: no more than four inspected per cycle. 21 or more: no more
  than 20%, capped at 50.
- Inspections may be performed by City inspectors or by qualified private
  inspectors.
- The checklist covers structural integrity, weather exposure, plumbing and
  sanitation, heat and water, ventilation, electrical, exits, and smoke and
  CO detectors.

**Important negative finding:** the published checklist does **not** name pests,
rodents, vermin or infestation. Do not write copy implying BMC 6.15 requires a
pest inspection. The honest and more useful framing is that the state RLTA duty
and the city inspection program are separate things, and that several checklist
items — structural integrity, sanitation, ventilation — are exactly the defects
that let pests in.

---

## RCW 17.21.415 — Schools, pesticide notification

**Read:** 31 Aug 2026, via Justia and WSU School IPM.
**Review by:** 31 Aug 2027.

Applies to public K-12 schools and licensed day care facilities.

- **48 hours** advance notice to interested parents or guardians of students,
  and to employees, before a pesticide application. If the application does not
  occur within 48 hours of the stated time, notification repeats.
- Notification must state the product name, intended date and time, location,
  the pest being controlled, and a contact name and phone number.
- **Grounds signs:** at least 4 by 5 inches, reading "THIS LANDSCAPE HAS BEEN
  RECENTLY SPRAYED OR TREATED WITH PESTICIDES BY YOUR SCHOOL", posted at the
  application location and each primary entry point.
- **Other facility signs:** at least 8.5 by 11 inches, in contrasting colors,
  carrying product, date and time, location, pest and contact information.
- Signs stay up **at least 24 hours**, longer where the label sets a longer
  restricted entry interval.
- Records kept and an annual summary made readily accessible to interested
  persons.

**Exemptions:** antimicrobial pesticides; insect or rodent baits not accessible
to children; applications during a closure of at least two consecutive days;
and emergency applications for an immediate health or safety threat, where
notification follows as soon as possible after.

The bait exemption is the operationally significant one and it is worth saying
plainly: an IPM program built on inaccessible baits and exclusion rather than
broadcast application is both better practice and less disruptive to a school's
notification obligations.

---

## License maintenance — annual renewal and the 5-year recertification cycle

**Read:** 31 Aug 2026.
**Review by:** 31 Aug 2027 — deliberately short, see the caveat.

Owner-stated 31 Aug 2026: licenses renew annually; recertification runs on a
five-year cycle requiring 40 continuing education credits, or re-examination if
those are not earned. All licensed staff are employees registered under
Sasquatch Pest Control.

Independently corroborated by a Washington pesticide training provider, which
states for both commercial applicator and commercial operator licenses:

- **40 credits every 5 years**
- **maximum 15 credits per calendar year**, so the requirement cannot be
  satisfied in a single push at the end
- recertification **by December 31**

**CAVEAT, and it is the reason for the short review date.** WSDA is the
authority on this and its own recertification pages are script-driven, so they
could not be read directly from this build. Both sources agree, and both are
second-hand relative to WSDA. Confirm with WSDA before treating these figures
as settled, and re-check them at review.

Held in `business.credentialMaintenance`. Published on `/about/`.

---

## Evidence classes on license claims

Three classes, because collapsing them would misstate what was actually
checked:

- **`wsda-record`** — the state record has been seen here. Only LI-87206, backed
  by a screenshot of the WSDA public license search. Expiry and categories come
  from the state.
- **`owner-verified`** — the owner states he checked the state record. Stronger
  than recollection, weaker than holding it. LI-99899, LI-105055, LI-115142 and
  LI-94159 sit here as of 31 Aug 2026.
- **`owner`** — the owner's statement, unchecked against the record.

The WSDA public license search is a form submission behind a script-driven
page, so it cannot be read by fetching a URL, and browser automation is off the
table on this project by the owner's standing instruction. Upgrading a row to
`wsda-record` therefore needs a screenshot or a copy of the record.

`unverifiedCredentials()` tests for `via !== 'wsda-record'` rather than for
`via === 'owner'` — asking whether a row is in the one class that counts,
rather than listing the classes that do not. Written the other way it would
have silently started passing everything the moment the third class was added.

---

## Pricing

$150 bed bug verification (credited against treatment if the customer
proceeds), $395 per room, $25 — owner-confirmed 30 Aug 2026. Held in
`business.pricing`. Harness check 2b fails on any dollar figure in built HTML
that does not come from there.

---

## What is deliberately absent

- **A published rating, but no `aggregateRating` markup.** 4.9 from 342 Google
  reviews, captured 2 Sep 2026 from the profile the owner manages, shown as
  visible attributed copy carrying its date. The structured-data node stays
  suppressed regardless — Google's Review Snippet guidance makes self-serving
  LocalBusiness ratings ineligible for stars, and separately forbids
  aggregating ratings from another website. Emitting it would buy nothing and
  risk a manual action. `business.rating.schemaEligible` is the explicit flag.

  The previous site's "5.0 from 376+" was a real running total across Google,
  Facebook, Yelp and Thumbtack — earlier notes in this file characterized it
  unfairly. The only inaccuracy was the 5.0, since Google's 4.9 is the bulk of
  the count. Google's figure alone is used because a reader can verify it in
  one click, which a four-platform sum never is.
- **No founding year.** Only the owner can supply it; it is not derivable from anything on file.
- **No named third party without permission.** Jorge Bedoya's ACE credential
  published 2 Sep 2026, on the owner's explicit permission to name him as
  consulting ACE. The credential itself is still owner-stated rather than
  checked against the Entomological Society register.
- **No case studies.** See `docs/PHASE-4-INTAKE.md`.

---

## Company registrations and cover — documents held, 2 Sep 2026

**Read:** 2 Sep 2026, from documents supplied by the owner.
**Review by:** 31 May 2027 — the earliest expiry below.

- **Washington State Business License.** Sasquatch Pest Control L.L.C., UBI
  604761525, Business ID 001, Location 0001. Issued 10 Apr 2026, expires
  31 May 2027. Unemployment insurance, industrial insurance and tax
  registration all ACTIVE. City endorsements ACTIVE for Bellingham (general
  business #070099) and, as non-resident, for Mount Vernon, Blaine, Sedro
  Woolley, Burlington, Lyman and Lynden.
- **ACORD certificate of liability insurance.** Commercial general liability
  in force to 14 Jun 2027; licensing bond to 1 Apr 2028. Certificate holder is
  the Department of Labor & Industries, Contractor Registration.
- **WSDA Financial Responsibility Insurance Certificate (FRIC).** Filed in the
  business's name, policy period 14 Jun 2026 to 14 Jun 2027.

**Held as booleans in `business.insurance`, deliberately.** Policy numbers, the
bond number, carrier, agent, deductible and limits are NOT in the codebase.
The reliable way to keep a number off a public page is to not put it in the
data, and a published policy number is a gift to anyone assembling a pretext
call to an insurer.

### Two things these documents changed

**Skagit County stopped being an assertion.** Non-resident business
endorsements are held and renewed for four Skagit cities. A company does not
pay to be endorsed in a town it does not work in. `territory.skagitConfirmed`
now rests on a document rather than on a conversation.

**The company pest control license question moved, but did not close.** The
FRIC is filed in the business's name, and the form states WSDA requires it of
commercial applicators, that cover must extend to "the pesticide applications
of the business", and that a license is automatically suspended without it.
That is strong evidence a business-level commercial applicator license exists.
It is not the license, and the field wants a NUMBER, which no document here
carries. See the long note on `license.companyPestControl` — this question has
been reasoned about wrongly twice and inconclusively a third time, and the fix
is to read the number off the license rather than to deduce it again.

### Two things to chase

- **L&I contractor registration.** The ACORD certificate holder is L&I
  Contractor Registration, so a registration number exists. It is a separate
  credential from anything WSDA issues and it is the right one to cite for the
  exclusion, repair and insulation work — none of which the pesticide licenses
  cover. Not currently on the site at all.
- **Lyman.** Endorsed, and the only endorsed city with no location page.
