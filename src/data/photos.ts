/* --------------------------------------------------------------------------
 * JOB PHOTOS, BY THE PAGE THEY ILLUSTRATE.
 *
 * WHERE THESE CAME FROM. The company's WordPress media library, which holds
 * 1,293 images and which the rebuild had been ignoring — the new site shipped
 * with 27 images across 207 pages, and every service page had none. These were
 * pulled from that library on 2 Sep 2026, de-duplicated perceptually, filtered
 * to the ones large enough to print at page width, then picked by eye.
 *
 * WHY THE FILENAMES LOOK LIKE THIS. The originals were named by a migration —
 * `Pest-Control-Mt-Vernon-WA-7-scaled.jpg`, `Exterminator-Bellingham-22`.
 *
 * DO NOT TRUST THE TOWN IN THOSE NAMES. An earlier version of this note said
 * it was real and worth keeping. It is not: the `Lynden` set includes open
 * saltwater with islands, and Lynden is inland farmland. The names were
 * generated for search, not recorded on site, so the town is a keyword rather
 * than a fact. The library's own alt text says "in Whatcom County" and never
 * names a town, which is the giveaway. Anything added since 2 Sep 2026 is
 * captioned to the county unless the photograph itself corroborates the town.
 * Each file is
 * renamed to describe what the photograph actually shows, in the order a
 * reader would say it, ending in the town where the work happened. A filename
 * is a weak ranking signal on its own and a strong one in combination with an
 * alt attribute and a page about the same thing, which is the combination
 * these have.
 *
 * ALT TEXT IS NOT THE CAPTION AND THEY DO NOT SAY THE SAME THING. The alt
 * describes the photograph for somebody who cannot see it. The caption adds
 * what the photograph cannot show on its own — usually the town, and what the
 * thing in frame means. Writing one and copying it into the other wastes the
 * caption and makes the alt read like marketing.
 *
 * WORDING. Captions are content, not chrome, so they are NOT marked
 * data-boilerplate and they do count toward the page's word floor. They are
 * also subject to harness check 2c: none of them may use a term from
 * INSPECTION_CLAIMS in src/lib/seo.ts. "We found", "documented", "sealed" are
 * all fine. "Inspection report" is not, and neither is any WDO phrasing.
 * ------------------------------------------------------------------------ */

export interface Photo {
  /** Path under /public. Missing file fails the build, by design. */
  file: string;
  /** For a reader who cannot see it. Describes the photograph, not the offer. */
  alt: string;
  /** Rendered under the image. Adds the place and the meaning. */
  caption: string;
}

