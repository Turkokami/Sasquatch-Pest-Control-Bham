/**
 * business.ts — the single source of truth for every NAP, phone, license and
 * social string on this site. Keystone Part 7A: "swap the primary phone across
 * 196 pages by editing one field."
 *
 * NOTHING in this file may be hardcoded anywhere else in the repo. The schema
 * builder, the Header, the Footer, the PhoneBar and every CTA read from here.
 */

/** Sentinel for data the client still owes. Guarded fields render nothing and
 *  are omitted from schema entirely until filled. Run `npm run pending` to list. */
export const PENDING = '__PENDING__' as const;

/** A credential this company deliberately does not hold and is not seeking.
 *
 *  Distinct from PENDING, and the distinction is the whole point: PENDING
 *  means somebody owes us a value and the publish gate should wait for it.
 *  NOT_HELD means no value is coming, ever, because the company has chosen
 *  not to hold that credential. Blocking a publish on NOT_HELD is waiting for
 *  a delivery nobody ordered.
 *
 *  Both are falsy to `isReady`, so every guard downstream behaves identically
 *  — nothing that was suppressed becomes claimable. Only the reporting
 *  changes, which is exactly the intent. */
export const NOT_HELD = '__NOT_HELD__' as const;
export type NotHeld = typeof NOT_HELD;
export type Pending = typeof PENDING;
export type Owed<T> = T | Pending;

export const isReady = <T,>(v: Owed<T> | NotHeld): v is T =>
  v !== PENDING && v !== NOT_HELD;

/* ------------------------------------------------------------------ *
 * OWNER DECISION #5 — canonical host. www is the default because the
 * site currently serves and canonicals on www; the sitemap emits bare.
 * One is chosen, the other 301s permanently. Change here only.
 * ------------------------------------------------------------------ */
export const SITE = 'https://www.sasquatchpestcontrol.com' as const;

