/**
 * schema.ts — the ONE emitter for all structured data on this site.
 *
 * Keystone Part 5 / Part 9 gate:
 *   - exactly one <script type="application/ld+json"> per page
 *   - one @graph, every node @id-anchored, all referencing the shared root
 *   - no node redeclared; no plugin second emitter (there is no plugin here)
 *   - NAP in schema matches visible NAP character for character
 *   - aggregateRating ONLY from a verified GBP pull — never hand-entered
 *
 * The seven core nodes: WebSite, WebPage, ImageObject, LocalBusiness,
 * Service/Article, FAQPage, BreadcrumbList. Person, Place, DefinedTerm,
 * DefinedTermSet and OfferCatalog are added where the data earns them.
 *
 * ONE RULE ABOVE ALL THE OTHERS, and every addition below was measured
 * against it: the graph may not say anything the site cannot back. Where a
 * field would need a plausible value invented for it — a service blurb, a
 * payment method, a founding year, a slogan — the field is absent, not filled.
 * A guarded field that renders nothing today is a feature; a field carrying a
 * confident guess is the defect this whole codebase is arranged against.
 */

import {
  SITE, business, people, isReady, credentialMaintenance,
  WSDA_CATEGORIES, type Owed, PENDING,
} from '../data/business';
import { servedPlaceNames, serviceRadiusMiles } from './geo';
import { PESTS } from '../data/pests';
import { liveServices, categories } from '../data/services';

/* Canonical @id anchors. Every cross-reference in the graph uses these
   constants — never a re-typed string, which is how duplicate nodes appear. */
export const ID = {
  site: `${SITE}/#website`,
  org: `${SITE}/#organization`,
  local: `${SITE}/#localbusiness`,
  logo: `${SITE}/#logo`,
  contact: `${SITE}/#contact`,
  page: (path: string) => `${SITE}${path}#webpage`,
  image: (path: string) => `${SITE}${path}#primaryimage`,
  service: (path: string) => `${SITE}${path}#service`,
  faq: (path: string) => `${SITE}${path}#faq`,
  crumb: (path: string) => `${SITE}${path}#breadcrumb`,
  person: (slug: string) => `${SITE}/${slug}/#person`,
  credential: (slug: string) => `${SITE}/${slug}/#credential`,
  /** The subject of a location page — the town or neighborhood itself. */
  place: (path: string) => `${SITE}${path}#place`,
  /** The sitewide catalog of what this company sells. */
  catalog: `${SITE}/services/#catalog`,
  offer: (slug: string) => `${SITE}/services/${slug}/#offer`,
  /* Topic anchors. A DefinedTerm's @id is an identifier rather than an
     address, which is why it carries a fragment the page itself never uses —
     the species profile lives at .../carpenter-ant/ and the TERM "carpenter
     ant" lives at .../carpenter-ant/#term. Conflating them would make the
     page and the concept the same node, which they are not. */
  termSet: {
    pests: `${SITE}/pest-library/#termset`,
    guides: `${SITE}/guides/#termset`,
  },
  term: {
    pest: (slug: string) => `${SITE}/pest-library/${slug}/#term`,
    guide: (slug: string) => `${SITE}/guides/${slug}/#term`,
  },
} as const;

const abs = (path: string) => `${SITE}${path}`;
/** Drop any key whose value is undefined or still PENDING. */
const clean = <T extends Record<string, unknown>>(o: T): T =>
  Object.fromEntries(
    Object.entries(o).filter(([, v]) => v !== undefined && v !== PENDING && v !== null),
  ) as T;

/** Dates arrive as either a frontmatter Date or an already-formatted string. */
const isoDate = (d: string | Date | undefined): string | undefined =>
  d === undefined ? undefined : d instanceof Date ? d.toISOString().slice(0, 10) : d;

export interface FaqItem {
  q: string;
  a: string;
}

export interface Crumb {
  name: string;
  path: string;
}

/** One row of a `sources` frontmatter block, on a guide or a species profile. */
export interface Citation {
  label: string;
  url: string;
  read?: string | Date;
}

/** One guide, as the Organization's topical footprint sees it. */
export interface GuideTopic {
  slug: string;
  title: string;
}

