// Calendario de eventos. Los eventos marcados con prueba:true son de ejemplo
// mientras la asociacion publica su calendario definitivo.
export type CategoriaEvento = 'movilización' | 'cultural' | 'institucional' | 'formacion';

export interface Evento {
  id: string;
  titulo: string;
  fecha: string;        // ISO (YYYY-MM-DD)
  hora?: string;        // HH:MM
  horaFin?: string;     // HH:MM (opcional)
  lugar: string;
  descripcion: string;
  categoria: CategoriaEvento;
  /** Ruta del cartel del evento, si lo tiene */
  imagen?: string;
  destacado?: boolean;
  prueba?: boolean;
}

export const EVENTOS: Evento[] = [
  {
    id: 'climbers-for-palestine-2026',
    titulo: 'Climbers for Palestine',
    fecha: '2026-09-25',
    hora: '17:00',
    horaFin: '23:00',
    lugar: 'Sharmwatico Bouldering, C/ de Guadarrama 18, Moralzarzal (Madrid)',
    descripcion: 'Jornada de competición, rifas, documental, concierto y mucho más en apoyo a Palestina. Después del éxito rotundo del apoyo a Palestina en el Mundial de escalada de Alcobendas y de su impacto en las Federaciones nacional e internacional, esta es otra muestra de apoyo del colectivo de la escalada a la causa palestina. Entrada: 10 €.',
    categoria: 'cultural',
    imagen: '/images/uploads/climbers-for-palestine-2026.webp',
    destacado: true
  },
  {
    id: 'manifestacion-4-octubre-2026',
    titulo: 'Manifestación 4/10 - El genocidio continua.',
    fecha: '2026-10-04',
    hora: '12:00',
    lugar: 'Glorieta de Carlos V, Madrid',
    descripcion: 'Manifestación en Madrid para denunciar que el genocidio continúa.',
    categoria: 'movilización',
    imagen: '/images/uploads/mani-4-octubre-2026.jpg',
    destacado: true
  },
  {
    id: 'becerril-8-2026',
    titulo: 'Manifestación por la absolución de los 8 de Becerril',
    fecha: '2026-10-18',
    hora: '12:00',
    lugar: 'Plaza de la Estación, Collado Villalba (Madrid)',
    descripcion: 'Los 8 de Becerril son ocho represaliados durante la Vuelta Ciclista de 2025. La manifestación, convocada por la Asamblea de Vivienda de Villalba, reclama su absolución y la libertad del pueblo palestino.',
    categoria: 'movilización',
    imagen: '/images/uploads/becerril.jpg'
  },
  {
    id: 'cocina-palestina-2027',
    titulo: 'Taller de cocina palestina (Cole Árabe)',
    fecha: '2027-01-24',
    hora: '11:00',
    lugar: 'Sede de la asociación, Madrid',
    descripcion: 'Taller familiar de cocina tradicional palestina: kunafa, hummus y taboule. Organizado por el Cole Árabe.',
    categoria: 'cultural',
    prueba: true
  },
  {
    id: 'curso-arabe-2027',
    titulo: 'Inicio del curso de árabe para adultos (Cole Árabe)',
    fecha: '2027-04-06',
    hora: '18:00',
    lugar: 'Sede de la asociación, Madrid',
    descripcion: 'Comienzo del curso de lengua árabe (nivel inicial e intermedio) y lectoescritura. Plazas limitadas.',
    categoria: 'formacion',
    destacado: true,
    prueba: true
  }
];

const hoy = () => new Date(new Date().toISOString().slice(0, 10) + 'T00:00:00');

export function proximosEventos(limite?: number): Evento[] {
  const h = hoy();
  const lista = EVENTOS
    .filter((e) => new Date(e.fecha + 'T23:59:59') >= h)
    .sort((a, b) => a.fecha.localeCompare(b.fecha));
  return typeof limite === 'number' ? lista.slice(0, limite) : lista;
}

/** Fecha local en formato iCalendar para una hora concreta: 20261007T190000 */
function fechaIcs(e: Evento, hora: string): string {
  const d = e.fecha.replace(/-/g, '');
  const [hh, mm] = hora.split(':');
  return d + 'T' + hh.padStart(2, '0') + mm.padStart(2, '0') + '00';
}

