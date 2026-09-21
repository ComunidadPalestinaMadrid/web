import { ui, defaultLang, type Lang } from './ui';
import { SITE } from '../data/site';

export function getLangFromUrl(url: URL): Lang {
  const [, first] = url.pathname.split('/');
  return first === 'ar' ? 'ar' : defaultLang;
}

export function useTranslations(lang: Lang) {
  return function t(key: keyof (typeof ui)['es']): string {
    return (ui[lang] as Record<string, string>)[key] ?? (ui[defaultLang] as Record<string, string>)[key];
  };
}

/** Devuelve la ruta localizada: es -> '/', ar -> '/ar/...' */
export function localizePath(path: string, lang: Lang): string {
  const clean = ('/' + path.replace(/^\/+|\/+$/g, '')).replace(/\/$/, '');
  if (lang === defaultLang) return clean === '' ? '/' : clean + '/';
  return ('/ar' + clean + '/').replace(/\/\/+$/g, '/');
}

/** Quita el prefijo de idioma de una ruta: /ar/contacto -> /contacto */
export function stripLang(pathname: string): string {
  const p = pathname.replace(/\/ar(?=\/|$)/, '');
  return p === '' ? '/' : p;
}

export function dir(lang: Lang): 'ltr' | 'rtl' {
  return lang === 'ar' ? 'rtl' : 'ltr';
}

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