/** Keyed by service slug — the same slugs src/data/services.ts owns. */
export const servicePhotos: Record<string, Photo> = {
  'wasp-control': {
    file: '/img/work/hornet-nest-removed-bellingham-wa.jpg',
    alt: 'A large gray papery hornet nest, roughly the size of a basketball, resting in the bed of a pickup truck after removal',
    /* SOFTENED 2 Sep 2026, on the same principle as the Sumas correction. This
       said "bald-faced hornet" — a species. The library's own alt says only "a
       large paper hornet nest", so the species was this build's addition, not
       the source's. Having already resolved one vague nest the wrong way, the
       honest move is to describe what is visibly true — a large enclosed
       aerial nest — and let the owner name the species if he wants it named. */
    caption:
      'A hornet nest taken down intact in Bellingham, and about as big as they get here. A nest this size is a season’s work by a colony that started from a single queen in spring, which is why the same eave can look clear in May and carry this by August.',
  },
  'rodent-control': {
    file: '/img/work/rodent-tunneling-blown-in-attic-insulation-sumas-wa.jpg',
    alt: 'Blown-in attic insulation with runs and tunnels pushed through it, photographed by torchlight',
    caption:
      'Rodent runs pushed through blown-in attic insulation at a home in Sumas. Tunneling like this is usually the first thing found above a ceiling where somebody has been hearing movement at night.',
  },
  'crawlspace-restoration': {
    file: '/img/work/technician-headlamp-crawlspace-burlington-wa.jpg',
    alt: 'A technician in a respirator working by headlamp in a dark crawlspace beneath a house',
    caption:
      'Working by headlamp under a house in Burlington. Most of what decides a crawlspace job — where they are getting in, what the insulation is doing, whether the vapor barrier is intact — can only be settled from down here.',
  },
  'exclusion-and-repairs': {
    file: '/img/work/crawlspace-foundation-gap-rodent-entry-mount-vernon-wa.jpg',
    alt: 'A gap where a crawlspace foundation meets the framing above it, with insulation and vapor barrier visible around the opening',
    caption:
      'An open gap at the foundation line of a home in Mount Vernon. A quarter of an inch is enough for a mouse, and sealing openings like this is what stops the problem coming back after the trapping is done.',
  },
  'commercial-pest-control': {
    file: '/img/work/scissor-lift-bird-exclusion-commercial-building.jpg',
    alt: 'A JCB scissor lift raised against the exterior of a commercial building, positioned for bird exclusion work at height',
    caption:
      'Bird exclusion on a commercial building, worked from a scissor lift. Commercial jobs are usually decided by access and documentation rather than by the treatment itself.',
  },
  'attic-insulation': {
    file: '/img/work/screened-gable-attic-vent-whatcom-county-wa.jpg',
    alt: 'A gable attic vent fitted with dark mesh screening, with a ladder leaning against the shingled gable below it',
    caption:
      'A gable vent screened from the outside. This is the cheap half of an attic job and the half most often skipped — new insulation blown in under an unscreened vent is material bought for whatever moves in next.',
  },
  'spider-control': {
    file: '/img/work/spider-cluster-on-glass-whatcom-county-wa.jpg',
    alt: 'Dozens of small spiders spread across a reflective glass surface with trees mirrored behind them',
    caption:
      'Not a trick of the light — that is one surface on one property. Autumn is when spiders become visible rather than when they arrive, and the ones people find alarming are almost always the harmless ones.',
  },
  'ant-control': {
    file: '/img/work/carpenter-ant-close-up-whatcom-county-wa.jpg',
    alt: 'A close-up of a large dark ant on a pale painted surface, its head and thorax clearly visible',
    caption:
      'A carpenter ant, close enough to see why size alone is a poor guide. Carpenter ants are the ones that damage the building, but odorous house ants are what most homes here actually have, and the treatments are opposite.',
  },
  'bee-removal': {
    file: '/img/work/bumblebee-close-up-whatcom-county-wa.jpg',
    alt: 'A close-up photograph of a bumblebee on a pale surface, its yellow and black banding clearly visible',
    caption:
      'A bumblebee, photographed in Whatcom County. Bumblebees are pollinators and are not treated as a pest — telling one from a yellowjacket is most of what decides whether a nest needs anything done at all.',
  },

  /* ADDED 2 Sep 2026. The four below close the gap between the nine service
     pages that had a photograph and the twenty-three that exist. They are NOT
     the fourteen that were missing — ten of those stay empty on purpose. The
     library is a working record of jobs, so it is deep in crawlspaces,
     exclusion and rodents and has nothing at all for silverfish, centipedes,
     earwigs, moths, fleas or flies. A page with no photograph renders without
     one; it does not borrow a stock insect. */

  /* ADDED 3 Sep 2026 from the owner's own photographs, delivered named. Four
     of the ten service pages that had nothing. The archive could not supply
     any of these — there is no bed bug, no fly, no carpet beetle and no
     pre-construction shot anywhere in 1,293 images — so this is new material
     rather than a better search. */

  'bed-bug-control': {
    file: '/img/work/bed-bugs-and-spotting-on-a-mattress-seam-whatcom-county-wa.jpg',
    alt: 'A folded mattress seam with several bed bugs along it and dark fecal spotting worked into the fabric',
    caption:
      'The seam is where to look first, and the spotting matters more than the insects. Live bugs move and hide; the dark marks worked into the fabric stay, which is why a seam like this can confirm an infestation on a night when nothing is out.',
  },
  'fly-control': {
    file: '/img/work/small-flies-gathered-on-a-sink-whatcom-county-wa.jpg',
    alt: 'Several small flies resting on the white porcelain of a sink basin near the drain',
    caption:
      'Small flies gathered at a sink. When they concentrate on one fixture the breeding site is almost always in the drain rather than in the room — a film of organic material inside the pipe, which is why cleaning the counter changes nothing and cleaning the drain ends it.',
  },
  'beetle-control': {
    file: '/img/work/varied-carpet-beetles-clustered-on-a-wall-whatcom-county-wa.jpg',
    alt: 'Dozens of small mottled brown and cream beetles gathered along a painted wall corner',
    caption:
      'Varied carpet beetles massed on a wall. Adults head for light and windows, which is where people find them, but they do no damage at all — the feeding is done by larvae somewhere darker, on wool, hair, feathers or a dead insect in a wall void. Find that and the job is over.',
  },
  'termite-control': {
    file: '/img/work/pre-construction-soil-treatment-at-a-commercial-site-whatcom-county-wa.jpg',
    alt: 'A technician with a backpack sprayer treating soil inside timber foundation forms on a commercial building site under a clear sky',
    caption:
      'Treating the soil inside the forms before a slab goes down on a commercial building. This is the cheapest wood-destroying-organism work that will ever be done on that structure, and the only chance to put a barrier where the building will sit rather than around it afterwards.',
  },
  'wdo-treatment': {
    file: '/img/work/wood-boring-beetle-exit-holes-and-frass-whatcom-county-wa.jpg',
    alt: 'A length of milled wood lying on plastic sheeting, its face covered in small round exit holes, with piles of powdery frass fallen beneath it',
    /* NOT named to species. The holes and the frass are consistent with
       powderpost beetle and the owner has described one such job, but lyctids,
       anobiids and old house borer are not separable from a photograph, and
       this page is read by people who are about to close on a house. */
    caption:
      'Wood-boring beetle exit holes in a member pulled from a Whatcom County home. Every hole is one adult that has already chewed its way out, so what you can count on the surface describes a previous generation rather than what is still working inside the wood.',
  },
  'cockroach-control': {
    file: '/img/work/cockroach-fecal-spotting-in-a-cabinet-corner-whatcom-county-wa.jpg',
    alt: 'The inside corner of a white cabinet, its base and lower walls covered in dense brown speckling, with a few dead insects along the joint',
    caption:
      'Spotting built up in the corner of a cabinet. The staining is the useful evidence on a cockroach job, because it accumulates where the insects rest rather than where they travel — a corner like this tells you where they are living when nothing is moving.',
  },
  'stink-bug-control': {
    file: '/img/work/stink-bug-on-a-window-frame-whatcom-county-wa.jpg',
    alt: 'A brown shield-shaped stink bug clinging to the underside of a wooden window frame rail, with glass and a blurred interior below it',
    caption:
      'A stink bug on the frame of a window at a Whatcom County home. The window is where most households first notice them, because the frame is the warm gap they were already working along when the wall got cold.',
  },
  'home-protection-plan': {
    file: '/img/work/technician-treating-a-home-exterior-in-autumn-whatcom-county-wa.jpg',
    alt: 'A technician kneeling with equipment beside the deck of a house in low autumn sunlight, with fallen leaves across the boards',
    caption:
      'A visit in late autumn. What a visit is for changes with the month, and this one is about the perimeter and the gaps before the cold starts pushing rodents toward the building — which is a different job from the one that matters in July.',
  },
};

