/* --------------------------------------------------------------------------
 * PHOTOGRAPHS OF WORK THE COMPANY NO LONGER DOES.
 *
 * Owner, 12 Sep 2026: "No bird work, drop it." GUARDRAILS.md §8.
 *
 * Sixteen gallery images are bird work: thirteen whose own alt text says so,
 * and three (g27714, g27716, g27731) whose alt says only "exclusion" or
 * "commercial work" but which, looked at one by one, are the same netting job
 * at the same store entrance with the same lift. A filter on the word "bird"
 * would have missed all three, which is why this is a list of files and not a
 * pattern.
 *
 * gallery.ts removes these from `gallery` itself, so /gallery/, the service
 * pages that attach a gallery section (the commercial service among them) and
 * /es/galeria/ all read one list. The files stay in public/ — deleting an
 * image is the owner's call, not a build's.
 * ------------------------------------------------------------------------ */
export const BIRD_WORK_IMAGES = new Set<string>([
  '/img/gallery/g27717.jpg',
  '/img/gallery/g27715.jpg',
  '/img/gallery/g27714.jpg',
  '/img/gallery/g27713.jpg',
  '/img/gallery/g27716.jpg',
  '/img/gallery/g27731.jpg',
  '/img/gallery/g27730.jpg',
  '/img/gallery/g27729.jpg',
  '/img/gallery/g27728.jpg',
  '/img/gallery/g27727.jpg',
  '/img/gallery/g27726.jpg',
  '/img/gallery/g27724.jpg',
  '/img/gallery/g27723.jpg',
  '/img/gallery/g27722.jpg',
  '/img/gallery/g27721.jpg',
  '/img/gallery/g27719.jpg',
]);
