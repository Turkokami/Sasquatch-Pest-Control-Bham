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
