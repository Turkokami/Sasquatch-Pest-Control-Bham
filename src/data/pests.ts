/**
 * The pest library enumeration — the single source of truth for which species
 * this site claims live here.
 *
 * It used to be a literal array inside `src/pages/pest-library/index.astro`.
 * Moving it here is not tidying. The recurring defect in this codebase is one
 * list existing in two places and drifting, and the moment a profile page got
 * its own route the hub's inline array became the second copy — the hub would
 * have gone on naming a species after its profile was renamed, or gone on
 * omitting one that had been written.
 *
 * The rule this file encodes: a species is in the library if and only if it is
 * in this array. The hub renders from it, the routes are generated from the
 * profiles that exist, and `libraryStatus()` reports the difference.
 *
 * INCLUSION STANDARD, and it is the whole point of the page: a species appears
 * here only if we would expect to find it on a Whatcom County job. No fire
 * ants, no Formosan termites, no brown recluse, no black widow. Every one of
 * those appears on Pacific Northwest pest sites copied from national
 * templates, and every appearance makes the site slightly less trustworthy.
 * Adding a species here is a claim that it lives in this county — treat it as
 * one.
 */

export type PestGroupKey =
  | 'ants'
  | 'rodents'
  | 'spiders'
  | 'stinging'
  | 'structural'
  | 'invaders'
  | 'fabric-pantry'
  | 'biting';

export interface PestGroup {
  key: PestGroupKey;
  name: string;
  /** One line on the hub, above the group's species. */
  blurb: string;
}

export interface Pest {
  slug: string;
  /** Common name as a customer would say it. */
  name: string;
  /** Binomial. Empty string where the profile covers a genus or a group. */
  scientific: string;
  group: PestGroupKey;
}

export const PEST_GROUPS: PestGroup[] = [
  {
    key: 'ants',
    name: 'Ants',
    blurb:
      'The single biggest source of calls here, and the group where identification changes the answer most — a carpenter ant and a moisture ant call for genuinely different responses.',
  },
  {
    key: 'rodents',
    name: 'Rodents',
    blurb:
      'Crawlspaces, attics and wall voids — and, in the vole’s case, the lawn rather than the building at all. The species decides where they travel, what they will do to insulation and wiring, and whether this is our work.',
  },
  {
    key: 'spiders',
    name: 'Spiders',
    blurb:
      'Mostly harmless, routinely misidentified, and the group where the honest answer is most often that no treatment is warranted.',
  },
  {
    key: 'stinging',
    name: 'Stinging insects',
    blurb:
      'Wasps, hornets and bees. Two of these we treat, and two we will not — the difference is on each profile.',
  },
  {
    key: 'structural',
    name: 'Structural pests',
    blurb:
      'The organisms that damage the building itself. Nearly all of them here are following moisture rather than attacking sound wood.',
  },
  {
    key: 'invaders',
    name: 'Occasional invaders',
    blurb:
      'Seasonal arrivals that come in, do nothing, and leave. Most of this group is a caulking job rather than a treatment.',
  },
  {
    key: 'fabric-pantry',
    name: 'Fabric and pantry pests',
    blurb:
      'The ones that arrive inside something you bought. Finding the source matters more than treating the room.',
  },
  {
    key: 'biting',
    name: 'Biting pests',
    blurb:
      'The group people most want a fast answer on, and the group where a wrong identification costs the most.',
  },
];

