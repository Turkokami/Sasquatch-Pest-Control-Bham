/**
 * seo.ts — title/description construction and the content rules that are
 * enforced in code rather than left to a writer's memory.
 *
 * Keystone M5: title ≤ 60 chars, keyword + city front-loaded, never cut
 * mid-word. Description 110–165, ending on punctuation. Part 12 lists
 * "meta description ends mid-word" as a recurring static-build failure:
 * long variable + fixed suffix overflow. The trim below is the fix.
 */

import { business } from '../data/business';

export const TITLE_MAX = 60;
export const DESC_MIN = 110;
export const DESC_MAX = 165;

/** Trim to a word boundary, never mid-word, never leaving dangling punctuation. */
export function trimToWord(s: string, max: number): string {
  if (s.length <= max) return s;
  const cut = s.slice(0, max + 1);
  const at = cut.lastIndexOf(' ');
  return (at > 0 ? cut.slice(0, at) : cut.slice(0, max)).replace(/[\s,;:–—-]+$/, '');
}

/**
 * Build a title that fits. The brand suffix is dropped before the subject is
 * ever truncated — the live site has titles at 72–76 chars because the suffix
 * was treated as fixed.
 */
export function buildTitle(subject: string, opts: { brand?: boolean } = {}): string {
  const brand = opts.brand !== false;
  const suffix = ` | ${business.name}`;
  const short = ' | Sasquatch';
  if (!brand) return trimToWord(subject, TITLE_MAX);
  if ((subject + suffix).length <= TITLE_MAX) return subject + suffix;
  if ((subject + short).length <= TITLE_MAX) return subject + short;
  return trimToWord(subject, TITLE_MAX);
}

/** Descriptions always end on punctuation. Never scraped from the body. */
export function buildDescription(s: string): string {
  let out = s.trim().replace(/\s+/g, ' ');
  if (out.length > DESC_MAX) {
    out = trimToWord(out, DESC_MAX - 1);
    out = out.replace(/[.,;:!?]*$/, '') + '.';
  }
  if (!/[.!?]$/.test(out)) out += '.';
  return out;
}

/* ------------------------------------------------------------------ *
 * Content rules encoded, not remembered.
 *
 * Keystone Part 14: "Credentials are hard boundaries. If the operator holds
 * a treatment license but not an inspector credential, no inspection pages
 * or implied inspection authority anywhere, including in FAQs. Encode it as
 * a content rule, not a one-off."
 *
 * Part 14 also records the most expensive mistake on a prior build: a vague
 * "make all inspections paid" applied via bulk replace when only termite
 * inspections were paid. So the rule is explicit and testable, and the
 * harness fails the build if forbidden copy appears.
 * ------------------------------------------------------------------ */

/**
 * REGULATED inspection terms. These describe the WSDA structural pest /
 * wood-destroying-organism inspection, a separately licensed activity under
 * RCW 15.58. They may not appear anywhere while that credential is unset.
 *
 * A general "free inspection" offer is deliberately NOT on this list. It is a
 * pre-service assessment, it is the owner's confirmed policy (free for
 * everything except bed bugs), and it asserts no authority over
 * wood-destroying organisms. Its exception list lives in
 * business.freeInspection — enumerated, never bulk-edited.
 *
 * NOTE: "organism" must not be touched by a British/US spelling sweep; a
 * naive 'organis' → 'organiz' rule corrupts it and silently disables the rule.
 */
export const INSPECTION_CLAIMS = [
  'wdo inspection',
  'wood destroying organism inspection',
  'wood-destroying organism inspection',
  'structural pest inspection',
  'escrow inspection',
  'real estate inspection',
  'inspection report',
];

