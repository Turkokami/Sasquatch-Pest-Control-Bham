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
 * `Pest-Control-Mt-Vernon-WA-7-scaled.jpg`, `Exterminator-Bellingham-22`. The
 * town in those names is real and worth keeping; the rest is not. Each file is
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
    file: '/img/work/bald-faced-hornet-nest-removed-bellingham-wa.jpg',
    alt: 'A large gray paper hornet nest, roughly the size of a basketball, resting in the bed of a pickup truck after removal',
    caption:
      'A bald-faced hornet nest taken down intact in Bellingham. A nest this size is a season’s work by a colony that started from one queen in spring, which is why the same eave can look clear in May and carry this by August.',
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
  'bee-removal': {
    file: '/img/work/bumblebee-close-up-whatcom-county-wa.jpg',
    alt: 'A close-up photograph of a bumblebee on a pale surface, its yellow and black banding clearly visible',
    caption:
      'A bumblebee, photographed in Whatcom County. Bumblebees are pollinators and are not treated as a pest — telling one from a yellowjacket is most of what decides whether a nest needs anything done at all.',
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
    file: '/img/work/attic-gable-vent-on-a-home-blaine-wa.jpg',
    alt: 'A round louvered attic vent set into the green shingled gable end of a house against a gray sky',
    caption:
      'A gable vent on a home in Blaine. A louvered vent with no screen behind it is an open door to an attic, and it is the first thing worth looking at on a house where something is heard overhead.',
  },
  everson: {
    file: '/img/work/sasquatch-pest-control-truck-driveway-everson-wa.jpg',
    alt: 'A wrapped Sasquatch Pest Control pickup truck parked on a driveway beside a garage during a service visit',
    caption:
      'On a service visit in Everson. Everson and the Nooksack valley around it are farm and river country, which keeps rodent and wildlife work steadier here than in town.',
  },
  sumas: {
    file: '/img/work/paper-wasp-nest-in-soffit-sumas-wa.jpg',
    alt: 'A paper wasp nest tucked into the corner of a soffit under the eave of a house',
    caption:
      'A paper wasp nest under an eave in Sumas. Nests in a soffit corner are usually found late, because nothing is visible from the ground until the colony is large enough to be heard.',
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