/* --------------------------------------------------------------------------
 * LOCATION PHOTOS — one per town, and the town is not decoration.
 *
 * The filenames in the old media library encode where the work happened —
 * `Pest-Control-Mt-Vernon-WA-7`, `Exterminator-Sudden-Valley-WA-18`. 530 of
 * the 863 page-grade photographs carry a town that way, across sixteen towns.
 * That is the piece of local context nobody could have supplied from memory,
 * and it is what makes these photographs worth more on a place page than any
 * stock image: the photograph on the Lynden page was taken in Lynden.
 *
 * WHAT GETS PICKED. A place page is answering "do you work where I live", so
 * these lean towards the work in its setting — a technician at a house, a
 * wrapped truck in a driveway, a vent in a wall — rather than the macro shots
 * of insulation and foundation gaps that belong on the service pages. The
 * detail shots are better evidence; these are better answers to the question
 * the reader arrived with.
 *
 * WHAT IS DELIBERATELY MISSING, and it should stay missing until there are
 * photographs to fix it:
 *   - Alger and Birch Bay have no photographs carrying their name. No entry.
 *   - The eleven Bellingham NEIGHBORHOOD pages resolve only to "Bellingham" in
 *     the filenames, so there is no way to tell an Edgemoor photograph from a
 *     Cordata one. Putting the same city photograph on eleven neighborhood
 *     pages would be worse than putting none there: it is the duplication this
 *     codebase keeps having to undo, and a reader who visits two of them sees
 *     the trick immediately. They render without a photograph.
 *   - Skagit County covers too much ground for one photograph to be honest
 *     about, and nothing in the library is specifically of it. Whatcom County
 *     is the exception below: Mount Baker is IN Whatcom County, so a truck in
 *     the snow beneath it is a picture of the county rather than a stand-in
 *     for it. That photograph was already in the repository and had never been
 *     referenced by any page.
 * ------------------------------------------------------------------------ */

