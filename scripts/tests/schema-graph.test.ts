import { buildGraph, validateGraph, ID, type PageSchemaInput } from '../../src/lib/schema';
import { PESTS } from '../../src/data/pests';
import { liveServices } from '../../src/data/services';
import { business } from '../../src/data/business';

/**
 * The graph is now roughly 120 @id-anchored nodes and 35 cross-references per
 * page. Harness check 2d runs referential integrity over what actually ships,
 * which is the check that matters — but it needs a build first, and it cannot
 * test the cases that must NEVER appear, because a case that never appears
 * leaves no evidence in the output.
 *
 * So this suite pins two different things:
 *
 *   PART 1  every page kind produces a graph with no dangling reference and no
 *           node declared twice, and the validator that says so is itself
 *           capable of failing — a validator nobody has ever seen fail is a
 *           validator nobody has tested.
 *
 *   PART 2  the four non-negotiables, stated as absences. aggregateRating,
 *           any other rating, any price, any inspection claim. Each of these
 *           has a long argument behind it in src/data/business.ts, and each is
 *           the kind of thing that gets quietly reintroduced by somebody
 *           adding a plausible-looking property a year from now.
 */

const guideTopics = [
  { slug: 'wdo-reports-in-a-property-sale', title: 'WDO Reports in a Washington Property Sale' },
  { slug: 'why-crawlspaces-here-stay-wet', title: 'Why Crawlspaces Here Stay Wet' },
];

const faqs = [{ q: 'Is this a question?', a: 'It is, and this is the answer to it.' }];
const crumbs = [{ name: 'Home', path: '/' }, { name: 'Here', path: '/here/' }];

const CASES: [string, PageSchemaInput][] = [
  ['home', { path: '/', title: 'Home', description: 'd', kind: 'home', faqs, guideTopics }],
  ['hub', { path: '/services/', title: 'Services', description: 'd', kind: 'page', faqs, breadcrumbs: crumbs, guideTopics }],
  ['service', {
    path: `/services/${liveServices()[0].slug}/`, title: 'S', description: 'd', kind: 'service',
    serviceName: liveServices()[0].name, faqs, breadcrumbs: crumbs, guideTopics,
  }],
  ['problem', {
    path: `/services/${liveServices()[0].slug}/rats-in-the-crawlspace/`, title: 'P', description: 'd',
    kind: 'service', serviceName: liveServices()[0].name, faqs, breadcrumbs: crumbs, guideTopics,
  }],
  ['county', { path: '/locations/whatcom-county/', title: 'C', description: 'd', kind: 'location', areaServed: ['Whatcom County'], faqs, breadcrumbs: crumbs, guideTopics }],
  ['city', { path: '/locations/bellingham/', title: 'C', description: 'd', kind: 'location', areaServed: ['Bellingham', 'Whatcom County'], faqs, breadcrumbs: crumbs, guideTopics }],
  ['neighborhood', { path: '/locations/bellingham/barkley/', title: 'N', description: 'd', kind: 'location', areaServed: ['Barkley', 'Bellingham', 'Whatcom County'], faqs, breadcrumbs: crumbs, guideTopics }],
  ['species profile', {
    path: `/pest-library/${PESTS[0].slug}/`, title: 'Sp', description: 'd', kind: 'article',
    faqs, breadcrumbs: crumbs, guideTopics,
    citations: [{ label: 'WSU Extension — Carpenter Ants', url: 'https://example.edu/a', read: new Date('2026-09-01') }],
  }],
  ['guide', {
    path: `/guides/${guideTopics[0].slug}/`, title: 'G', description: 'd', kind: 'article',
    faqs, breadcrumbs: crumbs, guideTopics,
    citations: [{ label: 'WAC 16-228-2045', url: 'https://example.gov/b' }],
  }],
  ['blog post, no answer and no FAQ', { path: '/blog/x/', title: 'B', description: 'd', kind: 'article', hasAnswer: false, breadcrumbs: crumbs, guideTopics }],
  ['404, no guides supplied', { path: '/404/', title: '404', description: 'd', kind: 'page', hasAnswer: false }],
];

let fails = 0;
const bad = (m: string) => { console.log(`\x1b[31mFAIL\x1b[0m ${m}`); fails++; };

/* ---------- PART 1 · referential integrity, every page kind ---------- */
for (const [label, input] of CASES) {
  const errs = validateGraph(buildGraph(input));
  if (errs.length) bad(`${label}: ${errs.join('; ')}`);
}

/* The validator must be able to fail. Three shapes, one per rule. */
const graphOf = (nodes: unknown[]) =>
  ({ '@context': 'https://schema.org', '@graph': nodes } as ReturnType<typeof buildGraph>);

const mustCatch: [string, RegExp, unknown[]][] = [
  ['dangling reference', /dangling/, [{ '@type': 'WebPage', '@id': 'a', about: { '@id': 'nowhere' } }]],
  ['duplicate @id', /duplicate/, [{ '@type': 'WebPage', '@id': 'a', name: 'x' }, { '@type': 'Thing', '@id': 'a', name: 'y' }]],
  ['top-level node with no @id', /no @id/, [{ '@type': 'WebPage', name: 'x' }]],
];
for (const [label, pattern, nodes] of mustCatch) {
  const errs = validateGraph(graphOf(nodes));
  if (!errs.some((e) => pattern.test(e))) bad(`validator did not catch ${label}`);
}

/* A definition nested inside another node still counts as a definition. This
   is the case that broke the original validator: the Service nodes live inside
   hasOfferCatalog and the species DefinedTerms inside knowsAbout, and a
   top-level-only scan reports every reference to them as dangling — failing on
   a graph that is correct. */