/* --------------------------------------------------------------------------
 * IDENTIFY vs TREAT — owner clarification, 30 Aug 2026.
 *
 * We are NOT structural pest inspectors: we do not perform WDO inspections
 * and we do not issue reports. We ARE certified to TREAT wood-destroying
 * organisms that somebody else's inspection identified.
 *
 * A flat ban on the vocabulary above therefore blocks legitimate and
 * commercially valuable copy ("we treat what your inspector found"). So the
 * rule is now per-sentence rather than per-page:
 *
 *   1. A sentence that DISCLAIMS in the first person passes.
 *      → "We are not structural pest inspectors."
 *   2. A sentence that ATTRIBUTES the inspection to someone else passes,
 *      provided it does not also claim we performed it.
 *      → "We treat the findings in your inspector's report."
 *   3. Anything else fails.
 *
 * Rule 2's second condition is what stops the loosening from becoming a
 * loophole: attribution alone is not enough if the sentence still has us
 * doing the inspecting.
 * ------------------------------------------------------------------------ */

/** First-person denial. Checked FIRST, because it contains "we do". */
export const CLAIM_DISCLAIMER =
  /\b(we|sasquatch)\b[^.?!]{0,60}\b(are not|aren't|is not|isn't|do not|don't|does not|doesn't|cannot|can't|never|no longer)\b/i;

/** Puts the inspection in someone else's hands. */
export const CLAIM_ATTRIBUTION =
  /\b(your|my|their|its|his|her|the buyer'?s?|the seller'?s?|the lender'?s?|a licensed|another|third[- ]party|someone else'?s?|somebody else'?s?|independent|outside)\b[^.?!]{0,60}\b(inspector|inspection|report)\b|\binspector'?s\b/i;

/** Soliciting the work is claiming it, even when the noun is "your". Without
 *  this, "call us for your escrow inspection" passes on the word "your". */
export const CLAIM_SOLICITATION =
  /\b(call|contact|text|phone|schedule|book|request|order|get)\b[^.?!]{0,40}\b(us|sasquatch|today|now|yours?|an appointment|scheduled|booked)\b/i;

/** Any first-person reference to us. A sentence with none of these is not
 *  claiming anything about Sasquatch — see CLAIM_DESCRIPTIVE below. */
export const CLAIM_FIRST_PERSON = /\b(we|we'?re|we'?ve|us|our|ours|sasquatch)\b/i;

/** Us doing the inspecting. Disqualifies a sentence even with attribution. */
export const CLAIM_PERFORMANCE =
  /\b(we|our|sasquatch)\b[^.?!]{0,80}\b(perform|performs|performed|provide|provides|provided|offer|offers|offered|conduct|conducts|conducted|complete|completes|completed|carry out|issue|issues|issued|write|writes|wrote|prepare|prepares|prepared|supply|supplies|supplied|handle|handles)\b/i;

/** Split on sentence boundaries, keeping it simple and predictable. */
export function sentences(body: string): string[] {
  return body.split(/(?<=[.?!])\s+|\n+/).filter((s) => s.trim().length > 0);
}

/* --------------------------------------------------------------------------
 * WDO FINDINGS REPORTS — added 31 Aug 2026 after reading the actual rule.
 *
 * SOURCE: WAC 16-228-2045, "Complete wood destroying organism inspection
 * reports", read via app.leg.wa.gov on 31 Aug 2026. It provides that any
 * report identifying damage or infestation by wood destroying organisms must
 * be a COMPLETE WDO inspection report — which carries its own requirements,
 * including a WSDA Inspection Control Number obtained under RCW 15.58.450 and
 * displayed in the upper third of the front page, the inspector's name and
 * WSDA license number, diagrams, and a list of excluded areas.
 * Review date: 31 Aug 2027, or sooner if the rule changes.
 *
 * WHY THIS RULE EXISTS. The identify-vs-treat rules above police the words
 * "inspection" and "report". They do NOT catch the subtler version of the same
 * problem: copy promising the customer a written document setting out what we
 * found in their timber. That is a findings report by any reading, and offering
 * one is a regulated act regardless of what the page calls it.
 *
 * A page was published on 31 Aug 2026 saying we would give "a clear written
 * account of the treatment we carried out and what we observed" on a dampwood
 * termite job. It passed every existing check and was still wrong. Hence this.
 *
 * PASSES: promising a record of the TREATMENT — product, locations, dates.
 *         What we did.
 * FAILS:  promising a written record of FINDINGS — what we saw, what we found,
 *         what is damaged — in a sentence that is also about WDOs.
 *
 * NOTE, and this matters: the rule is deliberately conservative. The WSDA
 * category tooltip for PCO Structural says the category "may perform specific
 * wood destroying organism inspections", and WSPMA material describes a
 * "specific" inspection as one for on-site proposals and estimates, which may
 * NOT be used in a real estate transaction and must say so in bold print. That
 * may well permit more than we currently claim. It is not being acted on from
 * a tooltip and a trade-association article — it needs WSDA or an attorney to
 * confirm, and it is on the owner's list. Until then the site stays put: the
 * conservative position costs a little copy, the loose one costs a license.
 * ------------------------------------------------------------------------ */

/** Wood-destroying organism vocabulary. A sentence has to be about WDOs
 *  before the findings-report rule is worth applying to it. */
export const WDO_SUBJECT =
  /\b(wood[- ]destroying|wdo|termite|termites|carpenter ant|carpenter ants|wood[- ]boring beetle|powderpost|powder[- ]post|dampwood|drywood)\b/i;

/** Us promising the customer a written record of some kind.
 *
 *  TWO ORDERINGS, and the second was added after a live miss. The original
 *  pattern required the actor before the noun — "we give you a report". The
 *  sentence that got through was "The report you get says which of those is
 *  driving the problem", where the document comes first and the actor is a
 *  bare "you get" trailing behind it. Same promise, opposite word order, and
 *  it sat published on /services/carpenter-bee-control/ through every green
 *  run of this check until a writer reading the page noticed it.
 *
 *  Worth recording rather than just patching: this rule matches English
 *  phrasing, and English has more ways to say a thing than a regex has
 *  alternations. It is a net, not a proof. Copy still has to be read. */
export const WDO_WRITTEN_OFFER =
  /(\b(we|our|sasquatch|you get|you'?ll get|you will get|we'?ll give|we will give|we give|we provide|we supply|we issue)\b[^.?!]{0,80}\b(written|in writing|document|documentation|record|report|letter|statement|paperwork)\b)|(\b(the|a|your|our)\s+(written\s+)?(document|documentation|record|report|letter|statement|paperwork|write[- ]?up)\b[^.?!]{0,60}\b(you|we|us|sasquatch)\b)/i;

/** …of what we FOUND, rather than of what we DID.
 *
 *  The second alternation covers that same miss from the other side: a
 *  document described by WHAT IT TELLS YOU rather than by the word
 *  "findings". "The report says which of those is driving the problem", "the
 *  write-up sets out what is wrong", "it tells you what you have" — each
 *  describes a diagnosis rendered in writing, which under WAC 16-228-2045 is
 *  the regulated act whatever noun the document is given.
 *
 *  Deliberately NOT matched: a document that says what we DID. "The record
 *  says which members were treated" must keep passing, because that is the
 *  substitute this entire rule exists to steer copy toward. Which is why the
 *  verbs are paired with diagnosis objects — what is wrong, what you have,
 *  what is driving it, the cause, the extent — rather than matching any verb
 *  followed by anything. */
export const WDO_FINDINGS_LANGUAGE =
  /(\b(what we (saw|found|observed|noted|identified)|our findings|the findings we|what was found|damage we (saw|found|observed)|conditions we (saw|found|observed)|infestation we (saw|found|observed))\b)|(\b(says|say|sets out|tells you|shows you|explains|details|lists|identifies|describes|documents)\b[^.?!]{0,40}\b(which of (those|these|them)|what is wrong|what you have|what is driving|what caused|the cause|the extent|the damage|the infestation|conducive conditions)\b)/i;

/** A sentence that explicitly denies issuing such a document is fine. */
export const WDO_DENIAL =
  /\b(we|sasquatch)\b[^.?!]{0,80}\b(do not|don'?t|does not|doesn'?t|cannot|can'?t|will not|won'?t|never|not something we)\b/i;

/* The WDO findings rule in Spanish — same reasoning as the inspection terms
   above, added the same day. A sentence offering "un informe de lo que
   encontramos" about termites is the regulated act in either language. */
export const WDO_SUBJECT_ES =
  /(organismos? que destruyen? la madera|organismos? destructores? de (la )?madera|(^|[^\p{L}])wdo(?![\p{L}])|termitas?(?![\p{L}])|hormigas? carpinteras?|escarabajos? (barrenadores?|de la madera|que perforan)|carcoma|pudrición)/iu;
export const WDO_WRITTEN_OFFER_ES =
  /((^|[^\p{L}])(le (entregamos|damos|mandamos|enviamos|dejamos)|usted recibe|va a recibir|recibirá|le llega)(?![\p{L}])[^.?!]{0,80}(por escrito|documento|registro|reporte|informe|constancia|carta))|((^|[^\p{L}])(el|un|su|nuestro)\s+(documento|registro|reporte|informe|escrito)(?![\p{L}])[^.?!]{0,60}(dice|explica|muestra|detalla|describe|documenta|identifica)(?![\p{L}]))/iu;
export const WDO_FINDINGS_ES =
  /(lo que (encontramos|vimos|observamos|identificamos|hallamos)|nuestros hallazgos|los hallazgos|qué encontramos|el daño que (encontramos|vimos)|qué (tiene|está causando|causó)|la causa(?![\p{L}])|el alcance del daño|la infestación)/iu;
export const WDO_DENIAL_ES =
  /(^|[^\p{L}])(no|nunca)(\s+[\p{L}]+){0,3}?\s+(somos|hacemos|emitimos|entregamos|damos|producimos|escribimos|firmamos|es)(?![\p{L}])/iu;

/**
 * Copy offering the customer a written account of WDO FINDINGS.
 * Separate from checkInspectionClaims because it catches a different failure:
 * not the regulated words, but the regulated act described in plain English.
 */
export function checkWdoFindingsReports(body: string, heading = ''): string[] {
  /* SCOPE IS NEITHER SENTENCE NOR WHOLE PAGE. Both are wrong, and we tried
     both before landing here.

     SENTENCE-SCOPED is too narrow. The sentence that prompted this rule —
     "We will give you a clear written account of the treatment we carried out
     and what we observed" — contains no WDO vocabulary at all. It sat on a
     dampwood termite page, in a section about a termite job, and every reader
     would take the document it offers to be about termite findings. A
     sentence-scoped subject test walks straight past it.

     WHOLE-PAGE-SCOPED is too broad. The bed bug page mentions termites once in
     passing; that must not turn a legitimate sentence about bed bug service
     records in care settings into a compliance failure.

     So: the page's heading counts as subject context for the whole page, and
     otherwise a WDO term has to appear near the sentence. Near enough that a
     reader would connect the document being offered to the organism. */
  const nearWindow = 600;
  const isWdo = (t: string) => WDO_SUBJECT.test(t) || WDO_SUBJECT_ES.test(t);
  const headingIsWdo = isWdo(heading);

  const bad: string[] = [];
  for (const s of sentences(body)) {
    const en = WDO_WRITTEN_OFFER.test(s) && WDO_FINDINGS_LANGUAGE.test(s) && !WDO_DENIAL.test(s);
    const es = WDO_WRITTEN_OFFER_ES.test(s) && WDO_FINDINGS_ES.test(s) && !WDO_DENIAL_ES.test(s);
    if (!en && !es) continue;

    if (!headingIsWdo) {
      const at = body.indexOf(s);
      const around = body.slice(
        Math.max(0, at - nearWindow),
        at + s.length + nearWindow,
      );
      if (!isWdo(around)) continue;
    }

    bad.push(
      `offers a written record of findings in a WDO context (WAC 16-228-2045) — ${s.trim().slice(0, 140)}`,
    );
  }
  return bad;
}


/**
 * Returns the offending sentences. Empty array means the copy is clean.
 * Exported so the harness can mirror it against BUILT html.
 */
/**
 * THIRD PASS CONDITION — added 31 Aug 2026.
 *
 * The two original conditions assume every sentence containing a regulated
 * term is making a claim about us. That held while the site was services and
 * locations. It broke the moment we started publishing guides that EXPLAIN the
 * regulation, where sentences like "A complete WDO inspection report is the
 * regulated document" are describing the world, not asserting authority.
 *
 * The test is simple and, we think, safe: a sentence that makes no
 * first-person reference to Sasquatch at all is not claiming Sasquatch does
 * anything. Descriptive, definitional and citation text all fall in here.
 *
 * SOLICITATION REMAINS A HARD DISQUALIFIER regardless, because "Call today for
 * a WDO inspection" contains no first-person reference either and is exactly
 * the copy this whole rule exists to stop. Without that guard this condition
 * would be a hole straight through the middle of the check.
 */
export const CLAIM_DESCRIPTIVE = (s: string): boolean =>
  !CLAIM_FIRST_PERSON.test(s) && !CLAIM_SOLICITATION.test(s);

/* --------------------------------------------------------------------------
 * THE SAME RULES IN SPANISH — added 10 Sep 2026, before the first Spanish
 * termite or WDO page was written rather than after one shipped.
 *
 * Every pattern above is English, so until today a Spanish page could offer
 * "una inspección de organismos que destruyen la madera" with every check
 * green. The Spanish tier was about to grow into exactly the services where
 * that vocabulary lives, which made this the moment to close it.
 *
 * Same three pass conditions and the same hard disqualifier; the grammar is
 * what changes. Spanish drops the subject, so "we" is usually a verb ending
 * ("hacemos", "emitimos") rather than a pronoun, and the first-person test
 * reads endings as well as words. Letters are matched with \p{L} and the u
 * flag, because JavaScript's \b does not count "á" or "ñ" as part of a word
 * and would split "podríamos" in the middle.
 *
 * Biased toward the false positive, like the English: a writer splitting a
 * sentence in two costs a minute; a Spanish page offering a regulated
 * inspection costs a license. scripts/tests/inspection-claims.test.ts pins
 * both directions.
 * ------------------------------------------------------------------------ */
export const INSPECTION_CLAIMS_ES = [
  'inspección wdo', 'inspecciones wdo',
  'inspección de organismos que destruyen la madera',
  'inspecciones de organismos que destruyen la madera',
  'inspección de organismos destructores de madera',
  'inspección de organismos destructores de la madera',
  'inspección estructural de plagas', 'inspecciones estructurales de plagas',
  'informe de inspección', 'reporte de inspección',
  'inspección para escrow', 'inspección de escrow',
  'inspección de bienes raíces', 'inspección para la venta', 'inspección de compraventa',
];

/** First-person or company denial: "no somos…", "no emitimos…", "no la presentamos como…". */
export const CLAIM_DISCLAIMER_ES =
  /(^|[^\p{L}])(no|nunca)(\s+[\p{L}]+){0,3}?\s+(somos|hacemos|realizamos|emitimos|ofrecemos|presentamos|producimos|damos|entregamos|preparamos|escribimos|firmamos|tenemos|es|son|hace|realiza|emite|ofrece|produce)(?![\p{L}])/iu;

/** The inspection placed in somebody else's hands. */
export const CLAIM_ATTRIBUTION_ES =
  /(^|[^\p{L}])(su|sus)\s+(inspector|inspectora|inspección|informe|reporte)(?![\p{L}])|(^|[^\p{L}])(inspector|inspectora)\s+(independiente|con licencia|del comprador|del vendedor|del prestamista)(?![\p{L}])|(^|[^\p{L}])(un|una|otro|otra)\s+(inspector|inspectora)(?![\p{L}])|(del comprador|del vendedor|del prestamista|de otra persona|de un tercero)(?![\p{L}])/iu;

/** Soliciting the work in Spanish — imperatives aimed at the reader. */
export const CLAIM_SOLICITATION_ES =
  /(^|[^\p{L}])(llame|llámenos|llamenos|mande|escríbanos|escribanos|pida|pídanos|pidanos|agende|programe|solicite|reserve|contrate)(?![\p{L}])/iu;

/** Any first-person reference: pronouns, the company name, or a -amos/-emos/-imos verb. */
export const CLAIM_FIRST_PERSON_ES =
  /(^|[^\p{L}])(nosotros|nuestro|nuestra|nuestros|nuestras|nos|sasquatch)(?![\p{L}])|[\p{L}]{2,}(amos|emos|imos)(?![\p{L}])/iu;

/** Us doing the inspecting. Disqualifies even an attributed sentence. */
export const CLAIM_PERFORMANCE_ES =
  /(^|[^\p{L}])(hacemos|realizamos|ofrecemos|emitimos|entregamos|preparamos|escribimos|firmamos|completamos|proporcionamos|damos|hicimos|haremos|realizaremos|llevamos a cabo)(?![\p{L}])/iu;

export function checkInspectionClaims(body: string): string[] {
  const bad: string[] = [];
  for (const s of sentences(body)) {
    const low = s.toLowerCase();
    const term = INSPECTION_CLAIMS.find((c) => low.includes(c));
    if (term) {
      if (CLAIM_DISCLAIMER.test(s)) continue;
      if (CLAIM_ATTRIBUTION.test(s) && !CLAIM_PERFORMANCE.test(s) && !CLAIM_SOLICITATION.test(s)) continue;
      if (CLAIM_DESCRIPTIVE(s)) continue;
      bad.push(`"${term}" without attribution, disclaimer or descriptive framing — ${s.trim().slice(0, 120)}`);
      continue;
    }
    const termEs = INSPECTION_CLAIMS_ES.find((c) => low.includes(c));
    if (!termEs) continue;
    if (CLAIM_DISCLAIMER_ES.test(s)) continue;
    if (CLAIM_ATTRIBUTION_ES.test(s) && !CLAIM_PERFORMANCE_ES.test(s) && !CLAIM_SOLICITATION_ES.test(s)) continue;
    if (!CLAIM_FIRST_PERSON_ES.test(s) && !CLAIM_SOLICITATION_ES.test(s)) continue;
    bad.push(`"${termEs}" sin atribución, negación ni marco descriptivo — ${s.trim().slice(0, 120)}`);
  }
  return bad;
}

/** Unqualified warranty language. Keystone doctrine #6: a guarantee is a
 *  defined term linked to the terms page, never an open-ended promise. */
export const FORBIDDEN_WARRANTY = [
  'if the pests come back, we come back',
  'guaranteed forever',
  'lifetime guarantee',
  '100% guaranteed results',
  'we guarantee no pests',
];

export function checkCopy(body: string): string[] {
  const errs: string[] = [];
  const low = body.toLowerCase();

  /* We may TREAT wood-destroying organisms but not INSPECT for them, so this
     is a per-sentence attribution test rather than a vocabulary ban. */
  if (!business.canClaimInspection) {
    errs.push(...checkInspectionClaims(body));
  }
  for (const p of FORBIDDEN_WARRANTY) {
    if (low.includes(p)) errs.push(`unqualified warranty language: "${p}"`);
  }
  /* Every "guarantee" mention must be the defined term, linked to terms. */
  if (/\bguarantee\b/i.test(body) && !/our-guarantee|100% service guarantee/i.test(body)) {
    errs.push('bare "guarantee" not tied to the defined 100% Service Guarantee term');
  }
  /* Keystone M1 / anti-slop: no template variables ever reach the body.
     The live site renders [company] and [phone] in production metadata. */
  const tok = body.match(/\[(company|phone|city|service|state)\]|\{\{[^}]+\}\}/gi);
  if (tok) errs.push(`unreplaced template token(s): ${[...new Set(tok)].join(', ')}`);

  return errs;
}

/** The Quick Answer contract — 40–60 words, at the top, a real answer. */
export function checkAnswer(text: string): string[] {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const errs: string[] = [];
  if (words < 40 || words > 60) errs.push(`quick answer is ${words} words, must be 40–60`);
  if (/^(tap|click|scroll|select|choose)\b/i.test(text.trim())) {
    errs.push('quick answer opens with an instruction, not an answer');
  }
  return errs;
}