/** Keyed by the town's route segment under /locations/. */
export const locationPhotos: Record<string, Photo> = {
  /* SEVEN MORE, 3 Sep 2026, owner-supplied and named to the town in the
     filename by the person who took them. That is the difference between
     these and the archive: the towns in the WordPress filenames were
     generated for search and are demonstrably wrong, and these are not. Every
     town below now shows a photograph taken in it rather than the crew
     fallback. */
  deming: {
    file: '/img/work/service-truck-on-a-forest-road-deming-wa.jpg',
    alt: 'A wrapped service truck parked on a gravel road under tall moss-hung conifers',
    caption:
      'On a forest road at Deming. This is the ground that makes the carpenter ant season here what it is — every one of those trees is a possible parent colony, and the buildings are in among them.',
  },
  custer: {
    file: '/img/work/service-truck-at-a-property-custer-wa.jpg',
    alt: 'A wrapped service truck parked on a driveway beside a large detached garage with tall firs behind it',
    caption:
      'At a property outside Custer. The outbuilding is the point: on acreage here the shop or the barn takes the rodent pressure first and the house second, so the whole site is the job.',
  },
  alger: {
    file: '/img/work/service-truck-by-the-water-alger-wa.jpg',
    alt: 'A wrapped service truck parked at the edge of a lake with forested hills across the water',
    caption:
      'Above the water at Alger, at the north end of Skagit County. Everything down here is worked out of Bellingham on the same routes as the Whatcom towns.',
  },
  lynden: {
    file: '/img/work/service-van-at-a-home-lynden-wa.jpg',
    alt: 'A wrapped service van parked on the gravel drive of a blue single-story home under an autumn sky',
    caption:
      'At a house in Lynden. Most of the residential work in this town is ordinary and seasonal — ants in spring, wasps by August, and rodents once the farm ground either side of the city is cut.',
  },
  bow: {
    file: '/img/work/service-van-at-sunrise-bow-wa.jpg',
    alt: 'A wrapped service van parked on a farm track at sunrise beside a red barn and outbuildings',
    caption:
      'First call of the day at a farm near Bow. Agricultural accounts run on the grower’s calendar rather than ours, which in practice means early and planned around whatever else is happening that week.',
  },
  bellingham: {
    file: '/img/work/service-truck-at-lake-padden-bellingham-wa.jpg',
    alt: 'A wrapped service truck parked at a lakeside lot with forest and low cloud across the water',
    caption:
      'At Lake Padden, on the south side of the city. Bellingham is not one job — the greenbelt edges like this one produce rodent and spider pressure that the flat, older streets in the center do not.',
  },
  bellingham: {
    file: '/img/work/pest-control-technician-working-at-a-home-bellingham-wa.jpg',
    alt: 'A pest control technician kneeling to work at the base of a house wall beside a deck, low sun coming through the trees behind',
    caption:
      'Working the exterior of a home in Bellingham. Most of a residential visit is spent along this line — where the siding meets the foundation, and where a deck or a porch makes it hard to see.',
  },
  ferndale: {
    file: '/img/work/sasquatch-pest-control-van-at-a-home-ferndale-wa.jpg',
    alt: 'A wrapped Sasquatch Pest Control van parked on a gravel driveway beside a blue house at sunset',
    caption:
      'On a driveway in Ferndale at the end of the day. Ferndale runs from town lots to acreage and outbuildings, and the two need different conversations.',
  },
  lynden: {
    file: '/img/work/pest-control-technician-with-sprayer-lynden-wa.jpg',
    alt: 'A pest control technician in a hard hat and headlamp standing beside wheeled sprayer equipment at the side of a red house',
    /* CORRECTED 2 Sep 2026. The caption here previously said this was rodent
       work and talked about grain and outbuildings, which was written from the
       town rather than from the photograph — Lynden is farm country, so farm
       work was assumed. The owner identified it: this is staging for a
       powderpost beetle treatment ahead of a wood-destroying organism job.
       Worth leaving the note, because inventing plausible context from a
       location is exactly the failure this site keeps having to correct. */
    caption:
      'Mixing up for a powderpost beetle treatment at a house in Lynden, ahead of a wood-destroying organism job. Somebody else identifies what is in the wood; the treatment is the half our WSDA Structural category covers.',
  },
  blaine: {
    /* SWAPPED 2 Sep 2026, owner: the previous photograph was a gable vent shot
       from the ground and it did not carry — technically on point and visually
       nothing. A picture on a page has to earn its space before it can teach
       anybody anything. */
    file: '/img/work/deer-sheltering-under-a-deck-blaine-wa.jpg',
    alt: 'A doe and a resting fawn sheltering in the shaded open space beneath a raised deck at a wooded property',
    caption:
      'A doe and fawn under a deck in Blaine. It is a nicer photograph than most of ours and it is also a pest finding: an under-deck void open enough for deer is open to everything smaller, and the space beneath a deck against a wall is the best harborage on most properties.',
  },
  everson: {
    file: '/img/work/sasquatch-pest-control-truck-driveway-everson-wa.jpg',
    alt: 'A wrapped Sasquatch Pest Control pickup truck parked on a driveway beside a garage during a service visit',
    caption:
      'On a service visit in Everson. Everson and the Nooksack valley around it are farm and river country, which keeps rodent and wildlife work steadier here than in town.',
  },
  sumas: {
    file: '/img/work/yellowjacket-nest-in-soffit-sumas-wa.jpg',
    alt: 'An enclosed papery yellowjacket nest tucked into the corner of a soffit under the eave of a house',
    /* CORRECTED 2 Sep 2026, owner: this is a yellowjacket nest and it was
       captioned as a paper wasp. Worth recording HOW that happened, because it
       is a different mistake from the Lynden one. The old media library's alt
       text hedged — "a wasp or yellow jacket nest" — and this build resolved
       the hedge rather than keeping it, and resolved it the wrong way. A
       source that declines to identify something is telling you it could not,
       and the honest options are to ask or to stay vague, not to pick.

       The file was renamed with it, since the species was in the filename. */
    caption:
      'A yellowjacket nest in a soffit corner in Sumas. The giveaway is that it is enclosed — yellowjackets and hornets wrap a nest in a papery envelope, while a paper wasp builds an open umbrella of visible cells. Enclosed nests are found late, because nothing shows from the ground until the colony is loud enough to hear.',
  },
  'sudden-valley': {
    file: '/img/work/pest-control-technicians-crawlspace-job-sudden-valley-wa.jpg',
    alt: 'Two pest control technicians in white protective suits standing beside their vans at a job site among trees',
    caption:
      'Suited up for a crawlspace job in Sudden Valley. Houses here are built into a wooded hillside, which means steep lots, deep crawlspaces and more contact with the trees than a flat lot has.',
  },
  'mount-vernon': {
    file: '/img/work/sasquatch-pest-control-van-in-a-driveway-mount-vernon-wa.jpg',
    alt: 'A wrapped Sasquatch Pest Control van parked on a wet driveway lined with tall evergreens',
    caption:
      'On a driveway in Mount Vernon. Skagit County work runs from valley farmland to town streets, and the two ends of that produce different problems in the same month.',
  },
  burlington: {
    file: '/img/work/technician-working-on-crawlspace-ductwork-burlington-wa.jpg',
    alt: 'A technician working by headlamp on flexible ductwork in a crawlspace beneath a house',
    caption:
      'Ductwork in a crawlspace in Burlington. Flexible duct is one of the first things rodents damage under a house, and torn duct is how a crawlspace problem becomes a heating bill.',
  },
  'sedro-woolley': {
    file: '/img/work/damaged-foundation-vent-screen-rodent-entry-sedro-woolley-wa.jpg',
    alt: 'A foundation vent set low in a wall with its screen bent and damaged, weeds growing across the opening',
    caption:
      'A damaged foundation vent in Sedro-Woolley. Vent screens rust and bend outward long before anybody notices, and weeds growing across them are why they go unchecked for years.',
  },
  bow: {
    file: '/img/work/sasquatch-pest-control-truck-on-a-forest-road-bow-wa.jpg',
    alt: 'A wrapped Sasquatch Pest Control pickup truck parked on a narrow forest road in dense green woodland',
    caption:
      'On a forest road near Bow. Properties out here sit against standing timber, and a building at the edge of the woods is treated as an edge rather than as a lot.',
  },
};

