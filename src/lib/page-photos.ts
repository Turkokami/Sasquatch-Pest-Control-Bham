/**
 * Photographs placed through the body of long pages — owner, 19 Sep 2026:
 * "lets add images throughout the entire site ... break up the long runs of
 * just text", then, once they were in: "You also have a tendency to use same
 * photos alot throughout website. Let's break it up more and leave small
 * description boxes for each photo, and try to keep in mind the text around
 * them ... if not opt for a generic truck or animal photo. We like sharing
 * the beauty of whatcom county."
 *
 * So this file answers three questions, in this order:
 *
 *   WHICH PHOTOGRAPH GOES HERE? Every slot is scored against the section it
 *   will sit in — the words of that heading and its first paragraph against
 *   the words of the photograph's alt text. A section about rodents in a
 *   crawlspace gets the rodent photograph. When nothing in the pool has
 *   anything to do with the text, the slot falls back to the trucks and the
 *   county: those are honest anywhere, and the owner would rather show
 *   Whatcom County than force a match.
 *
 *   HOW OFTEN HAS IT BEEN USED? Every page used to choose on its own, so the
 *   strongest photographs turned up everywhere. The whole site is assigned in
 *   ONE pass here instead, in a fixed order, counting uses as it goes, and a
 *   photograph already shown several times loses to one that has not been
 *   shown at all. Same inputs, same output, every build.
 *
 *   IS IT HONEST HERE? The rules that came first and still overrule the rest:
 *     1. AN ANIMAL ONLY WHERE THE PAGE IS ABOUT IT. On an identification page
 *        a picture of the wrong animal is a counter-example, not decoration.
 *        Pest library pages are strictest: the alt must name the species.
 *     2. A TOWN ONLY ON ITS OWN PAGE. A service page can show "a van in Bow";
 *        the Lynden page cannot.
 *     3. NOTHING TWICE ON ONE PAGE — not the same frame under another name
 *        (photo-hashes.json), and not the same subject shot twice (alt text).
 *
 * THE POOL is the gallery: the owner's own photographs and his archive,
 * already privacy-checked, already captioned in both languages. The caption
 * under each one on the page is that alt text, which is why the alts read as
 * descriptions of what is in the frame and nothing else.
 */
import { gallery, type GalleryImage } from '../data/gallery';
import {
  servicePhotos, problemPhotos, speciesPhotos, industryPhotos,
  locationPhotos, locationPhotosSecond, commercialHubPhoto, commercialExclusionPhoto,
  locationsHubPhoto, whatcomCountyPhoto, type Photo,
} from '../data/photos';
import { towns } from '../data/towns';
import HASHES from '../data/photo-hashes.json';
import CAPTIONS from '../data/photo-captions.json';
import SECTIONS from '../data/page-sections.json';

export type InlinePhoto = GalleryImage;

/** The most any one page gets. Placement decides how many are used. */
export const MAX_INLINE = 6;

/* Every animal word an alt can carry. A match means the photograph is OF an
   animal (or its nest, or its frass) and falls under rule 1. */
const ANIMAL =
  /\b(rats?|mouse|mice|voles?|ants?|swarmers?|aphids?|wasps?|hornets?|yellowjackets?|bees?|bumblebees?|spiders?|beetles?|weevils?|cockroach(?:es)?|roach(?:es)?|moths?|fl(?:y|ies)|gnats?|fleas?|silverfish|centipedes?|millipedes?|earwigs?|termites?|bugs?|frogs?|lizards?|snakes?|salamanders?|mantis(?:es)?|deer|bats?|woodpeckers?|caterpillars?|birds?)\b/gi;

/* Topics a page can be about, found from its path and title. Each names the
   gallery sections it draws on first, what makes a photograph in them a
   strong match, and which animals it may show. */
