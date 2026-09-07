/**
 * towns.ts — the geo data spine. getStaticPaths() and the schema areaServed
 * both read from here. Adding a row generates a page; the tier function in
 * lib/geo.ts decides whether it earns four pages, one, or a mention only.
 *
 * Every row must carry real differentiators. A row with no pestPressures,
 * no housing and no landmarks scores as 'area' and NO page is built for it.
 * That is the capacity gate, not an oversight.
 *
 * Distances are road miles from Bellingham. Population figures are rounded
 * and used only to weight tiering — they are never printed on a page, so
 * they cannot go stale in public.
 */

export type Housing = 'prewar' | 'midcentury' | 'seventies' | 'modern' | 'rural' | 'mixed';

export interface Town {
  slug: string;
  name: string;
  county: 'Whatcom County' | 'Skagit County';
  distanceMi?: number;
  direction?: 'north' | 'south' | 'east' | 'west' | 'northwest' | 'northeast' | 'southeast' | 'southwest';
  population?: number;
  housing?: Housing;
  /** Real, locally observed pressure — not a generic pest list. */
  pestPressures?: string[];
  landmarks?: string[];
  /**
   * `page: true` means this neighborhood earns its own indexable URL.
   *
   * CAPACITY GATE, same doctrine as tierFor() for towns. Bellingham has 25
   * official neighborhoods and several share a housing stock outright — York,
   * Columbia, Sunnyland and Roosevelt are all prewar, alley-served and a few
   * blocks apart. Writing 3,000 genuinely unique words about each is not
   * possible, and the alternative is four token-swapped pages, which is the
   * exact failure this rebuild exists to escape.
   *
   * So the ones with a distinct story get a full page; the rest are covered by
   * the grouped neighborhood section on the Bellingham city page and listed by
   * name. Owner approved this split 30 Aug 2026.
   */
  neighborhoods?: { slug: string; name: string; note?: string; page?: boolean }[];
  /** Incorporated city vs CDP vs unincorporated community. */
  kind?: 'city' | 'town' | 'cdp' | 'community';
  /**
   * Whether we actually run routes here. Defaults to true when omitted.
   *
   * Set FALSE rather than deleting the row. A deleted row is a fact nobody
   * can see; a row marked false records the decision, keeps the town out of
   * builtTowns(), and stops somebody re-adding it in six months because it
   * looked like an oversight. `notServicedNote` says why.
   */
  serviced?: boolean;
  notServicedNote?: string;
}

