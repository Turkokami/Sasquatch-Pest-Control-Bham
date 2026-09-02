import { checkWdoFindingsReports } from '../../src/lib/seo';

/* The subject test is PAGE-scoped, so each case is a whole page body:
   a WDO context plus the sentence under test. That is the shape the real
   check sees, and testing it any other way is how the first version of this
   rule passed while missing the sentence that prompted it. */
const WDO_PAGE = 'Dampwood termites in a crawlspace are a wood-decay problem. ';
const PLAIN_PAGE = 'Rodents in a crawlspace get in through failed vent screens. ';
/* A page whose subject is something else entirely, with one passing mention of
   termites a long way from the sentence under test. This is the bed bug page,
   and whole-page scoping wrongly failed it. Real prose, not padding — the
   sentence splitter needs real boundaries to behave as it does in production. */
const FILLER = [
  'Bed bugs travel in luggage and in second-hand furniture.',
  'They do not fly and they do not travel far on their own.',
  'A single introduced female can go unnoticed for weeks.',
  'Care settings raise the stakes because residents may not report bites.',
  'Reduced sensation means an infestation runs longer before anyone notices.',
  'Scheduled monitoring is therefore worth more in those buildings than elsewhere.',
  'Encasements make a later treatment simpler and cheaper.',
  'Interceptors turn a vague worry into a definite answer over a few weeks.',
  'Preparation is where shared-building treatments most often fail.',
  'Follow-up visits are timed against the egg-hatch cycle.',
].join(' ');
const FAR_MENTION_PAGE =
  'Dampwood termites are a separate subject covered on another page. ' + FILLER + ' ';

const SHOULD_FAIL = [
  /* THE SECOND LIVE MISS, found 2 Sep 2026 on /services/carpenter-bee-control/.
     The document comes first and the actor trails behind it as a bare "you
     get", which the original actor-then-noun pattern could not see. It had
     been published through every green run of this check. */
  WDO_PAGE + 'The report you get says which of those is driving the problem, and where the honest answer is drainage that is what it says.',
  /* Same shape, other phrasings — a document described by what it tells you
     rather than by the word "findings". */
  WDO_PAGE + 'The write-up we leave sets out what is wrong and how far it has gone.',
  WDO_PAGE + 'Our record tells you what you have and what caused it.',
  WDO_PAGE + 'The statement you receive describes the extent before any pricing.',
  /* The exact sentence that was published on 31 Aug 2026. It contains no
     WDO vocabulary of its own — that is the whole point of this case. */
  WDO_PAGE + 'We will give you a clear written account of the treatment we carried out and what we observed.',
  WDO_PAGE + 'You get a record of what we found and where the damage runs.',
  WDO_PAGE + 'Our report sets out our findings.',
  WDO_PAGE + 'We provide documentation of what we saw in the framing.',
];

const SHOULD_PASS = [
  /* Records of the TREATMENT are fine — that is not a findings report. */
  WDO_PAGE + 'You get a clear record of the treatment performed — the product, the locations treated, the date.',
  /* An explicit denial is the copy we actually want to encourage. */
  WDO_PAGE + 'We do not issue a written account of what we found in your timber; that is a regulated report.',
  WDO_PAGE + 'We treat the dampwood termites your inspector identified.',
  WDO_PAGE + 'You get the figure in writing before any work starts.',
  /* Same offer on a page that is not about wood-destroying organisms is
     perfectly legitimate — the rule must not bleed into rodent exclusion. */
  PLAIN_PAGE + 'We will give you a written scope covering what we found at the foundation.',
  /* One passing WDO mention far from the sentence must not fail a page about
     something else. */
  FAR_MENTION_PAGE + 'For all of these we document what was inspected, what we found and what was done.',
  WDO_PAGE + 'A record of the treatment performed is what you get, and nothing dressed up to resemble more.',
  /* THE CASE THAT MATTERS MOST after widening the rule: a document that says
     what we DID, in the same document-first word order as the miss above. If
     this ever starts failing, the rule has stopped distinguishing a treatment
     record from a findings report and has become useless — because a
     treatment record is the exact substitute all of this steers copy toward. */
  WDO_PAGE + 'The record you get says which members were treated, with the product and the date.',
  WDO_PAGE + 'The document we leave lists the locations treated and nothing else.',
  /* Diagnosis verbs about someone ELSE's report are fine — reading a report a
     licensed inspector produced is a thing we can help with and talk about. */
  WDO_PAGE + 'Their report says which of those they established, and it is worth asking whether a moisture meter was used.',
];

let fails = 0;
for (const s of SHOULD_FAIL) {
  if (checkWdoFindingsReports(s).length === 0) { console.log('MISSED:', s); fails++; }
}
for (const s of SHOULD_PASS) {
  const r = checkWdoFindingsReports(s);
  if (r.length) { console.log('FALSE POSITIVE:', s, '\n   ->', r[0]); fails++; }
}
const n = SHOULD_FAIL.length + SHOULD_PASS.length;
console.log(fails === 0
  ? `\x1b[32mWDO findings-report rule: ${n}/${n} cases correct\x1b[0m`
  : `\x1b[31m${fails} of ${n} cases wrong\x1b[0m`);
process.exit(fails ? 1 : 0);