export const business = {
  name: 'Sasquatch Pest Control',
  /* The registered entity name, exactly as the state Business License spells
     it — periods and all. `name` above stays the trading name; this is what
     goes in the schema `legalName` and on anything contractual. */
  legalName: 'Sasquatch Pest Control L.L.C.' as Owed<string>,
  foundingYear: PENDING as Owed<number>,

  /* The company's own line about itself, for schema `slogan` and nothing else.
     PENDING rather than written here, and the distinction matters: a slogan is
     the owner's words about his own business, and the moment somebody on this
     side of the fence writes one it stops being that. It is ADVISORY, never
     blocking — see the lecture at the top of scripts/pending.mjs about guards
     that protect no claim. Nothing on the site says anything about a slogan
     while this is unset. */
  slogan: PENDING as Owed<string>,

  /* BRAND ASSETS — paths under public/, or PENDING.
     -----------------------------------------------------------------------
     These are guarded for the same reason every other owed field is, and the
     reason is not theoretical. Until 2 Sep 2026 the layout hard-coded
     `/img/sasquatch-social.jpg` as og:image and the schema emitter hard-coded
     `/img/sasquatch-pest-control-logo.png` as the Organization logo, while
     public/ contained no files at all. 201 pages each advertised two images
     that did not exist. Every share card would have rendered blank and the
     logo node resolved to nothing, and no check caught it because the
     dead-link crawler walks anchor tags only.

     A missing image is worse than an absent one: an absent og:image lets a
     platform fall back to its own layout, while a broken one gives a blank
     card with the brand's name under it. So these render nothing while
     PENDING, exactly like the rating and the geo coordinates, and
     `scripts/harness.mjs` check 1b now fails on any referenced asset that
     was not built.

     To fill them: drop the files into public/img/ and set the paths here.
     The social image wants 1200x630. The logo should be square-ish, at least
     112px on its shortest side, on a background rather than transparent —
     transparent PNGs render badly against a dark share card. */
  logoImage: '/img/sasquatch-pest-control-logo.png' as Owed<string>,
  socialImage: '/img/sasquatch-social.jpg' as Owed<string>,

  /* NAP — normalized. The live site renders "Guide Meridian rd" lowercase on
     some pages and "Rd" on others. This is the canonical form; it must match
     the Google Business Profile character for character. */
  address: {
    street: '5051 Guide Meridian Rd',
    locality: 'Bellingham',
    region: 'WA',
    postalCode: '98226',
    country: 'US',
  },

  phone: '360-410-2199',
  phoneE164: '+13604102199',
  email: 'sasquatchpest@gmail.com',

  /* Verified from the GBP listing before it ships. Do not hand-enter. */
  geo: { lat: PENDING as Owed<number>, lng: PENDING as Owed<number> },

  hours: [
    { days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], open: '08:00', close: '18:00' },
    { days: ['Saturday', 'Sunday'], open: '08:00', close: '16:00' },
  ],

  /* ---------------------------------------------------------------- *
   * OWNER DECISION #1 and #2 — WSDA licensing.
   *
   * RCW 15.58.205 makes advertising structural pest inspection services
   * without the license a violation. The current /about/ page asserts
   * "Licensed pest management professional" with no number anywhere on
   * the site.
   *
   * Until these are filled:
   *   - no credential claim renders anywhere,
   *   - no hasCredential node is emitted,
   *   - `canClaimInspection` stays false, which suppresses REGULATED
   *     wood-destroying-organism / structural inspection copy sitewide.
   *     The general free-inspection offer is separate — see freeInspection.
   * ---------------------------------------------------------------- */
  license: {
    /* Individual WSDA licenses are held per-person and live on each entry in
       `people` below. As of 2 Sep 2026: Kristofer LI-87206, Travis LI-99899,
       Evan LI-105055, Bryce LI-115142 (all Commercial Operator) and Tyson
       LI-94159 (Commercial Applicator). Those back the "licensed" claim and
       the Person nodes.

       companyPestControl — RETIRED 2 Sep 2026. THIS FIELD WAS MY MISTAKE.
       -----------------------------------------------------------------------
       It modeled a separate, company-level pesticide license, and it blocked
       the publish gate for three days waiting for a number.

       Owner, 2 Sep 2026: the licensing already supplied IS the legal
       permission to apply pesticides. Each technician holds one, Tyson holds
       one, and there is no further company applicator credential in this
       company's structure.

       He is right, and the field was badly designed regardless of who is
       right about WSDA's administrative practice — because of what it
       actually gated. Not one substantive claim. One line in the footer
       reading "WSDA License #<number>". The site's real "licensed" claim runs
       through `hasLicensedStaff`, which tests for publishable people holding
       credentials, and has been true this whole time. So a footer line held
       the publish gate shut while the claim it was supposedly guarding was
       already properly evidenced somewhere else.

       Three rounds of reasoning went into this field — from Tyson's license,
       from staff registration, then from the FRIC — and every one of them was
       an attempt to derive a number for a credential that does not exist
       here. The lesson is not about pesticide law. It is that a blocking
       field should be defined by the CLAIM it guards, not by a credential
       somebody assumed must exist. When a guard has no claim behind it, the
       guard is the bug.

       The footer now names the licensed people, which is what the state
       record supports and what a customer can actually check.

       STILL BLOCKING, and genuinely: structuralPestInspector and
       inspectionCompany below. Those are different credentials for a
       different activity, RCW 15.58.205 attaches a penalty to advertising
       without them, and the owner has not claimed to hold either. */

    /* NOT HELD, AND NOT BEING PURSUED — owner-stated 2 Sep 2026.
       -----------------------------------------------------------------------
       These two are the Structural Pest Inspector license and the SPI company
       license. Together they are what Washington requires before anyone
       performs a COMPLETE wood-destroying-organism inspection — the kind done
       for a transfer, exchange or refinancing, which requires a WSDA
       Inspection Control Number. RCW 15.58.205 attaches a penalty to
       advertising such services without them.

       The owner holds neither and is not seeking either. His words: we can
       treat specific pest problems identified during a WDO inspection, but we
       do not provide those inspections for real estate.

       THE SENTINEL CHANGED AND THE REASON MATTERS. These were `PENDING`,
       which in this codebase means "the owner owes us this value". That was
       wrong, and it had a cost: the publish gate blocked on two fields that
       were never going to be filled, so the site could not ship while waiting
       for something nobody had ordered. `NOT_HELD` says the opposite thing —
       this credential does not exist here, by choice, permanently.

       Same defect as the retired companyPestControl field one section above,
       and the third time in three days: a guard was defined by a CREDENTIAL
       rather than by the CLAIM it protects. The claim here is "we perform WDO
       inspections". This site never makes it. There is therefore nothing to
       block, and blocking anyway just stopped good work from shipping.

       WHAT DOES NOT CHANGE, AND MUST NOT. `canClaimInspection` below still
       returns false, every inspection-authority rule in src/lib/seo.ts still
       fires, harness check 2c still fails any copy offering a written record
       of findings, and the CTA still offers a free visit rather than a free
       inspection. The safety mechanism was never the publish gate. It is the
       claim rules, and they are untouched. This edit changes bookkeeping, not
       what the site is allowed to say. */
    structuralPestInspector: NOT_HELD as Owed<string> | NotHeld,
    inspectionCompany: NOT_HELD as Owed<string> | NotHeld,
    /* Washington Unified Business Identifier, from the state Business License
       supplied by the owner on 2 Sep 2026. UBI 604761525, Business ID 001,
       Location 0001, issued 10 Apr 2026, expiring 31 May 2027.

       This is a REGISTRATION, not a pesticide license, and the distinction is
       the reason it never satisfied the three blocking fields: it says the
       LLC exists and is in good standing with the Department of Revenue. It
       says nothing about who may apply a pesticide or inspect a structure. */
    ubi: '604761525' as Owed<string>,
  },

  /** Derived — never set by hand. Gates all inspection-authority copy.
   *  Deliberately does NOT read the individual applicator licenses. */
  get canClaimInspection(): boolean {
    return isReady(this.license.structuralPestInspector) && isReady(this.license.inspectionCompany);
  },

  /* ------------------------------------------------------------------
   * WDO TREATMENT — owner-confirmed 30 Aug 2026.
   *
   * THE DISTINCTION, because it is the easiest thing on this site to get
   * legally wrong and the reason check 2c exists at all:
   *
   *   IDENTIFY → a licensed structural pest inspector performs the WDO
   *              inspection and issues the report. WE DO NOT DO THIS.
   *              Gated by canClaimInspection, which is false and stays
   *              false until those two credentials land.
   *
   *   TREAT    → applying treatment for wood-destroying organisms that
   *              somebody else's inspection identified. WE DO DO THIS
   *              and the owner states we hold certification for it.
   *
   * So the site MAY say "we treat what your inspector found" and MAY NOT
   * say "we inspect for WDO", "we provide a WDO inspection" or "we issue
   * a report". Enforced sentence-by-sentence by harness check 2c: any
   * sentence containing a regulated inspection term must attribute the
   * inspection to a third party or explicitly disclaim it.
   * ---------------------------------------------------------------- */
  wdo: {
    /* NOT a separate certificate. Owner clarified 30 Aug 2026 that the WDO
       certification is a CATEGORY carried on each individual WSDA license
       already supplied — PCO Structural. As of 31 Aug 2026 that is five
       licenses: LI-87206, LI-99899, LI-105055, LI-115142 and LI-94159. So
       there is nothing further owed here, and the claim is backed by named,
       publicly checkable numbers rather than by a boolean somebody set by
       hand. See canTreatWdo below.

       ("Laws and safety" is an exam and a recertification component, not a
       listed category, and must not be published as one.) */
    /** Scope, so page copy cannot quietly invent organisms we do not treat. */
    organisms: [
      'dampwood and subterranean termites',
      'carpenter ants',
      'wood-boring beetles',
      'moisture ants',
      'wood decay fungus conditions',
    ] as string[],
  },

  /**
   * Derived. Gates "we treat WDO findings" copy. Deliberately independent of
   * canClaimInspection: the WDO category authorizes TREATMENT, and says
   * nothing about authority to perform an inspection or issue a report.
   */
  get canTreatWdo(): boolean {
    return wdoLicensees().length > 0;
  },

  /** True once at least one named person carries a published credential. */
  get hasLicensedStaff(): boolean {
    return people.some((p) => p.publishable === true && isReady(p.credential as Owed<string>));
  },

  /**
   * Free inspection policy — confirmed by the owner 30 Aug 2026:
   * free for everything EXCEPT bed bugs, which carry a paid verification visit.
   *
   * Keystone Part 14 records the most expensive mistake on a prior build: a
   * vague "make all inspections paid" applied by bulk replace, when only
   * termite inspections were actually paid. Every case is enumerated here so
   * no bulk edit can ever get it wrong again. Add an exception to the array,
   * not to a sentence in a page body.
   *
   * NOTE ON SCOPE: this is a general pre-service assessment offer. It is NOT
   * a WSDA structural pest / wood-destroying-organism inspection, which is a
   * separately licensed activity still gated behind canClaimInspection.
   */
  /* HOW LONG FROM THE CALL TO SOMEBODY TURNING UP. Owner-supplied, 2 Sep 2026.
     One to two days anywhere in Whatcom County; about three at the busiest
     point of the year.

     THIS IS A PROMISE, WHICH IS WHY IT IS HERE RATHER THAN TYPED INTO COPY.
     A response time is the one claim on a service site a reader can catch you
     failing, on the day, with a phone in their hand. Keeping it in business.ts
     means there is one number to change when the crew size or the season
     changes, rather than nine paragraphs that will not all get found.

     SCOPE IS PART OF THE FACT, NOT A FOOTNOTE. The owner said "anywhere in
     Whatcom", and the company also works Skagit — Mount Vernon, Burlington,
     Sedro-Woolley, Bow and Alger, which those pages describe as scheduled
     route days rather than fill-in work. So every rendering of this must carry
     "in Whatcom County" inside the sentence. A bare "usually one to two days"
     on a Skagit page is a promise nobody made. `scope` exists so the wording
     cannot quietly drop it.

     PEAK IS AUTUMN, and the site already says so in its own voice: the sealing
     guide calls October "the busiest month in this trade" and the fall rodent
     post calls autumn the busiest rodent season. `peakDays` agrees with those
     rather than introducing a third account of the year. */
  responseTime: {
    /** Typical days from call to visit. Inclusive range. */
    typicalDaysMin: 1,
    typicalDaysMax: 2,
    /** At the autumn peak, when everyone phones at once. */
    peakDays: 3,
    /** Must appear in any sentence built from these numbers. */
    scope: 'Whatcom County',
    /** Matches the guides: October is the heaviest month in this trade. */
    peakLabel: 'the autumn rush',
    via: 'owner-supplied' as const,
    stated: '2026-09-02',
  },

  freeInspection: {
    default: true,
    /** Service slugs that do NOT get a free inspection. */
    exceptions: ['bed-bug-control'] as string[],
  },

  /* These publish as the Organization's `sameAs` — the schema mechanism for
     saying "these profiles are also us". Two rules, both applied here:

     1. CANONICAL URLS ONLY. The owner supplied these as share links on
        2 Sep 2026, carrying utm_campaign, share_action_id, utm_source and
        igsi parameters. Every one has been stripped. A tracking parameter in
        sameAs is a session identifier published on 201 pages, it makes the
        same profile look like a different URL to anything comparing them,
        and it will rot when the campaign it belongs to ends. The Facebook
        share link (/share/1Bu6GmkrAv/) is a redirect rather than an address,
        so the existing canonical page URL is kept instead.

     2. NOTHING THAT IS NOT A PROFILE. 'https://www.google.com/maps' used to
        sit in this list. That is the map product's home page, not this
        business, and asserting it as sameAs is asserting something false —
        harmless-looking placeholder, wrong claim. Removed. The real Google
        Business Profile URL belongs here once the verified GBP pull happens,
        which is the same event that supplies geo and rating. */
  /* INSURANCE AND BONDING
     -----------------------------------------------------------------------
     "Licensed, bonded and insured" is the most-claimed and least-evidenced
     sentence in this trade. As of 2 Sep 2026 this company can evidence all
     three, from documents supplied by the owner:

       - an ACORD certificate of liability insurance naming Sasquatch Pest
         Control LLC, with commercial general liability in force through
         14 Jun 2027 and a licensing bond running to 1 Apr 2028;
       - a WSDA Commercial Pesticide Applicators Financial Responsibility
         Insurance Certificate (FRIC) filed in the business's name. Chapter
         17.21 RCW requires every commercial applicator to file one; without
         it the license is automatically suspended.

     WHAT IS DELIBERATELY NOT STORED HERE: policy numbers, the bond number,
     the carrier, the agent, the deductible, and the coverage limits. None of
     them belongs on a public web page, and the reliable way to keep a number
     off a page is to not put it in the data. A policy number published is a
     small gift to anyone assembling a pretext call to an insurer.

     So these are booleans. They let the site say the three words and mean
     them, and they carry an expiry so the claim cannot outlive the cover. */
  insurance: {
    generalLiability: true,
    bonded: true,
    /* The WSDA financial-responsibility filing, which is the one specific to
       pesticide application rather than to being a business at all. */
    wsdaFinancialResponsibility: true,
    /* Earliest expiry across the three, so one date governs the claim. The
       general liability policy runs to 14 Jun 2027; the bond to 1 Apr 2028;
       the state business license to 31 May 2027. */
    coverThrough: '2027-06-14',
  },

  /* AWARDS AND RECOGNITION
     -----------------------------------------------------------------------
     Sixteen badges supplied by the owner on 2 Sep 2026. Until that day the
     site published no awards at all, because none had been verified and the
     legacy WordPress site's "award-winning" copy had nothing behind it.

     EVIDENCE, in two classes.

     `owner-badge` — we hold the badge artwork the publisher issued, from the
     owner, and nothing else. Stronger than recollection, weaker than the
     publisher's own page. cascadesbest.com was fetched on 2 Sep 2026 and its
     winners sit behind a script-driven category browser; Bellingham Alive
     publishes its list inside an Issuu magazine viewer. Neither could be read
     from this build.

     `publisher-listing` — the publisher's OWN listing for this business has
     been read. On 2 Sep 2026 the owner supplied a capture of the Cascades
     Best listing page for Sasquatch Pest Control, which sets out the results
     by year and by placing. That is a materially better class of evidence
     than artwork, and it immediately corrected two things the badges alone
     had wrong — see the Cascades Best rows.

     THE CORRECTION IS THE ARGUMENT FOR VERIFYING. The 2024 customer service
     badge reads "Voted Best Customer Service". The publisher's listing says
     that result was SILVER. Writing "voted best customer service" off the
     artwork would have claimed a first place the publisher did not award —
     not from any intent to mislead, just from believing a badge. The listing
     also revealed a 2026 result nobody had mentioned. Capture the listing
     URL when someone can, so these rows link.

     THE `tier` FIELD, WHICH IS THE HONEST PART AND THE REASON THIS IS NOT
     JUST A WALL OF LOGOS.

     `local-vote` — a named local publication or platform ran a vote and this
     business won it. The Bellingham Herald's Cascades Best, Bellingham
     Alive's Best of the Northwest, Cascadia Daily News Readers' Choice,
     CommunityVotes Bellingham, Nextdoor Neighborhood Faves. These mean real
     people in this county picked this company, and three consecutive years of
     them is a genuinely strong signal.

     `directory` — a listing site or ratings aggregator issued a badge.
     BusinessRate, Quality Business Awards, LOC8NEARME, Best Pros in Town.
     Some of these are automated from public review data and some are sold.
     They are not worthless, but presenting them beside a readers' vote as
     though they were the same thing is the small dishonesty this whole site
     is built to avoid — so they are kept, labeled, and shown separately,
     and they are deliberately NOT emitted into the schema `award` property.

     `result` distinguishes a win from a shortlisting. The Whatcom Business
     Awards row is a FINALIST, not a winner, and must never be written up as
     one — that is the single most likely thing to drift in this list.

     Only what the badge itself states is recorded. Where a badge names no
     category (the CommunityVotes and Nextdoor artwork name a year and a
     program and nothing else), `category` is null rather than guessed. */
  awards: [
    {
      name: 'Cascades Best',
      publisher: 'The Bellingham Herald',
      year: 2026,
      category: 'Best Pest Control' as string | null,
      /* SILVER, and found only because the publisher's listing was read —
         no badge for this result was supplied. Worth remembering next time
         somebody assumes the artwork on the wall is the whole record. */
      level: 'Silver' as string | null,
      presented: PENDING as Owed<string>,
      /* No badge artwork held for this one. */
      badge: null as string | null,
      alt: null as string | null,
      tier: 'local-vote' as const,
      result: 'winner' as const,
      url: PENDING as Owed<string>,
      via: 'publisher-listing' as const,
    },
    {
      name: 'Cascades Best',
      publisher: 'The Bellingham Herald',
      year: 2025,
      category: 'Best Pest Control Service' as string | null,
      /* GOLD, per the publisher's own listing. The badge alone did not say. */
      level: 'Gold' as string | null,
      /* The badge reads "Presented June 29th, 2025". */
      presented: '2025-06-29' as Owed<string>,
      badge: '/img/awards/cascades-best-2025-pest-control.jpg',
      alt: 'Cascades Best 2025 winner badge from The Bellingham Herald, best pest control service',
      tier: 'local-vote' as const,
      result: 'winner' as const,
      url: PENDING as Owed<string>,
      via: 'publisher-listing' as const,
    },
    {
      name: 'Best of the Northwest',
      publisher: 'Bellingham Alive!',
      year: 2025,
      category: 'Best Pest Control Service',
      /* The badge reads "Readers Choice Award ... GOLD". */
      level: 'Gold',
      presented: PENDING as Owed<string>,
      badge: '/img/awards/bellingham-alive-best-of-northwest-2025.jpg',
      alt: 'Bellingham Alive Best of the Northwest 2025 Gold readers choice award badge',
      tier: 'local-vote' as const,
      result: 'winner' as const,
      url: PENDING as Owed<string>,
      via: 'owner-badge' as const,
    },
    {
      name: 'CommunityVotes Bellingham',
      publisher: 'CommunityVotes',
      year: 2025,
      /* The badge names the year and the program only. Not guessed. */
      category: null,
      level: null,
      presented: PENDING as Owed<string>,
      badge: '/img/awards/communityvotes-bellingham-2025.jpg',
      alt: 'CommunityVotes Bellingham 2025 winners badge',
      tier: 'local-vote' as const,
      result: 'winner' as const,
      url: PENDING as Owed<string>,
      via: 'owner-badge' as const,
    },
    {
      name: 'Cascades Best',
      publisher: 'The Bellingham Herald',
      year: 2024,
      category: 'Best Pest Control Service',
      level: 'Gold',
      presented: '2024-06-30' as Owed<string>,
      badge: '/img/awards/cascades-best-2024-pest-control.jpg',
      alt: 'Cascades Best 2024 winner badge from The Bellingham Herald, best pest control service',
      tier: 'local-vote' as const,
      result: 'winner' as const,
      url: PENDING as Owed<string>,
      via: 'publisher-listing' as const,
    },
    {
      name: 'Cascades Best',
      publisher: 'The Bellingham Herald',
      year: 2024,
      /* A SECOND, DIFFERENT category in the same year. Worth keeping separate
         rather than merging into the row above — "best customer service" is a
         different thing from "best pest control service" and is arguably the
         more interesting of the two. */
      category: 'Best Customer Service',
      /* SILVER. The badge artwork reads "Voted Best Customer Service", which
         would have published as a first place. The publisher's listing says
         silver. This row is the reason the evidence classes exist. */
      level: 'Silver',
      presented: '2024-06-30' as Owed<string>,
      badge: '/img/awards/cascades-best-2024-customer-service.jpg',
      alt: 'Cascades Best 2024 badge from The Bellingham Herald, customer service category',
      tier: 'local-vote' as const,
      result: 'winner' as const,
      url: PENDING as Owed<string>,
      via: 'publisher-listing' as const,
    },
    {
      name: 'Neighborhood Faves',
      publisher: 'Nextdoor',
      year: 2024,
      category: null,
      level: null,
      presented: PENDING as Owed<string>,
      badge: '/img/awards/nextdoor-neighborhood-faves-2024.jpg',
      alt: 'Nextdoor 2024 Neighborhood Faves winner badge',
      tier: 'local-vote' as const,
      result: 'winner' as const,
      url: PENDING as Owed<string>,
      via: 'owner-badge' as const,
    },
    {
      name: 'Neighborhood Faves',
      publisher: 'Nextdoor',
      year: 2023,
      category: null,
      level: null,
      presented: PENDING as Owed<string>,
      badge: '/img/awards/nextdoor-neighborhood-faves-2023.jpg',
      alt: 'Nextdoor 2023 Neighborhood Faves winner badge',
      tier: 'local-vote' as const,
      result: 'winner' as const,
      url: PENDING as Owed<string>,
      via: 'owner-badge' as const,
    },
    {
      name: "Readers' Choice",
      publisher: 'Cascadia Daily News',
      year: 2023,
      category: null,
      level: null,
      presented: PENDING as Owed<string>,
      badge: '/img/awards/cascadia-daily-news-readers-choice-2023.jpg',
      alt: "Cascadia Daily News 2023 Readers' Choice winner badge",
      tier: 'local-vote' as const,
      result: 'winner' as const,
      url: PENDING as Owed<string>,
      via: 'owner-badge' as const,
    },
    {
      name: 'CommunityVote Bellingham',
      publisher: 'CommunityVotes',
      year: 2023,
      category: null,
      level: null,
      presented: PENDING as Owed<string>,
      badge: '/img/awards/communityvotes-bellingham-2023.jpg',
      alt: 'CommunityVote Bellingham 2023 winners badge',
      tier: 'local-vote' as const,
      result: 'winner' as const,
      url: PENDING as Owed<string>,
      via: 'owner-badge' as const,
    },
    {
      name: 'Whatcom Business Awards',
      publisher: 'Whatcom Business Alliance',
      year: 2023,
      category: 'Start-Up Business of the Year',
      level: null,
      presented: PENDING as Owed<string>,
      badge: '/img/awards/whatcom-business-awards-2023-finalist.jpg',
      alt: 'Whatcom Business Awards 2023 finalist badge, start-up business of the year',
      tier: 'local-vote' as const,
      /* FINALIST. Not a winner. The badge says so and so must every page. */
      result: 'finalist' as const,
      url: PENDING as Owed<string>,
      via: 'owner-badge' as const,
    },
    {
      name: 'Neighborhood Favorite',
      publisher: 'Nextdoor',
      year: 2022,
      category: null,
      level: null,
      presented: PENDING as Owed<string>,
      badge: '/img/awards/nextdoor-neighborhood-favorite-2022.jpg',
      alt: 'Nextdoor 2022 Neighborhood Favorite badge',
      tier: 'local-vote' as const,
      result: 'winner' as const,
      url: PENDING as Owed<string>,
      via: 'owner-badge' as const,
    },

    /* --- directory and aggregator badges, below the line --- */
    {
      name: 'Best of 2026',
      publisher: 'BusinessRate',
      year: 2026,
      category: 'Pest Control Service',
      /* The plaque states "Powered by Google Reviews", i.e. derived from
         public review data rather than from a vote. Recorded because that is
         what the artwork says. */
      level: null,
      presented: PENDING as Owed<string>,
      badge: '/img/awards/businessrate-best-of-2026.jpg',
      alt: 'BusinessRate Best of 2026 award winner plaque for pest control service in Bellingham',
      tier: 'directory' as const,
      result: 'winner' as const,
      url: PENDING as Owed<string>,
      via: 'owner-badge' as const,
    },
    {
      name: 'Quality Business Awards',
      publisher: 'Quality Business Awards',
      year: 2026,
      category: null,
      level: null,
      presented: PENDING as Owed<string>,
      badge: '/img/awards/quality-business-awards-2026.jpg',
      alt: 'Quality Business Awards 2026 winner badge',
      tier: 'directory' as const,
      result: 'winner' as const,
      url: PENDING as Owed<string>,
      via: 'owner-badge' as const,
    },
    {
      name: 'Recommended',
      publisher: 'Loc8NearMe',
      year: 2024,
      category: null,
      level: null,
      presented: PENDING as Owed<string>,
      badge: '/img/awards/loc8nearme-recommended-2024.jpg',
      alt: 'Loc8NearMe 2024 recommended badge',
      tier: 'directory' as const,
      result: 'listed' as const,
      url: PENDING as Owed<string>,
      via: 'owner-badge' as const,
    },
    {
      name: 'Recommends',
      publisher: 'Loc8NearMe',
      /* The badge carries no year. Left null rather than assumed. */
      year: null as number | null,
      category: null,
      level: null,
      presented: PENDING as Owed<string>,
      badge: '/img/awards/loc8nearme-recommends.jpg',
      alt: 'Loc8NearMe recommends badge for Sasquatch Pest Control',
      tier: 'directory' as const,
      result: 'listed' as const,
      url: PENDING as Owed<string>,
      via: 'owner-badge' as const,
    },
    {
      name: 'Recommends',
      publisher: 'Best Pros in Town',
      year: null as number | null,
      category: 'Pest Control',
      level: null,
      presented: PENDING as Owed<string>,
      badge: '/img/awards/best-pros-in-town-recommends.jpg',
      alt: 'Best Pros in Town recommends badge for Sasquatch Pest Control',
      tier: 'directory' as const,
      result: 'listed' as const,
      url: PENDING as Owed<string>,
      via: 'owner-badge' as const,
    },
  ],

  /* PRESS
     -----------------------------------------------------------------------
     Not awards, and kept separate for that reason. An award is somebody
     handing you a badge; press is somebody choosing to write about you.

     The first row is the strongest single trust signal on this site, and it
     is the ONLY item in either list that has been verified against the
     publisher's own page rather than from artwork: mypmp.net was fetched on
     2 Sep 2026 and returned the article, its author and its date. That makes
     it `publisher-verified` — a class no award row has yet earned. */
  press: [
    {
      title: 'Sasquatch stands out',
      publication: 'Pest Management Professional',
      author: 'Pete Schopen' as Owed<string>,
      published: '2023-08-18',
      url: 'https://www.mypmp.net/sasquatch-stands-out/' as Owed<string>,
      via: 'publisher-verified' as const,
      image: null as string | null,
      alt: null as string | null,
    },
    {
      title: 'National Small Business Week feature',
      publication: 'Markel',
      author: PENDING as Owed<string>,
      published: PENDING as Owed<string>,
      url: PENDING as Owed<string>,
      via: 'owner-supplied' as const,
      image: '/img/press/markel-national-small-business-week.jpg',
      alt: 'Markel National Small Business Week feature card for Sasquatch Pest Control of Bellingham',
    },
  ],

  /** Canonical Google Business Profile URL. The owner supplied a
   *  share.google redirect on 2 Sep 2026, which is a forwarding link rather
   *  than an address and does not belong in `sameAs`. Wanted for two things:
   *  the sameAs list, and a link on the published rating so a reader can
   *  check the 4.9 for themselves. */
  gbpUrl: PENDING as Owed<string>,

  /* INSULATION AND AIR-SEALING TRAINING. Certificates supplied by the owner,
     2 Sep 2026, and read off the certificates themselves rather than from a
     description of them — issuer, exact course title, date and CEU value are
     all on the artwork.

     WHY THIS IS WORTH PUBLISHING. The site sells attic insulation and
     crawlspace restoration and, until now, answered "do you actually know how
     to install insulation" with nothing at all. It is also the rare credential
     a competitor cannot copy off a supplier's website: Comfort Ready Home is a
     BONNEVILLE POWER ADMINISTRATION program, which is a federal power agency
     and regionally meaningful in a way a trade-magazine badge is not, and
     NAIMA and ICAA are the insulation industry's own manufacturer and
     contractor associations.

     "Effective Air Sealing Made Simple" is the one to notice. Air sealing and
     rodent exclusion are the same skill pointed at two different outcomes, so
     that course backs the core service rather than the sideline.

     TRAINING, NOT A LICENSE, AND THE WORDING MUST KEEP SAYING SO. These are
     course completions. They confer no regulatory authority, they are not a
     WSDA credential, and they are not a certification anybody may be described
     as "certified" under — see the note above the credential block on why
     "certified" with no issuer named is the failure mode this file exists to
     prevent. Every rendering names the issuer and the word is "completed".

     WHOSE TRAINING. The certificates on file are Kristofer Elling's. The owner
     states on the same date that the whole crew has completed the same
     courses, which is very likely true and is not evidenced here, so it is
     recorded as a separate owner-stated claim and rendered differently. Get
     the staff certificates and `crewCompleted` can be upgraded the way the
     WSDA licenses will be. */
  training: {
    /** Documents held for this person. */
    holder: 'Kristofer R. Elling',
    via: 'certificate-held' as const,
    supplied: '2026-09-02',
    /** Owner states the rest of the crew hold the same completions. Not evidenced. */
    crewCompleted: true,
    crewVia: 'owner-stated' as const,
    courses: [
      {
        issuer: 'NAIMA & ICAA',
        issuerFull:
          'North American Insulation Manufacturers Association and Insulation Contractors Association of America',
        title:
          'Introduction to Proper Installation of Fiber Glass and Mineral Wool Insulation',
        completed: '2024-03-28',
        ceu: null as number | null,
      },
      {
        issuer: 'Comfort Ready Home',
        issuerFull: 'Comfort Ready Home, a Bonneville Power Administration program',
        title: 'Simple and Effective Attic Insulation',
        completed: '2024-04-07',
        ceu: 1,
      },
      {
        issuer: 'Comfort Ready Home',
        issuerFull: 'Comfort Ready Home, a Bonneville Power Administration program',
        title: 'Simple and Effective Floor Insulation',
        completed: '2024-04-07',
        ceu: 1,
      },
      {
        issuer: 'Comfort Ready Home',
        issuerFull: 'Comfort Ready Home, a Bonneville Power Administration program',
        title: 'Effective Air Sealing Made Simple',
        completed: '2024-04-07',
        ceu: 1,
      },
      {
        issuer: 'Comfort Ready Home',
        issuerFull: 'Comfort Ready Home, a Bonneville Power Administration program',
        title: 'Site Built Wall Insulation',
        completed: '2024-04-08',
        ceu: 1,
      },
      {
        issuer: 'Comfort Ready Home',
        issuerFull: 'Comfort Ready Home, a Bonneville Power Administration program',
        title: 'Manufactured Home Roof/Ceiling Insulation',
        completed: '2024-04-08',
        ceu: 1,
      },
      {
        issuer: 'Comfort Ready Home',
        issuerFull: 'Comfort Ready Home, a Bonneville Power Administration program',
        title: 'Filling the Belly — Manufactured Home Floor Insulation',
        completed: '2024-04-08',
        ceu: 1,
      },
    ],
  },

  /* THE CRM LEAD FORM — the live GoHighLevel widget, copied from the site it
     is replacing rather than rebuilt.

     WHY AN EMBED AND NOT A REAL FORM. This is a static site: there is no
     server, so there is nothing here that could receive a POST, send an email
     or write a row. Every lead the company has ever taken online has landed in
     their GoHighLevel account, and the routing, autoresponders, pipeline
     stages and attribution all hang off that one form id. Rebuilding the
     fields natively would produce a prettier form that dropped leads on the
     floor, which is the worst possible trade for a business whose phone is
     its revenue.

     WHERE IT CAME FROM. Read off the live https://www.sasquatchpestcontrol.com
     /contact/ on 2 Sep 2026. On the old WordPress site this iframe sits inside
     an empty Contact Form 7 wrapper (`wpcf7-f26456`) — the CF7 shell collects
     nothing and exists only because someone pasted the GHL embed into a CF7
     block. Only the iframe was carried over; the CF7 husk was not.

     WHY THE HOST LOOKS WRONG. `link.sasquatchpestcontrol.com` is the company's
     white-labeled GoHighLevel domain, not a server of ours — it is a CNAME to
     LeadConnector. Anyone grepping this codebase for `leadconnectorhq.com` or
     `msgsndr.com`, which is what GHL embeds normally point at, will find
     nothing and conclude there is no CRM form. There is; it is this.

     ONE FORM, SITEWIDE. The old site used this same id on every page that had
     a form, so there is one number to watch in GHL rather than a per-page
     split that nobody would reconcile. If the owner ever wants a distinct form
     for, say, commercial enquiries, add a SECOND entry here and pass it as a
     prop — do not paste an iframe into a page. */
  crmForm: {
    /** GoHighLevel form id. The whole embed is derived from this. */
    id: '5bi4Tly1pApcAiXjkV5Z',
    /** The company's white-labeled GHL domain. Not ours; a CNAME to LeadConnector. */
    host: 'https://link.sasquatchpestcontrol.com',
    /** GHL's own name for the form. Kept verbatim so it matches the GHL dashboard. */
    name: 'GET A FREE ESTIMATE',
    /** GHL's stored height, used to reserve space before the frame paints. */
    height: 321,
  },

  socials: [
    'https://www.facebook.com/sasquatchpestcontrol',
    'https://www.instagram.com/sasquatchpestcontrol',
    'https://www.linkedin.com/in/sasquatch-pest-control-7009412b6',
    'https://nextdoor.com/page/sasquatch-pest-control-bellingham-wa',
  ] as string[],

  /* Off-page. NEVER hand-entered — populated only from a verified GBP pull. */
  rating: {
    /* From the owner's own Google Business Profile — the screen showed
       "You manage this Business Profile" — captured 2 Sep 2026.

       THE NUMBER IT REPLACES, STATED FAIRLY — because earlier versions of
       this comment did not, and the file will outlive the conversation.

       The previous site showed "5.0 from 376+". The owner explains that 376
       was a genuine running total across Google, Facebook, Yelp and
       Thumbtack. It was a real count of real reviews, not an invention, and
       notes here that implied otherwise were wrong about it. The only thing
       actually off was the 5.0: Google's own average is 4.9 and Google is the
       large majority of the total, so a weighted composite could not round to
       a flat 5.0.

       The reason for using Google's number alone is not that the old one was
       suspect. It is that a cross-platform total is arithmetic a reader
       cannot check, while "4.9 from 342 Google reviews" is one click. The
       smaller, single-source figure is the more persuasive one precisely
       because it is verifiable. Owner agreed 2 Sep 2026. */
    value: 4.9 as Owed<number>,
    count: 342 as Owed<number>,
    source: 'Google Business Profile',
    /** The date the figure above was read. A rating with no date rots. */
    read: '2026-09-02',

    /* SCHEMA ELIGIBILITY — false, and this is NOT a data gap.
       -----------------------------------------------------------------------
       This whole field was designed on the note "aggregateRating ONLY from a
       verified GBP pull — never hand-enter", the assumption being that once a
       verified pull existed the rating could be emitted as structured data.

       That assumption is wrong, checked against Google's own Review Snippet
       documentation on 2 Sep 2026, and it is wrong twice over:

         1. "If the entity that's being reviewed controls the reviews about
            itself, their pages that use LocalBusiness or any other type of
            Organization structured data are ineligible for star review
            feature." Our own site marking up our own rating is precisely
            that. No stars would appear no matter how correct the number is.

         2. "Ratings must be sourced directly from users" and "Don't aggregate
            reviews or ratings from other websites." Copying Google's rating
            into our markup is the second thing verbatim.

       So emitting it would buy nothing and risk a manual action. The number is
       still real and still worth showing — as VISIBLE, ATTRIBUTED copy that
       names Google and carries the date, which a reader can verify and which
       no guideline restricts. Display and markup are different questions and
       this project had been treating them as one. */
    schemaEligible: false,
  },

  /**
   * Published pricing — the SINGLE source of truth.
   *
   * Keystone Part 14: published pricing is a commitment, and a price that
   * drifts between a data file and a page body is how a business ends up
   * honoring a number it stopped charging. scripts/harness.mjs scans built
   * HTML for any dollar figure not on this list and fails the build, so a
   * stale price cannot reach production.
   *
   * Bed bug work is the one service where we publish figures, because the
   * scope is genuinely predictable. Everything else is quoted from a visit.
   */
  /* The currency every published figure in `pricing` below is denominated in.
     Not a guess: the address is US, the state business license is Washington,
     and the figures are dollars. Emitted as schema `currenciesAccepted`. It is
     a field rather than a literal in the schema builder for the usual reason —
     nothing about money gets hardcoded outside this file. */
  currency: 'USD',

  /* Methods of payment actually accepted at the point of sale.
     -----------------------------------------------------------------------
     PENDING, and deliberately not guessed. "Cash, check, credit card" is the
     single most reflexively-written line in this trade and it is wrong often
     enough to matter — a company that stopped taking checks two years ago
     still says it does. Schema `paymentAccepted` renders nothing until the
     owner states the list. ADVISORY, not blocking: it gates no claim the site
     makes anywhere. */
  paymentAccepted: PENDING as Owed<readonly string[]>,

  pricing: {
    /* Confirms presence before anyone pays for a treatment. This is a service
       visit, NOT a WSDA structural pest (WDO) inspection — different category,
       different licensing, so canClaimInspection does not gate it.
       CREDITED toward treatment if the customer proceeds (owner, 30 Aug 2026),
       which is why bed bugs sit outside the free-inspection policy without
       actually costing a treating customer anything. */
    bedBugVerification: 150 as Owed<number>,
    bedBugVerificationCredited: true,
    /* Updated 30 Aug 2026 (was 350). Common areas included. */
    bedBugPerRoom: 395,
    referralCredit: 25,
  },

  /* OWNER DECISION #4 — territory hard filter. Northern Skagit is currently
     claimed in metas, built as a county page, and omitted from the
     /service-areas/ H1. This array is the hard filter: geo pages are built
     ONLY inside it. A neighboring partner's turf stays untouched. */
  territory: {
    counties: ['Whatcom County', 'Skagit County'],
    /* Owner confirmed 30 Aug 2026: we do service Skagit County. This flips
       the hard filter on, so builtTowns() now returns Skagit rows that clear
       the tier gate and their routes build. They stay noindex until each one
       has content clearing the 3,000-word floor.

       CORROBORATED 2 Sep 2026, and by the strongest kind of evidence there is
       for a service-area claim: the state Business License carries ACTIVE
       non-resident general business endorsements for MOUNT VERNON, SEDRO
       WOOLLEY, BURLINGTON and LYMAN — four Skagit County cities — alongside
       BLAINE and LYNDEN in Whatcom. A company does not hold and renew a city
       endorsement for a town it does not work in. This stopped being an owner
       assertion and became a documented fact.

       NOTE FOR WHOEVER EXTENDS THE LOCATION TIER: Lyman is endorsed and has
       no page. Every other endorsed city does. */
    skagitConfirmed: true as Owed<boolean>,
  },
} as const;

