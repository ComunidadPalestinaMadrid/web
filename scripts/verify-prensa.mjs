const urls = ["https://www.publico.es/internacional/asia/presidenta-asociacion-hispano-palestina-jerusalen-exige-sanchez-romper-relaciones-diplomaticas-israel.html","https://www.europapress.es/navarra/noticia-alcalde-pamplona-recibe-presidente-asociacion-comunidad-hispano-palestina-jerusalen-20180316160244.html","https://www.europapress.tv/sociedad/1015126/1/asociaciones-defienden-derecho-autodeterminacion-propios-palestinos","https://www.izquierdadiario.es/VOX-lleva-a-la-Audiencia-Nacional-a-activistas-propalestinas-por-hablar-publicamente-contra-el","https://elpais.com/espana/2025-10-04/ultima-hora-de-las-manifestaciones-en-apoyo-al-pueblo-palestino-y-la-flotilla-de-gaza-en-directo.html","https://www.elplural.com/politica/espana/miles-personas-colapsan-madrid-contra-genocidio-gaza-la-paz-trump-fraude_366355102","https://www.infobae.com/america/agencias/2026/02/01/una-protesta-en-madrid-pide-el-embargo-de-armas-a-israel-y-denuncia-que-el-genocidio-en-palestina-continua/","https://pre.efe.com/espana/2025-05-10/manifestacion-genocidio-palestino/","https://www.abc.es/internacional/palestinos-espana-piden-alto-genocidio-gaza-20251004193911-vi.html","https://ateneodemadrid.com/wp-content/uploads/2025/03/NP-Libro-Palestina-Ateneo-Madrid.pdf","https://www.eldiario.es/politica/carmena-llaves-oro-madrid-israel_1_3088611.html","https://www.cronicamadrid.com/noticia/1274841/capital/carmena-entrega-las-llaves-de-oro-al-presidente-israeli-con-una-protesta-ante-cibeles.html","https://www.elsaltodiario.com/israel/carmena-entrega-al-presidente-israeli-la-llave-de-oro-de-madrid","https://www.infolibre.es/noticias/politica/2017/11/06/carmena_recibe_presidente_israel_reuven_rivlin_frente_las_criticas_colectivos_pacifistas_71562_1012.html","http://www.elperiodico.com/es/politica/20171106/carmena-entrega-las-llaves-de-oro-de-madrid-al-presidente-de-israel-con-protesta-en-la-calle-6405297","https://www.europapress.es/madrid/noticia-carmena-entrega-llaves-oro-madrid-presidente-israel-protesta-calle-20171106140018.html","https://www.lavanguardia.com/local/madrid/20171106/432678696037/carmena-entrega-las-llaves-de-oro-de-madrid-al-presidente-de-israel-con-protesta-en-la-calle.html","https://www.rebelion.org/noticia.php?id=233756","http://www.tercerainformacion.es/opinion/opinion/2017/11/06/refugees-palestina-y-manuela-carmena","https://www.madridiario.es/450079/concentracion-palestina-toma-la-calle","http://diario16.com/los-movimientos-sociales-consideran-persona-non-grata-al-presidente-israel/","http://www.palestinaliberation.com/2017/11/senadores-y-diputados-protestan-contra-la-visita-del-presidente-de-israel.html","http://www.palestinaliberation.com/2017/11/100-anos-de-declaracion-balfour.html","https://www.abc.com.py/tag/asociacion-de-la-comunidad-hispano-palestina-jerusalen/"];
const RE_ASOC = /hispano[\s-]?palestina|comunidad palestina de madrid|asociaci[oó]n de la comunidad/i;
const out = [];
for (const u of urls) {
  const r = { url: u };
  try {
    const ctrl = new AbortController();
    const to = setTimeout(() => ctrl.abort(), 20000);
    const res = await fetch(u, { redirect: 'follow', headers: { 'user-agent': 'Mozilla/5.0 (compatible; AHPJ/1.0)' }, signal: ctrl.signal });
    clearTimeout(to);
    r.status = res.status;
    const html = await res.text();
    const m = (re) => (html.match(re) || [])[1] || '';
    r.title = m(/property="og:title" content="([^"]*)"/) || m(/<title[^>]*>([^<]*)<\/title>/);
    r.desc = m(/property="og:description" content="([^"]*)"/) || m(/name="description" content="([^"]*)"/);
    r.date = m(/(?:article:published_time|datePublished)"?[^>]*content="([^"]*)"/) || m(/<time[^>]*datetime="([^"]*)"/);
    r.menciona = RE_ASOC.test(html);
    r.len = html.length;
  } catch (e) { r.status = 'ERR'; r.error = String(e.message || e).slice(0, 60); }
  out.push(r);
}
for (const r of out) {
  const medio = new URL(r.url).hostname.replace('www.', '');
  console.log('[' + String(r.status) + '] ' + medio);
  console.log('   ' + (r.title || '(' + (r.error || 'sin titulo') + ')').slice(0, 130));
  if (r.date) console.log('   fecha: ' + r.date.slice(0, 10) + '   menciona asociacion: ' + r.menciona);
  else console.log('   menciona asociacion: ' + r.menciona);
}