interface Topic { page: RegExp; sections: string[]; prefer: RegExp; animals: string[] }
const TOPICS: Topic[] = [
  { page: /rodent|\brats?\b|-rat\b|mouse|mice|vole|droppings|scratching/i,
    sections: ['rodents', 'exclusion'], prefer: /rodent|\brats?\b|mouse|mice|bait|trap|burrow|tunnel|chew|gnaw|nest/i,
    animals: ['rat', 'rats', 'mouse', 'mice', 'vole', 'voles'] },
  { page: /wasp|hornet|yellowjacket|dauber/i,
    sections: ['stinging'], prefer: /wasp|hornet|yellowjacket|nest/i,
    animals: ['wasp', 'wasps', 'hornet', 'hornets', 'yellowjacket', 'yellowjackets'] },
  { page: /\bbees?\b|bee-removal|bumble|honey-bee/i,
    sections: ['stinging'], prefer: /\bbees?\b|bumblebee/i,
    animals: ['bee', 'bees', 'bumblebee', 'bumblebees'] },
  { page: /\bants?\b|-ant\b|ant-/i,
    sections: ['pests'], prefer: /\bants?\b|frass|swarmer/i,
    animals: ['ant', 'ants', 'swarmer', 'swarmers', 'aphid', 'aphids'] },
  { page: /spider|hobo/i,
    sections: ['pests'], prefer: /spider/i, animals: ['spider', 'spiders'] },
  { page: /termite|wdo|powderpost|anobiid|wood-boring|soft-wood|sawdust|carpenter-bee/i,
    sections: ['crawlspaces'], prefer: /powderpost|rot|decay|joist|framing|crawlspace/i, animals: [] },
  { page: /crawlspace|insulation|attic|moisture|wet|vapor|restoration/i,
    sections: ['crawlspaces', 'insulation'], prefer: /crawlspace|insulation|vapor|joist/i, animals: [] },
  { page: /exclusion|seal|vent|gap|screen|protection|repairs|before-fall/i,
    sections: ['exclusion'], prefer: /vent|screen|guard|shield|seal|gap|cover/i, animals: [] },
  { page: /commercial|restaurant|food|dairy|livestock|school|health|multifamily|apartment|retail|grocery|government|municipal|marina|waterfront|rental/i,
    sections: ['commercial', 'rodents'], prefer: /commercial|storage|stall|bait station|pallet/i,
    animals: ['rat', 'rats'] },
  { page: /cockroach|roach/i, sections: ['pests'], prefer: /cockroach/i, animals: ['cockroach', 'cockroaches', 'roach'] },
];

/* The work any page may show. */
const NEUTRAL = ['exclusion', 'crawlspaces', 'insulation', 'crew', 'country'];
/* A dead animal is honest work and it stays in the gallery, but it is not what
   a reader wants next to a paragraph, so it needs a much better reason here. */
const GRIM = /(dead|carcass|decomposed)/i;

/* The fallback the owner asked for: the trucks, and the county itself. */
const SCENERY = ['crew', 'country'];

/* PHOTOGRAPHS THE OWNER PICKED HIMSELF, in the order he wants them down the
   page. The scoring below is a guess at what belongs next to a paragraph, and
   it is a decent guess, but it cannot know that the finished black vent covers
   are the work this company wants judged on. When he names photographs, they
   go where he says and the scorer fills whatever is left.

   Owner, 20 Sep 2026, on /services/exclusion-and-repairs/: "all the photos
   except for garage need to be replaced we have much better selection in lower
   gallery showcase the black vent cover for crawlspace, the roof view attic
   vent covers, the dryer vents, crawlspace door and exaughst vent cover." The
   black crawlspace vent cover is the lead photograph (src/data/photos.ts); the
   other four are pinned here. And on the homepage: "Choose better photo for
   homepage should be a good one maybe group truck shot or something."

   A PINNED PHOTOGRAPH BELONGS TO ITS PAGE. It comes out of every other page's
   pool, so a photograph chosen to carry one page is not also decorating three
   others — which is how the crew-at-sunset shot came to be on six. */
