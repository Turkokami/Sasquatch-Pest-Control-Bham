/**
 * services.ts — the service tree AND the migration map in one file.
 *
 * Every row carries `legacy[]`: the old root-level slugs that 301 to it.
 * scripts/redirects.mjs generates the redirect table from this array, so the
 * consolidation and the redirects can never drift apart.
 *
 * OWNER DECISION #8 — sign off this 39 → 26 list before any page is collapsed.
 * `confirmed: false` rows do not build and do not redirect. Keystone Part 14:
 * "Never invent services or verticals. Build only the confirmed set."
 */

export interface Service {
  slug: string;
  name: string;
  /** Short label for nav and sibling link rails. */
  short: string;
  category: 'rodents-birds' | 'stinging-flying' | 'household' | 'structural' | 'commercial' | 'exclusion';
  /** Old root-level slugs that 301 here. Source of the redirect map. */
  legacy: string[];
  /** Problem micro pages that live beneath this spoke. */
  problems?: { slug: string; title: string }[];
  /** Owner has confirmed this service is actually offered. */
  confirmed: boolean;
  /** Services deliberately NOT offered, published as honest-refusal pages. */
  refusal?: string;
}

/**
 * SERVICE LIST — SIGNED OFF by the owner 30 Aug 2026.
 *
 * The live site carried 39 service URLs. This is the consolidated set: 23 live
 * spokes after the four bird/wildlife retirements (see RETIRED_TO_EXCLUSION
 * below). Every legacy URL from the old 39 maps to one of these or to the
 * exclusion spoke — `node scripts/redirects.mjs` proves it, and the map
 * integrity check fails on any chain, duplicate source or self-loop.
 *
 * Do not add a service to this array without the owner confirming it is work
 * Sasquatch actually performs. A page for work we do not do is a liability,
 * and by this point 47 indexable pages link into this list.
 */
