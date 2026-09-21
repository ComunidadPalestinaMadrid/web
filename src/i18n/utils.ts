import { ui } from './ui';
import { SITE } from '../data/site';

/* ---------------------------------------------------------------------------
   Rutas y URL
   --------------------------------------------------------------------------- */

/** Prefijo de despliegue: '/web' en GitHub Pages, '' con dominio propio. */
const RAW_BASE = import.meta.env.BASE_URL || '/';
export const BASE = RAW_BASE.endsWith('/') ? RAW_BASE.slice(0, -1) : RAW_BASE;

/** Origen del sitio (sin el prefijo base): https://ejemplo.org */
export const ORIGIN = ((import.meta.env.SITE as string | undefined) || SITE.url).replace(/\/$/, '');

/** Anade el prefijo base a una ruta absoluta del sitio. */
export function withBase(path: string): string {
  if (!path) return path;
  if (/^(?:[a-z][a-z0-9+.-]*:)?\/\//i.test(path) || path.startsWith('mailto:') || path.startsWith('tel:') || path.startsWith('#')) return path;
  const p = path.startsWith('/') ? path : '/' + path;
  return BASE && BASE !== '/' ? BASE + p : p;
}

/** Convierte una ruta local en URL absoluta con el origen del sitio. */
export function absoluteUrl(localPath: string): string {
  if (/^https?:\/\//i.test(localPath)) return localPath;
  const p = localPath.startsWith('/') ? localPath : '/' + localPath;
  return ORIGIN + p;
}

/** Quita el prefijo base de una ruta: /web/publicaciones -> /publicaciones */
export function stripBase(pathname: string): string {
  if (BASE && BASE !== '/' && (pathname === BASE || pathname.startsWith(BASE + '/'))) {
    const rest = pathname.slice(BASE.length);
    return rest === '' ? '/' : rest;
  }
  return pathname || '/';
}

/** Antepone el prefijo base a las imagenes y documentos dentro del HTML migrado. */
export function rewriteAssetUrls(html: string): string {
  if (!BASE || BASE === '/') return html;
  return html.replace(/((?:src|href)=")\/(images|documentos)\//g, (_m, attr: string, dir: string) => attr + BASE + '/' + dir + '/');
}

/** Ruta interna normalizada y con el prefijo base: '/publicaciones' -> '/web/publicaciones/' */
export function localizePath(path: string): string {
  const clean = ('/' + path.replace(/^\/+|\/+$/g, '')).replace(/\/$/, '');
  return withBase(clean === '' ? '/' : clean + '/');
}

/** Ruta actual sin el prefijo de despliegue. */
export function currentPath(url: URL): string {
  return stripBase(url.pathname);
}

/* ---------------------------------------------------------------------------
   Textos
   --------------------------------------------------------------------------- */

export function useTranslations() {
  return function t(key: keyof (typeof ui)['es']): string {
    return (ui.es as Record<string, string>)[key] ?? String(key);
  };
}

/* ---------------------------------------------------------------------------
   Fechas
   --------------------------------------------------------------------------- */

export function formatFecha(iso: string): string {
  const d = new Date(iso + (iso.length === 10 ? 'T12:00:00' : ''));
  return new Intl.DateTimeFormat('es-ES', { day: 'numeric', month: 'long', year: 'numeric' }).format(d);
}

export function formatFechaCorta(iso: string): { dia: string; mes: string; anio: string } {
  const d = new Date(iso + (iso.length === 10 ? 'T12:00:00' : ''));
  return {
    dia: new Intl.DateTimeFormat('es-ES', { day: 'numeric' }).format(d),
    mes: new Intl.DateTimeFormat('es-ES', { month: 'short' }).format(d).replace('.', ''),
    anio: new Intl.DateTimeFormat('es-ES', { year: 'numeric' }).format(d)
  };
}

export const site = SITE;
export { ui };
