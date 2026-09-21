import { readFile, writeFile, readdir } from 'node:fs/promises';
const dir = 'src/data/publicaciones';
let n = 0;
for (const f of await readdir(dir)) {
  const p = dir + '/' + f;
  const d = JSON.parse(await readFile(p, 'utf8'));
  if (d.tipo === 'nota-de-prensa') { d.tipo = 'nota-prensa'; await writeFile(p, JSON.stringify(d, null, 2), 'utf8'); n++; }
}
console.log('corregidos:', n);
const tipos = {};
for (const f of await readdir(dir)) { const d = JSON.parse(await readFile(dir + '/' + f, 'utf8')); tipos[d.tipo] = (tipos[d.tipo] || 0) + 1; }
console.log(JSON.stringify(tipos));
