/**
 * A perceptual fingerprint for every photograph, so the same job never shows
 * up twice on one page.
 *
 * WHY THIS EXISTS. Owner, 19 Sep 2026: "Spider control page has same image
 * three times." It did, and no file-name check could have caught it — the
 * archive holds the same scene under three names (the lead photograph
 * spider-cluster-on-glass-whatcom-county-wa.jpg and the gallery's g26939 and
 * g26940 are one cluster of spiders photographed seconds apart). The gallery
 * import de-duplicated the archive against ITSELF; it never compared the
 * gallery against the job photographs on the pages.
 *
 * WHAT IT WRITES. src/data/photo-hashes.json: one 256-bit difference hash per
 * image under public/img (gallery and work), as sixty-four hex characters.
 * src/lib/page-photos.ts refuses a photograph within a few bits of one the
 * page already shows. A difference hash compares each pixel with its right-hand
 * neighbour on a 17x16 grayscale thumbnail, so it survives re-encoding, resizing
 * and small crops, which is exactly how these duplicates differ.
 *
 * RUN BY npm run build, before Astro, and incremental: a file whose size and
 * modified time are unchanged keeps its stored hash, so the usual cost is a
 * directory listing. Delete the JSON to force a full rebuild of it.
 */
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = path.resolve(import.meta.dirname, '..');
const DIRS = ['public/img/gallery', 'public/img/work', 'public/img/team'];
const OUT = path.join(ROOT, 'src/data/photo-hashes.json');

const prev = fs.existsSync(OUT) ? JSON.parse(fs.readFileSync(OUT, 'utf8')) : {};
const next = {};
let hashed = 0;

for (const dir of DIRS) {
  const abs = path.join(ROOT, dir);
  if (!fs.existsSync(abs)) continue;
  for (const name of fs.readdirSync(abs)) {
    if (!/\.(jpe?g|png)$/i.test(name)) continue;
    const file = '/' + path.relative(path.join(ROOT, 'public'), path.join(abs, name)).split(path.sep).join('/');
    const st = fs.statSync(path.join(abs, name));
    const stamp = `${st.size}:${Math.round(st.mtimeMs)}`;
    if (prev[file]?.stamp === stamp) { next[file] = prev[file]; continue; }
    /* 17x16 grayscale, then compare each pixel with the one to its right.
       64 bits collided: two different photographs of clutter came out equal,
       so the grid is 16x16 comparisons — 256 bits — instead. */
    const raw = await sharp(path.join(abs, name)).greyscale().resize(17, 16, { fit: 'fill' }).raw().toBuffer();
    let bits = '';
    for (let y = 0; y < 16; y++) for (let x = 0; x < 16; x++) bits += raw[y * 17 + x] > raw[y * 17 + x + 1] ? '1' : '0';
    next[file] = { stamp, hash: BigInt('0b' + bits).toString(16).padStart(64, '0') };
    hashed++;
  }
}

fs.writeFileSync(OUT, JSON.stringify(next, null, 0) + '\n');
console.log(`photo-hashes — ${Object.keys(next).length} images, ${hashed} newly hashed`);