export interface PageSchemaInput {
  /** Path with leading and trailing slash, e.g. "/services/rodent-control/" */
  path: string;
  title: string;
  description: string;
  /** Page type drives which node is emitted alongside WebPage. */
  kind: 'home' | 'service' | 'location' | 'article' | 'person' | 'page';
  image?: { src: string; alt: string; width?: number; height?: number };
  /** Exactly the questions rendered visibly on the page. Never a superset. */
  faqs?: FaqItem[];
  breadcrumbs?: Crumb[];
  /**
   * The service this page is about. Retained after the Service nodes moved
   * into the sitewide OfferCatalog, and it now does a job it did not do
   * before: it is CHECKED against services.ts rather than emitted. See
   * serviceRefFor().
   */
  serviceName?: string;
  /**
   * Location pages pass the containment chain, outermost LAST:
   *   ['Barkley', 'Bellingham', 'Whatcom County']
   * That array was already being passed and was read by nothing. It is now
   * what the page's Place node is built from, which is why no route had to
   * learn a new prop for item 4.
   */
  areaServed?: string[];
  datePublished?: string | Date;
  dateModified?: string | Date;
  personSlug?: string;
  /** `sources` frontmatter — becomes Article `citation`. Guides and pests. */
  citations?: Citation[];
  /**
   * Whether this page actually renders an AnswerBox.
   *
   * Defaults true because 136 of the 207 built pages do, and a per-page prop
   * that has to be passed on 136 pages to say "yes, as usual" is a prop
   * everybody forgets. The routes where the AnswerBox is CONDITIONAL pass it
   * explicitly. See the speakable note below for why this matters at all.
   */
  hasAnswer?: boolean;
  /**
   * The guides collection, for the Organization's knowsAbout. Supplied by
   * BaseLayout rather than by pages — see knowsAboutNodes().
   */
  guideTopics?: GuideTopic[];
}

/* ------------------------------------------------------------------ *
 * The shared sitewide nodes. Built once, injected on every page.
 * ------------------------------------------------------------------ */

/** The two counties, as AdministrativeArea nodes. Used in three places. */
const territoryAreas = () =>
  business.territory.counties.map((c) => ({ '@type': 'AdministrativeArea', name: c }));

/**
 * knowsAbout — the topical footprint, built from the enumerations rather than
 * hand-listed.
 *
 * WHAT THIS IS FOR. Until now the graph described a pest control company in
 * Bellingham and said nothing whatever about what it demonstrably covers. The
 * site carries 41 sourced species profiles, every one of them citing extension
 * or federal sources, and eleven sourced reference guides. That is a real
 * corpus and it was invisible to anything reading the markup.
 *
 * THREE DECISIONS WORTH KEEPING.
 *
 * 1. DERIVED, NEVER LISTED. Species come from src/data/pests.ts, services from
 *    src/data/services.ts, guides from the collection itself. A hand-written
 *    list here would be the same defect this codebase has hit four times —
 *    one list, two homes, quietly drifting — and it would drift the moment a
 *    species was renamed.
 *
 * 2. DefinedTerm RATHER THAN BARE STRINGS for species, because the precision is
 *    real and free: the binomial goes in `alternateName`, and `url` points at
 *    the profile that backs the claim. "Carpenter ant" as a string asserts a
 *    topic; a DefinedTerm with Camponotus modoc and a cited profile behind it
 *    asserts a topic somebody can check.
 *
 * 3. SERVICES ARE REFERENCES, NOT COPIES. The 23 services already exist as
 *    fully-described Service nodes inside hasOfferCatalog below. Emitting them
 *    a second time here as DefinedTerms would put the same concept in the
 *    graph twice under two identities, which is precisely what @id-anchoring
 *    exists to prevent. So knowsAbout points AT them.
 *
 * WHAT IS DELIBERATELY NOT HERE: the eight PEST_GROUPS and the four
 * GUIDE_CLUSTERS. Both are navigational groupings of things already listed, so
 * adding them would inflate the array without adding a single checkable claim.
 */
function knowsAbout(guideTopics: GuideTopic[]) {
  return [
    ...PESTS.map((p) =>
      clean({
        '@type': 'DefinedTerm',
        '@id': ID.term.pest(p.slug),
        name: p.name,
        /* Empty on the profiles covering a genus or a group rather than one
           species — millipedes, for one. clean() drops it rather than
           publishing an empty string. */
        alternateName: p.scientific || undefined,
        url: abs(`/pest-library/${p.slug}/`),
        inDefinedTermSet: { '@id': ID.termSet.pests },
      }),
    ),
    ...liveServices().map((s) => ({ '@id': ID.service(`/services/${s.slug}/`) })),
    ...guideTopics.map((g) => ({
      '@type': 'DefinedTerm',
      '@id': ID.term.guide(g.slug),
      name: g.title,
      url: abs(`/guides/${g.slug}/`),
      inDefinedTermSet: { '@id': ID.termSet.guides },
    })),
  ];
}

/** The two term sets the DefinedTerms above point at. */
function termSetNodes(guideTopics: GuideTopic[]) {
  const nodes: Record<string, unknown>[] = [
    {
      '@type': 'DefinedTermSet',
      '@id': ID.termSet.pests,
      name: 'Pest species of Whatcom County, Washington',
      url: abs('/pest-library/'),
    },
  ];
  /* Only if there is something in it. An empty set is a node asserting the
     existence of a corpus that is not there. */
  if (guideTopics.length) {
    nodes.push({
      '@type': 'DefinedTermSet',
      '@id': ID.termSet.guides,
      name: 'Sasquatch Pest Control reference guides',
      url: abs('/guides/'),
    });
  }
  return nodes;
}