export const services: Service[] = [
  /* ---------------- rodents & birds ---------------- */
  {
    slug: 'rodent-control', name: 'Rodent & Mouse Control', short: 'Rodents',
    category: 'rodents-birds', confirmed: true,
    legacy: ['rodent-control', 'rat-control', 'mouse-control', 'rodent-exclusion'],
    problems: [
      { slug: 'rats-in-the-crawlspace', title: 'Rats in the crawlspace' },
      { slug: 'scratching-in-the-walls-at-night', title: 'Scratching in the walls at night' },
      { slug: 'droppings-in-the-kitchen', title: 'Droppings in the kitchen' },
      { slug: 'rodents-in-the-attic-insulation', title: 'Rodents in the attic insulation' },
    ],
  },

  /* ---------------- stinging & flying ---------------- */
  {
    slug: 'wasp-control', name: 'Wasp & Hornet Control', short: 'Wasps',
    category: 'stinging-flying', confirmed: true,
    legacy: ['wasp-control', 'hornet-control', 'yellowjacket-control', 'wasp-nest-removal'],
    problems: [
      { slug: 'wasp-nest-in-a-wall-void', title: 'A wasp nest inside a wall void' },
      { slug: 'yellowjackets-in-the-lawn', title: 'Yellowjackets nesting in the lawn' },
      { slug: 'bald-faced-hornet-nest-in-a-tree', title: 'A bald-faced hornet nest in a tree' },
    ],
  },
  {
    slug: 'bee-removal', name: 'Bee Control & Removal', short: 'Bees',
    category: 'stinging-flying', confirmed: true, legacy: ['bee-removal', 'bee-control'],
  },
  {
    slug: 'fly-control', name: 'Fly Control', short: 'Flies',
    category: 'stinging-flying', confirmed: true,
    legacy: ['fly-control', 'gnat-control', 'fruit-fly-control', 'cluster-fly-control', 'drain-fly-control', 'house-fly-control'],
    problems: [
      { slug: 'cluster-flies-in-upstairs-windows', title: 'Cluster flies in the upstairs windows' },
      { slug: 'fungus-gnats-in-houseplants', title: 'Fungus gnats in houseplants' },
    ],
  },
  {
    slug: 'mosquito-control', name: 'Mosquito Control', short: 'Mosquitoes',
    category: 'stinging-flying', confirmed: false, legacy: ['mosquito-control'],
  },

  /* ---------------- household ---------------- */
  {
    slug: 'ant-control', name: 'Ant & Carpenter Ant Control', short: 'Ants',
    category: 'household', confirmed: true,
    legacy: ['ant-control', 'carpenter-ant-control', 'moisture-ant-control', 'odorous-house-ant-control'],
    problems: [
      { slug: 'carpenter-ants-in-a-window-frame', title: 'Carpenter ants in a window frame' },
      { slug: 'sawdust-piles-below-the-trim', title: 'Sawdust piles below the trim' },
      { slug: 'ant-trails-across-the-kitchen-counter', title: 'Ant trails across the kitchen counter' },
      { slug: 'moisture-ants-mean-a-water-problem', title: 'Moisture ants mean a water problem' },
    ],
  },
  {
    slug: 'spider-control', name: 'Spider Control', short: 'Spiders',
    category: 'household', confirmed: true,
    legacy: ['spider-control', 'hobo-spider-control', 'giant-house-spider-control'],
    problems: [
      { slug: 'is-this-a-hobo-spider', title: 'Is this a hobo spider?' },
      { slug: 'spiders-appearing-every-fall', title: 'Spiders appearing every fall' },
    ],
  },
  {
    slug: 'bed-bug-control', name: 'Bed Bug Control', short: 'Bed bugs',
    category: 'household', confirmed: true,
    legacy: ['bed-bug-control', 'bed-bug-treatment', 'bed-bug-heat-treatment'],
    problems: [
      { slug: 'bites-but-no-bugs-found', title: 'Bites, but no bugs found' },
      { slug: 'bed-bugs-in-a-student-rental', title: 'Bed bugs in a student rental' },
      { slug: 'bed-bugs-after-a-trip', title: 'Bed bugs after a trip' },
    ],
  },
  {
    slug: 'cockroach-control', name: 'Cockroach Control', short: 'Roaches',
    category: 'household', confirmed: true, legacy: ['cockroach-control', 'roach-control', 'german-cockroach-control', 'american-cockroach-control'],
  },
  {
    slug: 'flea-control', name: 'Flea Control', short: 'Fleas',
    category: 'household', confirmed: true, legacy: ['flea-control', 'flea-exterminator'],
  },
  {
    slug: 'silverfish-control', name: 'Silverfish Control', short: 'Silverfish',
    category: 'household', confirmed: true, legacy: ['silverfish-control'],
  },
  {
    slug: 'earwig-control', name: 'Earwig Control', short: 'Earwigs',
    category: 'household', confirmed: true, legacy: ['earwig-control', 'pillbug-control', 'sowbug-control'],
  },
  {
    slug: 'stink-bug-control', name: 'Stink Bug & Boxelder Bug Control', short: 'Overwintering bugs',
    category: 'household', confirmed: true,
    legacy: ['stink-bug-control', 'boxelder-bug-control', 'overwintering-pest-control', 'stink-bug-control-services', 'lady-bug-asian-lady-beetle-control'],
    problems: [{ slug: 'bugs-on-the-south-wall-every-october', title: 'Bugs on the south wall every October' }],
  },
  {
    slug: 'beetle-control', name: 'Beetle & Pantry Pest Control', short: 'Beetles',
    category: 'household', confirmed: true,
    legacy: ['beetle-control', 'carpet-beetle-control', 'pantry-pest-control', 'ground-beetle-control', 'carpet-beetle-clothes-moth-control'],
  },
  {
    slug: 'moth-control', name: 'Moth Control', short: 'Moths',
    category: 'household', confirmed: true, legacy: ['moth-control', 'clothes-moth-control'],
  },
  {
    slug: 'centipede-control', name: 'Centipede & Millipede Control', short: 'Centipedes',
    category: 'household', confirmed: true, legacy: ['centipede-control', 'millipede-control'],
  },

  /* ---------------- structural ---------------- */
  {
    /* The escrow/real-estate lane. We do NOT inspect — a licensed structural
       pest inspector does that and issues the report. We hold the PCO
       Structural category, which is what authorizes the TREATMENT of what
       their report found. See business.canTreatWdo and harness check 2c;
       every sentence on this page using a regulated inspection term must
       attribute it to the third-party inspector. */
    slug: 'wdo-treatment', name: 'WDO Treatment for Real Estate Transactions', short: 'WDO treatment',
    category: 'structural', confirmed: true,
    legacy: [],
  },
  {
    slug: 'termite-control', name: 'Termite & Wood-Destroying Pest Control', short: 'Termites',
    category: 'structural', confirmed: true,
    legacy: ['termite-control', 'dampwood-termite-control', 'wood-destroying-pest-control'],
    problems: [
      { slug: 'soft-wood-around-a-window-sill', title: 'Soft wood around a window sill' },
      { slug: 'dampwood-termites-in-a-crawlspace', title: 'Dampwood termites in a crawlspace' },
    ],
  },
  {
    slug: 'carpenter-bee-control', name: 'Wood-Boring Bee & Beetle Control', short: 'Wood borers',
    category: 'structural', confirmed: true,
    legacy: ['carpenter-bee-control', 'wood-boring-beetle-control', 'powderpost-beetle-control'],
  },

  /* ---------------- exclusion & repair ---------------- */
  {
    slug: 'exclusion-and-repairs', name: 'Pest Exclusion & Repairs', short: 'Exclusion',
    category: 'exclusion', confirmed: true,
    legacy: ['repairs', 'pest-exclusion', 'crawlspace-repair', 'exclusion-services'],
    problems: [
      { slug: 'sealing-a-quarter-inch-foundation-gap', title: 'Sealing a quarter-inch foundation gap' },
      { slug: 'crawlspace-vent-screening', title: 'Crawlspace vent screening' },
    ],
  },
  {
    slug: 'crawlspace-restoration', name: 'Crawlspace Cleanout & Restoration', short: 'Crawlspaces',
    category: 'exclusion', confirmed: true,
    legacy: ['crawlspace-cleanout', 'insulation-removal', 'attic-restoration'],
  },
  {
    slug: 'attic-insulation', name: 'Attic Insulation Removal & Replacement', short: 'Attics',
    category: 'exclusion', confirmed: true, legacy: ['attic-insulation', 'insulation-replacement'],
  },

  /* ---------------- programs & commercial ---------------- */
  {
    slug: 'home-protection-plan', name: 'Year-Round Home Protection Plan', short: 'Home plan',
    category: 'household', confirmed: true,
    legacy: ['home-protection-plan', 'quarterly-pest-control', 'pest-control-plans'],
  },
  {
    slug: 'commercial-pest-control', name: 'Commercial Pest Control', short: 'Commercial',
    category: 'commercial', confirmed: true,
    legacy: ['commercial-pest-control', 'commercial-services'],
  },
];