/* ------------------------------------------------------------------ *
 * People — E-E-A-T. Surfaced as Person nodes with hasCredential, and as
 * named-expert blocks inside page bodies (Keystone Part 4.2: woven in,
 * not bolted on).
 * ------------------------------------------------------------------ */
/**
 * WSDA license categories, taken from the public WSDA license lookup rather
 * than from memory. Verified against the record for LI-87206 on 30 Aug 2026:
 *
 *   agr.wa.gov → pesticide and SPI licensing → license search
 *
 * That record shows License type "Commercial Operator", status Renewed,
 * expiring 12/31/2026, and CATEGORIES (2): PCO Structural and PCO General.
 *
 * NOTE, because the owner's shorthand and the state's vocabulary differ:
 *   - "WDO certification" in our own usage IS the PCO Structural category.
 *     There is no separate WDO certificate to chase.
 *   - "Laws and safety" is an exam and a recertification component, NOT a
 *     listed category. It must not be published as one.
 *
 * The `description` strings are WSDA's own definition of each category and
 * are the only wording that should ever be paraphrased on a page.
 */
export const WSDA_CATEGORIES = {
  pcoStructural: {
    label: 'PCO Structural',
    description:
      'The control of those pests that attack structural material, including but not limited to fungus, termites, carpenter ants and wood-boring beetles.',
    /** This category is what authorizes our WDO TREATMENT work. */
    coversWdoTreatment: true,
  },
  pcoGeneral: {
    label: 'PCO General',
    description: 'General structural and household pest control.',
    coversWdoTreatment: false,
  },
} as const;
export type WsdaCategory = keyof typeof WSDA_CATEGORIES;