/**
 * hasOfferCatalog — the 23 confirmed services, each an Offer wrapping a
 * Service. Built from liveServices(), so an unconfirmed service can never
 * appear and a retired one disappears with its route.
 *
 * NO PRICES, AND THAT IS NOT AN OVERSIGHT. business.pricing is the only place
 * a dollar figure may originate on this site and harness check 2b fails the
 * build on any figure in the HTML that is not in it. Bed bug work is the sole
 * service with published figures; the other 22 are quoted from a visit. An
 * Offer carrying a price for any of them would be a commitment the business
 * has not made, and an Offer carrying the bed bug figures alone would put a
 * price on one row of a catalog where every neighboring row is quoted — the
 * least useful possible arrangement. So the catalog describes WHAT is sold and
 * says nothing about what it costs, which is exactly what the site says.
 *
 * NO `description` EITHER, and this one is worth stating plainly because it
 * looks like a gap. There is no owner-written summary of any service in any
 * data file; the descriptions that exist live in the content collection, one
 * per page, and this catalog is sitewide. Writing 23 one-liners here would
 * mean inventing 23 sentences of marketing copy in a structured-data file
 * where nobody would ever review them. `serviceType` carries the category and
 * `url` carries the page that describes the work properly.
 *
 * THE Service NODES DEFINED HERE ARE THE ONLY ONES. A service page used to
 * emit its own Service node at the same @id this catalog uses. Two definitions
 * of one node is the duplicate-@id failure the validator exists to catch, so
 * the page now REFERENCES this one via WebPage.mainEntity instead.
 */
function offerCatalogNode() {
  return {
    '@type': 'OfferCatalog',
    '@id': ID.catalog,
    name: 'Pest control, exclusion and restoration services',
    url: abs('/services/'),
    itemListElement: liveServices().map((s, i) => ({
      '@type': 'Offer',
      '@id': ID.offer(s.slug),
      position: i + 1,
      itemOffered: {
        '@type': 'Service',
        '@id': ID.service(`/services/${s.slug}/`),
        name: s.name,
        serviceType: categories[s.category],
        url: abs(`/services/${s.slug}/`),
        provider: { '@id': ID.local },
        areaServed: territoryAreas(),
      },
    })),
  };
}

/**
 * The Organization's own contact point. `availableLanguage` belongs here
 * rather than on the LocalBusiness — schema.org puts it on ContactPoint and
 * Service, and Organization carries `knowsLanguage` instead.
 *
 * The telephone is the DISPLAY form, not E.164, because of the NAP rule at the
 * top of this file: what is in the markup matches what is on the page and on
 * the Google Business Profile, character for character.
 */
function contactPointNode() {
  return {
    '@type': 'ContactPoint',
    '@id': ID.contact,
    contactType: 'customer service',
    telephone: business.phone,
    email: business.email,
    areaServed: territoryAreas(),
    /* Every page of this site is en-US and the business is run out of
       Bellingham in English. Stated as capability, which is what the property
       means — it does not assert that no other language is spoken. */
    availableLanguage: { '@type': 'Language', name: 'English', alternateName: 'en' },
    hoursAvailable: openingHours(),
  };
}

const openingHours = () =>
  business.hours.map((h) => ({
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: h.days,
    opens: h.open,
    closes: h.close,
  }));

/**
 * Named people who are EMPLOYEES, as distinct from named people generally.
 *
 * The list is not `people` and must not become it. Jorge Bedoya is a
 * CONSULTING entomologist — the bio says so and his credential is an ESA
 * certification rather than a WSDA license — so listing him as an employee
 * would be a small false statement about somebody's relationship to the
 * company, published on 207 pages.
 *
 * The test used is the one the data actually supports: credentialMaintenance
 * states in terms that all licensed staff are employees registered under
 * Sasquatch Pest Control, and a WSDA `licenseType` is what marks licensed
 * staff. If that ever stops being true, the flag is what to change.
 */
function employeeRefs() {
  if (credentialMaintenance.staffRegisteredUnderCompany !== true) return undefined;
  const refs = people
    .filter((p) => p.publishable === true && p.licenseType !== null)
    .map((p) => ({ '@id': ID.person(p.slug) }));
  return refs.length ? refs : undefined;
}

/** Derived from the job title rather than from a hardcoded slug. */
function founderRefs() {
  const refs = people
    .filter(
      (p) =>
        p.publishable === true &&
        isReady(p.jobTitle as Owed<string>) &&
        /\bfounder\b/i.test(p.jobTitle as string),
    )
    .map((p) => ({ '@id': ID.person(p.slug) }));
  return refs.length ? refs : undefined;
}

