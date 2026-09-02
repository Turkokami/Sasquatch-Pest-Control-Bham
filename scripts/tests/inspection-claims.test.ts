import { checkInspectionClaims } from '../../src/lib/seo';

/**
 * The identify-vs-treat rule has three pass conditions and one hard
 * disqualifier, and the interactions are where it has broken before. These
 * cases pin all four.
 *
 * A sentence containing a regulated term passes if it:
 *   1. disclaims in the first person, or
 *   2. attributes the inspection elsewhere without also claiming we do it, or
 *   3. makes no first-person reference at all (descriptive / citation text).
 * And fails regardless if it solicits the work.
 */

const SHOULD_FAIL = [
  /* Plain claims. */
  'We perform WDO inspections for buyers and sellers throughout Whatcom County.',
  'Sasquatch provides a structural pest inspection as part of every escrow.',
  'Our team completes the inspection report the same week.',
  'We can prepare an escrow inspection for your closing.',
  /* Attribution present, but we are still the ones doing it — condition 2's
     second clause is what catches these. */
  'We perform the WDO inspection your lender asked for.',
  'We write your inspection report ourselves.',
  /* THE SOLICITATION HOLE. Both of these have attribution or no first person,
     and both are exactly the copy the rule exists to stop. */
  'Call us today for your escrow inspection.',
  'Book a WDO inspection now.',
  'Schedule your structural pest inspection today.',
  /* DELIBERATELY FAILS, and it is worth explaining why rather than widening
     the rule to admit it.

     "We handle the treatment side of a WDO inspection carried out by a third
     party" is, to a human, clearly fine: the third party inspects, we treat.
     To the rule it reads as a first-person performance verb ("we handle")
     attached to a regulated term, with the attribution trailing behind it.

     We could widen CLAIM_ATTRIBUTION to match post-positioned attribution.
     We have chosen not to, because "performed by" and "required by" are
     grammatically identical and mean opposite things — "We provide the WDO
     inspection required by your lender" would sail through a rule loose
     enough to admit this sentence.

     For a compliance check, biasing toward the false positive is correct. The
     cost is that a writer occasionally has to split a sentence in two, which
     is what the passing case above does. That is a good trade. */
  'We handle the treatment side of a WDO inspection carried out by a third party.',
];

const SHOULD_PASS = [
  /* 1 — first-person disclaimer. */
  'We are not structural pest inspectors and we do not perform WDO inspections.',
  'Sasquatch does not issue an inspection report of that kind.',
  /* 2 — attribution without performance. */
  'We treat the findings in your inspector\'s report.',
  'Where the buyer\'s inspection report identifies dampwood termites, treatment is our work.',
  /* The split form of the ambiguous case below — unambiguous, so it passes. */
  'We handle the treatment side. The inspection itself is carried out by a third party.',
  /* 3 — descriptive and citation text, no first-person reference anywhere. */
  'A complete WDO inspection report is the regulated document a sale requires.',
  'It is illegal for a business to conduct complete WDO inspections without a company license.',
  'WAC 16-228-2045 — Complete wood destroying organism inspection reports.',
  'A specific inspection may not be used in a real estate transaction.',
  /* No regulated term at all — must never fire. */
  'The assessment is free for every pest we handle other than bed bugs.',
];

let fails = 0;
for (const s of SHOULD_FAIL) {
  if (checkInspectionClaims(s).length === 0) { console.log('MISSED:', s); fails++; }
}
for (const s of SHOULD_PASS) {
  const r = checkInspectionClaims(s);
  if (r.length) { console.log('FALSE POSITIVE:', s, '\n   ->', r[0]); fails++; }
}
const n = SHOULD_FAIL.length + SHOULD_PASS.length;
console.log(fails === 0
  ? `\x1b[32minspection-claim rules: ${n}/${n} cases correct\x1b[0m`
  : `\x1b[31m${fails} of ${n} cases wrong\x1b[0m`);
/* NOT process.exit here — a second suite follows below, and exiting at this
   point silently skipped it. It ran green for one commit while testing
   nothing, which is the same class of defect the suite below exists to catch:
   a check that reports success without doing its job. */
if (fails) process.exit(1);

/* ------------------------------------------------------------------ *
 * THE CREDENTIAL GATE ITSELF — added 2 Sep 2026 after it failed open.
 *
 * harness.mjs decides whether inspection claims are permitted by reading
 * src/data/business.ts as text. That makes it a second source of truth for
 * something `isReady` already knows, and on 2 Sep 2026 it broke exactly the
 * way second sources of truth break.
 *
 * The old rule was NEGATIVE: "permitted unless the field literally says
 * PENDING". When the sentinel on those fields changed from PENDING to
 * NOT_HELD — a change meaning we will never hold this credential — the check
 * saw no PENDING, concluded the credential was held, and stopped enforcing
 * inspection rules across the whole site. It printed "inspector credential is
 * set — inspection claims permitted" for a company with no inspector.
 *
 * The rule is now POSITIVE: permitted only when the field is assigned a
 * quoted string. These cases pin that. A future sentinel — NOT_APPLICABLE,
 * REVOKED, EXPIRED, anything — must leave the gate CLOSED without anyone
 * remembering to come back here.
 * ------------------------------------------------------------------ */
const heldCredential = (field: string, biz: string) =>
  new RegExp(`${field}:\\s*'[^']+'`).test(biz);

const GATE_CASES: [string, string, boolean][] = [
  /* A real license number opens the gate. Only this shape may. */
  ["structuralPestInspector: 'SPI-12345',", 'structuralPestInspector', true],
  ["inspectionCompany: 'SPI-CO-999',", 'inspectionCompany', true],
  /* Every sentinel leaves it shut. */
  ['structuralPestInspector: PENDING as Owed<string>,', 'structuralPestInspector', false],
  ['structuralPestInspector: NOT_HELD as Owed<string> | NotHeld,', 'structuralPestInspector', false],
  ['inspectionCompany: NOT_HELD as Owed<string> | NotHeld,', 'inspectionCompany', false],
  /* Sentinels nobody has invented yet must also leave it shut — this is the
     whole point of matching what HELD looks like rather than what owed does. */
  ['structuralPestInspector: REVOKED,', 'structuralPestInspector', false],
  ['structuralPestInspector: EXPIRED_2024,', 'structuralPestInspector', false],
  ['structuralPestInspector: undefined,', 'structuralPestInspector', false],
  ['structuralPestInspector: null,', 'structuralPestInspector', false],
  /* An empty string is not a credential. */
  ["structuralPestInspector: '',", 'structuralPestInspector', false],
];

let gateFails = 0;
for (const [line, field, want] of GATE_CASES) {
  const got = heldCredential(field, line);
  if (got !== want) {
    console.log(`WRONG: heldCredential on \`${line}\` = ${got}, expected ${want}`);
    gateFails++;
  }
}
console.log(gateFails === 0
  ? `\x1b[32minspection credential gate: ${GATE_CASES.length}/${GATE_CASES.length} cases correct\x1b[0m`
  : `\x1b[31m${gateFails} of ${GATE_CASES.length} gate cases wrong\x1b[0m`);
if (gateFails) process.exit(1);