/** Suma horas a una hora HH:MM (por defecto los eventos duran 2 h). */
function sumarHoras(hora: string, n: number): string {
  const [hh, mm] = hora.split(':').map(Number);
  return String(Math.min(hh + n, 23)).padStart(2, '0') + ':' + String(mm || 0).padStart(2, '0');
}

/** Hora de inicio y de fin de un evento. */
function horario(e: Evento): { ini: string; fin: string } {
  const ini = e.hora || '12:00';
  return { ini, fin: e.horaFin || sumarHoras(ini, 2) };
}

function escaparIcs(s: string): string {
  return s.replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\n/g, '\\n');
}

function vevent(e: Evento): string[] {
  const { ini, fin } = horario(e);
  return [
    'BEGIN:VEVENT',
    'UID:' + e.id + '@comunidadpalestina.madrid',
    'DTSTAMP:' + fechaIcs(e, ini) + 'Z',
    'DTSTART;TZID=Europe/Madrid:' + fechaIcs(e, ini),
    'DTEND;TZID=Europe/Madrid:' + fechaIcs(e, fin),
    'SUMMARY:' + escaparIcs(e.titulo),
    'LOCATION:' + escaparIcs(e.lugar),
    'DESCRIPTION:' + escaparIcs(e.descripcion),
    'END:VEVENT'
  ];
}

/** Calendario completo, para suscribirse. */
export function generarIcs(): string {
  const lines = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//AHPJ//Calendario//ES', 'CALSCALE:GREGORIAN', 'X-WR-CALNAME:Comunidad Hispano Palestina Jerusalén'];
  for (const e of EVENTOS) lines.push(...vevent(e));
  lines.push('END:VCALENDAR');
  return lines.join('\r\n');
}

/** Un solo evento, para el boton "anadir al calendario" (Apple, Outlook, Android...). */
export function generarIcsEvento(e: Evento): string {
  const lines = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//AHPJ//Calendario//ES', 'CALSCALE:GREGORIAN'];
  lines.push(...vevent(e));
  lines.push('END:VCALENDAR');
  return lines.join('\r\n');
}

/** Enlace para anadir el evento directamente a Google Calendar. */
export function enlaceGoogleCalendar(e: Evento): string {
  const d = e.fecha.replace(/-/g, '');
  const { ini, fin } = horario(e);
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: e.titulo,
    dates: d + 'T' + ini.replace(':', '') + '00/' + d + 'T' + fin.replace(':', '') + '00',
    details: e.descripcion,
    location: e.lugar,
    ctz: 'Europe/Madrid'
  });
  return 'https://calendar.google.com/calendar/render?' + params.toString();
}

export function getEvento(id: string): Evento | undefined {
  return EVENTOS.find((e) => e.id === id);
}

/* ---------------------------------------------------------------------------
   Efemerides
   ---------------------------------------------------------------------------
   Conmemoraciones con dia y mes fijos que se repiten cada anio. No llevan
   cartel, lugar ni hora: se listan como enlaces con su fecha y tienen ficha
   propia con una descripcion larga.
   --------------------------------------------------------------------------- */

export interface Efemeride {
  id: string;
  titulo: string;
  dia: number;      // 1-31
  mes: number;      // 1-12
  /** Anio del acontecimiento conmemorado, si procede */
  anio?: number;
  /** Resumen corto (se usa como meta description) */
  descripcion: string;
  /** Texto alternativo de la imagen */
  altImagen?: string;
  /** Ruta de una imagen opcional (en /public) */
  imagen?: string;
  /** Pie de foto y credito de la imagen */
  creditoImagen?: string;
  /** Cuerpo largo en HTML; si falta se usa `descripcion` */
  contenido?: string;
}

