#!/usr/bin/env node
/**
 * pending.mjs — lists everything the client still owes, and blocks the
 * publish gate on the fields that are legal or trust boundaries.
 *
 * Keystone Part 7A: "A 'pending client input' pattern — fields the client
 * still owes are scaffolded with guards and light up automatically once
 * business.ts is filled."
 *
 *   node scripts/pending.mjs           # report
 *   node scripts/pending.mjs --gate    # exit 1 if a BLOCKING field is unset
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const src = fs.readFileSync(path.join(root, 'src/data/business.ts'), 'utf8');

/* Fields that stop a publish, with the reason a human needs to hear.
 *
 * EMPTY AS OF 2 Sep 2026, and the history is worth keeping because the same
 * mistake was made three times in three days.
 *
 * This object held license.companyPestControl, license.structuralPestInspector
 * and license.inspectionCompany. None of them should ever have been here.
 * Each was a guard defined by a CREDENTIAL rather than by the CLAIM it
 * protects — and when the owner was finally asked plainly, it turned out one
 * credential does not exist in this company's structure and the other two are
 * deliberately not held. The gate was blocking a finished site while waiting
 * for numbers nobody was going to send.
 *
 * THE TEST BEFORE ADDING ANYTHING HERE: name the sentence on the site that
 * this field lets us publish. If you cannot name one, it is not a blocker.
 * companyPestControl gated a single footer line. The other two gated copy the
 * site never wrote and never intends to.
 *
 * The actual protection lives in the claim rules — src/lib/seo.ts, harness
 * check 2c, and business.canClaimInspection — and none of it was touched. A
 * publish gate is bookkeeping. The rules are the safety mechanism, and
 * confusing the two cost this project three days. */
const BLOCKING = {};

/* Credentials the company deliberately does not hold. Reported every run so
   the choice stays visible and nobody re-files them as outstanding work. */
const NOT_HELD_NOTES = {
  'license.structuralPestInspector':
    'Structural Pest Inspector license. Owner-stated 2 Sep 2026: not held, not being pursued. Required for COMPLETE WDO inspections — the kind done for a transfer, exchange or refinancing, which carry a WSDA Inspection Control Number. We treat what somebody else identified; we do not produce the report.',
  'license.inspectionCompany':
    'SPI company license, required alongside the individual one before a business may conduct complete WDO inspections. Same decision, same date.',
};

const ADVISORY = {
  'geo.lat / geo.lng': 'Pulled from the verified GBP listing. No GeoCoordinates node until then.',
  'gbpUrl':
    'The canonical Google Business Profile URL, for the sameAs list and so the published 4.9/342 rating can link to the profile it came from. The owner supplied a share.google redirect on 2 Sep 2026, which is not an address. A rating a reader can click through to is worth more than one they have to go and search for.',
  'foundingYear': 'Used for foundingDate and the About page. Only the owner can supply it — it is not derivable from anything on file. The Whatcom Business Awards 2023 Start-Up of the Year shortlist implies a recent founding but is not a date.',
  'legalName': 'The registered entity name, if it differs from the trading name.',
  'slogan':
    "The company's line about itself, in the owner's own words, for the schema `slogan` property and nothing else. Nothing drafts one on his behalf — a slogan somebody else wrote is copy, not the business's slogan. Cosmetic: the property is absent until he supplies one.",
  'paymentAccepted':
    'The methods actually taken at the point of sale, for schema `paymentAccepted`. Deliberately not guessed: "cash, check, credit card" is the reflex answer in this trade and it goes stale quietly — a company that stopped taking checks two years ago still says it does. `currenciesAccepted` already publishes USD, which the address and the published figures back on their own.',
  'territory.skagitConfirmed':
    'Owner decision #4 — the metas claim Skagit, the county page builds it, the /service-areas/ H1 omits it. Sets 34 city pages or 26.',
  'people.jorge-bedoya.publishable':
    'Owner decision #3 — confirm the relationship and permission to name him before the Person page and the ACE credential publish.',
  'people.kristofer-elling.credential':
    'The license number behind the named-expert block and the hasCredential node.',
  'socialImage':
    'The share card, 1200x630, into public/img/. Until it lands no page emits og:image or twitter:image and the Twitter card falls back to "summary". That is deliberate: a BROKEN share image renders a blank card with the brand name under it, while an absent one lets the platform use its own layout. Before 2 Sep 2026 every page pointed at /img/sasquatch-social.jpg, which was never supplied.',
  'logoImage':
    'The Organization logo, into public/img/. Square-ish, at least 112px on the short side, on a background rather than transparent — a transparent PNG renders badly on a dark share card. Until it lands the schema graph omits the logo node and the Organization\'s logo and image references entirely, rather than pointing at a file that 404s.',
};

const isPending = (key) => {
  const re = new RegExp(`${key.replace(/\./g, '\\s*:[\\s\\S]*?')}\\s*:\\s*PENDING`);
  return re.test(src);
};