function organizationNode(guideTopics: GuideTopic[]) {
  const a = business.address;
  const radiusMi = serviceRadiusMiles();
  const geoReady = isReady(business.geo.lat) && isReady(business.geo.lng);
  return clean({
    '@type': ['Organization', 'LocalBusiness', 'PestControlService'],
    '@id': ID.local,
    name: business.name,
    legalName: isReady(business.legalName) ? business.legalName : undefined,
    slogan: isReady(business.slogan) ? business.slogan : undefined,
    url: `${SITE}/`,
    telephone: business.phone,
    email: business.email,
    foundingDate: isReady(business.foundingYear) ? String(business.foundingYear) : undefined,
    address: {
      '@type': 'PostalAddress',
      streetAddress: a.street,
      addressLocality: a.locality,
      addressRegion: a.region,
      postalCode: a.postalCode,
      addressCountry: a.country,
    },
    geo: geoReady
      ? { '@type': 'GeoCoordinates', latitude: business.geo.lat, longitude: business.geo.lng }
      : undefined,
    openingHoursSpecification: openingHours(),
    contactPoint: contactPointNode(),
    /* Organization-level language. ContactPoint carries availableLanguage;
       this is the Organization equivalent and the two agree by construction. */
    knowsLanguage: 'en-US',
    /* Counties, then every community we actually serve — the towns with pages
       AND the mention-only tier. The tier function is called areaServedOnly
       precisely because those towns are meant to land HERE rather than only in
       page prose; without this they were listed nowhere a machine could read.
       Both sources respect `serviced`, so an excluded town (Point Roberts,
       Anacortes, La Conner) can never appear.

       THIS REMAINS THE AUTHORITATIVE COVERAGE STATEMENT. serviceArea below is
       a geometry, and a geometry cannot express an exclusion. */
    areaServed: [
      ...territoryAreas(),
      ...servedPlaceNames().map((n: string) => ({
        '@type': 'Place',
        name: `${n}, WA`,
      })),
    ],
    /* A coarse envelope for consumers that want a shape rather than a list.
       DOUBLE-GUARDED and both guards are load-bearing:

         - geo is PENDING until somebody pulls the verified GBP listing, and a
           GeoCircle with no midpoint is not a degraded claim, it is a broken
           node. Nothing renders until the coordinates land, at which point
           this lights up on its own with no further edit.
         - serviceRadiusMiles() returns null rather than a number whenever the
           circle would contain a town the owner has excluded. See the long
           note on that function; the road-versus-straight-line caveat is
           there too, and it is the reason areaServed above outranks this.

       geoRadius is meters — schema.org's default unit, and the one place this
       is easy to get wrong by three orders of magnitude. */
    serviceArea:
      geoReady && radiusMi !== null
        ? {
            '@type': 'GeoCircle',
            geoMidpoint: {
              '@type': 'GeoCoordinates',
              latitude: business.geo.lat,
              longitude: business.geo.lng,
            },
            geoRadius: Math.round(radiusMi * 1609.344),
          }
        : undefined,
    hasOfferCatalog: offerCatalogNode(),
    knowsAbout: knowsAbout(guideTopics),
    /* The Washington Unified Business Identifier from the state Business
       License. A PropertyValue rather than `taxID` because it is a
       REGISTRATION and not a tax number, and business.ts is emphatic about
       that distinction — it says the LLC exists and is in good standing with
       the Department of Revenue, and says nothing about who may apply a
       pesticide.

       It is published here and nowhere else on the site, which is a
       deliberate asymmetry: a UBI is designed to be public (it is how anyone
       looks a Washington business up), so it is useful for entity resolution
       and pointless as page copy. Note what is NOT here and never will be —
       the policy numbers, the bond number and the carrier, which business.ts
       keeps out of the data precisely so they cannot reach a page. */
    identifier: isReady(business.license.ubi)
      ? {
          '@type': 'PropertyValue',
          propertyID: 'Washington Unified Business Identifier (UBI)',
          value: business.license.ubi,
        }
      : undefined,
    currenciesAccepted: business.currency,
    /* PENDING until the owner states the list. See business.paymentAccepted —
       "cash, check, credit card" is the reflex answer in this trade and it is
       wrong often enough to matter. */
    paymentAccepted: isReady(business.paymentAccepted)
      ? business.paymentAccepted.join(', ')
      : undefined,
    employee: employeeRefs(),
    founder: founderRefs(),
    /* NOT EMITTED, and the rating being present is not the reason.
       -----------------------------------------------------------------------
       The original rule here was "aggregateRating ONLY if a verified GBP
       rating exists — never hand-enter", which framed this as a data problem:
       get a verified pull, emit the node. A verified pull now exists — 4.9
       from 342 — and the node still must not be emitted, because the
       obstacle was never the data.

       Google's Review Snippet documentation, read 2 Sep 2026: "If the entity
       that's being reviewed controls the reviews about itself, their pages
       that use LocalBusiness or any other type of Organization structured
       data are ineligible for star review feature." And separately: "Ratings
       must be sourced directly from users", "Don't aggregate reviews or
       ratings from other websites."

       Both rules land on this exact case. Emitting the node produces no stars
       and invites a manual action. The rating is shown as visible attributed
       copy instead — see business.rating.schemaEligible.

       The guard below is deliberately belt-and-braces: it checks the explicit
       flag AND still checks isReady, so re-enabling this needs somebody to
       change the flag on purpose rather than to fill in a number.

       AND THE SAME RULE FORBIDS THE WORKAROUNDS. There is no Review node
       anywhere in this graph and no ratingValue on any other node. Both would
       be the same self-serving assertion wearing a different type name, and
       the second one is worse than the first because it looks like an
       oversight rather than a decision. */
    aggregateRating:
      business.rating.schemaEligible && isReady(business.rating.value) && isReady(business.rating.count)
        ? {
            '@type': 'AggregateRating',
            ratingValue: business.rating.value,
            reviewCount: business.rating.count,
          }
        : undefined,
    /* Cross-domain linkage only. The TX spoke declares its own entities on
       its own domain. Keystone Part 14: site separation is absolute — no
       photo, phone, license or city from one site lands on another. */
    parentOrganization: { '@id': ID.org },
    sameAs: business.socials,
    /* schema.org `award` takes plain strings, and getting this wrong is easy
       in a way that matters: a consumer reads every entry as a win.

       Three rules, each of which the first version of this broke.

       1. LOCAL VOTES ONLY. Directory and aggregator badges are excluded —
          business.ts explains why, and emitting them here while the visible
          page separates them would make the machine-readable version the
          less honest of the two.
       2. A FINALIST SAYS SO. The Whatcom Business Awards row is a shortlist,
          not a win, and it carries the word in the string.
       3. NO NULLS. Two rows have no year and several no category or level.
          Template interpolation happily wrote the literal text "null" into
          published JSON-LD before this was filtered.

       `parts` is annotated `string[]` on purpose. business.awards is declared
       `as const`, so an unannotated `[a.name]` infers as an array of the eight
       literal award NAMES — after which pushing a category, a publisher or a
       year is a type error, which is exactly what tsc was reporting on these
       four lines. The literal-union inference was the bug; widening the array
       to what it actually holds is the fix, and it is a real fix rather than a
       cast because nothing is being asserted away. */
    award: business.awards
      .filter((a) => a.tier === 'local-vote')
      .map((a) => {
        const parts: string[] = [a.name];
        if (a.category) parts.push(a.category);
        if (a.level) parts.push(a.level);
        parts.push(a.publisher);
        if (a.year) parts.push(String(a.year));
        const s = parts.join(', ');
        return a.result === 'finalist' ? `${s} (finalist)` : s;
      }),
    /* Dropped together with logoNode() while the file is owed — see the note
       there. Spread rather than conditional keys so the shape stays flat. */
    ...(isReady(business.logoImage)
      ? { logo: { '@id': ID.logo }, image: { '@id': ID.logo } }
      : {}),
  });
}

