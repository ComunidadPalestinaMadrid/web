import { ui, defaultLang, type Lang } from './ui';
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

/* ---------------------------------------------------------------------------
   Idioma
   --------------------------------------------------------------------------- */

export function getLangFromUrl(url: URL): Lang {
  const [, first] = url.pathname.split('/');
  return first === 'ar' ? 'ar' : defaultLang;
}

export function useTranslations(lang: Lang) {
  return function t(key: keyof (typeof ui)['es']): string {
    return (ui[lang] as Record<string, string>)[key] ?? (ui[defaultLang] as Record<string, string>)[key];
  };
}

/** Devuelve la ruta localizada y con el prefijo base: es -> '/web/', ar -> '/web/ar/...' */
export function localizePath(path: string, lang: Lang): string {
  const clean = ('/' + path.replace(/^\/+|\/+$/g, '')).replace(/\/$/, '');
  const localized = lang === defaultLang
    ? (clean === '' ? '/' : clean + '/')
    : ('/ar' + clean + '/').replace(/\/\/+$/g, '/');
  return withBase(localized);
}

/** Quita el prefijo de idioma: /ar/contacto -> /contacto */
export function stripLang(pathname: string): string {
  const p = pathname.replace(/\/ar(?=\/|$)/, '');
  return p === '' ? '/' : p;
}

/** Ruta sin idioma ni prefijo de despliegue. */
export function currentPath(url: URL): string {
  return stripLang(stripBase(url.pathname));
}

export function dir(lang: Lang): 'ltr' | 'rtl' {
  return lang === 'ar' ? 'rtl' : 'ltr';
}

/* ---------------------------------------------------------------------------
   Fechas
   --------------------------------------------------------------------------- */

export function formatFecha(iso: string, lang: Lang): string {
  const d = new Date(iso + (iso.length === 10 ? 'T12:00:00' : ''));
  return new Intl.DateTimeFormat(lang === 'ar' ? 'ar-EG' : 'es-ES', {
    day: 'numeric', month: 'long', year: 'numeric'
  }).format(d);
}

export function formatFechaCorta(iso: string, lang: Lang): { dia: string; mes: string; anio: string } {
  const d = new Date(iso + (iso.length === 10 ? 'T12:00:00' : ''));
  const loc = lang === 'ar' ? 'ar-EG' : 'es-ES';
  return {
    dia: new Intl.DateTimeFormat(loc, { day: 'numeric' }).format(d),
    mes: new Intl.DateTimeFormat(loc, { month: 'short' }).format(d).replace('.', ''),
    anio: new Intl.DateTimeFormat(loc, { year: 'numeric' }).format(d)
  };
}

export const site = SITE;
export { ui, defaultLang };
export type { Lang };