/** Whatcom County. See the note above on why this one county gets a photograph. */
export const whatcomCountyPhoto: Photo = {
  file: '/img/work/service-truck-mount-baker-snow.jpg',
  alt: 'A wrapped Sasquatch Pest Control pickup truck parked in deep snow among evergreens during heavy snowfall at Mount Baker',
  caption:
    'Above the snow line at Mount Baker, in the east of the county. Whatcom County runs from saltwater at Blaine to the mountains here, and the pest year at one end of that has little to do with the other.',
};

/** The /locations/ hub. Not a town, so it gets the vehicle rather than a place. */
export const locationsHubPhoto: Photo = {
  file: '/img/work/sasquatch-pest-control-van-custer-wa.jpg',
  alt: 'The side of a wrapped Sasquatch Pest Control van showing the company name, phone number and free estimates graphic',
  caption:
    'One of the vans that covers this service area. Everywhere listed below is worked out of Bellingham by the same crew — there is no franchise office in between.',
};

/* --------------------------------------------------------------------------
 * COMMERCIAL. Bird work is the strongest thing in the photo library and the
 * commercial pages had none of it. It is also the part of the offer that is
 * hardest to convey in prose: "we do bird exclusion" reads as a line item
 * until you see a scissor lift under a canopy, at which point it reads as a
 * capability a one-van operator does not have.
 * ------------------------------------------------------------------------ */

/** Near the top of /commercial/. Leads the hub, so it is not lazy-loaded. */
export const commercialHubPhoto: Photo = {
  file: '/img/work/bird-nest-built-on-installed-bird-spikes-whatcom-county-wa.jpg',
  alt: 'A bird nest built directly on top of a row of installed bird spikes on a concrete beam, with droppings streaking the ledge beneath it',
  caption:
    'Spikes on a commercial building with a nest built straight on top of them. Spikes are the most commonly specified bird deterrent here and the most commonly defeated one: once enough debris packs in between the points, the thing that was meant to deny the ledge becomes the platform that holds the nest.',
};

/** Lower on /commercial/, in the exclusion section, where it argues the point. */
export const commercialExclusionPhoto: Photo = {
  file: '/img/work/bird-exclusion-netting-over-a-concrete-opening-whatcom-county-wa.jpg',
  alt: 'Black bird netting tensioned on a steel perimeter cable and anchored into a concrete wall across a large opening',
  caption:
    'Netting closed across an opening on a commercial structure. Netting holds where spikes fail because it denies the volume rather than the surface, but it is only as good as its perimeter — a cable that is slack, or a corner anchored short, is an opening with a net near it.',
};

/** Keyed by industry slug — the slugs src/content/industries owns. */
export const industryPhotos: Record<string, Photo> = {
  'retail-and-grocery': {
    file: '/img/work/technician-on-a-scissor-lift-at-a-store-entrance-whatcom-county-wa.jpg',
    alt: 'A technician working from a raised scissor lift beneath the entrance canopy of a large store, with a colleague in a high-visibility vest and rows of shopping carts below',
    caption:
      'Working a store entrance canopy from a lift. The entrance is the hardest part of a grocery building to keep birds out of — it is warm, it is sheltered from weather on three sides, and the doors stand open all day — and it is also the one part of the building every customer walks under.',
  },
};

