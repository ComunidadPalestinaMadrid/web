const urls = ["https://www.izquierdadiario.es/VOX-lleva-a-la-Audiencia-Nacional-a-activistas-propalestinas-por-hablar-publicamente-contra-el","https://www.elsaltodiario.com/israel/carmena-entrega-al-presidente-israeli-la-llave-de-oro-de-madrid","https://pre.efe.com/espana/2025-05-10/manifestacion-genocidio-palestino/","https://www.elplural.com/politica/espana/miles-personas-colapsan-madrid-contra-genocidio-gaza-la-paz-trump-fraude_366355102","https://www.rebelion.org/noticia.php?id=233756","https://ateneodemadrid.com/wp-content/uploads/2025/03/NP-Libro-Palestina-Ateneo-Madrid.pdf","https://elpais.com/espana/2025-10-04/ultima-hora-de-las-manifestaciones-en-apoyo-al-pueblo-palestino-y-la-flotilla-de-gaza-en-directo.html","https://www.abc.es/internacional/palestinos-espana-piden-alto-genocidio-gaza-20251004193911-vi.html","https://www.europapress.tv/sociedad/1015126/1/asociaciones-defienden-derecho-autodeterminacion-propios-palestinos"];
const RE = /hispano[\s-]?palestina|comunidad palestina de madrid|asociaci[oó]n de la comunidad/gi;
for (const u of urls) {
  console.log('===== ' + new URL(u).hostname + '  ' + u.slice(-46));
  try {
    const res = await fetch(u, { redirect: 'follow', headers: { 'user-agent': 'Mozilla/5.0 (compatible; AHPJ/1.0)' } });
    const html = await res.text();
    const canon = (html.match(/<link[^>]+rel="canonical"[^>]+href="([^"]+)"/) || [])[1];
    const jld = [...html.matchAll(/"datePublished"\s*:\s*"([^"]+)"/g)].map((m) => m[1]);
    const oj = (html.match(/property="og:description" content="([^"]*)"/) || [])[1] || '';
    console.log('   status ' + res.status + ' | canonical: ' + (canon || '-').slice(0, 100));
    if (jld.length) console.log('   datePublished: ' + jld.slice(0, 2).join(', '));
    console.log('   subtitulo: ' + oj.replace(/&quot;/g, '"').replace(/&#x27;|&#39;/g, "'").slice(0, 190));
    const texto = html.replace(/<script[\s\S]*?<\/script>/g, ' ').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');
    const ctx = [];
    for (const m of texto.matchAll(RE)) { ctx.push(texto.slice(Math.max(0, m.index - 90), m.index + 70).trim()); if (ctx.length >= 2) break; }
    console.log('   contexto: ' + (ctx.length ? ctx.join(' /// ').slice(0, 300) : 'SIN MENCION'));
  } catch (e) { console.log('   ERR ' + String(e.message).slice(0, 70)); }
  console.log('');
}