const pendingBlocking = Object.keys(BLOCKING).filter((k) => {
  const leaf = k.split('.').pop();
  return new RegExp(`${leaf}:\\s*PENDING`).test(src);
});
const notHeld = Object.keys(NOT_HELD_NOTES).filter((k) => {
  const leaf = k.split('.').pop();
  return new RegExp(`${leaf}:\\s*NOT_HELD`).test(src);
});
const pendingAdvisory = Object.keys(ADVISORY).filter((k) => {
  const leaf = k.split('.').pop().split(' ')[0];
  return new RegExp(`${leaf}:\\s*PENDING`).test(src);
});

console.log('\nPending client input\n' + '─'.repeat(58));

if (pendingBlocking.length) {
  console.log('\n\x1b[31mBLOCKING — nothing publishes until these are supplied\x1b[0m\n');
  for (const k of pendingBlocking) console.log(`  • ${k}\n    ${BLOCKING[k]}\n`);
} else {
  console.log('\n\x1b[32mNo blocking fields outstanding.\x1b[0m\n');
}

if (notHeld.length) {
  console.log('\x1b[36mDELIBERATELY NOT HELD — the site is built around this\x1b[0m\n');
  for (const k of notHeld) console.log(`  • ${k}\n    ${NOT_HELD_NOTES[k]}\n`);
  console.log('  \x1b[2mEvery inspection-authority rule stays on. canClaimInspection is false,\n  harness check 2c still fails any offer of a written record of findings,\n  and the CTA offers a free visit rather than a free inspection.\x1b[0m\n');
}

if (pendingAdvisory.length) {
  console.log('\x1b[33mADVISORY — the build proceeds, these features stay dark\x1b[0m\n');
  for (const k of pendingAdvisory) console.log(`  • ${k}\n    ${ADVISORY[k]}\n`);
}

/* Credentials that publish on the owner's word alone.

   OWNER CLOSED THIS ON 10 SEP 2026 and the block below stopped asking for
   screenshots. His argument is the correct one and it is worth writing down,
   because the previous version of this report was solving the wrong problem.

   The site publishes every license number, attached to a named person, beside
   a link to the WSDA public license search. A reader can therefore verify each
   one directly, at the source, in about thirty seconds. A screenshot sitting in
   this company's files would improve nothing for that reader — it would only
   move the evidence from a state database into our own filing cabinet, which
   is a downgrade dressed as an upgrade.

   The `via` classes STAY in business.ts, because they are true and they record
   how each row got there. What has gone is the report treating them as an
   outstanding task. They are not owed to anybody; the verification path is
   already published and it is better than a screenshot.

   WHAT IS STILL WORTH CHASING, and the block below still prints it, is a
   MISSING EXPIRY. That is a different thing entirely. An expired license
   published as current is a real problem rather than a bookkeeping one, and
   nothing on the public page tells a reader when a license lapses. 

   SPLIT BY PERSON ROW rather than matching across a character window. The
   previous version searched up to 400 characters after a license number for
   via: 'owner', which silently missed any row whose comments pushed the two
   further apart — and it did exactly that to LI-94159 on the day it was added,
   under-reporting rather than erroring. A report that quietly omits an item is
   worse than no report. Row boundaries are structural; a character count is a
   guess. */
