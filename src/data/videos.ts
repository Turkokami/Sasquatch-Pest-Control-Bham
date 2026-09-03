/* --------------------------------------------------------------------------
 * THE COMPANY'S OWN VIDEOS.
 *
 * Twelve on the channel, four used. What is left out matters as much as what
 * is in, so it is recorded here rather than lost:
 *
 *   - Two "Weitz Roof Inspection" clips are job footage named after a
 *     customer. Publishing a customer's name against their building is not
 *     ours to do, and the title carries "inspection", which is the one word
 *     this site is careful with — see INSPECTION_CLAIMS in src/lib/seo.ts.
 *   - A sunrise clip, which is a nice sunrise and not pest control.
 *   - Four May 2022 clips share the title "Pest Control Bellingham WA" with an
 *     identical boilerplate description; two of them run 12 and 16 seconds.
 *     The owner asked to avoid the drain footage and nothing in the metadata
 *     distinguishes these, so they are held back rather than guessed at.
 *
 * PRIVACY AND WEIGHT, WHICH DECIDED THE COMPONENT. A YouTube iframe pulls
 * roughly a megabyte and sets third-party cookies before a reader has decided
 * they want the video. LocationMap accepts a comparable trade for the map and
 * spends a paragraph justifying it; here the trade is avoidable, so Video
 * .astro paints a local poster and loads nothing from Google until somebody
 * clicks play. When it does load, it loads from youtube-nocookie.com.
 *
 * POSTERS ARE LOCAL FILES, not i.ytimg.com hotlinks. Hotlinking the thumbnail
 * would tell Google about every page view before anybody clicked, which is
 * precisely what the facade exists to prevent.
 * ------------------------------------------------------------------------ */

export interface Video {
  /** YouTube id. */
  id: string;
  /** Title as published on the channel, not a rewritten one. */
  title: string;
  /** Local poster under /public. */
  poster: string;
  /** Alt for the poster — describes the frame, not the keyword. */
  alt: string;
  /** One line under the player, in the site's voice rather than YouTube's. */
  caption: string;
  /** Runtime, shown so nobody has to guess before clicking. */
  duration: string;
  /** ISO 8601 for schema. */
  durationIso: string;
  uploaded: string;
}

export const videos: Record<string, Video> = {
  'carpenter-ants': {
    id: 'vTvVBf4T5yo',
    title: 'Pest Control Bellingham Washington: Carpenter Ants',
    poster: '/img/video/carpenter-ants-bellingham-wa.jpg',
    alt: 'Opening frame of a Sasquatch Pest Control video about carpenter ants in Bellingham',
    caption:
      'Carpenter ants, and what actually tells you there is a nest in the structure rather than a trail across the counter.',
    duration: '2 min 50 sec',
    durationIso: 'PT2M50S',
    uploaded: '2022-08-15',
  },
  'sugar-ants': {
    id: '3I86Nk7l7V4',
    title: 'Pest Control Bellingham Washington: Sugar Ants',
    poster: '/img/video/sugar-ants-odorous-house-ants-bellingham-wa.jpg',
    alt: 'Opening frame of a Sasquatch Pest Control video about sugar ants in Bellingham',
    caption:
      '"Sugar ants" is what almost everyone here calls the odorous house ant, which is the ant most homes in this county actually have.',
    duration: '1 min 57 sec',
    durationIso: 'PT1M57S',
    uploaded: '2022-08-15',
  },
  flies: {
    id: 'qNpObmmgrXU',
    title: 'Pest control Bellingham Washington: Flies',
    poster: '/img/video/fly-control-bellingham-wa.jpg',
    alt: 'Opening frame of a Sasquatch Pest Control video about fly control in Bellingham',
    caption:
      'Flies, and why the ones indoors are almost always breeding somewhere you have not looked rather than flying in.',
    duration: '1 min 6 sec',
    durationIso: 'PT1M6S',
    uploaded: '2022-08-15',
  },
  'fall-rodents': {
    id: 'dcjH8QHxIsw',
    title: 'Pest Control Bellingham Washington',
    poster: '/img/video/fall-rodent-activity-bellingham-wa.jpg',
    alt: 'Opening frame of a Sasquatch Pest Control video about fall rodent activity in Bellingham',
    caption:
      'Filmed in the autumn, on the annual move indoors — the rain displaces them and the first cold decides where they end up.',
    duration: '1 min 30 sec',
    durationIso: 'PT1M30S',
    uploaded: '2022-11-08',
  },
};

/* --------------------------------------------------------------------------
 * WHICH PAGE CARRIES WHICH VIDEO.
 *
 * One map, read twice: the page reads it to decide whether to render a player,
 * and the schema emitter reads it to decide whether to emit a VideoObject.
 *
 * That is the entire point of putting it here rather than writing the slug
 * into a condition in the template and the key into a prop. Those are two
 * statements of the same fact, they drift, and the specific way they drift is
 * a VideoObject describing a film that is not on the page — which is the video
 * equivalent of the second FAQ block this codebase already refuses to ship,
 * and which Google treats as a misrepresentation rather than a mistake.
 * ------------------------------------------------------------------------ */

/** Keyed by service slug. */
export const videoForService: Record<string, keyof typeof videos> = {
  'ant-control': 'carpenter-ants',
  'fly-control': 'flies',
  'rodent-control': 'fall-rodents',
};

/** Keyed by species slug in the pest library. */
export const videoForPest: Record<string, keyof typeof videos> = {
  'odorous-house-ant': 'sugar-ants',
};