/**
 * EVIDENCE CLASSES — how a license claim was checked.
 *
 * The site never asserts an unverified number, and it distinguishes between
 * three genuinely different things rather than flattening them into
 * "verified". Keystone: every factual claim carries a source and a date.
 *
 *   'wsda-record'    We have seen the state record ourselves — a screenshot or
 *                    a copy of the WSDA public license search result. This is
 *                    the strongest class and the only one where the expiry
 *                    date and category list come from the state rather than
 *                    from a person.
 *
 *   'owner-verified' The owner states he checked the state record. Stronger
 *                    than his recollection, weaker than us holding it. This
 *                    class exists because collapsing it into 'wsda-record'
 *                    would claim a check this build did not perform, and
 *                    leaving it as 'owner' would understate what he did.
 *
 *   'owner'          The owner's statement, unchecked against the record.
 *
 * WHY NOT JUST VERIFY THEM HERE: the WSDA public license search is a form
 * submission behind a script-driven page, so it cannot be read by fetching a
 * URL, and browser automation is off the table on this project by the owner's
 * standing instruction. Upgrading a row to 'wsda-record' therefore needs a
 * screenshot or a copy of the record, exactly as LI-87206 had.
 */
export type EvidenceVia = 'wsda-record' | 'owner-verified' | 'owner';

