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
  build: { format: 'directory' },
  compressHTML: true,
  devToolbar: { enabled: false },
});