function parentOrgNode() {
  return {
    '@type': 'Organization',
    '@id': ID.org,
    name: business.name,
    url: `${SITE}/`,
  };
}

/* Returns the node, or null while the logo file is owed. A node pointing at
   a file that was never supplied is worse than no node — a consumer that
   fetches it gets a 404 and may distrust the rest of the graph. Null here
   also has to be filtered where the graph is assembled, and the `logo` and
   `image` references on the Organization have to drop with it, or the graph
   is left with two dangling @id references. */
function logoNode() {
  if (!isReady(business.logoImage)) return null;
  return {
    '@type': 'ImageObject',
    '@id': ID.logo,
    url: abs(business.logoImage),
    contentUrl: abs(business.logoImage),
    /* Keystone M6: the logo's alt is the business name. No keyword stuffing. */
    caption: business.name,
  };
}

function websiteNode() {
  return {
    '@type': 'WebSite',
    '@id': ID.site,
    url: `${SITE}/`,
    name: business.name,
    publisher: { '@id': ID.local },
    inLanguage: 'en-US',
  };
}

function personNodes() {
  return people
    .filter((p) => p.publishable === true)
    .map((p) =>
      clean({
        '@type': 'Person',
        '@id': ID.person(p.slug),
        name: p.name,
        /* A PENDING jobTitle is omitted, not emitted. clean() strips
           undefined, so the Person node simply has no jobTitle until the
           owner supplies one — which is the whole PENDING contract. Emitting
           the sentinel string into JSON-LD would be worse than saying
           nothing. */
        jobTitle: isReady(p.jobTitle as Owed<string>) ? (p.jobTitle as string) : undefined,
        worksFor: { '@id': ID.local },
        description: p.bio,
        /* The credential is now an @id-anchored node of its own rather than an
           anonymous blob, and it carries three things it did not before, each
           read straight off the row:

             recognizedBy   who issued it. "Certified" with no issuer is the
                            emptiest word in this trade.
             expires        the license expiry. PENDING on the ACE row, so it
                            drops there and only there.
             competencyRequired  the WSDA categories, in WSDA's own labels.

           WHAT IS NOT HERE, deliberately: these credentials are NOT also
           attached to the Organization. Five individuals hold WSDA licenses;
           the company does not hold one, and business.ts spent three days and
           a retired field establishing exactly that. Hanging them off the
           LocalBusiness as `hasCredential` would re-assert the thing that
           turned out not to exist, in the one format nobody reads by eye. */
        hasCredential: isReady(p.credential as Owed<string>)
          ? clean({
              '@type': 'EducationalOccupationalCredential',
              '@id': ID.credential(p.slug),
              credentialCategory: 'Professional certification',
              name: p.credentialName,
              identifier: p.credential,
              recognizedBy: { '@type': 'Organization', name: p.issuer },
              /* WSDA licenses are a Washington credential. ACE is national, so
                 the row with no WSDA license type gets no validIn rather than
                 a wrong one. */
              validIn:
                p.licenseType !== null
                  ? { '@type': 'AdministrativeArea', name: 'Washington' }
                  : undefined,
              expires: isReady(p.licenseExpires as Owed<string>)
                ? (p.licenseExpires as string)
                : undefined,
              competencyRequired: p.categories.length
                ? p.categories.map((c) => WSDA_CATEGORIES[c].label).join(', ')
                : undefined,
            })
          : undefined,
      }),
    );
}