export interface CredentialSource {
  checked: string;
  via: EvidenceVia;
  note?: string;
}

/**
 * WSDA LICENSE TYPES — statutory definitions, not paraphrase.
 *
 * SOURCE: RCW 17.21.020, Washington Pesticide Application Act, definitions.
 * Read 31 Aug 2026. Review by 31 Aug 2027.
 *
 * These are two genuinely different licenses and the difference is structural
 * rather than a matter of seniority, which is why it is modeled as a field
 * instead of being buried in a free-text credential name:
 *
 *   (7) "Commercial pesticide applicator" means "any person who engages in
 *       the business of applying pesticides to the land of another."
 *
 *   (8) "Commercial pesticide operator" means "any employee of a commercial
 *       pesticide applicator who uses or supervises the use of any pesticide
 *       and who is required to be licensed under provisions of this chapter."
 *
 * So the APPLICATOR license attaches to the business of applying, and the
 * OPERATOR license attaches to an employee of such a business.
 *
 * A CORRECTION WORTH KEEPING, because the inference is tempting and it was
 * made here and was wrong. Reading (8) as "therefore every operator must be
 * registered beneath some applicator's license, so the company must hold one"
 * overreads the definitions. The owner corrected this on 31 Aug 2026: the
 * operators hold their licenses separately and are registered to Sasquatch as
 * their employer, and that registration does not run through an applicator
 * license the way the chain above assumed.
 *
 * These definitions say what each license IS. They do not describe how WSDA
 * administers registration, and the gap between the two is where the bad
 * inference lived. Do not rebuild it.
 */
