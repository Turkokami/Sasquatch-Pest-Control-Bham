/* --------------------------------------------------------------------------
 * INTRINSIC IMAGE DIMENSIONS, READ FROM DISK AT BUILD TIME.
 *
 * Lifted out of about.astro, which had the only copy, when service pages
 * started carrying photos too. The reasoning is that file's, kept verbatim
 * because it is the reason this exists rather than a hand-typed width:
 *
 *   Intrinsic dimensions are read from the files at build time rather than
 *   transcribed into the page. Two reasons. Sixteen <img> tags without width
 *   and height reflow the whole page as they decode, and a number typed by
 *   hand goes stale silently the day an image is re-cropped. Reading also
 *   means a path that is not on disk fails the BUILD, with the path in the
 *   message — rather than shipping a broken image for harness check 1b to
 *   catch after the fact.
 *
 * That last property is why this throws rather than returning a default. A
 * zero-by-zero <img> would pass the build and fail silently in a browser.
 * ------------------------------------------------------------------------ */
import fs from 'node:fs';
import path from 'node:path';

/* process.cwd(), NOT a path relative to import.meta.url, and the difference
   cost a build. about.astro's original copy of this walked up from
   `import.meta.url`, which works there because Astro leaves a page module at
   dist/pages/ and the walk lands back on the project root. The moment the same
   code is shared, Astro bundles it into a chunk at a different depth and the
   walk lands on dist/public/ — a directory that does not exist — so every
   service page with a photo failed with ENOENT at build time.

   Astro runs the build from the project root, so cwd is the stable base. */
const PUBLIC_DIR = path.join(process.cwd(), 'public');

export function intrinsicSize(publicPath: string): { width: number; height: number } {
  const buf = fs.readFileSync(path.join(PUBLIC_DIR, publicPath.replace(/^\//, '')));
  if (buf.length > 24 && buf.readUInt32BE(0) === 0x89504e47) {
    return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) }; // PNG IHDR
  }
  let i = 2; // JPEG SOFn
  while (i + 9 < buf.length) {
    if (buf[i] !== 0xff) { i++; continue; }
    const marker = buf[i + 1];
    if (marker >= 0xc0 && marker <= 0xcf && marker !== 0xc4 && marker !== 0xc8 && marker !== 0xcc) {
      return { height: buf.readUInt16BE(i + 5), width: buf.readUInt16BE(i + 7) };
    }
    i += 2 + buf.readUInt16BE(i + 2);
  }
  throw new Error(`cannot read image dimensions from ${publicPath} (expected JPEG or PNG)`);
}

/* --------------------------------------------------------------------------
 * RESPONSIVE WEBP VARIANTS — the srcset for an image, from what is on disk.
 *
 * scripts/responsive-images.mjs writes WebP copies of every photograph at
 * standard widths into public/img/_r/ before the build (the reasoning is in
 * that file: Keystone v2's lab gate measured six-second LCPs on phones being
 * sent 1,800-pixel JPEGs). This returns the srcset for whichever variants
 * EXIST, read at build time.
 *
 * Built from the directory listing rather than from the width list the
 * script uses, and that is the safety property: if the script did not run, or
 * failed on one image, there is nothing to list and the caller renders the
 * plain src — slower, never broken. A srcset naming a file that is not there
 * would break the image outright in every browser that picks it. Harness
 * check 1b also resolves every srcset candidate, so a bad one fails the gate.
 * ------------------------------------------------------------------------ */
const variantCache = new Map<string, string[]>();

export function srcsetFor(publicPath: string): string | undefined {
  if (!/^\/img\/.+\.(jpe?g|png)$/i.test(publicPath)) return undefined; // only photos under /img/
  const rel = publicPath.replace(/^\/img\//, '').replace(/\.(jpe?g|png)$/i, '');
  const dir = path.join(PUBLIC_DIR, 'img', '_r', path.dirname(rel));
  const base = path.basename(rel);
  if (!variantCache.has(dir)) {
    variantCache.set(dir, fs.existsSync(dir) ? fs.readdirSync(dir) : []);
  }
  const escaped = base.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const rx = new RegExp('^' + escaped + '-(\\d+)w\\.webp$');
  const found = variantCache.get(dir)!
    .map((f) => { const m = f.match(rx); return m ? { f, w: Number(m[1]) } : null; })
    .filter((x): x is { f: string; w: number } => x !== null)
    .sort((a, b) => a.w - b.w);
  if (!found.length) return undefined;
  const urlDir = path.posix.join('/img/_r', path.posix.dirname(rel.split(path.sep).join('/')));
  return found.map(({ f, w }) => `${path.posix.join(urlDir, f)} ${w}w`).join(', ');
}