const nested = validateGraph(
  graphOf([
    { '@type': 'Organization', '@id': 'org', hasOfferCatalog: { '@type': 'OfferCatalog', '@id': 'cat', itemListElement: [{ '@type': 'Offer', '@id': 'off', itemOffered: { '@type': 'Service', '@id': 'svc', name: 'S' } }] } },
    { '@type': 'WebPage', '@id': 'page', mainEntity: { '@id': 'svc' } },
  ]),
);
if (nested.length) bad(`nested definition not recognized: ${nested.join('; ')}`);

/* ---------- PART 2 · the four absences ---------- */
const everything = CASES.map(([, i]) => JSON.stringify(buildGraph(i))).join('\n');

/* 1. NO RATING, IN ANY FORM. business.rating.schemaEligible is false and the
      note above it sets out why: Google's Review Snippet rules make a
      self-controlled LocalBusiness rating ineligible for stars, and copying
      another site's rating into our markup is separately disallowed. The rule
      is not "no aggregateRating" — it is that the claim must not appear at
      all, which is why Review and ratingValue are tested too. Re-enabling by
      the front door is a deliberate act; this stops the back doors. */
if (business.rating.schemaEligible !== false) bad('business.rating.schemaEligible is no longer false — this suite assumes suppression');
for (const forbidden of ['aggregateRating', 'AggregateRating', '"Review"', 'ratingValue', 'reviewCount', 'reviewRating']) {
  if (everything.includes(forbidden)) bad(`graph contains ${forbidden} — see the rating note in src/data/business.ts`);
}

/* 2. NO PRICE ANYWHERE. business.pricing is the single source of published
      figures and harness check 2b fails the build on any dollar figure in the
      HTML that is not in it. The catalog describes what is sold and says
      nothing about cost. */
for (const forbidden of ['"price"', 'priceSpecification', 'priceRange', 'lowPrice', 'highPrice']) {
  if (everything.includes(forbidden)) bad(`graph contains ${forbidden} — no Offer on this site carries a price`);
}

/* 3. NO INSPECTION AUTHORITY. canClaimInspection is false and must gate
      anything implying WDO or structural pest inspection.

      SCOPED TO WHAT THE COMPANY SAYS ABOUT ITSELF, not to the word. A blanket
      ban on "inspection" anywhere in the graph would be wrong twice over, and
      it is worth writing down which two ways, because the naive version was
      written first and passed only because the fixtures above are synthetic.

        - Article `citation` carries the TITLES OF SOMEBODY ELSE'S DOCUMENTS.
          The real WDO guide cites "WAC 16-228-2045 — Complete wood destroying
          organism inspection reports". That is a regulation's name. The
          existing inspection-claims suite lists that exact string under
          SHOULD_PASS, and a rule here that forbade it would contradict the
          rule the site actually enforces.
        - A guide TITLE may legitimately describe the regulation too, by the
          same descriptive-framing condition.

      What must never appear is this company offering the work: a Service or an
      Offer in the catalog named for a regulated inspection, or a slogan or
      award saying so. Those are the strings tested. */
if (business.canClaimInspection !== false) bad('business.canClaimInspection is no longer false — this suite assumes suppression');
const INSPECTION_TERMS = /\b(wdo|wood[- ]destroying organism|structural pest|escrow|real estate)\s+inspection|\binspection report\b|\binspector\b/i;
const selfDescribing: string[] = [];
const collectSelfDescription = (v: unknown, underCitation = false) => {
  if (Array.isArray(v)) return v.forEach((x) => collectSelfDescription(x, underCitation));
  if (!v || typeof v !== 'object') return;
  for (const [k, val] of Object.entries(v as Record<string, unknown>)) {
    /* Citations and page-level prose are quoting or describing; the catalog,
       the slogan and the award list are the company speaking about itself. */
    const quoting = underCitation || k === 'citation';
    if (typeof val === 'string') {
      if (!quoting && ['name', 'serviceType', 'slogan', 'award', 'description'].includes(k)) {
        selfDescribing.push(val);
      }
    } else collectSelfDescription(val, quoting);
  }
};
for (const [, input] of CASES) collectSelfDescription(buildGraph(input)['@graph']);
for (const s of selfDescribing) {
  if (INSPECTION_TERMS.test(s)) bad(`graph describes this company with a regulated inspection term: "${s}"`);
}

/* 4. NO SENTINEL EVER REACHES THE OUTPUT. The whole PENDING contract is that a
      guarded field renders nothing rather than the placeholder. */
for (const forbidden of ['__PENDING__', '__NOT_HELD__', 'undefined', 'null']) {
  if (everything.includes(forbidden)) bad(`graph contains the literal ${forbidden}`);
}

/* ---------- coverage, so a passing run means something ---------- */
const home = JSON.stringify(buildGraph(CASES[0][1]));
if (!PESTS.every((p) => home.includes(ID.term.pest(p.slug)))) bad('knowsAbout is missing a species from pests.ts');
if (!liveServices().every((s) => home.includes(ID.service(`/services/${s.slug}/`)))) bad('the offer catalog is missing a live service');
if (!guideTopics.every((g) => home.includes(ID.term.guide(g.slug)))) bad('knowsAbout is missing a guide');

const n = CASES.length + mustCatch.length + 1;
console.log(
  fails === 0
    ? `\x1b[32mschema graph: ${n} cases clean — ${PESTS.length} species, ${liveServices().length} services, ${guideTopics.length} guides in knowsAbout\x1b[0m`
    : `\x1b[31m${fails} schema graph failure(s)\x1b[0m`,
);
if (fails) process.exit(1);
