/**
 * A Spanish page's photographs are its English twin's, found through
 * PAGE_PAIRS, so both languages of one page show the same work. Kept apart
 * from page-photos.ts because that file is imported by astro.config.mjs (via
 * the rehype plugin), and i18n.ts pulls in every Spanish data module.
 */
import { PAGE_PAIRS } from '../data/i18n';
import { inlinePhotosFor, type InlinePhoto } from './page-photos';

export function inlinePhotosForEs(esPath: string): InlinePhoto[] {
  const en = Object.keys(PAGE_PAIRS).find((k) => PAGE_PAIRS[k] === esPath);
  return en ? inlinePhotosFor(en) : [];
}
