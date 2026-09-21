// Comprueba enlaces internos e imagenes del build, teniendo en cuenta el prefijo base.
import { readdir, readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';

const BASE = (process.env.BASE_PATH ?? '/web').replace(/\/$/, '');

async function walk(dir, out = []) {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) await walk(p, out);
    else out.push(p);
  }
  return out;
}

const stripBase = (u) => (BASE && BASE !== '/' && (u === BASE || u.startsWith(BASE + '/'))) ? (u.slice(BASE.length) || '/') : u;

const files = await walk('dist');
const html = files.filter((f) => f.endsWith('.html'));
const pageSet = new Set(
  html.map((f) => '/' + path.relative('dist', f).replace(/\\/g, '/').replace(/index\.html$/, '')).map((s) => s.replace(/\/$/, '') || '/')
);

const missing = new Map();
const broken = new Map();

for (const f of html) {
  const t = await readFile(f, 'utf8');
  for (const m of t.matchAll(/(?:src|href)="(\/[^"#?]*)(?:\?[^"]*)?"/g)) {
    const raw = m[1];
    const local = stripBase(raw);
    if (/^\/(images|documentos|_astro)\//.test(local)) {
      if (!existsSync(path.join('dist', local))) {
        if (!missing.has(raw)) missing.set(raw, []);
        missing.get(raw).push(f);
      }
    } else if (!/\.(svg|png|jpg|jpeg|webp|gif|ico|xml|txt|ics|pdf)$/i.test(local)) {
      const norm = local.replace(/\/$/, '') || '/';
      if (!pageSet.has(norm) && !existsSync(path.join('dist', norm))) {
        if (!broken.has(raw)) broken.set(raw, []);
        broken.get(raw).push(f);
      }
    }
  }
}

console.log('prefijo base analizado: ' + (BASE || '/'));
console.log('paginas HTML: ' + html.length);
console.log('imagenes/documentos rotos: ' + missing.size);
for (const [u, fs_] of [...missing].slice(0, 15)) console.log('  MISSING ' + u + '  (' + fs_.length + ' paginas)');
console.log('enlaces internos rotos: ' + broken.size);
for (const [u, fs_] of [...broken].slice(0, 15)) console.log('  BROKEN ' + u + '  en ' + fs_[0]);
