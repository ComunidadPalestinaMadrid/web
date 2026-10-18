// Datos centrales de la asociacion.
export const SITE = {
  nombre: 'Comunidad Hispano Palestina Jerusalén',
  siglas: 'AHPJ',
  corto: 'Comunidad Palestina de Madrid',
  cif: 'G79855748',
  domicilio: 'C/ Cuevas de Almanzora 46 - Local, 28033, Madrid',
  dominio: 'comunidadpalestina.madrid',
  url: 'https://comunidadpalestina.madrid',
  lema: 'Palestina resiste, Palestina vencerá',
  fundacion: 1988,
  ciudad: 'Madrid',
  emails: {
    asociacion: 'c.hispano.palestina.madrid@gmail.com',
    cole: 'escuela.arabe.jerusalem@gmail.com'
  },
  instagram: {
    usuario: '@asc.hispanopalestinajerusalen',
    url: 'https://www.instagram.com/asc.hispanopalestinajerusalen/'
  },
  formularioContacto: 'https://forms.gle/F7FHvF6YaA9jhVwJ8',
  formularioAfiliacion: 'https://forms.gle/F7FHvF6YaA9jhVwJ8',
  rna: '76.614',
  webAntigua: 'https://comunidadhispanopalestinamadridblog.wordpress.com/'
} as const;

export type Idioma = 'es' | 'ar';
export const IDIOMAS: Idioma[] = ['es', 'ar'];