export const WSDA_LICENSE_TYPES = {
  commercialApplicator: {
    label: 'WSDA Commercial Applicator',
    /* RCW 17.21.020(7), verbatim. */
    definition: 'any person who engages in the business of applying pesticides to the land of another',
    /** Attaches to the business of applying rather than to employment. */
    businessLevel: true,
  },
  commercialOperator: {
    label: 'WSDA Commercial Operator',
    /* RCW 17.21.020(8), verbatim. */
    definition:
      'any employee of a commercial pesticide applicator who uses or supervises the use of any pesticide and who is required to be licensed under provisions of this chapter',
    businessLevel: false,
  },
} as const;

export type WsdaLicenseType = keyof typeof WSDA_LICENSE_TYPES;

/**
 * WHO ISSUED A CREDENTIAL — named, because "certified" with no issuer is the
 * emptiest word in this trade.
 *
 * Recorded as a field on each person rather than inferred in the schema
 * builder from `licenseType`. The inference is tempting (a WSDA license type
 * implies WSDA) and it holds for five of the six rows — and then breaks on the
 * sixth, because Jorge's ACE is an Entomological Society of America
 * certification with no WSDA license type at all. A rule that is right five
 * times out of six is exactly the kind that gets written once and then quietly
 * publishes a wrong issuer when a seventh row lands.
 *
 * Both strings are already stated inside the existing `credentialName` values;
 * this only makes them machine-readable so `recognizedBy` can carry them.
 */