/**
 * THE CREW AND THE TRUCKS — the fallback for a town with no photograph of its
 * own, and the owner's call to stop it being buried on the About page.
 *
 * Only three of twenty-five town pages have a picture taken in that town, so
 * the other twenty-two were rendering the slot empty. A photograph of the
 * actual crew is the right thing to put there: it answers a version of the
 * same question the town photograph answers — who turns up — and it is the one
 * image on this site that a competitor cannot copy.
 *
 * THE CAPTION IS BUILT PER TOWN, in the route, and that is not decoration. A
 * fixed caption here would put the same sentence on twenty-two indexable
 * pages, and the harness fails any ten-word sentence appearing on three or
 * more. Naming the town makes each one both unique and truer.
 */
export const crewPhoto = {
  file: '/img/sasquatch-team-and-trucks.jpg',
  alt: 'The Sasquatch Pest Control crew standing in front of their wrapped truck and van at sunset, with the company name above them',
  caption: '',
} satisfies Photo;

/* --------------------------------------------------------------------------
 * SPECIES PHOTOGRAPHS, and there are five of them for forty-one pages.
 *
 * That ratio is the finding, not a shortfall in the search. Matching the
 * archive loosely — "spider" for giant house spider, "ant" for odorous house
 * ant — produced a match for thirty-two of the forty-one species, and every
 * one of those matches would have been a claim the photograph could not
 * support. A generic spider on a page whose whole job is telling a reader how
 * to tell one spider from another is worse than no photograph: the page
 * teaches identification and then illustrates itself with a counter-example.
 *
 * Matching strictly — the archive's own alt text must name the species — cut
 * thirty-two to eleven. Looking at those eleven cut it to five: three were
 * marketing graphics the strict pass forgot to filter, and two were nests
 * that cannot be told from a close relative in a photograph. The bald-faced
 * hornet candidate is the clearest case: a large gray enclosed aerial nest is
 * built by bald-faced hornets AND by aerial yellowjackets, and this site
 * already softened that exact identification once on the wasp page.
 *
 * TWO OF THE FIVE SHOW EVIDENCE RATHER THAN THE ANIMAL. Frass on a beam and
 * boring damage in a joist are legitimate on a species page — they are what a
 * reader will actually find — and both alts describe what is in the frame
 * without naming the insect, so the page supplies the species and the
 * photograph does not pretend to prove it.
 *
 * The other thirty-six need photographing. docs/IMAGE-WISHLIST.md carries the
 * list and what each shot needs to show.
 * ------------------------------------------------------------------------ */
export const speciesPhotos: Record<string, Photo> = {
  /* SIX MORE, 3 Sep 2026, all from the owner's own delivery and all named by
     him. That matters for two of them in particular. The bald-faced hornet is
     the identification this build softened twice, because a large gray
     enclosed aerial nest is also built by aerial yellowjackets and cannot be
     separated in a photograph — the owner naming the file settles it, which a
     migration's alt text never could. The odorous house ant is the same: OHA
     is his abbreviation, on his photograph, of a trail on his customer's
     siding. */
  'bald-faced-hornet': {
    file: '/img/pests/bald-faced-hornet.jpg',
    alt: 'A large gray papery enclosed hornet nest held up after removal, its layered outer envelope torn open on one side',
    caption:
      'A nest taken down whole. The enclosed gray envelope and the single entrance near the bottom are what separate this from the open comb a paper wasp builds — and it is why these are worth leaving to somebody in a suit, because there is no way to work on one without the whole colony knowing.',
  },
  'european-paper-wasp': {
    file: '/img/pests/european-paper-wasp.jpg',
    alt: 'A yellow and black wasp photographed close up on rough concrete, its long rear legs trailing behind it',
    caption:
      'The legs are the tell. A paper wasp lets its long rear legs hang and trail in flight, where a yellowjacket tucks them up tight against the body. At a distance the two look identical, and they need different handling.',
  },
  'odorous-house-ant': {
    file: '/img/pests/odorous-house-ant.jpg',
    alt: 'A line of very small dark ants running along the edge of a leaf that is touching painted lap siding',
    caption:
      'A trail crossing from a leaf onto the siding, which is exactly how most of them get in. Vegetation touching a wall is a bridge, and cutting that contact does more against this species than anything sprayed on the foundation.',
  },
  'carpet-beetle': {
    file: '/img/work/varied-carpet-beetles-clustered-on-a-wall-whatcom-county-wa.jpg',
    alt: 'Dozens of small mottled brown and cream beetles gathered along a painted wall corner',
    caption:
      'Varied carpet beetle adults, which are the harmless half of the species. The mottled cream and brown pattern is diagnostic, and finding this many together usually means a larval source within a few feet — often in a wall void rather than in anything on show.',
  },
  'bed-bug': {
    file: '/img/work/bed-bugs-and-spotting-on-a-mattress-seam-whatcom-county-wa.jpg',
    alt: 'A folded mattress seam with several bed bugs along it and dark fecal spotting worked into the fabric',
    caption:
      'What an actual find looks like, rather than an illustration of one. Flat, oval, reddish-brown and about the size of an apple pip, tucked into a seam, with the staining that gives them away when they are not visible.',
  },
  'bumble-bee': {
    file: '/img/pests/bumble-bee.jpg',
    alt: 'A bumble bee photographed close up on a pale concrete surface, its banded thorax and pollen-dusted legs clearly visible',
    caption:
      'A bumble bee at a Whatcom County property. Size and the dense coat are the two things that separate one of these from a honey bee at a glance, and neither is a reason to treat it — a bumble nest is small, annual, and gone by the first hard frost.',
  },
  earwig: {
    file: '/img/pests/earwig.jpg',
    alt: 'An earwig photographed close up on a dark surface, its rear forceps and long antennae clearly visible',
    caption:
      'The forceps are what everyone recognizes and they are also the least important thing about an earwig. What matters indoors is that it is a moisture animal: find the damp it came from and the population goes with it.',
  },
  'wood-boring-weevil': {
    file: '/img/pests/wood-boring-weevil.jpg',
    alt: 'A weevil on gravel photographed close up, its long snout and clubbed antennae clearly visible',
    caption:
      'The snout is diagnostic — no other beetle in a Whatcom County house has one like it. Weevils found indoors have almost always come in with something rather than emerged from the structure.',
  },
  'anobiid-powderpost-beetle': {
    file: '/img/pests/anobiid-powderpost-beetle.jpg',
    alt: 'Several cones of pale powdery frass fallen on a crawlspace floor around the base of a concrete pier',
    caption:
      'Frass cones on a crawlspace floor, dropped from the timber above. The cones are the useful part: powderpost frass is fine and flour-like and runs into a heap like this, where carpenter ant frass is fibrous and holds its shape. The two want different work.',
  },
  /* SWAPPED 3 Sep 2026 for the macro, owner-supplied. The frass shot is better
     evidence and a worse identification photograph, and this page's job is
     identification — a reader here is trying to work out what the insect on
     their windowsill is, not what a pile on a beam means. The frass is still
     doing that job on the problem page it belongs to. */
  'carpenter-ant': {
    file: '/img/pests/carpenter-ant-macro.jpg',
    alt: 'A large dark ant photographed head-on close up on a painted rail, its long elbowed antennae and single waist segment visible',
    caption:
      'The two things to look at are the waist and the back. A carpenter ant has one segment at the waist and an evenly curved upper body; the ants people confuse them with have two segments and an uneven back. Size alone does not settle it — a small carpenter ant worker is smaller than a large ant of another species.',
  },
};

