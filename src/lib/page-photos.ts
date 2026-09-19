/**
 * Photographs placed through the body of long pages — owner, 19 Sep 2026:
 * "lets add images throughout the entire site ... add more of the photos on
 * the pages with them throughout the page not just on the top and gallery at
 * the bottom. We want to keep people interested and break up the long runs of
 * just text."
 *
 * ONE PICKER, BOTH LANGUAGES. English pages are Markdown, and
 * src/lib/rehype-inline-photos.ts calls this while the Markdown compiles.
 * Spanish pages are rendered from data, and their templates call it with the
 * English twin's path. The same path always returns the same photographs in
 * the same order, which is also how the service template knows which ones to
 * leave out of its gallery strip at the foot of the page.
 *
 * THE POOL is the gallery (src/data/gallery.ts) — every photograph there is the
 * owner's own or from his archive, already privacy-checked, already carrying
 * alt text in both languages (es-galeria.ts). Nothing new is sourced here.
 *
 * THE RULES THAT KEEP THIS HONEST, which matter more than the layout:
 *
 *   1. AN ANIMAL ONLY WHERE THE PAGE IS ABOUT IT. A photograph whose alt names
 *      an animal is used only on a page that names the same animal. The
 *      silverfish page does not get a cockroach, and the Norway rat page does
 *      not get "a mouse nest", because on an identification page a picture of
 *      the wrong animal is a counter-example, not decoration. Pest library
 *      pages are strictest: only their own species' words count.
 *
 *   2. A TOWN ONLY ON ITS OWN PAGE. On a town or neighborhood page, a
 *      photograph whose alt names a different town is left out. A service page
 *      can show "a van in Bow" truthfully; the Lynden page cannot.
 *
 *   3. NO REPEATS ON A PAGE. The page's own lead photographs (photos.ts) are
 *      excluded by file name, so the same job never appears twice in a scroll.
 */
import { gallery, type GalleryImage } from '../data/gallery';
import {
  servicePhotos, problemPhotos, speciesPhotos, industryPhotos,
  locationPhotos, locationPhotosSecond, commercialHubPhoto, commercialExclusionPhoto,
  locationsHubPhoto, whatcomCountyPhoto, type Photo,
} from '../data/photos';
import { towns } from '../data/towns';
import HASHES from '../data/photo-hashes.json';

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

/* What every page may fall back on once its topic pool runs out: the work,
   the crew and the country, animal-free under rule 1. */
const NEUTRAL = ['exclusion', 'crawlspaces', 'insulation', 'crew', 'country'];

const TOWN_WORDS = towns.map((t) => ({ slug: t.slug, rx: new RegExp(`\\b${t.name.replace(/[-]/g, '[- ]')}\\b`, 'i') }));

