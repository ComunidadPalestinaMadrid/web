// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { readdirSync, readFileSync } from 'node:fs';

/* Fecha de cada publicacion, para el <lastmod> del sitemap: le dice a Google
   que paginas se han actualizado y cuando, sin inventar fechas en las demas. */
function fechasDePublicaciones() {
  const mapa = new Map();
  try {
    const dir = new URL('./src/data/publicaciones/', import.meta.url);
    for (const f of readdirSync(dir)) {
      if (!f.endsWith('.json')) continue;
      const datos = JSON.parse(readFileSync(new URL(f, dir), 'utf8'));
      if (datos.slug && datos.date) mapa.set('/publicaciones/' + datos.slug + '/', datos.date);
    }
  } catch {
    /* si no se puede leer, el sitemap sale sin lastmod */
  }
  return mapa;
}
const FECHAS_PUBLICACIONES = fechasDePublicaciones();

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
  integrations: [
    sitemap({
      serialize(item) {
        const fecha = FECHAS_PUBLICACIONES.get(new URL(item.url).pathname);
        if (fecha) item.lastmod = new Date(fecha + 'T00:00:00Z').toISOString();
        return item;
      }
    })
  ],
  build: { inlineStylesheets: 'auto' }
});