/* --------------------------------------------------------------------------
 * PROBLEM PAGES. Keyed by the problem slug, which is unique across the site —
 * no service prefix needed, and the route asserts that if it ever stops being
 * true.
 *
 * Twenty-three problem pages, four photographs. Six had a plausible match in
 * the archive and two were rejected on looking at them, which is the whole
 * reason for looking:
 *
 *   The candidate for "rats in the crawlspace" is described by the library as
 *   droppings on a BLACK vapor barrier. The barrier in the photograph is
 *   blue, and no droppings are legible at page size. When a description and
 *   an image disagree, the image wins and the photograph is not used.
 *
 *   The candidate for "droppings in the kitchen" is exterior debris blown up
 *   against a garage door. On a page teaching somebody to recognize rodent
 *   droppings on a kitchen floor, that is not a near miss, it is a different
 *   subject.
 *
 * The rest of the problem tier is in docs/IMAGE-WISHLIST.md, and it is the
 * easiest photography on the list — each page describes one specific
 * situation, which means it already says what to shoot.
 * ------------------------------------------------------------------------ */
export const problemPhotos: Record<string, Photo> = {
  'sawdust-piles-below-the-trim': {
    file: '/img/work/carpenter-ant-frass-on-a-crawlspace-sill-whatcom-county-wa.jpg',
    alt: 'Pale fibrous debris banked along a wooden sill plate above a concrete foundation wall in a crawlspace, with more caught in the joint below it',
    caption:
      'Frass banked on a crawlspace sill rather than under interior trim, and it shows the thing this page turns on better than trim would: the material is fibrous and shredded rather than granular. That texture is what separates ants from beetles before anybody opens anything up.',
  },
  'crawlspace-vent-screening': {
    file: '/img/work/fabricated-metal-foundation-vent-screen-whatcom-county-wa.jpg',
    alt: 'A perforated metal screen in a folded steel frame fitted over a foundation vent opening, seen from outside at ground level',
    caption:
      'A vent cover cut and folded for one opening. The perforation is small enough to stop a mouse and open enough not to choke the ventilation the crawlspace needs, which is the whole difficulty — hardware cloth stapled over the outside solves the first problem and eventually rusts through.',
  },
  'sealing-a-quarter-inch-foundation-gap': {
    file: '/img/work/gap-around-a-plumbing-penetration-whatcom-county-wa.jpg',
    alt: 'A white plastic pipe passing through a concrete foundation wall with an open gap around it where the hole was cut oversize',
    caption:
      'A plumbing penetration cut oversize and never closed. This is the most common quarter-inch gap in a Whatcom County house, and it is usually found within a few feet of the water heater or the kitchen wall.',
  },
  'bald-faced-hornet-nest-in-a-tree': {
    file: '/img/work/bald-faced-hornet-nest-in-a-tree-whatcom-county-wa.jpg',
    alt: 'A gray papery enclosed hornet nest about the size of a football hanging among green leaves in a tree',
    caption:
      'A nest in a tree, where it is doing no harm to anybody. That is worth saying on this page, because a nest well away from a door or a path can often be left until the first hard frost kills the colony — the question is not whether it is there but whether anyone has to walk under it.',
  },
  'rats-in-the-crawlspace': {
    file: '/img/work/rodent-tracks-across-a-crawlspace-vapor-barrier-whatcom-county-wa.jpg',
    alt: 'Clear four-toed footprints and tail drag marks pressed into the dust on a plastic crawlspace vapor barrier',
    caption:
      'Tracks across the dust on a vapor barrier. This is the most useful thing in a crawlspace and the most often walked past: prints and a tail drag show the route, the direction and roughly the size, which is what decides where anything gets placed.',
  },
  'carpenter-ants-in-a-window-frame': {
    file: '/img/work/carpenter-ants-trailing-on-a-shed-wall-whatcom-county-wa.jpg',
    alt: 'A column of large dark ants running up the painted corner where two shed walls meet',
    caption:
      'A working trail on an outbuilding wall. A line this consistent is traffic between a nest and food, and it can be followed in both directions — which is far quicker than searching a building at random for the timber they are in.',
  },
  'spiders-appearing-every-fall': {
    file: '/img/work/house-spider-on-a-window-frame-whatcom-county-wa.jpg',
    alt: 'A large brown house spider resting on the painted frame of an old window at night, with a lit room visible through the glass',
    caption:
      'The autumn arrival everyone photographs. Almost always a male, almost always wandering for a mate rather than moving in, and harmless — nothing with a medically significant bite is established this far north.',
  },
  'bugs-on-the-south-wall-every-october': {
    file: '/img/work/lady-beetles-clustered-on-a-wall-corner-whatcom-county-wa.jpg',
    alt: 'Dozens of small orange and black spotted beetles massed along the top corner of an exterior wall where the trim meets the siding',
    caption:
      'What the complaint actually looks like. This is a corner of exterior trim in autumn, and every one of those insects is looking for a way behind it. The number on the wall is the useful signal: it is the last point at which sealing and a correctly timed exterior treatment can still do anything.',
  },
  'rodents-in-the-attic-insulation': {
    file: '/img/work/insulation-shredded-and-nested-by-rodents-whatcom-county-wa.jpg',
    alt: 'A mass of shredded insulation pulled into a rough nest inside a building cavity',
    caption:
      'Insulation shredded and worked into a nest inside a cavity. Once material is in this condition it has stopped insulating, and it is why removal and replacement is part of the repair on a bad job rather than an extra — everyone on staff has completed installer training for that reason.',
  },
  'wasp-nest-in-a-wall-void': {
    file: '/img/work/paper-wasp-comb-removed-from-a-wall-void-whatcom-county-wa.jpg',
    alt: 'A layered paper wasp comb after removal, held in a plastic bag, its open cells visible from below',
    caption:
      'The comb out of the wall, photographed after removal rather than in place — a nest in a void is worked in a confined space and photographing it there is rarely the priority. The layering is what makes a void nest worth removing rather than only treating: the paper and the larvae left behind draw beetles and, later, rodents.',
  },
};

