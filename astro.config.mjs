// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// SkyNational Community — static site for GitHub Pages
// Repository: JengasNX/skynationalsite  →  https://jengasnx.github.io/skynationalsite/
export default defineConfig({
  site: 'https://jengasnx.github.io',
  base: '/skynationalsite',
  trailingSlash: 'ignore',
  i18n: {
    defaultLocale: 'ru',
    locales: ['ru', 'en'],
    routing: {
      prefixDefaultLocale: false,
      redirectToDefaultLocale: false,
    },
  },
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'ru',
        locales: {
          ru: 'ru-RU',
          en: 'en-US',
        },
      },
    }),
  ],
  build: {
    inlineStylesheets: 'auto',
  },
});
