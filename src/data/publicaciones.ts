// Carga las publicaciones migradas de la web antigua.
const modules = import.meta.glob<{ default: Publicacion }>('./publicaciones/*.json', { eager: true });

export type TipoPublicacion = 'noticia' | 'comunicado' | 'campana' | 'articulo' | 'nota-prensa';

export interface Publicacion {
  slug: string;
  title: string;
  date: string;
  tipo: TipoPublicacion;
  categorias: string[];
  resumen: string;
  portada: string;
  originalUrl: string;
  html: string;
}

export const publicaciones: Publicacion[] = Object.values(modules)
  .map((m) => m.default)
  .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));

export const TIPOS: TipoPublicacion[] = ['noticia', 'comunicado', 'campana', 'articulo', 'nota-prensa'];

export const ETIQUETA_TIPO: Record<TipoPublicacion, string> = {
  noticia: 'pub.noticia',
  comunicado: 'pub.comunicado',
  campana: 'pub.campana',
  articulo: 'pub.articulo',
  'nota-prensa': 'pub.nota-prensa'
};

export const CLASE_TIPO: Record<TipoPublicacion, string> = {
  noticia: 'etiqueta--noticia',
  comunicado: 'etiqueta--comunicado',
  campana: 'etiqueta--campana',
  articulo: 'etiqueta--articulo',
  'nota-prensa': 'etiqueta--nota-prensa'
};

export function porTipo(tipo: TipoPublicacion | 'todas'): Publicacion[] {
  return tipo === 'todas' ? publicaciones : publicaciones.filter((p) => p.tipo === tipo);
}

export function ultimas(n: number): Publicacion[] {
  return publicaciones.slice(0, n);
}

export function notasDePrensa(): Publicacion[] {
  return publicaciones.filter((p) => p.tipo === 'nota-prensa');
}

export function getPublicacion(slug: string): Publicacion | undefined {
  return publicaciones.find((p) => p.slug === slug);
}
