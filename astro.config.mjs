// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Dominio real de la asociacion (GitHub Pages con CNAME -> public/CNAME)
export const SITE = 'https://comunidadpalestina.madrid';

export default defineConfig({
  site: SITE,
  trailingSlash: 'ignore',
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'ar'],
    routing: { prefixDefaultLocale: false, redirectToDefaultLocale: false }
  },
  integrations: [sitemap({ i18n: { defaultLocale: 'es', locales: { es: 'es-ES', ar: 'ar' } } })],
  build: { inlineStylesheets: 'auto' }
});