/* ------------------------------------------------------------------ *
 * Per-page nodes.
 * ------------------------------------------------------------------ */

/**
 * The Service node a service or problem page is about.
 *
 * Derived from the PATH rather than from the passed name, because the path is
 * what the route was generated from and therefore cannot disagree with
 * services.ts. `/services/rodent-control/` and
 * `/services/rodent-control/rats-in-the-crawlspace/` both resolve to the same
 * service — a problem page is a page about its parent service, and it used to
 * mint a Service node of its own at its own URL, which put seventeen extra
 * Service concepts into the graph for services that already existed.
 *
 * The passed `serviceName` is now a CHECK rather than a source. If a route
 * ever passes a name that does not match services.ts the build stops here,
 * which is cheaper than discovering the divergence in a crawl report.
 */
function serviceRefFor(path: string, serviceName?: string): string | undefined {
  const slug = path.split('/')[2];
  if (!slug) return undefined;
  const s = liveServices().find((x) => x.slug === slug);
  if (!s) return undefined;
  if (serviceName !== undefined && serviceName !== s.name) {
    throw new Error(
      `${path}: schema serviceName "${serviceName}" does not match services.ts, which calls ` +
        `"${slug}" → "${s.name}". The catalog is built from services.ts, so a page passing a ` +
        `different name would put two names on one Service node.`,
    );
  }
  return ID.service(`/services/${slug}/`);
}

/**
 * The Place a location page is ABOUT — the town, the neighborhood or the
 * county itself, rather than the business that serves it.
 *
 * Built from the `areaServed` containment chain the location routes were
 * already passing and which nothing was reading:
 *
 *   ['Whatcom County']                        → the county page
 *   ['Bellingham', 'Whatcom County']          → a city page
 *   ['Barkley', 'Bellingham', 'Whatcom County'] → a neighborhood page
 *
 * Type is decided by POSITION in that chain, not by parsing the name: the last
 * element is the county, the one before it is the city, anything earlier is a
 * neighborhood. Sniffing for the word "County" would work today and break the
 * first time a route passes something shaped differently.
 *
 * The state is appended at the top of the chain. It is the one element that is
 * not in the array and does not need to be — every town in towns.ts is in
 * Washington by the territory filter.
 */
function placeNode(path: string, chain: string[]) {
  const type = (i: number) =>
    i === chain.length - 1 ? 'AdministrativeArea' : i === chain.length - 2 ? 'City' : 'Place';

  const containment = (i: number): Record<string, unknown> =>
    i >= chain.length
      ? { '@type': 'State', name: 'Washington', containedInPlace: { '@type': 'Country', name: 'United States' } }
      : { '@type': type(i), name: chain[i], containedInPlace: containment(i + 1) };

  return clean({
    '@type': type(0),
    '@id': ID.place(path),
    name: chain[0],
    address: {
      '@type': 'PostalAddress',
      /* Only a city has a locality of its own to state. A county is not a
         locality and a neighborhood's locality is the city above it. */
      addressLocality:
        chain.length === 1 ? undefined : chain.length === 2 ? chain[0] : chain[1],
      addressRegion: business.address.region,
      addressCountry: business.address.country,
    },
    containedInPlace: containment(1),
  });
}

