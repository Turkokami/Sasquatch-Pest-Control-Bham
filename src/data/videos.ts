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
 *     THAT RULE WAS BROKEN ONCE AND THE OWNER CAUGHT IT. dcjH8QHxIsw, another
 *     clip with the same undistinguishable title, was used on the rodent page
 *     with a caption about the autumn move indoors written over it. It is a
 *     promotional advert. Writing a confident caption over an unidentified
 *     file is exactly what the paragraph above exists to prevent, and the
 *     caption is what made it look verified.
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
  /**
   * One line under the player, in the site's voice rather than YouTube's.
   * OPTIONAL, because not every video needs explaining and a caption written
   * only to fill the slot is worse than none — the owner removed the one that
   * had been written for the advert on those grounds.
   */
  caption?: string;
  /**
   * For the VideoObject description, which is required for a rich result and
   * is never shown on the page.
   *
   * This used to be the caption, which is what forced the caption to exist at
   * all and to read like metadata. They are different jobs: a caption is
   * written for a reader who can see the player, a schema description for a
   * machine that cannot. Separating them lets a caption be dropped without
   * emptying the structured data.
   */
  description: string;
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
    description:
      'How to tell a carpenter ant nest inside a structure from ants foraging across a counter, filmed in Bellingham, Washington.',
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
    description:
      'The ant most Whatcom County homes actually have is the odorous house ant, known locally as the sugar ant. Filmed in Bellingham, Washington.',
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
    description:
      'Why flies found indoors are usually breeding in the building rather than coming in from outside. Filmed in Bellingham, Washington.',
    duration: '1 min 6 sec',
    durationIso: 'PT1M6S',
    uploaded: '2022-08-15',
  },
  /* THE ADVERT, ON THE HOMEPAGE WHERE IT BELONGS. This is dcjH8QHxIsw, the
     clip taken off the rodent page for not being rodent footage. The owner's
     call to keep it, and it is the right one — it is a good piece of brand
     film and the homepage is the one page whose job is the company rather
     than a pest.

     ITS METADATA IS WHY IT FOOLED THIS BUILD ONCE. The YouTube description
     opens "Fall is here! You can expect Rodent and other pest activity to
     raise", so anything reading metadata concludes it is rodent footage. It
     is not: it is a family-and-sunset brand piece. The lesson is narrow and
     worth keeping — a description is what somebody typed, not what is in the
     frame, and the two disagree more often on a marketing channel than
     anywhere else.

     The caption below says it is an advert rather than dressing it as job
     footage, which is the only honest way to run it. */
  'autumn-film': {
    id: 'dcjH8QHxIsw',
    title: 'Pest Control Bellingham Washington',
    poster: '/img/video/sasquatch-pest-control-autumn-film.jpg',
    alt: 'Opening frame of a Sasquatch Pest Control film, a family silhouetted against a sunset',
    /* NO CAPTION, on the owner's instruction. It had one describing the film
       as an advert with "no pest control in it", which is accurate and reads
       as an apology for the thing it sits under. A brand film does not need a
       line explaining it. */
    description:
      'A short film by Sasquatch Pest Control, a family-owned pest control company serving Bellingham and Whatcom County, Washington.',
    duration: '1 min 30 sec',
    durationIso: 'PT1M30S',
    uploaded: '2022-11-08',
  },

  /* REPLACED 3 Sep 2026. This slot held dcjH8QHxIsw, one of the four generic
     "Pest Control Bellingham WA" clips whose metadata does not distinguish
     them from each other. The note above said they were held back rather than
     guessed at — and then one of them was used here anyway, which is the
     inconsistency the owner caught: it is a promotional advert, not rodent
     footage, and it had a caption describing autumn rodent movement written
     over the top of it.

     The replacement is the owner's own choice and its metadata was read off
     YouTube rather than assumed: title, 42-second runtime and October 2022
     upload date all verified, and its description is about fall rodent
     activity and overwintering. */
  'fall-rodents': {
    id: 'SY03J_xVxP0',
    title: 'Stay Protected this Fall and Winter!',
    poster: '/img/video/fall-rodent-activity-bellingham-wa.jpg',
    alt: 'Opening frame of a Sasquatch Pest Control video about fall and winter pest activity',
    caption:
      'Forty-two seconds on the autumn move indoors, filmed in October. Rodents are not reacting to the cold so much as to what the cold takes away — cover, food and dry ground all go at once, and a building is the nearest replacement.',
    description:
      'Autumn rodent activity in Whatcom County and why rodents move into buildings as the weather turns. Filmed in October in Bellingham, Washington.',
    duration: '42 sec',
    durationIso: 'PT42S',
    uploaded: '2022-10-10',
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