export const CREDENTIAL_ISSUERS = {
  wsda: 'Washington State Department of Agriculture',
  esa: 'Entomological Society of America',
} as const;

/**
 * CREDENTIAL MAINTENANCE — what keeps these licenses live.
 *
 * Owner-stated 31 Aug 2026: licenses renew annually; recertification runs on a
 * five-year cycle requiring 40 continuing education credits, or re-examination
 * if the credits are not earned in that period. All licensed staff are
 * employees registered under Sasquatch Pest Control.
 *
 * CORROBORATION: an independent Washington pesticide training provider states
 * the same figures for both commercial applicator and commercial operator
 * licenses — 40 credits every five years, capped at 15 credits per calendar
 * year, recertifying by December 31.
 *
 * SOURCE CAVEAT, and it matters before any of this is published as fact: WSDA
 * is the authority here and its own recertification pages are script-driven,
 * so they could not be read directly from this build. Two independent sources
 * agree, which is why the figures are recorded — but they are second-hand and
 * the review date is short deliberately.
 *
 * Review by 31 Aug 2027, or sooner.
 */
export const credentialMaintenance = {
  /** Licenses renew every year. */
  renewsAnnually: true,
  /** Recertification cycle in years. */
  recertYears: 5,
  /** Continuing education credits required across the cycle. */
  recertCredits: 40,
  /** Cap on credits countable in a single calendar year. */
  maxCreditsPerYear: 15,
  /** The alternative if the credits are not earned in the cycle. */
  alternative: 're-examination',
  /** Recertification deadline within the final year of the cycle. */
  deadline: 'December 31',
  /** Every licensed person below is an employee registered under the company. */
  staffRegisteredUnderCompany: true,
  source: {
    label: 'Washington pesticide applicator recertification requirements',
    url: 'https://www.certifiedtraininginstitute.com/pesticide/washington/faq/',
    read: '2026-08-31',
    note: 'Third-party training provider; corroborates the owner. WSDA is the authority and its pages could not be read directly.',
  },
} as const;

