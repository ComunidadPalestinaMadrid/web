// Campaña de recaudación: "Reencuentros que salvan vidas".

/** Importe en euros con separador de millar siempre (6.000 €, no 6000 €). */
export const euros = (n: number) => {
  const [ent, dec] = n.toFixed(2).split('.');
  const entero = ent.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return (dec === '00' ? entero : entero + ',' + dec) + ' €';
};
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
    { id: 'don-20261116-152', fecha: '2026-11-16', importe: 40, nombre: 'Anónimo' },
    { id: 'don-20261116-151', fecha: '2026-11-16', importe: 50, nombre: 'Ana' },
    { id: 'don-20261116-150', fecha: '2026-11-16', importe: 50, nombre: 'Karmele y Manuel' },
    { id: 'don-20261116-149', fecha: '2026-11-16', importe: 200, nombre: 'Inma y Jose' },
    { id: 'don-20261116-148', fecha: '2026-11-16', importe: 50, nombre: 'Anónimo' },
    { id: 'don-20261116-147', fecha: '2026-11-16', importe: 150, nombre: 'Teresa Ramos Rodríguez' },
    { id: 'don-20261116-146', fecha: '2026-11-16', importe: 50, nombre: 'Anónimo' },
    { id: 'don-20261116-145', fecha: '2026-11-16', importe: 100, nombre: 'AI' },
    { id: 'don-20261116-144', fecha: '2026-11-16', importe: 50, nombre: 'Anónimo' },
    { id: 'don-20261116-143', fecha: '2026-11-16', importe: 100, nombre: 'Nayef' },
    { id: 'don-20261116-142', fecha: '2026-11-16', importe: 30, nombre: 'Anónimo' },
    { id: 'don-20261116-141', fecha: '2026-11-16', importe: 70, nombre: 'Anónimo' },
    { id: 'don-20261116-140', fecha: '2026-11-16', importe: 50, nombre: 'Carmen Arias' },
    { id: 'don-20261116-139', fecha: '2026-11-16', importe: 500, nombre: 'Nacho' },
    { id: 'don-20261116-138', fecha: '2026-11-16', importe: 50, nombre: 'Anónimo' },
    { id: 'don-20261116-137', fecha: '2026-11-16', importe: 50, nombre: 'Anónimo' },
    { id: 'don-20261116-136', fecha: '2026-11-16', importe: 50, nombre: 'Bahdja' },
    { id: 'don-20261116-135', fecha: '2026-11-16', importe: 50, nombre: 'Ascensión López Avendano' },
    { id: 'don-20261116-134', fecha: '2026-11-16', importe: 50, nombre: 'Inmaculada Jiménez Morell' },
    { id: 'don-20261116-133', fecha: '2026-11-16', importe: 50, nombre: 'Anónimo' },
    { id: 'don-20261116-132', fecha: '2026-11-16', importe: 30, nombre: 'Nuria' },
    { id: 'don-20261116-131', fecha: '2026-11-16', importe: 25, nombre: 'Anónimo' },
    { id: 'don-20261116-130', fecha: '2026-11-16', importe: 25, nombre: 'Pilar' },
    { id: 'don-20261116-129', fecha: '2026-11-16', importe: 25, nombre: 'Anónimo' },
    { id: 'don-20261116-128', fecha: '2026-11-16', importe: 10, nombre: 'Anónimo' },
    { id: 'don-20261116-127', fecha: '2026-11-16', importe: 10, nombre: 'Anónimo' },
    { id: 'don-20261116-126', fecha: '2026-11-16', importe: 50, nombre: 'Anónimo' },
    { id: 'don-20261116-125', fecha: '2026-11-16', importe: 25, nombre: 'Anónimo' },
    { id: 'don-20261116-124', fecha: '2026-11-16', importe: 50, nombre: 'Juanjo Ordoñez' },
    { id: 'don-20261116-123', fecha: '2026-11-16', importe: 12, nombre: 'Waby' },
    { id: 'don-20261116-122', fecha: '2026-11-16', importe: 30, nombre: 'Anónimo' },
    { id: 'don-20261116-121', fecha: '2026-11-16', importe: 100, nombre: 'MJ' },
    { id: 'don-20261116-120', fecha: '2026-11-16', importe: 20, nombre: 'Anónimo' },
    { id: 'don-20261116-119', fecha: '2026-11-16', importe: 50, nombre: 'Anónimo' },
    { id: 'don-20261116-118', fecha: '2026-11-16', importe: 50, nombre: 'Anónimo' },
    { id: 'don-20261116-117', fecha: '2026-11-16', importe: 50, nombre: 'Juan Pablo' },
    { id: 'don-20261116-116', fecha: '2026-11-16', importe: 100, nombre: 'Santiago González Vallejo' },
    { id: 'don-20261116-115', fecha: '2026-11-16', importe: 30, nombre: 'Luz' },
    { id: 'don-20261116-114', fecha: '2026-11-16', importe: 3.69, nombre: 'Marwane' },
    { id: 'don-20261116-113', fecha: '2026-11-16', importe: 50, nombre: 'Mohammad Diab Ali' },
    { id: 'don-20261116-112', fecha: '2026-11-16', importe: 20, nombre: 'Anónimo' },
    { id: 'don-20261116-111', fecha: '2026-11-16', importe: 6000, nombre: 'Javier Angel Encinas Bardem' },
    { id: 'don-20261115-110', fecha: '2026-11-15', importe: 20, nombre: 'Anónimo' },
    { id: 'don-20261115-109', fecha: '2026-11-15', importe: 50, nombre: 'Anónimo' },
    { id: 'don-20261115-108', fecha: '2026-11-15', importe: 20, nombre: 'Anónimo' },
    { id: 'don-20261115-107', fecha: '2026-11-15', importe: 20, nombre: 'Amira y mamá' },
    { id: 'don-20261115-106', fecha: '2026-11-15', importe: 100, nombre: 'Waleed Saleh' },
    { id: 'don-20261115-105', fecha: '2026-11-15', importe: 100, nombre: 'Anónimo' },
    { id: 'don-20261115-104', fecha: '2026-11-15', importe: 20, nombre: 'Agustín García Zahonero' },
    { id: 'don-20261115-103', fecha: '2026-11-15', importe: 50, nombre: 'Paco Fernández' },
    { id: 'don-20261115-102', fecha: '2026-11-15', importe: 50, nombre: 'María José Hernández Hernández' },
    { id: 'don-20261115-101', fecha: '2026-11-15', importe: 10, nombre: 'Vanesa Herreros Coca' },
    { id: 'don-20261115-100', fecha: '2026-11-15', importe: 20, nombre: 'Elo' },
    { id: 'don-20261115-099', fecha: '2026-11-15', importe: 20, nombre: 'Anónimo' },
    { id: 'don-20261115-098', fecha: '2026-11-15', importe: 25, nombre: 'Anónimo' },
    { id: 'don-20261115-097', fecha: '2026-11-15', importe: 20, nombre: 'Anónimo' },
    { id: 'don-20261115-096', fecha: '2026-11-15', importe: 20, nombre: 'Ruth Sáez' },
    { id: 'don-20261115-095', fecha: '2026-11-15', importe: 20, nombre: 'Anónimo' },
    { id: 'don-20261115-094', fecha: '2026-11-15', importe: 50, nombre: 'Lola Val' },
    { id: 'don-20261115-093', fecha: '2026-11-15', importe: 200, nombre: 'M Martín' },
    { id: 'don-20261115-092', fecha: '2026-11-15', importe: 50, nombre: 'Maximino de Cos' },
    { id: 'don-20261115-091', fecha: '2026-11-15', importe: 50, nombre: 'ATG' },
    { id: 'don-20261115-090', fecha: '2026-11-15', importe: 200, nombre: 'Itziar' },
    { id: 'don-20261115-089', fecha: '2026-11-15', importe: 50, nombre: 'Anónimo' },
    { id: 'don-20261115-088', fecha: '2026-11-15', importe: 20, nombre: 'Adri Picornell' },
    { id: 'don-20261115-087', fecha: '2026-11-15', importe: 50, nombre: 'Anónimo' },
    { id: 'don-20261115-086', fecha: '2026-11-15', importe: 50, nombre: 'Anónimo' },
    { id: 'don-20261115-085', fecha: '2026-11-15', importe: 50, nombre: 'Anónimo' },
    { id: 'don-20261115-084', fecha: '2026-11-15', importe: 30, nombre: 'NRO' },
    { id: 'don-20261115-083', fecha: '2026-11-15', importe: 100, nombre: 'Marta Puig de la Bellacasa' },
    { id: 'don-20261115-082', fecha: '2026-11-15', importe: 25, nombre: 'Mely' },
    { id: 'don-20261115-081', fecha: '2026-11-15', importe: 50, nombre: 'Ángeles López Ronco' },
    { id: 'don-20261115-080', fecha: '2026-11-15', importe: 30, nombre: 'Kika' },
    { id: 'don-20261115-079', fecha: '2026-11-15', importe: 50, nombre: 'Anónimo' },
    { id: 'don-20261115-078', fecha: '2026-11-15', importe: 40, nombre: 'Sadia' },
    { id: 'don-20261115-077', fecha: '2026-11-15', importe: 40, nombre: 'Guillermina Peragón' },
    { id: 'don-20261115-076', fecha: '2026-11-15', importe: 100, nombre: 'Toledo por Palestina' },
    { id: 'don-20261115-075', fecha: '2026-11-15', importe: 100, nombre: 'Anónimo' },
    { id: 'don-20261115-074', fecha: '2026-11-15', importe: 100, nombre: 'Anónimo' },
    { id: 'don-20261115-073', fecha: '2026-11-15', importe: 20, nombre: 'Anónimo' },
    { id: 'don-20261115-072', fecha: '2026-11-15', importe: 50, nombre: 'Anónimo' },
    { id: 'don-20261115-071', fecha: '2026-11-15', importe: 75, nombre: 'Anónimo' },
    { id: 'don-20261115-070', fecha: '2026-11-15', importe: 50, nombre: 'Paula' },
    { id: 'don-20261115-069', fecha: '2026-11-15', importe: 60, nombre: 'Monica García Prieto' },
    { id: 'don-20261115-068', fecha: '2026-11-15', importe: 50, nombre: 'Yusef' },
    { id: 'don-20261115-067', fecha: '2026-11-15', importe: 30, nombre: 'Anónimo' },
    { id: 'don-20261115-066', fecha: '2026-11-15', importe: 20, nombre: 'Mama y Carmen' },
    { id: 'don-20261115-065', fecha: '2026-11-15', importe: 50, nombre: 'Antonia' },
    { id: 'don-20261115-064', fecha: '2026-11-15', importe: 30, nombre: 'Carmen Masip' },
    { id: 'don-20261115-063', fecha: '2026-11-15', importe: 50, nombre: 'Antonio Aragón' },
    { id: 'don-20261115-062', fecha: '2026-11-15', importe: 50, nombre: 'Anónimo' },
    { id: 'don-20261115-061', fecha: '2026-11-15', importe: 200, nombre: 'Anónimo' },
    { id: 'don-20261115-060', fecha: '2026-11-15', importe: 50, nombre: 'Anónimo' },
    { id: 'don-20261115-059', fecha: '2026-11-15', importe: 150, nombre: 'Inés Gómez' },
    { id: 'don-20261115-058', fecha: '2026-11-15', importe: 20, nombre: 'Soledad' },
    { id: 'don-20261115-057', fecha: '2026-11-15', importe: 40, nombre: 'Anónimo' },
    { id: 'don-20261115-056', fecha: '2026-11-15', importe: 50, nombre: 'Rasmia' },
    { id: 'don-20261115-055', fecha: '2026-11-15', importe: 20, nombre: 'Anónimo' },
    { id: 'don-20261115-054', fecha: '2026-11-15', importe: 20, nombre: 'David Hinojos' },
    { id: 'don-20261115-053', fecha: '2026-11-15', importe: 50, nombre: 'Sol' },
    { id: 'don-20261115-052', fecha: '2026-11-15', importe: 15, nombre: 'Sara' },
    { id: 'don-20261115-051', fecha: '2026-11-15', importe: 50, nombre: 'María Teresa Hernández' },
    { id: 'don-20261115-050', fecha: '2026-11-15', importe: 50, nombre: 'Anhabuha' },
    { id: 'don-20261115-049', fecha: '2026-11-15', importe: 50, nombre: 'Anónimo' },
    { id: 'don-20261115-048', fecha: '2026-11-15', importe: 50, nombre: 'Amada' },
    { id: 'don-20261115-047', fecha: '2026-11-15', importe: 100, nombre: 'Zoubida' },
    { id: 'don-20261115-046', fecha: '2026-11-15', importe: 50, nombre: 'Anónimo' },
    { id: 'don-20261115-045', fecha: '2026-11-15', importe: 20, nombre: 'Sajda Zagou' },
    { id: 'don-20261115-044', fecha: '2026-11-15', importe: 60, nombre: 'Laura M' },
    { id: 'don-20261115-043', fecha: '2026-11-15', importe: 50, nombre: 'Anónimo' },
    { id: 'don-20261115-042', fecha: '2026-11-15', importe: 100, nombre: 'Carmen Perea' },
    { id: 'don-20261115-041', fecha: '2026-11-15', importe: 50, nombre: 'Anónimo' },
    { id: 'don-20261115-040', fecha: '2026-11-15', importe: 50, nombre: 'Anónimo' },
    { id: 'don-20261115-039', fecha: '2026-11-15', importe: 10, nombre: 'OBH' },
    { id: 'don-20261115-038', fecha: '2026-11-15', importe: 30, nombre: 'María López' },
    { id: 'don-20261115-037', fecha: '2026-11-15', importe: 50, nombre: 'Anónimo' },
    { id: 'don-20261115-036', fecha: '2026-11-15', importe: 200, nombre: 'Kamal Salim Halawa' },
    { id: 'don-20261115-035', fecha: '2026-11-15', importe: 1000, nombre: 'Américo Rodríguez' },
    { id: 'don-20261115-034', fecha: '2026-11-15', importe: 200, nombre: 'Anónimo' },
    { id: 'don-20261115-033', fecha: '2026-11-15', importe: 10, nombre: 'Anónimo' },
    { id: 'don-20261115-032', fecha: '2026-11-15', importe: 50, nombre: 'Anónimo' },
    { id: 'don-20261115-031', fecha: '2026-11-15', importe: 500, nombre: 'Nadim' },
    { id: 'don-20261115-030', fecha: '2026-11-15', importe: 20, nombre: 'Anónimo' },
    { id: 'don-20261115-029', fecha: '2026-11-15', importe: 5, nombre: 'Anónimo' },
    { id: 'don-20261115-028', fecha: '2026-11-15', importe: 10, nombre: 'Anónimo' },
    { id: 'don-20261115-027', fecha: '2026-11-15', importe: 50, nombre: 'Anónimo' },
    { id: 'don-20261115-026', fecha: '2026-11-15', importe: 20, nombre: 'Anónimo' },
    { id: 'don-20261115-025', fecha: '2026-11-15', importe: 20, nombre: 'Anónimo' },
    { id: 'don-20261115-024', fecha: '2026-11-15', importe: 26, nombre: 'Anónimo' },
    { id: 'don-20261115-023', fecha: '2026-11-15', importe: 10, nombre: 'Anónimo' },
    { id: 'don-20261115-022', fecha: '2026-11-15', importe: 50, nombre: 'Anónimo' },
    { id: 'don-20261115-021', fecha: '2026-11-15', importe: 10, nombre: 'Anónimo' },
    { id: 'don-20261115-020', fecha: '2026-11-15', importe: 15, nombre: 'Anónimo' },
    { id: 'don-20261115-019', fecha: '2026-11-15', importe: 50, nombre: 'Anónimo' },
    { id: 'don-20261115-018', fecha: '2026-11-15', importe: 25, nombre: 'JM Barri' },
    { id: 'don-20261115-017', fecha: '2026-11-15', importe: 50, nombre: 'Anónimo' },
    { id: 'don-20261115-016', fecha: '2026-11-15', importe: 50, nombre: 'Anónimo' },
    { id: 'don-20261115-015', fecha: '2026-11-15', importe: 1000, nombre: 'Anónimo' },
    { id: 'don-20261115-014', fecha: '2026-11-15', importe: 30, nombre: 'Anónimo' },
    { id: 'don-20261115-013', fecha: '2026-11-15', importe: 300, nombre: 'Anónimo' },
    { id: 'don-20261115-012', fecha: '2026-11-15', importe: 100, nombre: 'Rosalía y Taysir' },
    { id: 'don-20261115-011', fecha: '2026-11-15', importe: 150, nombre: 'Anónimo' },
    { id: 'don-20261115-010', fecha: '2026-11-15', importe: 10, nombre: 'Anónimo' },
    { id: 'don-20261115-009', fecha: '2026-11-15', importe: 20, nombre: 'Anónimo' },
    { id: 'don-20261115-008', fecha: '2026-11-15', importe: 80, nombre: 'Anónimo' },
    { id: 'don-20261115-007', fecha: '2026-11-15', importe: 40, nombre: 'Anónimo' },
    { id: 'don-20261115-006', fecha: '2026-11-15', importe: 100, nombre: 'Anónimo' },
    { id: 'don-20261115-005', fecha: '2026-11-15', importe: 50, nombre: 'Anónimo' },
    { id: 'don-20261115-004', fecha: '2026-11-15', importe: 200, nombre: 'Marisa' },
    { id: 'don-20261115-003', fecha: '2026-11-15', importe: 50, nombre: 'Anónimo' },
    { id: 'don-20261115-002', fecha: '2026-11-15', importe: 50, nombre: 'Anónimo' },
    { id: 'don-20261115-001', fecha: '2026-11-15', importe: 50, nombre: 'Anónimo' },
  ],
  actualizado: '2026-11-16',
  /** Hora de la ultima revision del listado (HH:MM) */
  horaActualizacion: '17:39',

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