const personRows = src.split(/\n\s*\{\s*\n\s*slug:/).slice(1);
const ownerOnly = personRows
  .map((row) => {
    const num = row.match(/credential:\s*'(LI-[\d]+)'/);
    if (!num) return null;
    /* Exact match on the class. 'owner-verified' must NOT be swept up by a
       loose /owner/ test — the whole point of the three classes is that they
       mean different things. */
    const via = row.match(/via:\s*'([a-z-]+)'/);
    if (!via || via[1] === 'wsda-record') return null;
    return { num: num[1], via: via[1] };
  })
  .filter(Boolean);

/* Licenses whose expiry date is still unknown. This is the practical gap left
   by owner-verified rows: somebody who has genuinely opened the state record
   has the expiry in front of them, and an expired license published as current
   is a real problem rather than a bookkeeping one. LI-87206 has an expiry
   because we hold that record. */
const noExpiry = personRows
  .map((row) => {
    const num = row.match(/credential:\s*'(LI-[\d]+)'/);
    if (!num) return null;
    if (!/publishable:\s*true/.test(row)) return null;
    return /licenseExpires:\s*PENDING/.test(row) ? num[1] : null;
  })
  .filter(Boolean);
if (noExpiry.length) {
  console.log('\x1b[33mLICENSE NUMBER PUBLISHED, EXPIRY UNKNOWN\x1b[0m\n');
  console.log(`  • ${noExpiry.join(', ')}\n    These publish without an expiry date. Anyone reading the state record\n    has the expiry in front of them, so this is the cheapest thing to close.\n    An expired license shown as current is a real problem.\n`);
}

/* People published with no job title yet. The Person node omits the field and
   the expert block renders without it, so this is cosmetic rather than
   blocking — but a named, licensed person on the site with no role stated is
   an obvious gap and should not have to be noticed by eye. */
const untitled = personRows
  .map((row) => {
    const slug = row.match(/^\s*'([a-z0-9-]+)'/);
    if (!slug) return null;
    if (!/publishable:\s*true/.test(row)) return null;
    return /jobTitle:\s*PENDING/.test(row) ? slug[1] : null;
  })
  .filter(Boolean);
if (untitled.length) {
  console.log('\x1b[33mPUBLISHED WITH NO JOB TITLE — cosmetic, but visible\x1b[0m\n');
  for (const s of untitled) {
    console.log(`  • people.${s}.jobTitle\n    Named and licensed on the site with no role stated. The Person node\n    omits jobTitle entirely rather than emitting a placeholder.\n`);
  }
}
if (ownerOnly.length) {
  console.log('\x1b[2mEvidence class, for the record — no action outstanding\x1b[0m\n');
  console.log(
    '  ' + ownerOnly.map((r) => r.num).join(', ') + '\n' +
    "    Published on the owner's confirmation. Every number is on /about/ beside\n" +
    '    a link to the WSDA license search, so a reader verifies at the source\n' +
    '    rather than taking our word or looking at our screenshot. Owner closed\n' +
    '    this 10 Sep 2026; the via classes stay in business.ts as a record of\n' +
    '    provenance, not as a task.\n'
  );
}

/* KEYSTONE v2 (10 Sep 2026) — what the new standard needs from the OWNER.
   None of it blocks the build, and none of it can be done from the repo: each
   item is data only the owner's accounts hold, or a decision only the owner
   can make. Listed on every run so it stays in front of whoever reads this.
   Close an item by deleting its row here in the same commit that settles it,
   and update GUARDRAILS.md where the row points there. */
const KEYSTONE_V2 = [
  ['Search Console export — before the domain moves (Phase 0)',
   'Export 16 months of Performance data (query × page) from the CURRENT live property, plus GBP Insights, and keep the files. v2 makes this the first step of any replacement build: it is the "before" the new site gets measured against, and it is the demand data Part 6A decides geo pages from. Search Console keeps 16 months and no more — data not pulled is data gone.'],
  ['Legacy URL inventory joined to clicks (Part 13.1)',
   'The same export tells us which old URLs carry clicks. Every one of those has a redirect obligation. npm run redirects:check already maps 51 legacy paths; the export is what proves nothing with traffic was missed.'],
  ['Analytics — GA4 (Part 4A.4)',
   'The site has no analytics today. v2 requires GA4 with calls and form submissions as conversions, a custom dimension capturing the #:~:text= fragment (how AI Overview clicks show up), and referrer segments for chatgpt.com, perplexity.ai, copilot.microsoft.com and gemini.google.com. Needs a GA4 property and its measurement ID from the owner.'],
  ['Is 360-410-2199 the Google Business Profile number? (Part 4A.3)',
   'The site uses that one number everywhere and harness check 6 holds it there. Confirm it is also the GBP number; if a tracking number is in use anywhere, say which. GUARDRAILS.md §3.'],
  ['Geo pages need demand evidence (Part 6A)',
   'v2 gives a town or neighborhood its own page only on two of five signals: search volume, 10+ Search Console impressions a quarter, an Ads conversion there, a page for it on 2+ of the top five local competitors, or documented job history there. The site has 19 town pages and 30 neighborhood pages and none of that evidence recorded yet. Job history (from the CRM or QuickBooks) and the Search Console export above supply most of it. Nothing is hidden or removed in the meantime.'],
  ['Reviews — FTC rule and a monthly target (Part 14)',
   'No incentives, no gating, no staff-written reviews, no suppressing bad ones. Ask every customer at job completion and set a monthly target: v2 finds review cadence matters more than the total. GUARDRAILS.md §5 — the owner acknowledging it in writing is what v2 asks for.'],
  ['Bird work — offered or retired?',
   'Retired on 30 Aug 2026 per services.ts and /about/, but the berry-processing, marina and retail pages offer bird exclusion, a commercial photo caption advertises it, and Keystone Part 1.4 calls it the standout edge. GUARDRAILS.md §8.'],
  ['Coastal K9 on /trusted-partners/ — which instruction wins?',
   'Keystone says no K9 content on Sasquatch; the owner asked for Coastal K9 to be listed as a contracted specialist. The page does the second. GUARDRAILS.md §6.'],
];
console.log('\x1b[36mKEYSTONE v2 — needed from the owner, none of it blocking\x1b[0m\n');
for (const [k, v] of KEYSTONE_V2) console.log(`  • ${k}\n    ${v}\n`);

console.log('─'.repeat(58));
console.log(
  'Guarded fields render nothing and are omitted from schema entirely.\n' +
  'Fill them in src/data/business.ts and every page picks them up on the next build.\n',
);

if (process.argv.includes('--gate') && pendingBlocking.length) {
  console.log('\x1b[31mPUBLISH GATE: BLOCKED\x1b[0m — drafts only.\n');
  process.exit(1);
}
