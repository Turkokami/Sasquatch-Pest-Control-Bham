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
       locally enough to earn one. */
    neighborhoods: [
      { slug: 'sandy-point', name: 'Sandy Point', note: 'waterfront and canal lots, marine air and moisture' },
      { slug: 'downtown-ferndale', name: 'Downtown Ferndale', note: 'older stock along the Nooksack, walkable core' },
      { slug: 'malloy-village', name: 'Malloy Village', note: 'townhomes and family streets near the freeway' },
      { slug: 'vista-ridge', name: 'Vista Ridge', note: 'newer construction on elevated ground' },
      { slug: 'pacific-highlands', name: 'Pacific Highlands', note: 'modern subdivision with sidewalks and parks' },
      { slug: 'woods-point', name: 'Woods Point', note: 'gated 55+ community, single-level homes' },
      { slug: 'the-meadows', name: 'The Meadows', note: 'established larger-lot single-family' },
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
       locally enough to earn one. */
    neighborhoods: [
      { slug: 'downtown-lynden', name: 'Downtown Lynden', note: 'Front Street commercial core and the older stock behind it' },
      { slug: 'homestead', name: 'Homestead', note: 'golf-course community on the north edge' },
      { slug: 'meadowview', name: 'Meadowview', note: 'postwar and later single-family' },
      { slug: 'sterling-meadows', name: 'Sterling Meadows', note: 'newer subdivision' },
      { slug: 'north-prairie', name: 'North Prairie', note: 'farmland edge along North Prairie Road' },
      { slug: 'fairway-estates', name: 'Fairway Estates', note: 'golf-adjacent single-family' },
      { slug: 'pepin-creek', name: 'Pepin Creek', note: 'creek corridor on the west side, newer development' },
      { slug: 'fishtrap-creek', name: 'Fishtrap Creek', note: 'creek corridor through town, greenbelt margins' },
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
       locally enough to earn one. */
    neighborhoods: [
      { slug: 'semiahmoo', name: 'Semiahmoo', note: 'resort and marina community on the spit, much of it seasonally empty' },
      { slug: 'birch-bay-village', name: 'Birch Bay Village', note: 'gated community with its own marina and golf course' },
      { slug: 'downtown-blaine', name: 'Downtown Blaine', note: 'older commercial core and condos above Drayton Harbor' },
      { slug: 'east-blaine', name: 'East Blaine', note: 'established residential up H Street toward rural county' },
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
      /* Owner-supplied, 3 Sep 2026, and sharpened from the earlier entry. He
         calls Deming a big area for the business and describes it as a mix of
         farmland and forest: rats AND mice off the farm ground rather than
         mice alone, a heavy carpenter ant season through spring and summer,
         and lady beetles and stink bugs as the autumn wave alongside
         spiders. */
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
