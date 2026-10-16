// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

/* ---------------------------------------------------------------------------
   Configuracion de despliegue
   ---------------------------------------------------------------------------
   La web vive en el dominio propio comunidadpalestina.madrid, servido por
   GitHub Pages desde el repositorio ComunidadPalestinaMadrid/web.

   Con un dominio propio, GitHub Pages sirve el sitio en la RAIZ del dominio
   (no en /web/), por eso "base" es '/'.

   Ambos valores se pueden sobrescribir por variables de entorno para desplegar
   en otra ubicacion (por ejemplo el dominio provisional de github.io, que
   sirve el repositorio bajo el prefijo /web):

       SITE_URL=https://comunidadpalestinamadrid.github.io BASE_PATH=/web npm run build
   --------------------------------------------------------------------------- */

const ENV_SITE = process.env.SITE_URL;
const ENV_BASE = process.env.BASE_PATH;

export const SITE_URL = (ENV_SITE || 'https://comunidadpalestina.madrid').replace(/\/$/, '');
export const BASE_PATH = ENV_BASE !== undefined ? (ENV_BASE || '/') : '/';

export default defineConfig({
  site: SITE_URL,
  base: BASE_PATH,
  trailingSlash: 'ignore',
  integrations: [sitemap()],
  build: { inlineStylesheets: 'auto' }
});
