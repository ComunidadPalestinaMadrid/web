import { readdir, readFile, stat } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';

async function walk(dir, out = []) {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) await walk(p, out); else out.push(p);
  }
  return out;
}
const files = await walk('dist');
const html = files.filter((f) => f.endsWith('.html'));
const missing = new Map();
const linksMissing = new Map();
const pageSet = new Set(
  html.map((f) => '/' + path.relative('dist', f).replace(/\\/g, '/').replace(/index\.html$/, '')).map((s) => s.replace(/\/$/, '') || '/')
);

for (const f of html) {
  const t = await readFile(f, 'utf8');
  for (const m of t.matchAll(/(?:src|href)="(\/[^"#?]*)(?:\?[^"]*)?"/g)) {
    const u = m[1];
    if (/^\/(images|documentos|_astro)\//.test(u)) {
      if (!existsSync(path.join('dist', u))) {
        if (!missing.has(u)) missing.set(u, []);
        missing.get(u).push(f);
      }
    } else if (!/\.(svg|png|jpg|jpeg|webp|gif|ico|xml|txt|ics|pdf)$/i.test(u) && !u.startsWith('//')) {
      const norm = u.replace(/\/$/, '') || '/';
      if (!pageSet.has(norm) && !existsSync(path.join('dist', norm))) {
        if (!linksMissing.has(norm)) linksMissing.set(norm, []);
        linksMissing.get(norm).push(f);
      }
    }
  }
}
console.log('HTML pages:', html.length);
console.log('Imagenes/documentos rotos:', missing.size);
for (const [u, fs_] of [...missing].slice(0, 20)) console.log('  MISSING ' + u + '  (' + fs_.length + ' paginas)');
console.log('Enlaces internos rotos:', linksMissing.size);
for (const [u, fs_] of [...linksMissing].slice(0, 20)) console.log('  BROKEN LINK ' + u + '  en ' + fs_[0]);
console.log('--- dist/ar ---');
console.log((await walk('dist/ar')).slice(0, 6).join('\n'));