const PINNED: Record<string, string[]> = {
  '/': ['/img/gallery/the-crew-with-the-trucks-at-sunset.jpg'],
  '/services/exclusion-and-repairs/': [
    '/img/gallery/screened-roof-vents-along-a-ridge.jpg',
    '/img/gallery/flush-mount-dryer-vent-covers-on-siding.jpg',
    '/img/gallery/g27109.jpg',
    '/img/gallery/evan-friese-fitting-an-exhaust-vent-cover.jpg',
    /* The fifth slot scored its way to a photograph of wet insulation, which
       is not what this page is selling. Finished metalwork instead. */
    '/img/gallery/rodent-shield-installed-along-a-foundation.jpg',
  ],
};
const PINNED_FILES = new Set(Object.values(PINNED).flat());

const TOWN_WORDS = towns.map((t) => ({ slug: t.slug, rx: new RegExp(`\\b${t.name.replace(/[-]/g, '[- ]')}\\b`, 'i') }));

/* EVERY PLACE NAME THE PHOTOGRAPHS USE, not only the towns with pages. A town
   page may show a photograph that names nowhere, or one that names ITSELF, and
   nothing else: a van on Lummi Shore Road under a Birch Bay heading tells the
   reader it was taken in Birch Bay. The towns are checked separately above;
   these are the landmarks, roads and districts the alts and captions mention. */
const PLACES = [
  'Lummi Island', 'Lummi Shore', 'Lummi', 'Chuckanut', 'Lake Whatcom', 'Lake Padden', 'Padden',
  'Samish', 'Mount Baker', 'Mt. Baker', 'Sandy Point', 'Semiahmoo', 'Point Roberts', 'San Juan',
  'Edison', 'Eaglemont', 'Squalicum', 'Fairhaven', 'Sehome', 'Cordata', 'Barkley', 'Edgemoor',
  'Alabama Hill', 'Silver Beach', 'Happy Valley', 'Lettered Streets', 'Whatcom Falls', 'Sudden Valley',
  'Birch Bay Village', 'Nooksack', 'Skagit', 'Whatcom',
].map((name) => ({ name, rx: new RegExp(`\\b${name.replace(/\./g, '\\.')}\\b`, 'i') }));