/* --------------------------------------------------------------------------
 * BEFORE AND AFTER. The first pair on this site, and the format the wish list
 * named as the most persuasive one in this trade — same door, same angle, same
 * day, which is what makes it evidence rather than two photographs.
 *
 * Kept as a pair rather than pushed through Photo.astro, because the whole
 * argument is the comparison. Shown side by side above 34rem and stacked
 * below it, in that order, with one caption underneath covering both: two
 * captions would invite a reader to read them separately, which is the one
 * thing a before-and-after must not allow.
 * ------------------------------------------------------------------------ */
export interface PhotoPair {
  before: { file: string; alt: string };
  after: { file: string; alt: string };
  caption: string;
}

export const garageDoorSeal: PhotoPair = {
  before: {
    file: '/img/work/failed-garage-door-seal-before-whatcom-county-wa.jpg',
    alt: 'The bottom edge of a raised garage door with bare metal where the seal has gone, and daylight showing along the gap beneath it',
  },
  after: {
    file: '/img/work/garage-door-seal-replaced-after-whatcom-county-wa.jpg',
    alt: 'The same garage door with a dense brush seal fitted along its bottom edge, closing the gap',
  },
  caption:
    'The same door, the same morning. A garage door seal is the single most common way a rodent walks into a house in this county, and it is invisible from inside because the door still closes and still looks shut. Brush rather than rubber on a door this age: rubber needs a straight, undamaged edge to seal against, and a brush strip keeps working on an edge that has already been chewed.',
};
