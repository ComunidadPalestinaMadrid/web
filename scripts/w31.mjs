const gh = async (u) => { const r = await fetch('https://api.github.com' + u, { headers: { 'user-agent': 'dsh', Accept: 'application/vnd.github+json' } }); return { json: await r.json() }; };
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let run = null;
for (let i = 0; i < 45; i++) {
  const { json } = await gh('/repos/ComunidadPalestinaMadrid/web/actions/runs?per_page=1');
  run = json.workflow_runs[0];
  console.log('[' + i + '] ' + run.head_sha.slice(0, 7) + '  ' + run.status + ' / ' + (run.conclusion || '-'));
  if (run.status === 'completed') break;
  await sleep(10000);
}
console.log('CI: ' + run.conclusion);
if (run.conclusion !== 'success') {
  const { json: jobs } = await gh('/repos/ComunidadPalestinaMadrid/web/actions/runs/' + run.id + '/jobs');
  for (const j of jobs.jobs) for (const s of j.steps) if (s.conclusion === 'failure') console.log('  FALLO en: ' + s.name);
  process.exit(0);
}
const B = 'https://comunidadpalestina.madrid';
const bust = '?v=' + Date.now();
const home = await (await fetch(B + '/' + bust)).text();
console.log('');
console.log('HTML portada: ' + Math.round(home.length / 1024) + ' KB');
const hero = (home.match(/<img[^>]*hero__fondo[^>]*>/) || [''])[0];
console.log('hero srcset: ' + (hero.match(/srcset="([^"]+)"/) || [])[1]);
console.log('preload del hero: ' + /rel="preload"[^>]*as="image"/.test(home));
const logos = [...new Set([...home.matchAll(/src="([^"]*logo[^"]*)"/g)].map((m) => m[1]))];
console.log('logo en uso: ' + logos.join(', '));
const cards = [...home.matchAll(/<img[^>]*srcset="[^"]*-640\.webp[^"]*"[^>]*>/g)].length;
console.log('tarjetas con srcset de 640: ' + cards);
for (const ruta of ['/images/logo-128.webp', '/images/uploads/hero-manifestacion-960.webp', '/images/uploads/el-mundo-en-guerra-640.webp', '/images/uploads/el-mundo-en-guerra.webp', '/images/logo-512.webp']) {
  const r = await fetch(B + ruta + bust);
  console.log('  ' + ruta.padEnd(46) + r.status + '  ' + Math.round(Number(r.headers.get('content-length') || 0) / 1024) + ' KB');
}
console.log('  logo.png (ya no se usa): ' + (await fetch(B + '/images/logo.png_' + Date.now())).status);