export const EFEMERIDES: Efemeride[] = [
  {
    id: 'tierra',
    titulo: 'Día de la Tierra (Land Day)',
    dia: 30,
    mes: 3,
    anio: 1976,
    descripcion: 'El 30 de marzo de 1976 la población palestina con ciudadanía israelí convocó una huelga general contra la expropiación de miles de hectáreas de tierra en Galilea. El ejército israelí mató a seis personas y dejó más de cien heridas. Desde entonces el Día de la Tierra es el símbolo de la defensa de la tierra y del campesinado palestino, y una fecha central en la lucha contra la colonización.'
  },
  {
    id: 'nakba',
    titulo: 'Aniversario de la Nakba (1948)',
    dia: 15,
    mes: 5,
    anio: 1948,
    descripcion: 'El 15 de mayo de 1948, con la creación del Estado de Israel, comenzó la Nakba («catástrofe»): la expulsión y el desplazamiento forzoso de más de 750.000 personas palestinas y la destrucción de más de 500 pueblos. Cada 15 de mayo exigimos el derecho al retorno de las personas refugiadas palestinas, recogido en la resolución 194 de Naciones Unidas, y denunciamos que la limpieza étnica que empezó entonces no ha terminado.'
  },
  {
    id: 'naksa',
    titulo: 'Aniversario de la Naksa (1967)',
    dia: 5,
    mes: 6,
    anio: 1967,
    descripcion: 'El 5 de junio de 1967, con la ocupación de Cisjordania, Gaza, Jerusalén Este, los Altos del Golán y el Sinaí, comenzó la Naksa («el revés»). Seis días de guerra que completaron el despojo iniciado en 1948 y provocaron una nueva expulsión de cientos de miles de personas palestinas. Conmemoramos esta fecha para recordar que la ocupación de 1967 sigue vigente y que es ilegal según el derecho internacional.'
  },
  {
    id: 'martires-de-al-buraq',
    titulo: 'Ejecución de los tres mártires de Al-Buraq',
    dia: 17,
    mes: 6,
    anio: 1930,
    descripcion: 'El 17 de junio de 1930, las autoridades del Mandato británico ahorcaron en la prisión de Akka a Fouad Hijazi, Atta al-Zeer y Mohammed Khalil Jamjoum, tres de los primeros mártires del movimiento de presos palestinos.',
    imagen: '/images/uploads/3-martires-buraq.jpg',
    altImagen: 'Retrato de Fouad Hijazi, Atta al-Zeer y Mohammed Khalil Jamjoum, los tres mártires de Al-Buraq ejecutados en 1930',
    contenido: `
<p>El 17 de junio de 1930, las autoridades del Mandato británico ahorcaron en la prisión de Akka a Fouad Hijazi, Atta al-Zeer y Mohammed Khalil Jamjoum, tres de los primeros mártires del movimiento de presos palestinos. Su ejecución fue la respuesta colonial a su participación en la Revolución de Al-Buraq del año anterior, un levantamiento que estalló cuando grupos sionistas, tras una manifestación en el Muro de al-Buraq, izaron banderas sionistas y proclamaron que el lugar les pertenecía. Aquella provocación desencadenó protestas en Jerusalén, Haifa, Yafa y Safad, y las autoridades británicas detuvieron a cientos de palestinos. Veintiséis fueron condenados inicialmente a muerte; la presión popular logró que la mayoría de las penas fueran conmutadas por cadena perpetua, pero las de Hijazi, al-Zeer y Jamjoum se mantuvieron firmes.</p>

<p>Los tres hombres tenían perfiles distintos, pero compartían un mismo compromiso anticolonial. Fouad Hijazi, nacido en Safad en 1904, había estudiado en la Universidad Americana de Beirut y dejó un mensaje a su familia antes de morir en el que pedía que el 17 de junio fuera recordado cada año con discursos y canciones por Palestina. Mohammed Jamjoum, nacido en al-Khalil en 1902, también había pasado por la Universidad Americana de Beirut. Atta al-Zeer, nacido en la misma ciudad en 1895, era agricultor y obrero manual, conocido por su valor y su fuerza física. El día de la ejecución, se declaró una huelga general en toda Palestina y miles de personas se concentraron en Yafa, Haifa, al-Khalil, Nablus y Akka, desafiando la prohibición británica de enterrar los cuerpos en sus ciudades de origen.</p>

<p>Su memoria quedó inextricablemente unida a la cultura popular palestina. La canción «Min Sijjin Akka» («Desde la prisión de Akka»), atribuida al poeta obrero Nuḥ Ibrahim —quien años después moriría combatiendo en la revolución de 1936-1939—, se convirtió en un himno que aún hoy se entona en actos nacionales y celebraciones. El poeta Ibrahim Tuqan los inmortalizó en su poema «Martes Rojo», y el propio Fouad Hijazi dejó escrito que su muerte debía ser motivo de celebración, porque «la nación que se enfrenta a su miseria y lucha, es una nación que no morirá». A casi un siglo de distancia, la ejecución de estos tres mártires sigue siendo un símbolo de la continuidad de la resistencia palestina frente al colonialismo y la ocupación, y su legado resuena en la lucha actual por la liberación y el retorno.</p>

<h2>Fuentes</h2>

<ol>
  <li>Red de Solidaridad con los Presos Políticos Palestinos (Samidoun): «La revolución de Al-Buraq: El legado, la lucha continua y el movimiento de los presos palestinos» (17 de junio de 2017; versión actualizada). <a href="https://samidoun.net/la-revolucion-de-al-buraq-el-legado-la-lucha-continua-y-el-movimiento-de-los-presos-palestinos/" rel="noopener" target="_blank">samidoun.net</a></li>
  <li>Palestinapedia: artículo sobre la revolución de Al-Buraq de 1929. <a href="https://www.palestinapedia.net/%D8%AB%D9%88%D8%B1%D8%A9-1929-%D8%A7%D9%84%D8%A8%D8%B1%D8%A7%D9%82" rel="noopener" target="_blank">palestinapedia.net</a></li>
</ol>
`
  },
  {
    id: 'balfour',
    titulo: 'Aniversario de la Declaración Balfour (1917)',
    dia: 2,
    mes: 11,
    anio: 1917,
    descripcion: 'La Declaración Balfour fue una carta enviada el 2 de noviembre de 1917 y difundida una semana más tarde en la prensa británica en la que el Gobierno del Reino Unido manifestó su apoyo a la creación de un «hogar nacional judío» en Palestina, un territorio habitado mayoritariamente por población árabe palestina.',
    imagen: '/images/efemerides/balfour-declaracion.jpg',
    altImagen: 'Carta de la Declaración Balfour, firmada el 2 de noviembre de 1917',
    creditoImagen: 'Declaración Balfour (1917). British Library, vía Wikimedia Commons. Dominio público.',
    contenido: `
<p>La Declaración Balfour fue una carta enviada el 2 de noviembre de 1917 y difundida una semana más tarde en la prensa británica en la que el Gobierno del Reino Unido manifestó su apoyo a la creación de un «hogar nacional judío» en Palestina, un territorio habitado mayoritariamente por población árabe palestina. Esta declaración constituyó un punto de inflexión en la historia de la región y sentó las bases para el posterior establecimiento del Estado de Israel en 1948.</p>

<h2>¿Por qué fue tan importante?</h2>

<p>A principios del siglo XX, Palestina formaba parte del Imperio otomano y era una sociedad diversa, en la que convivían comunidades musulmanas, cristianas y judías.</p>

<p>El movimiento sionista, surgido en Europa a finales del siglo XIX, buscaba establecer un hogar nacional judío en Palestina. Para llevar adelante este proyecto, necesitaba el respaldo de una gran potencia internacional.</p>

<p>Ese apoyo llegó del Reino Unido en 1917, durante la Primera Guerra Mundial. El Gobierno británico, a través de su ministro de Asuntos Exteriores, Arthur James Balfour, anunció en una carta dirigida a Lionel Walter Rothschild, representante destacado de la comunidad judía británica que apoyaba la creación de un hogar nacional judío en Palestina.</p>

<p>La población palestina, mayoritaria en aquel territorio, no fue consultada sobre su futuro.</p>

<p>La declaración abrió una nueva etapa de respaldo británico a la colonización sionista de Palestina, que se intensificó durante el Mandato británico (1922-1948). La población palestina respondió con protestas, movilizaciones y distintas formas de resistencia, en las que destaca la participación activa de las mujeres.</p>

<p>Como explica el historiador Jorge Ramos Tolosa <a href="https://www.infolibre.es/opinion/plaza-publica/balfour-oslo-100-anos-complicidad-internacional-colonizacion-palestina-ii_1_1147171.html" rel="noopener" target="_blank">(1)</a>, la Declaración Balfour refleja cómo una potencia colonial europea decidió sobre el futuro de un territorio sin tener en cuenta la voluntad de su población autóctona.</p>

<p>Este proceso histórico es fundamental para comprender la creación del Estado de Israel en 1948 y la Nakba («catástrofe» en árabe), durante la cual cientos de miles de palestinos fueron expulsados o huyeron de sus hogares.</p>

<h2>Fuentes</h2>

<ol>
  <li>Basallote, Antonio; Checa, Diego; López, Lucía; Ramos, Jorge: «De Balfour a Oslo: 100 años de complicidad internacional con la colonización de Palestina (y II)», <a href="https://www.infolibre.es/opinion/plaza-publica/balfour-oslo-100-anos-complicidad-internacional-colonizacion-palestina-ii_1_1147171.html" rel="noopener" target="_blank">infoLibre</a>.</li>
</ol>
`
  },
  {
    id: 'muros',
    titulo: 'Día Internacional contra los Muros y la Ocupación',
    dia: 9,
    mes: 11,
    descripcion: 'Cada 9 de noviembre, aniversario de la caída del Muro de Berlín, recordamos que en Palestina los muros siguen en pie: el muro de separación, las colonias, los puestos de control y las demoliciones de viviendas fragmentan el territorio y la vida cotidiana del pueblo palestino. Denunciamos también a las empresas y a los Estados que se lucran con la ocupación.'
  },
  {
    id: 'arafat',
    titulo: 'Aniversario del asesinato de Yasser Arafat',
    dia: 13,
    mes: 11,
    anio: 2004,
    descripcion: 'El 11 de noviembre de 2004 fallecía en el hospital militar de Clamart, en Francia, Yasser Arafat, presidente de la Organización para la Liberación de Palestina y de la Autoridad Nacional Palestina, y símbolo de la lucha por la autodeterminación del pueblo palestino. Las circunstancias de su muerte nunca se han aclarado por completo.'
  },
  {
    id: 'infancia',
    titulo: 'Día Mundial de la Infancia: la infancia palestina bajo ocupación',
    dia: 20,
    mes: 11,
    descripcion: 'El 20 de noviembre, Día Mundial de la Infancia, ponemos el foco en los niños y las niñas palestinas, que crecen bajo ocupación militar, bloqueo y ataques. Reclamamos el cumplimiento de la Convención sobre los Derechos del Niño para toda la infancia palestina, sin excepciones, y el fin de la impunidad ante los crímenes contra la niñez.'
  },
  {
    id: 'solidaridad',
    titulo: 'Día de la Partición de Palestina',
    dia: 29,
    mes: 11,
    anio: 1947,
    descripcion: 'El 29 de noviembre de 1947 la Asamblea General de Naciones Unidas aprobó la resolución 181, que dividía Palestina sin consultar a su población. Cada año recordamos esa fecha para reivindicar el derecho a la autodeterminación y exigir el fin de la ocupación.'
  },
  {
    id: 'ddhh',
    titulo: 'Día de los Derechos Humanos',
    dia: 10,
    mes: 12,
    anio: 1948,
    descripcion: 'El 10 de diciembre de 1948 se aprobó la Declaración Universal de los Derechos Humanos. Ese día denunciamos que la ocupación y el apartheid israelíes vulneran de forma sistemática los derechos recogidos en la Declaración: la vida, la vivienda, la libertad de movimiento, la educación y la dignidad del pueblo palestino, y reclamamos que ningún Estado quede fuera de su cumplimiento.'
  }
];

const MESES = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];

/** "2 de noviembre" */
export function formatDiaMes(dia: number, mes: number): string {
  return dia + ' de ' + MESES[mes - 1];
}

/** Fecha (a mediodia local) de la proxima vez que cae la efemeride. */
export function proximaFechaEfemeride(e: Efemeride, desde: Date = hoy()): Date {
  const base = new Date(desde.getFullYear(), e.mes - 1, e.dia, 12);
  return base >= desde ? base : new Date(desde.getFullYear() + 1, e.mes - 1, e.dia, 12);
}

/** Efemerides ordenadas por proximidad, con la fecha de su proxima aparicion. */
export function efemeridesProximas(desde: Date = hoy()): { efemeride: Efemeride; fecha: Date }[] {
  return EFEMERIDES.map((efemeride) => ({ efemeride, fecha: proximaFechaEfemeride(efemeride, desde) }))
    .sort((a, b) => a.fecha.getTime() - b.fecha.getTime());
}

export function getEfemeride(id: string): Efemeride | undefined {
  return EFEMERIDES.find((e) => e.id === id);
}
