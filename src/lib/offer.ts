/* --------------------------------------------------------------------------
 * THE OFFER — what we call the free pre-service visit, in one place.
 *
 * This existed as four lines inside Cta.astro when the CTA was the only thing
 * that made the offer. It is a module now because the sticky mobile action bar
 * makes the same offer, and two components deciding the same policy separately
 * is the single-source-of-truth defect this codebase keeps re-hitting — the
 * exact shape of it recorded in Keystone Part 14, where a bulk "make all
 * inspections paid" edit was applied when only termite inspections were paid.
 *
 * WHAT IS AND IS NOT ALLOWED HERE, because it looks like a compliance problem and
 * mostly is not. A general free inspection offer is explicitly permitted and
 * src/lib/seo.ts says so in as many words: it is a pre-service assessment, it
 * is the owner's confirmed policy, and it asserts no authority over
 * wood-destroying organisms. What may never appear is the REGULATED language
 * in INSPECTION_CLAIMS — WDO, structural pest, escrow, real-estate inspection,
 * inspection report — which describes an activity licensed separately under
 * RCW 15.58 and which this company does not hold. Nothing in this file
 * produces any of those strings, and harness check 2c would fail the build if
 * it did.
 *
 * THE EXCEPTION IS THE WHOLE REASON THIS IS COMPUTED RATHER THAN TYPED.
 * business.freeInspection.exceptions enumerates the services where the visit
 * is NOT free — bed bugs, which carry a paid verification visit. A sticky bar
 * hard-coded to "Free inspection" would sit on the bed bug pages promising
 * something the company charges for. That is a price claim, and price claims
 * are the one kind of copy this site checks against business.ts on every
 * build.
 * ------------------------------------------------------------------------ */
import { business } from '../data/business';
import { ES_TO_EN } from '../data/i18n';

/** Is the pre-service visit free for this service? */
export function freeInspectionForSlug(serviceSlug?: string): boolean {
  return (
    business.freeInspection.default &&
    !(serviceSlug && business.freeInspection.exceptions.includes(serviceSlug))
  );
}

/**
 * Same question, asked by a component that knows only the URL.
 *
 * The exception list holds SERVICE slugs, so only a service route can carry an
 * exception: `/services/bed-bug-control/` and the problem pages beneath it.
 * Anything else — a location, a guide, a pest profile — gets the default. That
 * is deliberately the same scope Cta.astro has always applied via its
 * serviceSlug prop, so moving the rule here changes no page's wording.
 */
export function freeInspectionForPath(path: string): boolean {
  /* A SPANISH PAGE IS ASKED ABOUT AS ITS ENGLISH TWIN, fixed 10 Sep 2026.
     Until then this matched /services/ only, so /es/servicios/control-de-chinches/
     fell through to the default and its sticky bar offered a free inspection
     on the one service where the visit is paid — while the page body, three
     inches up, said the opposite. The pair map in i18n.ts is the only place a
     Spanish path is related to an English one, so it is asked here rather
     than a second exception list being typed in Spanish. */
  const en = ES_TO_EN[path] ?? path;
  const m = en.match(/^\/services\/([^/]+)\//);
  return freeInspectionForSlug(m?.[1]);
}

/**
 * THE WORDING, and it is the owner's call rather than a style preference.
 *
 * An earlier pass set this to "Book a free visit" — the offer unchanged, the
 * noun softened — and left a note saying the owner should confirm it and that
 * reverting was one line. The owner asked for inspection wording on 2 Sep 2026
 * and this is that revert, applied in the one place both callers read.
 */
export const offerLabel = (free: boolean, lang: 'en' | 'es' = 'en') =>
  lang === 'es'
    ? free ? 'Pida una inspección gratuita' : 'Pida una estimación gratuita'
    : free ? 'Request a free inspection' : 'Request a free estimate';

/** The same offer with the room a 360px-wide button actually has. */
export const offerLabelShort = (free: boolean, lang: 'en' | 'es' = 'en') =>
  lang === 'es'
    ? free ? 'Inspección gratis' : 'Estimación gratis'
    : free ? 'Free inspection' : 'Free estimate';

/** Which language a page is in, from its path — for components rendered by
 *  twenty route files, where a prop is twenty chances to forget one. */
export const langForPath = (path: string): 'en' | 'es' =>
  path === '/es/' || path.startsWith('/es/') ? 'es' : 'en';

/** The in-page lead form's anchor. Declared once; the bar links to it. */
export const LEAD_FORM_ID = 'lead-form';