export function buildGraph(input: PageSchemaInput) {
  const {
    path, title, description, kind, image, faqs, breadcrumbs,
    serviceName, areaServed, datePublished, dateModified, personSlug,
    citations, hasAnswer = true, guideTopics = [],
  } = input;

  const nodes: Record<string, unknown>[] = [
    websiteNode(),
    parentOrgNode(),
    organizationNode(guideTopics),
    ...termSetNodes(guideTopics),
  ];
  /* logoNode() returns null while the logo file is owed — see its note. */
  const logo = logoNode();
  if (logo) nodes.push(logo);

  const imageNode = image
    ? clean({
        '@type': 'ImageObject',
        '@id': ID.image(path),
        url: abs(image.src),
        contentUrl: abs(image.src),
        caption: image.alt,
        width: image.width,
        height: image.height,
      })
    : undefined;
  if (imageNode) nodes.push(imageNode);

  const isArticle = kind === 'article';
  const serviceRef = kind === 'service' ? serviceRefFor(path, serviceName) : undefined;
  const place = kind === 'location' && areaServed?.length ? placeNode(path, areaServed) : undefined;
  if (place) nodes.push(place);

  /* What this page is ABOUT. Always the business; plus the specific subject
     where the page has one that already exists in the graph.

     Every one of these is derived from `path`, so none of them can point at a
     node that is not there: a /pest-library/<slug>/ page can only have been
     generated from a species in pests.ts, which is the same array knowsAbout
     is built from, and the same holds for guides and services. That is the
     property that keeps this from producing dangling references — the subject
     and the topic list have one source each, not two. */
  const about: Record<string, unknown>[] = [{ '@id': ID.local }];
  if (place) about.push({ '@id': ID.place(path) });
  if (serviceRef) about.push({ '@id': serviceRef });
  const pestSlug = path.startsWith('/pest-library/') ? path.split('/')[2] : undefined;
  if (pestSlug && PESTS.some((p) => p.slug === pestSlug)) about.push({ '@id': ID.term.pest(pestSlug) });
  const guideSlug = path.startsWith('/guides/') ? path.split('/')[2] : undefined;
  if (guideSlug && guideTopics.some((g) => g.slug === guideSlug)) {
    about.push({ '@id': ID.term.guide(guideSlug) });
  }

  /* Keystone M4: SpeakableSpecification pointing at the Quick Answer and the
     FAQ region — the AEO surface.

     VERIFIED AGAINST BUILT HTML, 2 Sep 2026, not against the components. Both
     class names survive the CSS rewrite: AnswerBox still emits
     <div class="answer-box"> and Faq still emits <section class="faq">, and
     both are styled under those names in §17 of global.css.

     TWO CHANGES, both from what the built output actually showed.

     1. THE SELECTORS ARE NOW CONDITIONAL. `.answer-box` was absent from 71 of
        the 207 built pages and `.faq` from 74 — the imported blog posts, whose
        collection makes `answer` and `faqs` optional, plus the 404. Naming a
        region that is not on the page is not harmful, but it is the machine
        equivalent of a broken link, and this file's whole posture is that a
        reference to something that does not exist is worse than silence.

     2. `.faq` BECAME `.faq details`. The section wrapper includes the
        "Frequently asked questions" H2, which is furniture rather than an
        answer; `.faq details` is exactly the question-and-answer pairs. The
        AEO answer and the FAQ answers are the right targets and body prose is
        not, so nothing else was added — no `.prose`, no `.verdict`. */
  const speakableSelectors = [
    ...(hasAnswer ? ['.answer-box'] : []),
    ...(faqs?.length ? ['.faq details'] : []),
  ];

  nodes.push(
    clean({
      '@type': isArticle ? 'Article' : 'WebPage',
      '@id': ID.page(path),
      url: abs(path),
      name: title,
      /* Article wants a headline; WebPage does not have one. Same string as
         `name` because the page has one title and inventing a second is how
         two versions of a heading end up in circulation. */
      headline: isArticle ? title : undefined,
      description,
      isPartOf: { '@id': ID.site },
      about,
      /* A service or problem page's subject is the Service defined once in the
         sitewide catalog. The page points AT it rather than redeclaring it. */
      mainEntity: serviceRef ? { '@id': serviceRef } : undefined,
      primaryImageOfPage: imageNode ? { '@id': ID.image(path) } : undefined,
      breadcrumb: breadcrumbs?.length ? { '@id': ID.crumb(path) } : undefined,
      datePublished: isoDate(datePublished),
      dateModified: isoDate(dateModified),
      inLanguage: 'en-US',
      speakable: speakableSelectors.length
        ? { '@type': 'SpeakableSpecification', cssSelector: speakableSelectors }
        : undefined,
      /* AUTHORSHIP. A named person when the page has one, otherwise the
         company, and only on Articles — a WebPage is not authored in the sense
         the property means.

         The company rather than a person is the honest answer here and not a
         fallback: the guides and species profiles carry no byline in their
         frontmatter, nobody has been credited for them, and attributing them
         to whichever staff member happens to be publishable would be
         inventing a byline. `expert` exists on services and locations and
         means "the named expert whose credential is shown", which is a
         reviewer relationship rather than an authorship one — it is
         deliberately not reused here as though it were the same thing. */
      author: isArticle
        ? personSlug
          ? { '@id': ID.person(personSlug) }
          : { '@id': ID.local }
        : personSlug
          ? { '@id': ID.person(personSlug) }
          : undefined,
      publisher: isArticle ? { '@id': ID.local } : undefined,
      /* The `sources` block both the guides and the pests collections require,
         as machine-readable citations. This is the part of the graph nobody
         else in this market has, and it exists only because those two
         collections made citations mandatory at parse time — a guide or a
         profile literally cannot be written here without them. */
      citation: citations?.length
        ? citations.map((c) =>
            clean({
              '@type': 'CreativeWork',
              name: c.label,
              url: c.url,
            }),
          )
        : undefined,
    }),
  );

  /* Exactly one FAQPage node, built from the SAME array the page renders.
     There is no second FAQ block on any page in this build — the live site
     ships two competing blocks on 8 of 12 service pages. */
  if (faqs?.length) {
    nodes.push({
      '@type': 'FAQPage',
      '@id': ID.faq(path),
      mainEntity: faqs.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    });
  }

  if (breadcrumbs?.length) {
    nodes.push({
      '@type': 'BreadcrumbList',
      '@id': ID.crumb(path),
      itemListElement: breadcrumbs.map((c, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: c.name,
        item: abs(c.path),
      })),
    });
  }

  nodes.push(...personNodes());

  return { '@context': 'https://schema.org', '@graph': nodes };
}

