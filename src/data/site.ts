// Datos centrales de la asociacion.
export const SITE = {
  nombre: 'Comunidad Hispano Palestina Jerusalén',
  siglas: 'AHPJ',
  corto: 'Comunidad Palestina de Madrid',
  dominio: 'comunidadpalestina.madrid',
  url: 'https://comunidadpalestina.madrid',
  lema: 'Palestina resiste, Palestina vencerá',
  fundacion: 1988,
  ciudad: 'Madrid',
  emails: {
    asociacion: 'c.hispano.palestina.madrid@gmail.com',
    cole: 'Escuela.arabe.jerusalem@gmail.com'
  },
  instagram: {
    usuario: '@asc.hispanopalestinajerusalen',
    url: 'https://www.instagram.com/asc.hispanopalestinajerusalen/'
  },
  formularioContacto: 'https://forms.gle/F7FHvF6YaA9jhVwJ8',
  // [PENDIENTE] Formulario de afiliacion propio. De momento apunta al de contacto.
  formularioAfiliacion: 'https://forms.gle/F7FHvF6YaA9jhVwJ8',
  webAntigua: 'https://comunidadhispanopalestinamadridblog.wordpress.com/'
} as const;

export type Idioma = 'es' | 'ar';
export const IDIOMAS: Idioma[] = ['es', 'ar'];
