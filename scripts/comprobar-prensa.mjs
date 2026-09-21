// Comprueba que los enlaces de las apariciones en medios siguen vivos.
// Uso: node scripts/comprobar-prensa.mjs
import { readFile } from 'node:fs/promises';

const fuente = await readFile('src/data/prensa.ts', 'utf8');
const entradas = [...fuente.matchAll(/medio:\s*'([^']+)'[\s\S]*?url:\s*'([^']+)'/g)].map((m) => ({ medio: m[1], url: m[2] }));

let caidos = 0;
for (const { medio, url } of entradas) {
  let estado = 'ERR';
  try {
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), 20000);
    const res = await fetch(url, {
      redirect: 'follow',
      signal: ctrl.signal,
      headers: { 'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/124.0 Safari/537.36' }
    });
    clearTimeout(t);
    estado = String(res.status);
  } catch (e) {
    estado = 'ERR ' + String(e.message).slice(0, 40);
  }
  if (!estado.startsWith('2')) caidos++;
  console.log((estado.startsWith('2') ? 'OK   ' : 'FALLO') + '  ' + estado.padEnd(8) + medio.padEnd(18) + url);
}
console.log('');
console.log(entradas.length + ' enlaces comprobados, ' + caidos + ' con problemas.');
console.log('Nota: un 403 suele ser un cortafuegos anti-bots (el enlace funciona en el navegador), no un enlace muerto.');