/* ------------------------------------------------------------------ *
 * Honest-refusal pages. Keystone Part 11 / Part 14: a vertical for work
 * the owner doesn't do is a liability. These turn two real service gaps
 * into trust assets rather than pretending the gap isn't there.
 * ------------------------------------------------------------------ */

/**
 * RETIRED SERVICES — owner decision 30 Aug 2026.
 *
 * Sasquatch is pest control and exclusion. Bird work and nuisance wildlife are
 * out of scope, and that includes bats and squirrels: bat work is wildlife
 * removal regardless of being exclusion-shaped, and squirrel work is wildlife
 * removal regardless of squirrels being rodents. The owner drew that line
 * explicitly rather than leaving it to judgment.
 *
 * These slugs are NOT deleted quietly. The old site ranked for several of
 * them, so every legacy URL 301s to the exclusion spoke — the closest live
 * equivalent — instead of 404ing. Keep this list; it is the only record of
 * what those URLs used to be.
 */
export const RETIRED_TO_EXCLUSION = ['bat-exclusion', 'bat-removal', 'bird-control', 'bird-exclusion', 'bird-netting', 'bird-spikes', 'nuisance-wildlife', 'opossum-removal', 'pigeon-control', 'raccoon-removal', 'squirrel-control', 'squirrel-removal', 'wildlife-control'] as const;

/**
 * PESTS WITH NO SPOKE OF THEIR OWN — legacy service URLs discovered in the
 * live sitemap on 31 Aug 2026 that have no equivalent among the 23 live
 * spokes, because Sasquatch does not sell a named service for them.
 *
 * Crickets, springtails and ticks are occasional-invader work absorbed into a
 * general visit rather than sold as a product; mosquito control is not offered
 * at all. None of them justifies a spoke, and none of them should 404 either —
 * the old site ranked for some of these terms.
 *
 * They 301 to the pest library, which is the honest destination: it tells the
 * visitor what the insect is and how we would actually handle it, without
 * implying a service line that does not exist. Do not promote one of these to
 * a spoke without the owner confirming it is work we sell.
 */
export const RETIRED_TO_LIBRARY = ['cricket-control', 'springtail-control', 'tick-control', 'mosquito-control', 'mosquito-control-services'] as const;

export const refusals = [
  {
    slug: 'mole-control',
    title: 'Why we won\'t sell you mole trapping',
    /* The Washington AGO concluded scissor-jaw and harpoon mole traps are
       prohibited body-gripping traps under I-713 (RCW 77.15.192–.194) —
       unusable even under permit. Two local competitors advertise mole
       service anyway. VERIFY the current statutory text and the AGO
       opinion citation before this page publishes. */
    basis: 'RCW 77.15.192–.194 (Initiative 713); Washington AGO opinion',
    verifyBeforePublish: true,
  },
  {
    slug: 'k9-bed-bug-detection',
    title: 'Canine bed bug detection — who we refer it to',
    /* Brand wall: K9 detection belongs to Coastal K9 and Guardian, never
       Sasquatch. Keystone Part 14: site separation is absolute. This page
       explains the referral WITHOUT cross-linking the K9 brands. */
    basis: 'Portfolio brand separation — no K9 content on Sasquatch',
    verifyBeforePublish: false,
  },
] as const;

export const categories = {
  'rodents-birds': 'Rodent Control & Exclusion',
  'stinging-flying': 'Stinging & Flying Insects',
  household: 'Household Bugs & Insects',
  structural: 'Termite & Structural Pests',
  exclusion: 'Exclusion, Repairs & Restoration',
  commercial: 'Commercial Pest Control',
} as const;

export const liveServices = () => services.filter((s) => s.confirmed);
export const serviceBySlug = (slug: string) => services.find((s) => s.slug === slug);
