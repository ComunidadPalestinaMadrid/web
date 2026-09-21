// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

/* ---------------------------------------------------------------------------
   Configuracion de despliegue
   ---------------------------------------------------------------------------
   GitHub Pages (URL provisional, repositorio "web"):
       SITE_URL  = https://comunidadpalestinamadrid.github.io
       BASE_PATH = /web

   Dominio propio comunidadpalestina.madrid (cuando este comprado):
       SITE_URL  = https://comunidadpalestina.madrid
       BASE_PATH = /

   En GitHub Actions estos dos valores llegan automaticamente desde
   actions/configure-pages, asi que al anadir el dominio propio basta con
   configurarlo en Settings > Pages y volver a desplegar.
--------------------------------------------------------------------------- */

const ENV_SITE = process.env.SITE_URL;
const ENV_BASE = process.env.BASE_PATH;

export const SITE_URL = (ENV_SITE || 'https://comunidadpalestinamadrid.github.io').replace(/\/$/, '');
export const BASE_PATH = ENV_BASE !== undefined ? (ENV_BASE || '/') : '/web';

export default defineConfig({
  site: SITE_URL,
  base: BASE_PATH,
  trailingSlash: 'ignore',
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'ar'],
    routing: { prefixDefaultLocale: false, redirectToDefaultLocale: false }
  },
  integrations: [sitemap({ i18n: { defaultLocale: 'es', locales: { es: 'es-ES', ar: 'ar' } } })],
  build: { inlineStylesheets: 'auto' }
});
