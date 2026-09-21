// Calendario de eventos. Los eventos marcados con prueba:true son de ejemplo
// mientras la asociacion publica su calendario definitivo.
export type CategoriaEvento = 'movilización' | 'cultural' | 'institucional' | 'formacion';
export type IdiomaEvento = 'es' | 'ar';

export interface Evento {
  id: string;
  titulo: string;
  tituloAr?: string;
  fecha: string;        // ISO (YYYY-MM-DD)
  hora?: string;
  lugar: string;
  lugarAr?: string;
  descripcion: string;
  descripcionAr?: string;
  categoria: CategoriaEvento;
  /** Ruta del cartel del evento, si lo tiene */
  imagen?: string;
  destacado?: boolean;
  prueba?: boolean;
}

export const EVENTOS: Evento[] = [
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
    id: 'balfour-2026',
    titulo: 'Aniversario de la Declaración Balfour (1917)',
    fecha: '2026-11-07',
    hora: '12:00',
    lugar: '',
    descripcion: '',
    categoria: 'institucional',
    prueba: true
  },
  {
    id: 'muros-2026',
    titulo: 'Día Internacional contra los Muros y la Ocupación',
    fecha: '2026-11-09',
    hora: '18:30',
    lugar: 'Plaza de Callao, Madrid',
    descripcion: 'Jornada contra el muro de separación, las demoliciones y la colonización del territorio palestino.',
    categoria: 'movilización',
    prueba: true
  },
  {
    id: 'arafat-2026',
    titulo: 'Aniversario del asesinato de Yasser Arafat',
    fecha: '2026-11-13',
    hora: '',
    lugar: '',
    descripcion: 'Homenaje a la figura histórica de Yasser Arafat y a la lucha por la autodeterminación del pueblo palestino.',
    categoria: 'institucional',
    prueba: true
  },
  {
    id: 'infancia-2026',
    titulo: 'Día Mundial de la Infancia: la infancia palestina bajo ocupación',
    fecha: '2026-11-20',
    hora: '18:00',
    lugar: 'Centro cultural, Madrid',
    descripcion: 'Actividad familiar y educativa sobre los derechos de la infancia palestina.',
    categoria: 'cultural',
    prueba: true
  },
  {
    id: 'solidaridad-onu-2026',
    titulo: 'Día de la Partición de Palestina',
    fecha: '2026-11-29',
    hora: '12:00',
    lugar: 'Madrid',
    descripcion: 'Acto central anual conmemorando la resolución 181 de Naciones Unidas y reclamando el fin de la ocupación.',
    categoria: 'movilización',
    destacado: true,
    prueba: true
  },
  {
    id: 'ddhh-2026',
    titulo: 'Día de los Derechos Humanos: mesa redonda sobre Palestina',
    fecha: '2026-12-10',
    hora: '18:30',
    lugar: 'Ateneo, Madrid',
    descripcion: 'Mesa redonda con juristas y activistas sobre derecho internacional y crímenes en Gaza.',
    categoria: 'cultural',
    prueba: true
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
    id: 'tierra-2027',
    titulo: 'Día de la Tierra (Land Day)',
    fecha: '2027-03-30',
    hora: '12:00',
    lugar: 'Madrid',
    descripcion: 'Conmemoración del 51 aniversario del Día de la Tierra y defensa de la tierra y el campesinado palestino.',
    categoria: 'movilización',
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
  },
  {
    id: 'nakba-2027',
    titulo: 'Aniversario de la Nakba (1948)',
    fecha: '2027-05-15',
    hora: '12:00',
    lugar: 'Madrid',
    descripcion: 'Conmemoración de la Nakba y reivindicación del derecho al retorno de los refugiados palestinos.',
    categoria: 'movilización',
    destacado: true,
    prueba: true
  },
  {
    id: 'naksa-2027',
    titulo: 'Aniversario de la Naksa (1967)',
    fecha: '2027-06-05',
    hora: '19:00',
    lugar: 'Madrid',
    descripcion: 'Acto de memoria de la ocupación de 1967 y de la situación actual de Jerusalén y Cisjordania.',
    categoria: 'institucional',
    prueba: true
  }
];

export function tituloEvento(e: Evento, lang: IdiomaEvento): string {
  return lang === 'ar' && e.tituloAr ? e.tituloAr : e.titulo;
}
export function descripcionEvento(e: Evento, lang: IdiomaEvento): string {
  return lang === 'ar' && e.descripcionAr ? e.descripcionAr : e.descripcion;
}
export function lugarEvento(e: Evento, lang: IdiomaEvento): string {
  return lang === 'ar' && e.lugarAr ? e.lugarAr : e.lugar;
}

const hoy = () => new Date(new Date().toISOString().slice(0, 10) + 'T00:00:00');

export function proximosEventos(limite?: number): Evento[] {
  const h = hoy();
  const lista = EVENTOS
    .filter((e) => new Date(e.fecha + 'T23:59:59') >= h)
    .sort((a, b) => a.fecha.localeCompare(b.fecha));
  return typeof limite === 'number' ? lista.slice(0, limite) : lista;
}

export function eventosPorAnio(): Record<string, Evento[]> {
  const grupos: Record<string, Evento[]> = {};
  for (const e of [...EVENTOS].sort((a, b) => a.fecha.localeCompare(b.fecha))) {
    const anio = e.fecha.slice(0, 4);
    (grupos[anio] ||= []).push(e);
  }
  return grupos;
}

/** Fecha local en formato iCalendar: 20261007T190000 */
function fechaIcs(e: Evento): string {
  const d = e.fecha.replace(/-/g, '');
  const [hh, mm] = (e.hora || '12:00').split(':');
  return d + 'T' + hh + mm + '00';
}

function escaparIcs(s: string): string {
  return s.replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\n/g, '\\n');
}

function vevent(e: Evento): string[] {
  return [
    'BEGIN:VEVENT',
    'UID:' + e.id + '@comunidadpalestina.madrid',
    'DTSTAMP:' + fechaIcs(e) + 'Z',
    'DTSTART;TZID=Europe/Madrid:' + fechaIcs(e),
    'SUMMARY:' + escaparIcs(e.titulo),
    'LOCATION:' + escaparIcs(e.lugar),
    'DESCRIPTION:' + escaparIcs(e.descripcion),
    'END:VEVENT'
  ];
}

/** Calendario completo, para suscribirse. */
export function generarIcs(): string {
  const lines = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//AHPJ//Calendario//ES', 'CALSCALE:GREGORIAN', 'X-WR-CALNAME:Asociación Hispano Palestina de Madrid'];
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
  const [hh, mm] = (e.hora || '12:00').split(':').map(Number);
  const inicio = d + 'T' + String(hh).padStart(2, '0') + String(mm).padStart(2, '0') + '00';
  const finHora = String(Math.min(hh + 2, 23)).padStart(2, '0') + String(mm).padStart(2, '0') + '00';
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: e.titulo,
    dates: inicio + '/' + d + 'T' + finHora,
    details: e.descripcion,
    location: e.lugar,
    ctz: 'Europe/Madrid'
  });
  return 'https://calendar.google.com/calendar/render?' + params.toString();
}

export function getEvento(id: string): Evento | undefined {
  return EVENTOS.find((e) => e.id === id);
}