/** Serialize for injection. Escapes the sequence that would close the tag. */
export function graphScript(input: PageSchemaInput): string {
  return JSON.stringify(buildGraph(input)).replace(/</g, '\\u003c');
}

/* ------------------------------------------------------------------ *
 * Self-check. Catches the failures Part 12 lists: duplicate @ids,
 * unresolved references, redeclared root nodes.
 *
 * Mirrored by harness check 5, which runs this same logic over the JSON-LD
 * extracted from every built page — because the failure this catches is one
 * you cannot see by reading a page, and a graph of this size has roughly two
 * hundred references in it per page.
 * ------------------------------------------------------------------ */
export function validateGraph(graph: ReturnType<typeof buildGraph>): string[] {
  const errs: string[] = [];
  const ids = new Set<string>();
  const dupes: string[] = [];
  const refs = new Set<string>();

  /**
   * A node is DEFINED wherever it appears with an @id and anything else
   * alongside it; it is REFERENCED where @id stands alone.
   *
   * The original version only collected definitions from the top level of
   * @graph, which was right when every node lived there. It is not right now:
   * the Service nodes are defined inside hasOfferCatalog, and the species
   * DefinedTerms inside knowsAbout, and both are referenced from elsewhere in
   * the graph. Under the old rule every one of those references would have
   * been reported as dangling — the check would have failed on a graph that
   * was correct, which is the worst failure mode a validator has.
   *
   * Nesting a definition is legitimate JSON-LD and flattens to the same graph.
   * What matters is that every @id somebody points at is defined SOMEWHERE in
   * this document, and that no @id is defined twice.
   */
  const walk = (v: unknown) => {
    if (Array.isArray(v)) return v.forEach(walk);
    if (!v || typeof v !== 'object') return;
    const o = v as Record<string, unknown>;
    const keys = Object.keys(o);
    const id = o['@id'] as string | undefined;
    if (id !== undefined) {
      if (keys.length === 1) {
        refs.add(id);
        return;
      }
      if (ids.has(id)) dupes.push(id);
      ids.add(id);
    }
    for (const val of Object.values(o)) walk(val);
  };

  for (const n of graph['@graph'] as Record<string, unknown>[]) {
    if (!n['@id']) errs.push(`node ${String(n['@type'])} has no @id`);
  }
  walk(graph['@graph']);

  for (const d of new Set(dupes)) errs.push(`duplicate @id: ${d.split('#')[1] ?? d}`);
  for (const r of refs) if (!ids.has(r)) errs.push(`dangling @id reference: ${r.split('#')[1] ?? r}`);
  return errs;
}