const base = (file: string) => file.replace(/^.*\//, '').replace(/\.(jpe?g|png)$/i, '');

/* TWO PHOTOGRAPHS OF ONE THING. Owner, 19 Sep 2026: "Spider control page has
   same image three times." It did, and a file name could not have caught it:
   the lead photograph and the gallery's g26940 are the same frame under two
   names, and g26939 is the same cluster of spiders a step to the left.

   So a photograph is refused if either test says it repeats something the page
   already shows. The fingerprint (scripts/photo-hashes.mjs) catches the same
   frame re-encoded or re-cropped; the alt text catches the same subject shot
   twice, which no pixel comparison can. Measured on this library: the two
   names for one spider frame are 23 bits apart and every unrelated pair is 80
   or more, so 40 bits is a wide margin; the second spider frame shares 4 of its
   9 describing words with the first, which is why the word threshold is low. It is measured on the English alt,
   so the Spanish pages inherit the same decisions. */
const DUP_BITS = 40;
const DUP_WORDS = 0.4;
const STOP = new Set(['a', 'an', 'the', 'of', 'in', 'on', 'at', 'to', 'into', 'with', 'and', 'or', 'its',
  'it', 'is', 'for', 'from', 'by', 'across', 'under', 'over', 'beside', 'behind', 'through', 'up', 'down',
  'been', 'has', 'have', 'where', 'that', 'this', 'as', 'out', 'above', 'below', 'against', 'along', 'still']);
const words = (alt: string) =>
  new Set(alt.toLowerCase().replace(/[^a-z\s]/g, ' ').split(/\s+/).filter((w) => w.length > 2 && !STOP.has(w)));
const bits = (a: string, b: string) => {
  let x = BigInt('0x' + a) ^ BigInt('0x' + b);
  let n = 0;
  while (x) { n += Number(x & 1n); x >>= 1n; }
  return n;
};
const sameShot = (aFile: string, aAlt: string, bFile: string, bAlt: string) => {
  const ha = (HASHES as Record<string, { hash: string }>)[aFile]?.hash;
  const hb = (HASHES as Record<string, { hash: string }>)[bFile]?.hash;
  if (ha && hb && bits(ha, hb) <= DUP_BITS) return true;
  const wa = words(aAlt);
  const wb = words(bAlt);
  if (!wa.size || !wb.size) return false;
  const shared = [...wa].filter((w) => wb.has(w)).length;
  return shared / Math.min(wa.size, wb.size) >= DUP_WORDS;
};

/* Deterministic shuffle. Seeded by the page path, so every page is different
   and every build is the same. */
function seeded<T>(items: T[], seed: string): T[] {
  let h = 2166136261;
  for (const c of seed) h = Math.imul(h ^ c.charCodeAt(0), 16777619);
  const out = items.slice();
  for (let i = out.length - 1; i > 0; i--) {
    h = Math.imul(h ^ (h >>> 13), 1274126177) >>> 0;
    const j = h % (i + 1);
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

/** The lead photographs a page already shows, as file-name stems. */
function leadPhotos(path: string): Photo[] {
  const seg = path.split('/').filter(Boolean);
  const got: (Photo | undefined)[] = [];
  if (seg[0] === 'services') got.push(seg[2] ? problemPhotos[seg[2]] : servicePhotos[seg[1]]);
  if (seg[0] === 'pest-library') got.push(speciesPhotos[seg[1]]);
  if (seg[0] === 'commercial') got.push(industryPhotos[seg[1]]);
  if (seg[0] === 'locations' && !seg[2]) got.push(locationPhotos[seg[1]], locationPhotosSecond[seg[1]]);
  /* The hubs carry theirs in named exports rather than a map. */
  if (path === '/commercial/') got.push(commercialHubPhoto, commercialExclusionPhoto);
  if (path === '/locations/') got.push(locationsHubPhoto);
  if (path === '/locations/whatcom-county/') got.push(whatcomCountyPhoto);
  return got.filter((p): p is Photo => !!p);
}

/**
 * The photographs to place through one page, best first, at most MAX_INLINE.
 * `path` is the English page path; `title` is whatever names the page (its
 * title or H1) and is only used to recognize the topic.
 */
export function inlinePhotosFor(path: string, title = ''): InlinePhoto[] {
  const seg = path.split('/').filter(Boolean);
  const text = `${path} ${title}`;
  const isPest = seg[0] === 'pest-library';
  const town = seg[0] === 'locations' ? seg[1] : undefined;

  const topics = TOPICS.filter((t) => t.page.test(text));
  /* Rule 1. On a pest page an animal photograph must name the species itself
     ("bald-faced hornet", "thatching ants") — word by word would let "deer"
     from deer-mouse admit the deer, and "beetle" from anobiid-powderpost-beetle
     admit any beetle at all. Elsewhere, the animals of every topic the page is
     about. */
  const species = (seg[1] ?? '').replace(/-/g, ' ');
  const allowed = new Set<string>(topics.flatMap((t) => t.animals));
  const animalOk = (img: GalleryImage) => {
    const hits = [...img.alt.matchAll(ANIMAL)];
    if (!hits.length) return true;
    if (isPest) return img.alt.toLowerCase().replace(/-/g, ' ').includes(species);
    return hits.every((m) => allowed.has(m[1].toLowerCase()));
  };
  /* Rule 2. */
  const townOk = (img: GalleryImage) =>
    !town || TOWN_WORDS.every((w) => w.slug === town || !w.rx.test(img.alt));
  /* Rule 3. */
  const lead = leadPhotos(path);
  const ok = (img: GalleryImage) =>
    animalOk(img) && townOk(img)
    && !lead.some((p) => base(p.file) === base(img.file) || sameShot(p.file, p.alt, img.file, img.alt));

  const bySection = (keys: string[]) =>
    gallery.filter((s) => keys.includes(s.key)).flatMap((s) => s.images).filter(ok);

  const ownTown = town ? TOWN_WORDS.find((w) => w.slug === town) : undefined;
  const tiers: GalleryImage[][] = [
    ownTown ? bySection(NEUTRAL.concat('rodents', 'stinging', 'pests', 'commercial')).filter((i) => ownTown.rx.test(i.alt)) : [],
    bySection(topics.flatMap((t) => t.sections)).filter((i) => topics.some((t) => t.prefer.test(i.alt))),
    bySection(topics.flatMap((t) => t.sections)),
    bySection(isPest ? NEUTRAL.concat('rodents') : NEUTRAL),
  ];

  const seen = new Set<string>();
  const out: GalleryImage[] = [];
  for (const tier of tiers) {
    for (const img of seeded(tier, path)) {
      if (out.length >= MAX_INLINE) return out;
      if (seen.has(img.file)) continue;
      if (out.some((o) => sameShot(o.file, o.alt, img.file, img.alt))) continue;
      seen.add(img.file);
      out.push(img);
    }
  }
  return out;
}

/** Which photograph goes after section `i`, if any. */
export const photoForSection = (photos: InlinePhoto[], i: number) =>
  photoAfterSection(i) ? photos[(i - 2) / 3] : undefined;

/** Where to put them: after section `i` (0-based) when this returns true.
    Every third section from the third, so the lead photograph above the
    first section and the first inline one are never back to back. */
export const photoAfterSection = (i: number) => i >= 2 && (i - 2) % 3 === 0;

/**
 * The same tests applied to a strip of photographs: drop any that repeats one
 * already shown on the page, or an earlier one in the strip. The service
 * pages' gallery sections come straight from the archive and hold several
 * frames of one job.
 */
export function dedupePhotos<T extends { file: string; alt: string }>(images: T[], already: { file: string; alt: string }[] = []): T[] {
  const out: T[] = [];
  for (const img of images) {
    if ([...already, ...out].some((o) => o.file === img.file || sameShot(o.file, o.alt, img.file, img.alt))) continue;
    out.push(img);
  }
  return out;
}