export const towns: Town[] = [
  {
    slug: 'bellingham',
    name: 'Bellingham',
    county: 'Whatcom County',
    distanceMi: 0,
    direction: 'north',
    population: 93000,
    housing: 'mixed',
    kind: 'city',
    pestPressures: [
      'carpenter and moisture ants in older crawlspaces',
      'Norway rats moving indoors when the rain sets in',
      'giant house spiders through the fall wandering season',
      'bed bugs in the student rental belt',
    ],
    landmarks: ['Squalicum Harbor', 'Whatcom Falls Park', 'Western Washington University', 'the Guide Meridian corridor'],
    /* The City's official 25 neighborhoods. The live site has 21 and is
       missing five; Chuckanut is on the live site but is not one of the
       official 25. Fairhaven exists twice today — as a "city" page and a
       neighborhood page. It is a neighborhood. */
    neighborhoods: [
      { slug: 'alabama-hill', name: 'Alabama Hill', page: true, note: '1960s–70s hillside stock, heavy cedar, sloped crawlspaces' },
      { slug: 'barkley', name: 'Barkley', page: true, note: 'newer mixed-use and townhome density, perimeter pressure' },
      { slug: 'birchwood', name: 'Birchwood', note: 'postwar single-family, mature landscaping against foundations' },
      { slug: 'city-center', name: 'City Center', page: true, note: 'MISSING TODAY — commercial cores, shared walls, rodent runs' },
      { slug: 'columbia', name: 'Columbia', note: 'prewar cottages, post-and-pier, knob-and-tube era' },
      { slug: 'cordata', name: 'Cordata', page: true, note: 'newer construction and apartments near the college' },
      { slug: 'cornwall-park', name: 'Cornwall Park', note: 'park-adjacent greenbelt, heavy rodent pressure' },
      { slug: 'edgemoor', name: 'Edgemoor', page: true, note: 'large lots, wooded, heavy carpenter ant pressure' },
      { slug: 'fairhaven', name: 'Fairhaven', page: true, note: 'historic district, old foundations, creekside greenbelt' },
      { slug: 'happy-valley', name: 'Happy Valley', page: true, note: 'student rentals, bed bug and roach turnover' },
      { slug: 'irongate', name: 'Irongate', page: true, note: 'MISSING TODAY — light industrial, commercial rodent work' },
      { slug: 'king-mountain', name: 'King Mountain', note: 'MISSING TODAY — newer hillside, forest edge' },
      { slug: 'lettered-streets', name: 'Lettered Streets', page: true, note: 'oldest stock in the city, unsealed crawlspaces' },
      { slug: 'meridian', name: 'Meridian', note: 'commercial corridor plus adjacent single-family' },
      { slug: 'puget', name: 'Puget', note: 'midcentury, vented crawlspaces' },
      { slug: 'roosevelt', name: 'Roosevelt', note: 'prewar and postwar mix, alley access' },
      { slug: 'samish', name: 'Samish', note: 'lake-adjacent, moisture pressure' },
      { slug: 'sehome', name: 'Sehome', page: true, note: 'campus-adjacent rentals, arboretum edge' },
      { slug: 'silver-beach', name: 'Silver Beach', page: true, note: 'Lake Whatcom shoreline, carpenter ants and rodents' },
      { slug: 'south', name: 'South', note: 'MISSING TODAY — bay-adjacent, older stock' },
      { slug: 'south-hill', name: 'South Hill', note: 'historic homes above Fairhaven, steep lots' },
      { slug: 'sunnyland', name: 'Sunnyland', note: 'prewar bungalows, dense infill' },
      { slug: 'wwu', name: 'Western Washington University', note: 'MISSING TODAY — institutional and adjacent housing' },
      { slug: 'whatcom-falls', name: 'Whatcom Falls', page: true, note: 'creek corridor, greenbelt rodent pressure' },
      { slug: 'york', name: 'York', note: 'prewar, alley-served, tight lots' },
    ],
  },
  {
    slug: 'ferndale',
    name: 'Ferndale',
    county: 'Whatcom County',
    distanceMi: 9,
    direction: 'northwest',
    population: 16000,
    housing: 'modern',
    kind: 'city',
    pestPressures: ['rodents moving in off adjacent farmland', 'wasps in new-construction soffits', 'ants along irrigated foundations'],
    landmarks: ['Pioneer Park', 'the Nooksack River corridor', 'the Cherry Point industrial area'],
    /* OWNER-SUPPLIED, 3 Sep 2026, and mention-level only — no page: true on any
       of them. Two reasons for the caution.

       THE SOURCE WAS A GOOGLE AI OVERVIEW, and it demonstrably bled between
       queries. The Blaine list and the Lynden list came back sharing six
       identical entries — Bay Crest, Salish Breeze, Malibu Estates, The
       Greens, Loomis Trail and Lettered Streets — and Lettered Streets is one
       of Bellingham's twenty-five official neighborhoods with a page of its
       own on this site. Those six are dropped. What is kept is the set that
       is either independently well known (Semiahmoo, Sandy Point, Front
       Street) or named after real local geography (Pepin Creek, Fishtrap
       Creek, North Prairie).

       MENTION-LEVEL IS THE HONEST TIER FOR THEM ANYWAY. Bellingham's are the
       City's official designations; these are a mix of subdivision names,
       downtown districts and marketing labels, which is a different kind of
       thing. They belong in the "also across" line and in areaServed, not on
       twelve more pages. Owner to confirm which — if any — are recognized
       locally enough to earn one.

       OWNER CONFIRMED 4 SEP 2026: all seven. See the fuller note on the Blaine
       block above — the caution stands as the record of why these were held,
       the six bled entries stay dropped, and nothing was added back.

       SANDY POINT AND THE LUMMI RESERVATION — ANSWERED BY THE OWNER,
       4 Sep 2026, and the question is closed.

       Sandy Point sits on the Sandy Point Arm within the Lummi Reservation,
       and the page was written to make no claim about jurisdiction because
       pesticide regulation on tribal land is not something to assert from a
       web search. The owner's answer: there is no licensing restriction, the
       company works out there regularly, and the Lummi Nation has contracted
       with it directly in the past. What differs is TAX, not authority —
       work on the reservation is tax exempt.

       TWO THINGS FOLLOW FOR ANYONE EDITING THIS.

       The tax point is on the page, and it is written as "tell us at booking
       and it is handled on the quote" rather than as a statement of what the
       exemption is or who qualifies for it. That is deliberate. Exemption
       depends on facts about the customer and the address that this company
       is not the authority on, and a web page that tells somebody they do not
       owe tax is a worse error than one that tells them to raise it.

       The contracting relationship is NOT on the page. Naming a client is
       the client's decision rather than ours, and permission to tell us
       something is not permission to publish it — the same rule the
       credential block applies to Jorge Bedoya. If the owner wants the Lummi
       Nation named as a past client, that is a separate yes, on the record,
       and then it can go up. */
    neighborhoods: [
      { slug: 'sandy-point', name: 'Sandy Point', page: true, note: 'waterfront and canal lots, marine air and moisture' },
      { slug: 'downtown-ferndale', name: 'Downtown Ferndale', page: true, note: 'older stock along the Nooksack, walkable core' },
      { slug: 'malloy-village', name: 'Malloy Village', page: true, note: 'townhomes and family streets near the freeway' },
      { slug: 'vista-ridge', name: 'Vista Ridge', page: true, note: 'newer construction on elevated ground' },
      { slug: 'pacific-highlands', name: 'Pacific Highlands', page: true, note: 'modern subdivision with sidewalks and parks' },
      { slug: 'woods-point', name: 'Woods Point', page: true, note: 'gated 55+ community, single-level homes' },
      { slug: 'the-meadows', name: 'The Meadows', page: true, note: 'established larger-lot single-family' },
    ],
  },
  {
    slug: 'lynden',
    name: 'Lynden',
    county: 'Whatcom County',
    distanceMi: 15,
    direction: 'north',
    population: 15500,
    housing: 'rural',
    kind: 'city',
    pestPressures: [
      'rodents in dairy feed rooms and storage',
      'rodents in outbuildings and equipment sheds',
      'cluster flies overwintering in south-facing walls',
    ],
    landmarks: ['the Guide Meridian', 'Berthusen Park', 'the dairy corridor toward Everson'],
    /* OWNER-SUPPLIED, 3 Sep 2026, and mention-level only — no page: true on any
       of them. Two reasons for the caution.

       THE SOURCE WAS A GOOGLE AI OVERVIEW, and it demonstrably bled between
       queries. The Blaine list and the Lynden list came back sharing six
       identical entries — Bay Crest, Salish Breeze, Malibu Estates, The
       Greens, Loomis Trail and Lettered Streets — and Lettered Streets is one
       of Bellingham's twenty-five official neighborhoods with a page of its
       own on this site. Those six are dropped. What is kept is the set that
       is either independently well known (Semiahmoo, Sandy Point, Front
       Street) or named after real local geography (Pepin Creek, Fishtrap
       Creek, North Prairie).

       MENTION-LEVEL IS THE HONEST TIER FOR THEM ANYWAY. Bellingham's are the
       City's official designations; these are a mix of subdivision names,
       downtown districts and marketing labels, which is a different kind of
       thing. They belong in the "also across" line and in areaServed, not on
       twelve more pages. Owner to confirm which — if any — are recognized
       locally enough to earn one.

       OWNER CONFIRMED 4 SEP 2026 — and the caution above earned its keep on
       the way to writing these, which is the whole reason it was recorded.

       BEFORE WRITING, EACH NAME WAS CHECKED against sources outside the
       overview that produced this list. Three things came back.

       'Fairway Estates' is DROPPED. It could not be found in Lynden at all.
       Searches return Fairway Estates developments in Everett and Seattle and
       nothing here, and it does not appear on a local agent's Lynden
       neighborhood guide that names five of the others. It is a generic
       subdivision name with no local geography behind it, which is precisely
       the profile of the six entries already dropped for bleeding between
       queries. Writing three thousand words about a neighborhood that may not
       exist would be a worse failure than any of the ones this file guards
       against, so it goes. If the owner knows it as a real local name, it
       comes back with a page — but on his say-so, recorded as such.

       'Homestead' was noted here as being on the NORTH edge. Two independent
       sources put it on the WEST side, beside Fishtrap Creek and Homestead
       Park, around a semi-private course that opened in 1993. Corrected.

       'Meadowview' was noted as postwar and later single-family. The local
       guide describes it as large lots on the outskirts surrounded by
       farmland — a rural-feel neighborhood rather than a postwar one, which
       is a materially different page. Corrected.

       Both of those errors came from the same overview and neither was
       caught by the earlier review, because a plausible-sounding housing note
       does not look wrong the way a duplicated town name does. Check the
       notes, not just the names. */
    neighborhoods: [
      { slug: 'downtown-lynden', name: 'Downtown Lynden', page: true, note: 'Front Street commercial core, turn-of-the-century and mid-century homes behind it' },
      { slug: 'homestead', name: 'Homestead', page: true, note: 'west side, around the golf course opened 1993, beside Fishtrap Creek and Homestead Park' },
      { slug: 'meadowview', name: 'Meadowview', page: true, note: 'large lots on the outskirts, surrounded by farmland' },
      { slug: 'sterling-meadows', name: 'Sterling Meadows', page: true, note: 'newer subdivision on the south side' },
      { slug: 'north-prairie', name: 'North Prairie', page: true, note: 'working farmland edge along North Prairie Road' },
      { slug: 'pepin-creek', name: 'Pepin Creek', page: true, note: 'west-side creek corridor under active development and realignment' },
      { slug: 'fishtrap-creek', name: 'Fishtrap Creek', page: true, note: 'east side, mature trees, creek greenbelt and trail through established streets' },
    ],
  },
  {
    slug: 'blaine',
    name: 'Blaine',
    county: 'Whatcom County',
    distanceMi: 22,
    direction: 'northwest',
    population: 6000,
    housing: 'mixed',
    kind: 'city',
    pestPressures: [
      'rodents in marina and gear storage', 'salt corrosion opening the building envelope', 'carpenter ants in cedar',
      /* Owner-supplied, 2 Sep 2026. */
      'carpenter ants out of beach driftwood',
    ],
    landmarks: ['Blaine Harbor', 'Semiahmoo Spit', 'the Peace Arch crossing'],
    /* OWNER-SUPPLIED, 3 Sep 2026, and mention-level only — no page: true on any
       of them. Two reasons for the caution.

       THE SOURCE WAS A GOOGLE AI OVERVIEW, and it demonstrably bled between
       queries. The Blaine list and the Lynden list came back sharing six
       identical entries — Bay Crest, Salish Breeze, Malibu Estates, The
       Greens, Loomis Trail and Lettered Streets — and Lettered Streets is one
       of Bellingham's twenty-five official neighborhoods with a page of its
       own on this site. Those six are dropped. What is kept is the set that
       is either independently well known (Semiahmoo, Sandy Point, Front
       Street) or named after real local geography (Pepin Creek, Fishtrap
       Creek, North Prairie).

       MENTION-LEVEL IS THE HONEST TIER FOR THEM ANYWAY. Bellingham's are the
       City's official designations; these are a mix of subdivision names,
       downtown districts and marketing labels, which is a different kind of
       thing. They belong in the "also across" line and in areaServed, not on
       twelve more pages. Owner to confirm which — if any — are recognized
       locally enough to earn one.

       OWNER CONFIRMED 4 SEP 2026: all four, and the Ferndale and Lynden sets
       with them. That answers the question this comment was holding open, and
       the caution above still stands as the record of WHY it was held open —
       the six bled entries stay dropped, and nothing has been added back.

       What earns each page is not the name, it is that the four are genuinely
       four different jobs: a spit where buildings stand empty for months, a
       gated development with its own marina and golf course, a shared-wall
       downtown above the harbor, and the last residential streets before open
       county. If a name on one of these lists ever turns out to describe
       nothing distinct, the page comes off rather than getting padded. */
    neighborhoods: [
      { slug: 'semiahmoo', name: 'Semiahmoo', page: true, note: 'resort and marina community on the spit, much of it seasonally empty' },
      { slug: 'birch-bay-village', name: 'Birch Bay Village', page: true, note: 'gated community with its own marina and golf course' },
      { slug: 'downtown-blaine', name: 'Downtown Blaine', page: true, note: 'older commercial core and condos above Drayton Harbor' },
      { slug: 'east-blaine', name: 'East Blaine', page: true, note: 'established residential up H Street toward rural county' },
    ],
  },
  {
    slug: 'birch-bay',
    name: 'Birch Bay',
    county: 'Whatcom County',
    distanceMi: 18,
    direction: 'northwest',
    population: 9000,
    housing: 'seventies',
    kind: 'cdp',
    pestPressures: ['seasonal-home rodent ingress', 'underfloor access on lightly built cabins', 'wasps in vacant-property eaves'],
    landmarks: ['Birch Bay State Park', 'the Birch Bay Berm'],
  },
  {
    slug: 'everson',
    name: 'Everson',
    county: 'Whatcom County',
    distanceMi: 17,
    direction: 'northeast',
    population: 2800,
    housing: 'rural',
    kind: 'city',
    pestPressures: [
      'feed-room rodents in outbuildings', 'flies around livestock operations',
      /* Owner-supplied, 2 Sep 2026. */
      'rodents around chicken coops',
    ],
    landmarks: ['the Nooksack River', 'the Everson–Goshen agricultural corridor'],
  },
  {
    slug: 'nooksack',
    name: 'Nooksack',
    county: 'Whatcom County',
    distanceMi: 18,
    direction: 'northeast',
    population: 1600,
    housing: 'rural',
    kind: 'city',
    pestPressures: [
      'rodents from surrounding berry acreage', 'overwintering cluster flies',
      /* Owner-supplied, 2 Sep 2026. */
      'stink bugs and Asian lady beetles',
    ],
  },
  {
    slug: 'sumas',
    name: 'Sumas',
    county: 'Whatcom County',
    distanceMi: 23,
    direction: 'northeast',
    population: 1500,
    housing: 'rural',
    kind: 'city',
    pestPressures: [
      'border-crossing freight rodent pressure', 'stored-product insects in warehousing',
      /* Owner-supplied, 2 Sep 2026. */
      'stink bugs and Asian lady beetles',
    ],
    landmarks: ['the Sumas border crossing'],
  },
  {
    slug: 'sudden-valley',
    name: 'Sudden Valley',
    county: 'Whatcom County',
    distanceMi: 8,
    direction: 'southeast',
    population: 7000,
    housing: 'seventies',
    kind: 'cdp',
    pestPressures: [
      
      'carpenter ants in 1970s cedar',
      'rodents from the surrounding forest edge',
      'damp crawlspaces at the low end of sloped lots',
      /* Owner-supplied, 2 Sep 2026. */
      'heavy mouse pressure off the surrounding woodland',
    ],
    landmarks: ['Lake Whatcom', 'the Sudden Valley golf course'],
  },
  {
    slug: 'point-roberts',
    name: 'Point Roberts',
    /* Owner confirmed 30 Aug 2026: NOT serviced. Reaching it means two border
       crossings each way and we do not run it. Nooksack IS serviced (same
       conversation) and stays. */
    serviced: false,
    notServicedNote: 'Owner 30 Aug 2026 — two border crossings each way; not a route we run.',
    county: 'Whatcom County',
    distanceMi: 40,
    direction: 'northwest',
    population: 1200,
    housing: 'seventies',
    kind: 'cdp',
    pestPressures: ['seasonal-home rodent ingress', 'salt exposure on building envelopes'],
  },
  {
    slug: 'custer',
    name: 'Custer',
    county: 'Whatcom County',
    distanceMi: 14,
    direction: 'northwest',
    housing: 'rural',
    kind: 'community',
    pestPressures: [
      'farm and field rodents', 'cluster flies in open country',
      /* Owner-supplied, 2 Sep 2026. */
      'spiders and wasps',
    ],
  },
  {
    /* Owner confirmed 30 Aug 2026, along with Custer and Deming. Acme sits in
       the South Fork valley on SR 9, and like the other two it is a mention
       rather than a page — real coverage, not enough differentiator data to
       carry 3,000 unique words. That is the capacity gate, not an oversight. */
    slug: 'acme',
    name: 'Acme',
    county: 'Whatcom County',
    distanceMi: 25,
    direction: 'southeast',
    housing: 'rural',
    kind: 'community',
    pestPressures: [
      /* CARRIED ACROSS FROM THE DEMING BRIEF, and labeled that way because the
         comment that used to sit here did not. It read as owner-supplied for
         Acme while describing, in his words, Deming — "a big area for us", a
         mix of farmland and forest, rats AND mice off the farm ground rather
         than mice alone, a heavy carpenter ant season through spring and
         summer, and lady beetles and stink bugs as the autumn wave alongside
         spiders.

         Applying that to Acme is an inference rather than a statement, and it
         is a defensible one: both are unincorporated communities on a fork of
         the Nooksack, both have working farms strung along a single highway
         with standing timber on the valley walls, and the pressures follow the
         terrain rather than the postcode. It is recorded as an inference so
         that nobody later cites it as something the owner said about Acme.

         WHAT ACME HAS THAT DEMING DOES NOT is the reason its page reads
         differently: the South Fork runs the length of the community on a
         valley floor that does not drain quickly, which drives a high water
         table, damp crawlspaces, a riparian rodent corridor and displacement
         when the river comes up. */
      'rats and mice off surrounding farm ground', 'carpenter ants through spring and summer',
      'autumn lady beetles and stink bugs', 'wasps and spiders',
    ],
  },
  {
    slug: 'deming',
    name: 'Deming',
    county: 'Whatcom County',
    distanceMi: 16,
    direction: 'east',
    housing: 'rural',
    kind: 'community',
    pestPressures: [
      'forest-edge rodents', 'carpenter ants in cedar',
      /* Owner-supplied, 2 Sep 2026. */
      'wasps and spiders',
    ],
  },
  /* --- Skagit County. Gated on business.territory.skagitConfirmed
     (owner decision #4) — these build only if the territory is confirmed. --- */
  {
    slug: 'alger',
    name: 'Alger',
    county: 'Skagit County',
    distanceMi: 18,
    direction: 'south',
    housing: 'rural',
    kind: 'community',
    pestPressures: ['forest-edge rodents', 'carpenter ants in cedar', 'wasps in outbuildings'],
    landmarks: ['the Lake Samish exit corridor', 'the Alger foothills'],
  },
  {
    slug: 'bow',
    name: 'Bow',
    county: 'Skagit County',
    distanceMi: 22,
    direction: 'south',
    housing: 'rural',
    kind: 'community',
    pestPressures: ['farm and field rodents off open ground', 'cluster flies in open country', 'carpenter ants in older farmhouse framing'],
    landmarks: ['Samish Bay', 'the Bow-Edison farmland', 'Chuckanut Drive'],
  },
  {
    slug: 'mount-vernon',
    name: 'Mount Vernon',
    county: 'Skagit County',
    distanceMi: 28,
    direction: 'south',
    population: 36000,
    housing: 'mixed',
    kind: 'city',
    pestPressures: ['rodents off the Skagit Valley farmland', 'ants in older downtown stock', 'shared rodent populations in downtown blocks'],
    landmarks: ['downtown Mount Vernon', 'the Skagit River', 'the tulip fields'],
  },
  {
    slug: 'burlington',
    name: 'Burlington',
    county: 'Skagit County',
    distanceMi: 25,
    direction: 'south',
    population: 9500,
    housing: 'modern',
    kind: 'city',
    pestPressures: ['commercial rodent pressure along the retail corridor', 'stored-product insects in distribution'],
    landmarks: ['the Cascade Mall corridor', 'the Skagit River dike'],
  },
  {
    slug: 'sedro-woolley',
    name: 'Sedro-Woolley',
    county: 'Skagit County',
    distanceMi: 30,
    direction: 'southeast',
    population: 12000,
    housing: 'prewar',
    kind: 'city',
    pestPressures: ['carpenter ants in old mill-town stock', 'rodents from the river corridor'],
    landmarks: ['the Skagit River', 'downtown Sedro-Woolley'],
  },
  {
    slug: 'anacortes',
    name: 'Anacortes',
    county: 'Skagit County',
    distanceMi: 40,
    direction: 'southwest',
    population: 17500,
    housing: 'mixed',
    kind: 'city',
    pestPressures: ['rodents in boat and gear storage', 'salt exposure on structures'],
    landmarks: ['the Anacortes ferry terminal', 'Cap Sante Marina'],
    /* Owner confirmed 30 Aug 2026: NOT serviced. Fidalgo Island and the
       islands generally (Whidbey, Oak Harbor) are outside our territory.
       Do not add island towns to this file. */
    serviced: false,
    notServicedNote: 'Owner 30 Aug 2026 — Fidalgo Island is outside our territory.',
  },
  {
    slug: 'la-conner',
    name: 'La Conner',
    county: 'Skagit County',
    distanceMi: 35,
    direction: 'south',
    population: 950,
    housing: 'prewar',
    kind: 'town',
    pestPressures: ['rodents in historic commercial buildings', 'moisture-driven pests in old foundations'],
    landmarks: ['the Swinomish Channel'],
    /* Owner confirmed 30 Aug 2026: NOT serviced. We run the I-5 corridor
       south, not the western Skagit waterfront. */
    serviced: false,
    notServicedNote: 'Owner 30 Aug 2026 — outside the routes we actually run.',
  },
];

export const townBySlug = (slug: string) => towns.find((t) => t.slug === slug);