export const people = [
  {
    slug: 'kristofer-elling',
    name: 'Kristofer R. Elling',
    jobTitle: 'Founder and Owner',
    /* Supplied 30 Aug 2026. An INDIVIDUAL WSDA license — it backs the
       "licensed" claim and the Person node. It is NOT the structural pest
       inspector credential, which is a separate license and remains unset.
       See the license block above.

       Note the type: Commercial OPERATOR, which RCW 17.21.020(8) defines as
       an employee of a commercial pesticide applicator. The applicator license
       for the business sits with LI-94159 below. */
    credential: 'LI-87206',
    licenseType: 'commercialOperator' as WsdaLicenseType,
    credentialName: WSDA_LICENSE_TYPES.commercialOperator.label,
    issuer: CREDENTIAL_ISSUERS.wsda,
    categories: ['pcoStructural', 'pcoGeneral'] as WsdaCategory[],
    licenseExpires: '2026-12-31',
    /* Confirmed against the state record, not taken on trust. Commercial
       Operator, Renewed, categories PCO Structural + PCO General. */
    verified: { checked: '2026-08-30', via: 'wsda-record',
                note: 'WSDA public license search, license 87206' } as Owed<CredentialSource>,
    bio: 'Founder and owner of Sasquatch Pest Control. Leads technician training, commercial IPM program design, and the company\'s systems and field standards across Whatcom County.',
    publishable: true,
  },
  {
    slug: 'travis-hansen',
    name: 'Travis Hansen',
    jobTitle: 'Pest Management Technician',
    credential: 'LI-99899',
    licenseType: 'commercialOperator' as WsdaLicenseType,
    credentialName: WSDA_LICENSE_TYPES.commercialOperator.label,
    issuer: CREDENTIAL_ISSUERS.wsda,
    /* Owner confirmed 30 Aug 2026 that these match LI-87206. */
    categories: ['pcoStructural', 'pcoGeneral'] as WsdaCategory[],
    /* Owner states 31 Aug 2026 that licenses renew annually. WSDA
       recertification runs to December 31, and LI-87206's state record shows
       12/31/2026, so the annual cycle ends there. Recorded from the stated
       cycle rather than from each individual record — upgrade when the
       records are in hand. */
    licenseExpires: '2026-12-31',
    verified: { checked: '2026-08-31', via: 'owner-verified',
                note: 'owner states he checked the WSDA record; record not held here. Expiry from the stated annual renewal cycle, not read off this license.' } as Owed<CredentialSource>,
    bio: 'Licensed applicator running residential and commercial routes across Whatcom County.',
    publishable: true,
  },
  {
    slug: 'evan-friese',
    name: 'Evan Friese',
    jobTitle: 'Pest Management Technician',
    credential: 'LI-105055',
    licenseType: 'commercialOperator' as WsdaLicenseType,
    credentialName: WSDA_LICENSE_TYPES.commercialOperator.label,
    issuer: CREDENTIAL_ISSUERS.wsda,
    /* Owner confirmed 30 Aug 2026 that these match LI-87206. */
    categories: ['pcoStructural', 'pcoGeneral'] as WsdaCategory[],
    /* Owner states 31 Aug 2026 that licenses renew annually. WSDA
       recertification runs to December 31, and LI-87206's state record shows
       12/31/2026, so the annual cycle ends there. Recorded from the stated
       cycle rather than from each individual record — upgrade when the
       records are in hand. */
    licenseExpires: '2026-12-31',
    verified: { checked: '2026-08-31', via: 'owner-verified',
                note: 'owner states he checked the WSDA record; record not held here. Expiry from the stated annual renewal cycle, not read off this license.' } as Owed<CredentialSource>,
    bio: 'Licensed applicator running residential and commercial routes across Whatcom County.',
    publishable: true,
  },
  {
    slug: 'bryce-carter',
    name: 'Bryce Carter',
    jobTitle: 'Pest Management Technician',
    credential: 'LI-115142',
    licenseType: 'commercialOperator' as WsdaLicenseType,
    credentialName: WSDA_LICENSE_TYPES.commercialOperator.label,
    issuer: CREDENTIAL_ISSUERS.wsda,
    /* Owner confirmed 31 Aug 2026 that these match LI-87206. */
    categories: ['pcoStructural', 'pcoGeneral'] as WsdaCategory[],
    /* Owner states 31 Aug 2026 that licenses renew annually. WSDA
       recertification runs to December 31, and LI-87206's state record shows
       12/31/2026, so the annual cycle ends there. Recorded from the stated
       cycle rather than from each individual record — upgrade when the
       records are in hand. */
    licenseExpires: '2026-12-31',
    verified: { checked: '2026-08-31', via: 'owner-verified',
                note: 'owner states he checked the WSDA record; record not held here. Expiry from the stated annual renewal cycle, not read off this license.' } as Owed<CredentialSource>,
    bio: 'Licensed applicator running residential and commercial routes across Whatcom County.',
    publishable: true,
  },
  {
    slug: 'tyson-elling',
    name: 'Tyson Elling',
    /* TITLE CHANGED 2 Sep 2026, owner-stated: Office Manager, previously
       Operations Manager.

       Note that his LICENSE is unchanged and is still the Commercial
       APPLICATOR license while the rest of the team holds Commercial
       Operator licenses. The earlier note here reasoned from that license to
       the job title — RCW 17.21.020(8) frames the operator credential as an
       employee one, so an applicator among operators looked like a
       supervisory role. That inference is now visibly wrong: the license did
       not move and the title did. Titles come from the owner, not from
       reading a statute backwards, and this row has been on the wrong side of
       that once already. */
    jobTitle: 'Office Manager',
    credential: 'LI-94159',
    /* THE DIFFERENCE THAT MATTERS ON THIS ROW. Owner stated 31 Aug 2026 that
       Tyson carries a Commercial Applicator license rather than a Commercial
       Operator license, everything else the same. See WSDA_LICENSE_TYPES. */
    licenseType: 'commercialApplicator' as WsdaLicenseType,
    credentialName: WSDA_LICENSE_TYPES.commercialApplicator.label,
    issuer: CREDENTIAL_ISSUERS.wsda,
    categories: ['pcoStructural', 'pcoGeneral'] as WsdaCategory[],
    licenseExpires: '2026-12-31',
    verified: { checked: '2026-08-31', via: 'owner-verified',
                note: 'owner states he checked the WSDA record; record not held here. License type Commercial Applicator. Expiry from the stated annual renewal cycle, not read off this license.' } as Owed<CredentialSource>,
    /* Owner-clarified 2 Sep 2026, and this line took three passes to land, so
       the distinction is written down: the office IS the job. He manages the
       office staff, the schedules and the routing. He holds a current
       Commercial Applicator license and CAN run a route, but that is capacity,
       not what he does most days.

       The two wrong versions are worth remembering. First it said only that he
       runs the office, which implied he had stopped being licensed field
       staff. Then it said he "still works routes and field jobs", which
       implied the reverse — that the office role was a sideline. Both were
       inferences dressed as facts. This one states the role and the license
       separately, which is what was actually said. */
    bio: 'Office manager, running the office staff, the scheduling and the routing. Holds a current commercial applicator license and runs routes when the schedule calls for it.',
    publishable: true,
  },
  {
    slug: 'jorge-bedoya',
    name: 'Jorge Bedoya',
    jobTitle: 'Consulting Entomologist',
    credential: 'ACE',
    /* Not a WSDA license, so no license type applies. */
    licenseType: null as WsdaLicenseType | null,
    credentialName: 'Associate Certified Entomologist, Entomological Society of America',
    issuer: CREDENTIAL_ISSUERS.esa,
    /* ACE is an ESA certification, not a WSDA license — no categories. */
    categories: [] as WsdaCategory[],
    licenseExpires: PENDING as Owed<string>,
    verified: PENDING as Owed<CredentialSource>,
    bio: 'Associate Certified Entomologist and consulting entomologist. Reviews species identification and treatment protocols.',
    /* OWNER DECISION #3 — CLOSED 2 Sep 2026. The owner confirmed the
       relationship and gave permission to name Jorge as consulting ACE.

       What this unlocks and what it does NOT: the name, the job title and the
       ACE credential now publish. The credential is still `verified: PENDING`
       — nobody here has checked the ESA certification register — so it
       publishes on the owner's word, which is the `owner` evidence class and
       is the weakest of the three. ACE certification is renewable and the
       register is public, so this is cheap to upgrade and is left in the
       pending report until somebody does.

       Permission to NAME someone is not the same as having VERIFIED their
       credential, and collapsing the two would be exactly the kind of quiet
       upgrade the evidence classes exist to prevent. */
    publishable: true as Owed<boolean>,
  },
] as const;

export type Person = (typeof people)[number];

/** Everything the client still owes, for the build gate. */
/**
 * The named people whose published WSDA license carries the WDO category.
 * This is what backs every "we treat wood-destroying organisms" statement on
 * the site — the claim is only ever as true as this list is non-empty.
 */
export function wdoLicensees() {
  return people.filter(
    (p) =>
      p.publishable === true &&
      isReady(p.credential as Owed<string>) &&
      p.categories.some((c) => WSDA_CATEGORIES[c].coversWdoTreatment),
  );
}

/**
 * Published credentials that have NOT been checked against the state record.
 * Not a blocker — the owner holds the licenses — but the numbers are public
 * and a two-minute lookup turns an owner statement into a verifiable one.
 */
/**
 * Published credentials where we do NOT hold the state record.
 *
 * Deliberately tests for the strongest class rather than against the weakest.
 * Written as `v.via === 'owner'` this would silently start passing the moment
 * a new class was added — and a new class was added on 31 Aug 2026. Asking
 * "is it the one class that counts as holding the record" cannot rot that way.
 */
export function unverifiedCredentials() {
  return people.filter((p) => {
    if (p.publishable !== true) return false;
    if (!isReady(p.credential as Owed<string>)) return false;
    const v = p.verified as Owed<CredentialSource>;
    return !isReady(v) || v.via !== 'wsda-record';
  });
}

export function pendingFields(): string[] {
  const out: string[] = [];
  const walk = (obj: unknown, path: string) => {
    if (obj === PENDING) return void out.push(path);
    if (obj && typeof obj === 'object' && !Array.isArray(obj)) {
      for (const [k, v] of Object.entries(obj)) {
        if (typeof v === 'function') continue;
        walk(v, path ? `${path}.${k}` : k);
      }
    }
  };
  walk(business, 'business');
  people.forEach((p) => walk(p, `people.${p.slug}`));
  return out;
}