export const PESTS: Pest[] = [
  /* Ants */
  { slug: 'carpenter-ant', name: 'Carpenter ant', scientific: 'Camponotus modoc', group: 'ants' },
  { slug: 'moisture-ant', name: 'Moisture ant', scientific: 'Lasius spp.', group: 'ants' },
  { slug: 'odorous-house-ant', name: 'Odorous house ant', scientific: 'Tapinoma sessile', group: 'ants' },
  { slug: 'pavement-ant', name: 'Pavement ant', scientific: 'Tetramorium immigrans', group: 'ants' },
  { slug: 'velvety-tree-ant', name: 'Velvety tree ant', scientific: 'Liometopum occidentale', group: 'ants' },

  /* Rodents */
  { slug: 'norway-rat', name: 'Norway rat', scientific: 'Rattus norvegicus', group: 'rodents' },
  { slug: 'roof-rat', name: 'Roof rat', scientific: 'Rattus rattus', group: 'rodents' },
  { slug: 'house-mouse', name: 'House mouse', scientific: 'Mus musculus', group: 'rodents' },
  { slug: 'deer-mouse', name: 'Deer mouse', scientific: 'Peromyscus maniculatus', group: 'rodents' },
  { slug: 'vole', name: 'Vole', scientific: 'Microtus spp.', group: 'rodents' },

  /* Spiders */
  { slug: 'giant-house-spider', name: 'Giant house spider', scientific: 'Eratigena duellica', group: 'spiders' },
  { slug: 'hobo-spider', name: 'Hobo spider', scientific: 'Eratigena agrestis', group: 'spiders' },
  { slug: 'cross-orbweaver', name: 'Cross orbweaver', scientific: 'Araneus diadematus', group: 'spiders' },
  { slug: 'cellar-spider', name: 'Cellar spider', scientific: 'Pholcus phalangioides', group: 'spiders' },
  { slug: 'yellow-sac-spider', name: 'Yellow sac spider', scientific: 'Cheiracanthium spp.', group: 'spiders' },

  /* Stinging insects */
  { slug: 'bald-faced-hornet', name: 'Bald-faced hornet', scientific: 'Dolichovespula maculata', group: 'stinging' },
  { slug: 'european-paper-wasp', name: 'European paper wasp', scientific: 'Polistes dominula', group: 'stinging' },
  { slug: 'western-yellowjacket', name: 'Western yellowjacket', scientific: 'Vespula pensylvanica', group: 'stinging' },
  { slug: 'aerial-yellowjacket', name: 'Aerial yellowjacket', scientific: 'Dolichovespula arenaria', group: 'stinging' },
  { slug: 'honey-bee', name: 'Honey bee', scientific: 'Apis mellifera', group: 'stinging' },
  { slug: 'bumble-bee', name: 'Bumble bee', scientific: 'Bombus spp.', group: 'stinging' },

  /* Structural */
  { slug: 'pacific-dampwood-termite', name: 'Pacific dampwood termite', scientific: 'Zootermopsis angusticollis', group: 'structural' },
  { slug: 'anobiid-powderpost-beetle', name: 'Anobiid powderpost beetle', scientific: 'Hemicoelus gibbicollis', group: 'structural' },
  { slug: 'carpenter-bee', name: 'Carpenter bee', scientific: 'Xylocopa spp.', group: 'structural' },
  { slug: 'wood-boring-weevil', name: 'Wood-boring weevil', scientific: 'Euophryum confine', group: 'structural' },

  /* Occasional invaders */
  { slug: 'cluster-fly', name: 'Cluster fly', scientific: 'Pollenia spp.', group: 'invaders' },
  { slug: 'boxelder-bug', name: 'Boxelder bug', scientific: 'Boisea rubrolineata', group: 'invaders' },
  { slug: 'western-conifer-seed-bug', name: 'Western conifer seed bug', scientific: 'Leptoglossus occidentalis', group: 'invaders' },
  { slug: 'brown-marmorated-stink-bug', name: 'Brown marmorated stink bug', scientific: 'Halyomorpha halys', group: 'invaders' },
  { slug: 'silverfish', name: 'Silverfish', scientific: 'Lepisma saccharinum', group: 'invaders' },
  { slug: 'earwig', name: 'European earwig', scientific: 'Forficula auricularia', group: 'invaders' },
  { slug: 'pillbug', name: 'Pillbug', scientific: 'Armadillidium vulgare', group: 'invaders' },
  { slug: 'millipede', name: 'Millipede', scientific: '', group: 'invaders' },

  /* Fabric and pantry */
  { slug: 'webbing-clothes-moth', name: 'Webbing clothes moth', scientific: 'Tineola bisselliella', group: 'fabric-pantry' },
  { slug: 'carpet-beetle', name: 'Carpet beetle', scientific: 'Anthrenus spp.', group: 'fabric-pantry' },
  { slug: 'indianmeal-moth', name: 'Indianmeal moth', scientific: 'Plodia interpunctella', group: 'fabric-pantry' },
  { slug: 'sawtoothed-grain-beetle', name: 'Sawtoothed grain beetle', scientific: 'Oryzaephilus surinamensis', group: 'fabric-pantry' },

  /* Biting */
  { slug: 'bed-bug', name: 'Bed bug', scientific: 'Cimex lectularius', group: 'biting' },
  { slug: 'cat-flea', name: 'Cat flea', scientific: 'Ctenocephalides felis', group: 'biting' },
  { slug: 'rodent-mite', name: 'Rodent mite', scientific: 'Liponyssoides sanguineus', group: 'biting' },
  { slug: 'western-black-legged-tick', name: 'Western black-legged tick', scientific: 'Ixodes pacificus', group: 'biting' },
];

/* Fail loudly at build time rather than shipping two species on one URL. */
const seen = new Set<string>();
for (const p of PESTS) {
  if (seen.has(p.slug)) throw new Error(`duplicate pest slug: ${p.slug}`);
  seen.add(p.slug);
  if (!PEST_GROUPS.some((g) => g.key === p.group)) {
    throw new Error(`${p.slug} is in group "${p.group}", which is not declared in PEST_GROUPS`);
  }
}

export const pestsInGroup = (key: PestGroupKey): Pest[] => PESTS.filter((p) => p.group === key);
export const pestBySlug = (slug: string): Pest | undefined => PESTS.find((p) => p.slug === slug);
