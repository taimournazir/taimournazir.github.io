import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Hosted on GitHub Pages as a *user site* from repo taimournazir/taimournazir.github.io.
// Because that repo is named <user>.github.io the site serves from the domain root, so
// no `base` path is needed. If this ever moves to a project repo (e.g. /portfolio), add
// `base: '/portfolio'` here or every internal link and asset URL will 404.
export default defineConfig({
  site: 'https://taimournazir.github.io',
  integrations: [sitemap()],
  markdown: {
    shikiConfig: { theme: 'github-light', wrap: true },
  },
});
