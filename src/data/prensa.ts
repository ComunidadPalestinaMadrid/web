// Recopilacion de apariciones en medios (migrada de la web antigua) y notas de prensa.
export interface Mencion {
  medio: string;
  titulo: string;
  url: string;
  fecha: string;
}
export interface GrupoPrensa {
  evento: string;
  descripcion: string;
  menciones: Mencion[];
}

export const GRUPOS_PRENSA: GrupoPrensa[] = [
  {
    evento: 'Visita del presidente israelí Reuven Rivlin a Madrid (6-8 de noviembre de 2017)',
    descripcion:
      'Cobertura de las movilizaciones convocadas por la asociación y otros colectivos contra la entrega de las Llaves de Oro de Madrid al presidente de Israel y su visita al Senado.',
    menciones: [
      { medio: 'El Salto Diario', titulo: 'Carmena entrega al presidente israelí la llave de oro de Madrid', url: 'https://www.elsaltodiario.com/israel/carmena-entrega-al-presidente-israeli-la-llave-de-oro-de-madrid', fecha: '2017-11-06' },
      { medio: 'infoLibre', titulo: 'Carmena recibe al presidente de Israel entre las críticas de colectivos pacifistas', url: 'https://www.infolibre.es/noticias/politica/2017/11/06/carmena_recibe_presidente_israel_reuven_rivlin_frente_las_criticas_colectivos_pacifistas_71562_1012.html', fecha: '2017-11-06' },
      { medio: 'El Periódico', titulo: 'Carmena entrega las llaves de oro de Madrid al presidente de Israel con protesta en la calle', url: 'http://www.elperiodico.com/es/politica/20171106/carmena-entrega-las-llaves-de-oro-de-madrid-al-presidente-de-israel-con-protesta-en-la-calle-6405297', fecha: '2017-11-06' },
      { medio: 'Europa Press', titulo: 'Carmena entrega las llaves de oro de Madrid al presidente de Israel con protesta en la calle', url: 'https://www.europapress.es/madrid/noticia-carmena-entrega-llaves-oro-madrid-presidente-israel-protesta-calle-20171106140018.html', fecha: '2017-11-06' },
      { medio: 'La Vanguardia', titulo: 'Carmena entrega las llaves de oro de Madrid al presidente de Israel con protesta en la calle', url: 'https://www.lavanguardia.com/local/madrid/20171106/432678696037/carmena-entrega-las-llaves-de-oro-de-madrid-al-presidente-de-israel-con-protesta-en-la-calle.html', fecha: '2017-11-06' },
      { medio: 'Rebelión', titulo: 'Publicaciones sobre la visita del presidente de Israel a Madrid', url: 'https://www.rebelion.org/noticia.php?id=233756', fecha: '2017-11-06' },
      { medio: 'Tercera Información', titulo: 'Refugees, Palestina y Manuela Carmena', url: 'http://www.tercerainformacion.es/opinion/opinion/2017/11/06/refugees-palestina-y-manuela-carmena', fecha: '2017-11-06' },
      { medio: 'Madridiario', titulo: 'Concentración: Palestina toma la calle', url: 'https://www.madridiario.es/450079/concentracion-palestina-toma-la-calle', fecha: '2017-11-06' },
      { medio: 'Diario16', titulo: 'Los movimientos sociales consideran persona non grata al presidente israelí', url: 'http://diario16.com/los-movimientos-sociales-consideran-persona-non-grata-al-presidente-israel/', fecha: '2017-11-06' },
      { medio: 'Palestine Liberation', titulo: 'Senadores y diputados protestan contra la visita del presidente de Israel', url: 'http://www.palestinaliberation.com/2017/11/senadores-y-diputados-protestan-contra.html', fecha: '2017-11-08' }
    ]
  },
  {
    evento: 'Centenario de la Declaración Balfour (noviembre de 2017)',
    descripcion: 'Acciones y artículos con motivo del centenario de la Declaración Balfour de 1917.',
    menciones: [
      { medio: 'Palestine Liberation', titulo: '100 años de la Declaración Balfour', url: 'http://www.palestinaliberation.com/2017/11/100-anos-de-declaracion-balfour.html', fecha: '2017-11-02' }
    ]
  }
];

export const CONTACTO_PRENSA = {
  email: 'c.hispano.palestina.madrid@gmail.com',
  idiomas: 'Español / English / العربية'
};
