import { defineConfig } from 'astro/config';

/**
 * Keystone Part 7A. Static output, trailing slashes always, explicit site so
 * every absolute schema @id and canonical resolves from one constant.
 *
 * NEXT_PUBLIC_SITE_URL / siteUrl equivalent: `site` below is the single source
 * of the canonical origin. src/data/business.ts SITE must match it.
 */
export default defineConfig({
  site: 'https://www.sasquatchpestcontrol.com',
  output: 'static',
  trailingSlash: 'always',
  /* inlineStylesheets: 'always', from 10 Sep 2026. The one stylesheet was
     the second render-blocking request on every page (479ms on Keystone v2's
     lab run): a full round trip before first paint, on a slow phone
     connection, for ~30KB that compresses to a few. Inline it and the first
     response carries everything needed to paint. */
  build: { format: 'directory', inlineStylesheets: 'always' },
  compressHTML: true,
  devToolbar: { enabled: false },
});