const base = (file: string) => file.replace(/^.*\//, '').replace(/\.(jpe?g|png)$/i, '');

/* TWO PHOTOGRAPHS OF ONE THING. Owner, 19 Sep 2026: "Spider control page has
   same image three times." It did, and a file name could not have caught it:
   the lead photograph and the gallery's g26940 are the same frame under two
   names, and g26939 is the same cluster of spiders a step to the left.

   The fingerprint (scripts/photo-hashes.mjs) catches the same frame re-encoded
   or re-cropped; the alt text catches the same subject shot twice, which no
   pixel comparison can. Measured on this library: the two names for one spider
   frame are 23 bits apart and every unrelated pair is 80 or more, so 40 bits is
   a wide margin, and those two spider alts share 4 of their 9 words. */
const DUP_BITS = 40;
const DUP_WORDS = 0.4;
const STOP = new Set(['a', 'an', 'the', 'of', 'in', 'on', 'at', 'to', 'into', 'with', 'and', 'or', 'its',
  'it', 'is', 'for', 'from', 'by', 'across', 'under', 'over', 'beside', 'behind', 'through', 'up', 'down',
  'been', 'has', 'have', 'where', 'that', 'this', 'as', 'out', 'above', 'below', 'against', 'along', 'still',
  'are', 'was', 'were', 'not', 'but', 'them', 'they', 'you', 'your', 'our', 'what', 'which', 'when',
  'how', 'why', 'can', 'will', 'one', 'two', 'their', 'there', 'than', 'then', 'about', 'more', 'most',
  'some', 'any', 'every', 'each', 'other', 'because', 'after', 'before', 'while', 'only', 'just', 'here']);
const words = (text: string) =>
  new Set(text.toLowerCase().replace(/[^a-z\s]/g, ' ').split(/\s+/).filter((w) => w.length > 2 && !STOP.has(w)));
const bits = (a: string, b: string) => {
  let x = BigInt('0x' + a) ^ BigInt('0x' + b);
  let n = 0;
  while (x) { n += Number(x & 1n); x >>= 1n; }
  return n;
};
const hashOf = (file: string) => (HASHES as Record<string, { hash: string }>)[file]?.hash;
const sameShot = (aFile: string, aAlt: string, bFile: string, bAlt: string) => {
  const ha = hashOf(aFile);
  const hb = hashOf(bFile);
  if (ha && hb && bits(ha, hb) <= DUP_BITS) return true;
  const wa = words(aAlt);
  const wb = words(bAlt);
  if (!wa.size || !wb.size) return false;
  const shared = [...wa].filter((w) => wb.has(w)).length;
  return shared / Math.min(wa.size, wb.size) >= DUP_WORDS;
};

/** The lead photographs a page already shows. */
function leadPhotos(page: string): Photo[] {
  const seg = page.split('/').filter(Boolean);
  const got: (Photo | undefined)[] = [];
  if (seg[0] === 'services') got.push(seg[2] ? problemPhotos[seg[2]] : servicePhotos[seg[1]]);
  if (seg[0] === 'pest-library') got.push(speciesPhotos[seg[1]]);
  if (seg[0] === 'commercial') got.push(industryPhotos[seg[1]]);
  if (seg[0] === 'locations' && !seg[2]) got.push(locationPhotos[seg[1]], locationPhotosSecond[seg[1]]);
  /* The hubs carry theirs in named exports rather than a map. */
  if (page === '/commercial/') got.push(commercialHubPhoto, commercialExclusionPhoto);
  if (page === '/locations/') got.push(locationsHubPhoto);
  if (page === '/locations/whatcom-county/') got.push(whatcomCountyPhoto);
  return got.filter((p): p is Photo => !!p);
}

/* ---------------------------------------------------------------- the pages

   From src/data/page-sections.json, written by scripts/page-sections.mjs.
   NOT read from src/content here: this module is imported both by
   astro.config.mjs (plain Node, for the Markdown plugin) and by the page
   templates (through Vite), and node:fs finds nothing in the second. That cost
   the Spanish pages every one of their photographs once already. */
interface PageInfo { page: string; title: string; sections: string[] }

/* The hubs and standalone pages are .astro templates with no Markdown body to
   read, so they are assigned from their path alone — which sends most of them
   to the trucks and the county. Six empty sections is the way of asking for
   two photographs; the hub templates place them by hand. */
const HUBS = [
  '/', '/about/', '/blog/', '/commercial/', '/contact/', '/guides/', '/locations/',
  '/locations/skagit-county/', '/locations/whatcom-county/', '/network/', '/our-guarantee/',
  '/pest-library/', '/services/', '/trusted-partners/', '/what-we-use/',
];

const readPages = (): PageInfo[] => [
  ...(SECTIONS as PageInfo[]),
  ...HUBS.map((page) => ({ page, title: '', sections: ['', '', '', '', '', ''] })),
].sort((x, y) => x.page.localeCompare(y.page));

/** Where a photograph goes: after section `i` (0-based), every third from the
    third, so the lead photograph and the first inline one are never adjacent. */
export const photoAfterSection = (i: number) => i >= 2 && (i - 2) % 3 === 0;
function slotsFor(sections: number): number[] {
  const out: number[] = [];
  for (let i = 0; i < sections && out.length < MAX_INLINE; i++) if (photoAfterSection(i)) out.push(i);
  return out;
}

/* ------------------------------------------------------------ the assignment */

let ASSIGNED: Map<string, InlinePhoto[]> | null = null;

function assignAll(): Map<string, InlinePhoto[]> {
  const used = new Map<string, number>();
  const result = new Map<string, InlinePhoto[]>();
  const all = gallery.flatMap((s) => s.images.map((img) => ({ img, section: s.key })));
  const sectionOfFile = new Map(all.map((c) => [c.img.file, c.section]));

  for (const info of readPages()) {
    const seg = info.page.split('/').filter(Boolean);
    const text = `${info.page} ${info.title}`;
    const isPest = seg[0] === 'pest-library';
    const town = seg[0] === 'locations' ? seg[1] : undefined;
    const topics = TOPICS.filter((t) => t.page.test(text));
    const species = (seg[1] ?? '').replace(/-/g, ' ');
    const allowedAnimals = new Set<string>(topics.flatMap((t) => t.animals));
    const lead = leadPhotos(info.page);

    /* The owner's own picks for this page, resolved against the gallery. A
       name that matches nothing is a typo, and a typo that quietly places no
       photograph is the failure mode this whole file exists to avoid. */
    const mine = PINNED[info.page] ?? [];
    const pinned = mine.map((file) => {
      const found = all.find((c) => c.img.file === file);
      if (!found) throw new Error(`PINNED photo not in the gallery: ${file} (${info.page})`);
      return found.img;
    });

    const allowed = ({ img, section }: { img: GalleryImage; section: string }) => {
      /* pinned to some other page */
      if (PINNED_FILES.has(img.file) && !mine.includes(img.file)) return false;
      /* RULE 4, owner 20 Sep 2026: "No reason for insulation photo to be with
         un wanted buzzing page check to make sure images are co rolating with
         pages they are on." He was right, and a penalty was too weak to stop
         it: an unrelated photograph that had never been used could still beat
         a fitting one that had, because the use count subtracts faster than
         the mismatch did. So a page about something now draws from its own
         sections or from the trucks and the county — which is the fallback he
         asked for — and nothing else. A page with no topic at all, which means
         the hubs, keeps the wider pool. */
      if (topics.length && !topicSections.has(section) && !SCENERY.includes(section)) return false;
      const hits = [...img.alt.matchAll(ANIMAL)];
      if (hits.length) {
        if (isPest) { if (!img.alt.toLowerCase().replace(/-/g, ' ').includes(species)) return false; }
        else if (!hits.every((m) => allowedAnimals.has(m[1].toLowerCase()))) return false;
      }
      if (town) {
        /* The caption is what the reader sees under the photograph, so it is
           checked too — the alt is not the only place a location gets named. */
        const text = `${img.alt} ${(CAPTIONS as Record<string, { en?: string }>)[img.file]?.en ?? ''}`;
        const here = towns.find((t) => t.slug === town)?.name ?? '';
        const nb = seg[2] ? seg[2].replace(/-/g, ' ') : '';
        const namesElsewhere =
          TOWN_WORDS.some((w) => w.slug !== town && w.rx.test(text))
          || PLACES.some((p) => p.rx.test(text)
            && !new RegExp(`\\b${p.name.replace(/\./g, '\\.')}\\b`, 'i').test(`${here} ${nb}`));
        if (namesElsewhere) return false;
      }
      return !lead.some((p) => base(p.file) === base(img.file) || sameShot(p.file, p.alt, img.file, img.alt));
    };

    const topicSections = new Set(topics.flatMap((t) => t.sections));
    const ownTown = town ? TOWN_WORDS.find((w) => w.slug === town) : undefined;
    const pool = all.filter(allowed);
    const chosen: InlinePhoto[] = [];
    const taken = (img: GalleryImage) =>
      chosen.some((c) => c.file === img.file || sameShot(c.file, c.alt, img.file, img.alt));

    /* A page with fewer than three sections still gets two photographs: the
       rehype plugin places those every sixth block instead. Two of the blog
       posts are written as one long run of numbered lists. */
    const slots = info.sections.length >= 3 ? slotsFor(info.sections.length) : [0, 1];
    let fallbacks = 0;
    for (const [n, slot] of slots.entries()) {
      /* His picks take the first slots, in his order; the rest are scored. */
      if (pinned[n]) {
        chosen.push(pinned[n]);
        used.set(pinned[n].file, (used.get(pinned[n].file) ?? 0) + 1);
        continue;
      }
      const near = words(info.sections[slot] ?? info.title);
      let best: { img: GalleryImage; score: number } | null = null;
      for (const cand of pool) {
        if (taken(cand.img)) continue;
        const overlap = [...words(cand.img.alt)].filter((w) => near.has(w)).length;
        let score = overlap * 3;
        if (topics.some((t) => t.prefer.test(cand.img.alt))) score += 4;
        if (topicSections.has(cand.section)) score += 3;
        else if (topics.length) score -= 2;               // scenery: honest, but a fallback
        else if (NEUTRAL.includes(cand.section)) score += 1;   // a hub, with no topic
        else score -= 4;                                  // a section this page is not about
        if (ownTown?.rx.test(cand.img.alt)) score += 6;   // taken in this very town
        if (isPest && cand.section === 'pests') score += 2;
        score -= (used.get(cand.img.file) ?? 0) * 2.5;    // spread them across the site
        if (GRIM.test(cand.img.alt)) score -= 6;        // fine in the gallery, not beside the text
        if (!best || score > best.score) best = { img: cand.img, score };
      }
      /* Nothing in the pool is about this text: show the county instead. */
      if (!best || best.score <= 0) {
        const scenery = pool
          .filter((c) => SCENERY.includes(c.section) && !taken(c.img))
          .sort((a, b) => (used.get(a.img.file) ?? 0) - (used.get(b.img.file) ?? 0)
            || a.img.file.localeCompare(b.img.file));
        if (scenery.length) best = { img: scenery[0].img, score: 0 };
      }
      if (!best) break;
      /* TWO TRUCKS IS SHARING THE COUNTY, SIX IS A TRUCK CATALOG. Once a
         page has nothing left in its own sections, every remaining slot would
         fill with scenery — and with 89 scenery photographs covering 252
         pages that means the same trucks over and over, which is the other
         thing the owner asked us to stop. So the page stops instead. Fewer
         photographs, each one either about the page or worth looking at. */
      if (topics.length && SCENERY.includes(sectionOfFile.get(best.img.file) ?? '')) {
        if (fallbacks >= 2) break;
        fallbacks++;
      }
      chosen.push(best.img);
      used.set(best.img.file, (used.get(best.img.file) ?? 0) + 1);
    }
    result.set(info.page, chosen);
  }
  return result;
}

/**
 * The photographs for one English page path, in the order they are placed.
 * The whole site is assigned the first time this is called, so a photograph
 * already used several times loses to one that has not been used.
 */
export function inlinePhotosFor(page: string, _title = ''): InlinePhoto[] {
  ASSIGNED ??= assignAll();
  return ASSIGNED.get(page) ?? [];
}

/** Which photograph goes after section `i`, if any. */
export const photoForSection = (photos: InlinePhoto[], i: number) =>
  photoAfterSection(i) ? photos[(i - 2) / 3] : undefined;

/**
 * The same duplicate tests applied to a strip of photographs: drop any that
 * repeats one already shown on the page, or an earlier one in the strip. The
 * service pages' gallery sections come from the archive and hold several
 * frames of one job.
 */
export function dedupePhotos<T extends { file: string; alt: string }>(
  images: T[], already: { file: string; alt: string }[] = [],
): T[] {
  const out: T[] = [];
  for (const img of images) {
    if ([...already, ...out].some((o) => o.file === img.file || sameShot(o.file, o.alt, img.file, img.alt))) continue;
    out.push(img);
  }
  return out;
}
