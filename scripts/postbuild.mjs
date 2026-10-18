// Rellena width/height en las <img> que no los traen, para que el navegador
// reserve el espacio y no salte la maquetacion (CLS). Se ejecuta despues de
// "astro build" y trabaja sobre dist: no toca el codigo fuente.
import { readFile, writeFile, readdir } from 'node:fs/promises';
import path from 'node:path';

let sharp;
try {
  sharp = (await import('sharp')).default;
} catch {
  console.log('[postbuild] sharp no disponible: se omiten las dimensiones');
  process.exit(0);
}

const DIST = 'dist';
const cache = new Map();

async function dimensiones(src) {
  if (cache.has(src)) return cache.get(src);
  const candidatos = [path.join('public', src), path.join('public', src.replace(/^\/[^/]+/, ''))];
  let salida = null;
  for (const ruta of candidatos) {
    try {
      const m = await sharp(ruta).metadata();
      if (m.width && m.height) {
        salida = { w: m.width, h: m.height };
        break;
      }
    } catch {
      /* siguiente candidato */
    }
  }
  cache.set(src, salida);
  return salida;
}

async function walk(dir, out = []) {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) await walk(p, out);
    else out.push(p);
  }
  return out;
}

const ficheros = (await walk(DIST)).filter((f) => f.endsWith('.html'));
let vistas = 0;
let rellenas = 0;

for (const f of ficheros) {
  const html = await readFile(f, 'utf8');
  let cambios = 0;
  const nuevo = (
    await Promise.all(
      html.split(/(<img\b[^>]*>)/).map(async (trozo) => {
        if (!trozo.startsWith('<img')) return trozo;
        vistas++;
        const attrs = trozo.slice(4, -1);
        if (/\bwidth=/.test(attrs) && /\bheight=/.test(attrs)) return trozo;
        const src = (attrs.match(/\bsrc="([^"]+)"/) || [])[1];
        if (!src || !src.startsWith('/')) return trozo;
        const d = await dimensiones(src);
        if (!d) return trozo;
        cambios++;
        rellenas++;
        return '<img width="' + d.w + '" height="' + d.h + '"' + trozo.slice(4);
      })
    )
  ).join('');
  if (cambios > 0) await writeFile(f, nuevo, 'utf8');
}

console.log('[postbuild] imagenes revisadas: ' + vistas + ' | dimensiones anadidas: ' + rellenas);
