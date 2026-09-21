// Secciones de la web (compartidas por el navbar y el pie de pagina).
export const NAV = [
  { key: 'nav.posts', path: '/publicaciones' },
  { key: 'nav.calendario', path: '/calendario' },
  {
    key: 'nav.actividades',
    children: [
      { key: 'nav.cole', path: '/cole-arabe' },
      { key: 'nav.refugiados', path: '/atencion-a-refugiados' }
    ]
  },
  {
    key: 'nav.comunidad',
    children: [
      { key: 'nav.quienes', path: '/quienes-somos' },
      { key: 'nav.contacto', path: '/contacto' }
    ]
  },
  {
    key: 'nav.prensa',
    children: [
      { key: 'nav.salaPrensa', path: '/prensa' },
      { key: 'nav.apariciones', path: '/prensa/apariciones' }
    ]
  },
  { key: 'nav.participa', path: '/participa' }
] as const;

/** Todos los enlaces hoja (sin desplegables), para el pie de pagina. */
export const NAV_ENLACES = NAV.flatMap((item) => ('children' in item ? item.children : [item]));
