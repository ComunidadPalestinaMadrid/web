// Apariciones en medios de la asociación, verificadas una a una (enlace vivo y
// mención explícita a la Asociación Hispano Palestina Jerusalén / Comunidad
// Palestina de Madrid). Ordenadas de más reciente a más antigua.
export interface Aparicion {
  medio: string;
  titular: string;
  subtitulo?: string;
  url: string;
  fecha: string; // ISO (YYYY-MM-DD)
}

export const APARICIONES: Aparicion[] = [
  {
    medio: 'Infobae',
    titular: 'Manifestantes exigen en Madrid el fin de las relaciones con Israel y una Palestina libre',
    url: 'https://www.infobae.com/america/agencias/2026/05/17/manifestantes-exigen-en-madrid-el-fin-de-las-relaciones-con-israel-y-una-palestina-libre/',
    fecha: '2026-05-17'
  },
  {
    medio: 'Notimérica',
    titular: 'Una manifestación en Madrid pide el "boicot" a Israel en el 78 aniversario de la Nakba',
    subtitulo: 'Unas 1.300 personas, según datos de la Delegación del Gobierno, se han manifestado en Madrid este domingo.',
    url: 'https://www.notimerica.com/politica/noticia-manifestacion-madrid-pide-boicot-israel-78-aniversario-nakba-20260517154219.html',
    fecha: '2026-05-17'
  },
  {
    medio: 'Europa Press TV',
    titular: 'Manifestantes denuncian que "continúa el genocidio" pese al "supuesto acuerdo de alto el fuego"',
    subtitulo: 'Declaraciones del portavoz de la Red Solidaria contra la Ocupación de Palestina, Héctor Grad, y de Saad Youssef, de la Comunidad Palestina de Madrid.',
    url: 'https://www.europapress.tv/politica/1047707/1/manifestantes-denuncian-continua-genocidio-pese-supuesto-acuerdo-alto-fuego',
    fecha: '2026-02-01'
  },
  {
    medio: 'Infobae',
    titular: 'Una protesta en Madrid pide el embargo de armas a Israel y denuncia que "el genocidio en Palestina continúa"',
    url: 'https://www.infobae.com/america/agencias/2026/02/01/una-protesta-en-madrid-pide-el-embargo-de-armas-a-israel-y-denuncia-que-el-genocidio-en-palestina-continua/',
    fecha: '2026-02-01'
  },
  {
    medio: 'El Plural',
    titular: 'Miles de personas colapsan Madrid contra el genocidio en Gaza: "La paz de Trump es un fraude"',
    subtitulo: 'La marcha, impulsada por la Asociación Hispano Palestina Jerusalén (AHPJ) y la Red Solidaria Contra la Ocupación de Palestina, recorrió el centro de Madrid.',
    url: 'https://www.elplural.com/politica/espana/miles-personas-colapsan-madrid-contra-genocidio-gaza-la-paz-trump-fraude_366355102',
    fecha: '2025-11-30'
  },
  {
    medio: 'elDiario.es',
    titular: 'Madrid sale a la calle 78 años después de la partición de Palestina: "El genocidio no ha parado"',
    subtitulo: 'Miles de personas vuelven a manifestarse por el centro de Madrid para reclamar que los medios de comunicación sigan informando de lo que sucede en Palestina.',
    url: 'https://www.eldiario.es/sociedad/madrid-sale-calle-78-anos-despues-particion-palestina-genocidio-no-parado-palestina_1_12808199.html',
    fecha: '2025-11-29'
  },
  {
    medio: 'ABC',
    titular: 'Palestinos en España piden el alto al genocidio en Gaza',
    subtitulo: 'Madrid, 4 oct (EFE).- La presidenta de la Asociación Hispano Palestina Jerusalén, Saida Ghodaieh, ha pedido este sábado el alto al genocidio en Gaza.',
    url: 'https://www.abc.es/internacional/palestinos-espana-piden-alto-genocidio-gaza-20251004193911-vi.html',
    fecha: '2025-10-04'
  },
  {
    medio: 'Europa Press TV',
    titular: 'Asociaciones defienden que "el derecho de autodeterminación es de los propios palestinos"',
    subtitulo: 'Declaraciones de los portavoces de la campaña por el fin del comercio de armas con Israel: la Asociación Hispano-Palestina Jerusalén, Madrid con Palestina y la Red Solidaria contra la Ocupación de Palestina.',
    url: 'https://www.europapress.tv/sociedad/1015126/1/asociaciones-defienden-derecho-autodeterminacion-propios-palestinos',
    fecha: '2025-10-04'
  },
  {
    medio: 'Público',
    titular: 'La presidenta de la Asociación Hispano-Palestina Jerusalén exige a Sánchez romper relaciones diplomáticas con Israel',
    subtitulo: 'Saida Ghodaieh Curiel ha demandado al presidente del Gobierno, a través de una misiva enviada este sábado, acciones inmediatas como exigir sanciones internacionales.',
    url: 'https://www.publico.es/internacional/asia/presidenta-asociacion-hispano-palestina-jerusalen-exige-sanchez-romper-relaciones-diplomaticas-israel.html',
    fecha: '2025-07-26'
  },
  {
    medio: 'Izquierda Diario',
    titular: 'VOX lleva a la Audiencia Nacional a activistas propalestinas por hablar públicamente contra el genocidio',
    subtitulo: 'Dos activistas estaban llamadas a una primera declaración en la Audiencia Nacional por un presunto delito de enaltecimiento del terrorismo; a su salida comparecieron junto a Amnistía Internacional y la Comunidad Palestina de Madrid.',
    url: 'https://www.izquierdadiario.es/VOX-lleva-a-la-Audiencia-Nacional-a-activistas-propalestinas-por-hablar-publicamente-contra-el',
    fecha: '2024-10-29'
  },
  {
    medio: 'Europa Press',
    titular: "El alcalde de Pamplona recibe al presidente de la Asociación de la Comunidad Hispano Palestina 'Jerusalén'",
    subtitulo: 'El alcalde de Pamplona, Joseba Asiron, ha recibido este viernes al presidente de la asociación.',
    url: 'https://www.europapress.es/navarra/noticia-alcalde-pamplona-recibe-presidente-asociacion-comunidad-hispano-palestina-jerusalen-20180316160244.html',
    fecha: '2018-03-16'
  },
  {
    medio: 'El Salto Diario',
    titular: 'Carmena entrega al presidente israelí la llave de oro de Madrid',
    subtitulo: 'Diversas organizaciones de defensa de los derechos palestinos, entre ellas la Asociación Hispano-Palestina Jerusalén, protestaron contra la entrega de la llave de oro a Reuven Rivlin.',
    url: 'https://www.elsaltodiario.com/israel/carmena-entrega-al-presidente-israeli-la-llave-de-oro-de-madrid',
    fecha: '2017-11-06'
  },
  {
    medio: 'infoLibre',
    titular: 'Carmena recibe al presidente de Israel, Reuven Rivlin, frente a las críticas de colectivos pacifistas',
    subtitulo: 'La Asociación Hispano-Palestina Jerusalén figuró entre los colectivos que denunciaron la entrega de la llave de oro de Madrid al presidente israelí.',
    url: 'https://www.infolibre.es/noticias/politica/2017/11/06/carmena_recibe_presidente_israel_reuven_rivlin_frente_las_criticas_colectivos_pacifistas_71562_1012.html',
    fecha: '2017-11-06'
  }
].sort((a, b) => b.fecha.localeCompare(a.fecha));

export const CONTACTO_PRENSA = {
  email: 'c.hispano.palestina.madrid@gmail.com',
  idiomas: 'Español / English / العربية'
};
