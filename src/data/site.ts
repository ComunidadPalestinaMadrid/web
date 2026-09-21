// Datos centrales de la asociacion.
export const SITE = {
  nombre: 'Asociación Hispano Palestina de Madrid',
  nombreLargo: 'Asociación de la Comunidad Hispano Palestina Jerusalén',
  siglas: 'AHPJ',
  corto: 'Comunidad Palestina de Madrid',
  dominio: 'comunidadpalestina.madrid',
  url: 'https://comunidadpalestina.madrid',
  lema: 'Palestina vive, Palestina libre',
  fundacion: 1988,
  ciudad: 'Madrid',
  presidente: '',
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
