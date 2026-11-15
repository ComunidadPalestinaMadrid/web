// Campaña de recaudación: "Reencuentros que salvan vidas".

/** Importe en euros con separador de millar siempre (6.000 €, no 6000 €). */
export const euros = (n: number) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, '.') + ' €';
// El importe recaudado se revisa a mano cada dia a las 12:00 y se publica aqui.

export const CAMPANA = {
  titulo: 'Reencuentros que salvan vidas: 10 refugiados palestinos de Gaza a España',
  /** Titular corto, para el destacado de la portada */
  tituloCorto: 'Reencuentros que salvan vidas',
  subtitulo: 'Vamos a traer a España 10 familiares de las personas evacuadas de Gaza el 24 de noviembre. Se nos ha abierto la oportunidad de manera inesperada y no podemos dejarla pasar.',
  descripcion: 'Reagrupación para traer a familiares de personas evacuadas de Gaza. Necesitamos 6.000 € para los billetes de avión de 10 personas refugiadas.',

  /** Importes en euros */
  objetivoMinimo: 6000,
  objetivoOptimo: 10000,

  /** Donaciones recibidas, de la mas reciente a la mas antigua.
      El total recaudado se calcula solo a partir de esta lista. */
  donaciones: [
    { fecha: '2026-11-15', importe: 50, nombre: 'Anónimo' },
    { fecha: '2026-11-15', importe: 50, nombre: 'Anónimo' },
    { fecha: '2026-11-15', importe: 30, nombre: 'Carmen Masip' },
    { fecha: '2026-11-15', importe: 10, nombre: 'Anónimo' },
    { fecha: '2026-11-15', importe: 200, nombre: 'Anónimo' },
    { fecha: '2026-11-15', importe: 1000, nombre: 'Anónimo' },
    { fecha: '2026-11-15', importe: 10, nombre: 'Anónimo' },
    { fecha: '2026-11-15', importe: 200, nombre: 'Anónimo' },
    { fecha: '2026-11-15', importe: 20, nombre: 'Anónimo' },
    { fecha: '2026-11-15', importe: 10, nombre: 'Anónimo' },
    { fecha: '2026-11-15', importe: 15, nombre: 'Sara' },
    { fecha: '2026-11-15', importe: 5, nombre: 'Anónimo' },
    { fecha: '2026-11-15', importe: 20, nombre: 'Anónimo' },
    { fecha: '2026-11-15', importe: 500, nombre: 'Nadim' },
    { fecha: '2026-11-15', importe: 50, nombre: 'Rasmia' },
    { fecha: '2026-11-15', importe: 50, nombre: 'Sol' },
    { fecha: '2026-11-15', importe: 10, nombre: 'OBH' },
    { fecha: '2026-11-15', importe: 50, nombre: 'María Teresa Hernández' },
    { fecha: '2026-11-15', importe: 10, nombre: 'Anónimo' },
    { fecha: '2026-11-15', importe: 26, nombre: 'Anónimo' },
    { fecha: '2026-11-15', importe: 20, nombre: 'David Hinojos' },
    { fecha: '2026-11-15', importe: 50, nombre: 'Anhabuha' },
    { fecha: '2026-11-15', importe: 25, nombre: 'JM Barri' },
    { fecha: '2026-11-15', importe: 50, nombre: 'Amada' },
    { fecha: '2026-11-15', importe: 50, nombre: 'Anónimo' },
    { fecha: '2026-11-15', importe: 30, nombre: 'María López' },
    { fecha: '2026-11-15', importe: 1000, nombre: 'Américo Rodríguez' },
    { fecha: '2026-11-15', importe: 80, nombre: 'Anónimo' },
    { fecha: '2026-11-15', importe: 20, nombre: 'Sajda Zagou' },
    { fecha: '2026-11-15', importe: 10, nombre: 'Anónimo' },
    { fecha: '2026-11-15', importe: 150, nombre: 'Inés Gómez' },
    { fecha: '2026-11-15', importe: 100, nombre: 'Carmen Perea' },
    { fecha: '2026-11-15', importe: 300, nombre: 'Anónimo' },
    { fecha: '2026-11-15', importe: 40, nombre: 'Anónimo' },
    { fecha: '2026-11-15', importe: 100, nombre: 'Rosalía y Taysir' },
    { fecha: '2026-11-15', importe: 200, nombre: 'Kamal Salim Halawa' },
    { fecha: '2026-11-15', importe: 50, nombre: 'Anónimo' },
    { fecha: '2026-11-15', importe: 50, nombre: 'Anónimo' },
    { fecha: '2026-11-15', importe: 50, nombre: 'Anónimo' },
    { fecha: '2026-11-15', importe: 50, nombre: 'Anónimo' }
  ],
  actualizado: '2026-11-15',
  /** Hora de la ultima revision del listado (HH:MM) */
  horaActualizacion: '15:46',

  /** Ultimo dia de campana */
  fechaLimite: '2026-11-24',

  /** Video de la campana (URL de YouTube). Vacio = hueco reservado. */
  videoUrl: 'https://youtube.com/shorts/9w39VYWpa9g',
  /** Banner horizontal. Vacio = hueco reservado. */
  banner: '',

  cuenta: {
    iban: 'ES4521002566981300788761',
    beneficiario: 'ASOC. COM. HISPANO PALESTINA (JERUSALEN)',
    concepto: 'DONACION REFUGIADOS GAZA + [TU NOMBRE]'
  },

  /** Suma de las donaciones */
  get recaudado() { return this.donaciones.reduce((t, d) => t + d.importe, 0); },

  contenido: `<h2>La situación: familias rotas por el genocidio</h2>
<p>Desde el inicio del <strong>genocidio en Palestina</strong>, miles de familias palestinas han quedado separadas. Algunas personas fueron evacuadas desde Gaza a España, pero sus seres queridos quedaron <strong>atrapados en Gaza</strong>, viviendo en condiciones de extrema vulnerabilidad, sin acceso a derechos básicos y con el miedo constante de no volver a verse.</p>
<p>La <strong>reagrupación familiar</strong> es un derecho reconocido en la legislación española, pero el proceso es costoso, complejo y lleno de barreras administrativas. Ahora, tras un largo trabajo de mediación, <strong>se nos ha abierto la posibilidad de traer a 10 personas familiares de estas evacuadas</strong>.</p>

<h2>Nuestro objetivo</h2>
<p>Desde la <strong>Comunidad Hispano Palestina Jerusalén</strong> tenemos todo organizado para traer 10 personas refugiadas desde Gaza hasta Jordania, y de ahí a Madrid, para que puedan reunirse con sus familias, ya evacuadas y residentes en España. Todas ellas cumplen los requisitos legales para acogerse al derecho de reagrupación familiar. <strong>Para hacerlo posible, necesitamos recaudar como mínimo 6.000€.</strong></p>

<h2>¿En qué se invertirá lo recaudado?</h2>
<p><strong>El gasto fundamental son los billetes de avión y gastos asociados al transporte.</strong></p>
<p>Todos los demás gastos relativos a tasas consulares, visados, y demás gastos de gestión están ya resueltos.</p>
<p>El presupuesto mínimo para poner en marcha la campaña será de 6.000 €. <strong>Si superamos el objetivo, haremos una aportación monetaria a las familias refugiadas que se apoyan en la Comunidad Palestina de Madrid.</strong></p>

<h2>Recompensas</h2>
<p>Si aportas, tu nombre aparecerá en la web de agradecimientos de la Asociación si así lo deseas.</p>
<p>No hay mayores recompensas, la aportación monetaria es lo mínimo que podemos hacer para apoyar a estar personas que llevan tres años viviendo un genocidio.</p>

<h2>Sobre la Comunidad Hispano Palestina Jerusalén</h2>
<p>La Comunidad Hispano Palestina Jerusalén, también conocida como la Comunidad Palestina de Madrid o la Hispanopalestina es una asociación sin ánimo de lucro, legalmente constituida el 11 de enero de 1988, que nace con el objetivo de reunir a las personas palestinas de Madrid en un espacio de encuentro social, cultural y comunitario.</p>
<p>Somos un espacio de convivencia, participación y solidaridad que busca fortalecer los vínculos entre las personas palestinas, preservar nuestra identidad colectiva y mantener viva nuestra lengua, cultura y memoria. Al mismo tiempo, trabajamos por la defensa de los derechos del pueblo palestino y por la construcción de una sociedad más justa, igualitaria e inclusiva, tanto en Palestina como aquí en España.</p>
<p>No partimos de cero: ya hemos acompañado con éxito otros procesos de reagrupación y conocemos de primera mano las dificultades del sistema. Solos no podemos. Necesitamos tu ayuda para que estos 10 reencuentros sean una realidad.</p>
<p><strong>Cada aportación, por pequeña que sea, acerca a una familia a su reencuentro. ¡Ayúdanos a cruzar la última frontera!</strong></p>`
} as const;
