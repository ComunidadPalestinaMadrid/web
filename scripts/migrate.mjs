// Migra el contenido de la web antigua a Astro (salida JSON + imagenes locales).
import { readFile, writeFile, mkdir, rm } from 'node:fs/promises';
import { readdirSync, existsSync } from 'node:fs';
import { createHash } from 'node:crypto';
import * as cheerio from 'cheerio';

const BASE = 'https://comunidadhispanopalestinamadridblog.wordpress.com';
const RAW = '_migration/raw/pages';
const OUT_POSTS = 'src/data/publicaciones';
const OUT_IMG = 'public/images/uploads';
const OUT_DOCS = 'public/documentos';
const OUT_EXTRACTED = '_migration/extracted';
const H = { 'user-agent': 'Mozilla/5.0 (compatible; AHPJ-migration/1.0)' };

const TIPOS = {
  'soy-bisan-de-gaza': 'noticia',
  'dr-taysir-abdullah': 'noticia',
  'todas-a-la-movilizacion-estatal': 'campana',
  'hutheis-en-yemen': 'noticia',
  'resumen-del-genocidio': 'noticia',
  'estados-unidos-y-reino-unido-atacaron': 'noticia',
  'boicot-desinversion-y-sanciones': 'campana',
  'organizaciones-y-colectivos-de-madrid': 'campana',
  'el-tribunal-tiene-un-plazo': 'noticia',
  'ayuso-cede-a-la-comunidad-judia': 'noticia',
  'vecinas-y-colectivos-de-la-sierra': 'noticia',
  'pide-al-gobierno-que-se-sume': 'campana',
  'comunicado-de-la-junta-directiva': 'comunicado',
  'algunas-de-las-mentiras-de-israel': 'noticia',
  'antecedentes-del-7-de-octubre': 'noticia',
  'nota-de-prensa': 'nota-prensa',
  'declaracion-oficial-del-estado-de-palestina': 'comunicado',
  'mahmoud-abbas-estatus': 'comunicado',
  'chantaje-a-palestina': 'articulo',
  'llamamiento-internacional': 'campana',
  'dia-internacional-contra-los-muros': 'campana',
  'senadores-y-diputados-protestan': 'noticia',
  'concentracion-frente-a-la-embajada': 'noticia'
};
function tipoDe(slug, titulo) {
  for (const [k, v] of Object.entries(TIPOS)) if (slug.includes(k)) return v;
  if (/^nota de prensa/i.test(titulo)) return 'nota-de-prensa';
  return 'noticia';
}

async function download(url, dest) {
  if (existsSync(dest)) return true;
  try {
    const r = await fetch(url, { headers: H });
    if (!r.ok) { console.log('  ! download ' + r.status + ' ' + url); return false; }
    await writeFile(dest, Buffer.from(await r.arrayBuffer()));
    return true;
  } catch (e) { console.log('  ! error ' + url + ' :: ' + e.message); return false; }
}

const slugify = (s) => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-zA-Z0-9]+/g, '-').replace(/^-|-$/g, '').toLowerCase();

const report = { posts: [], pages: [], missing: [] };
await rm(OUT_POSTS, { recursive: true, force: true });
await mkdir(OUT_POSTS, { recursive: true });
await mkdir(OUT_IMG, { recursive: true });
await mkdir(OUT_DOCS, { recursive: true });
await mkdir(OUT_EXTRACTED, { recursive: true });

const usedNames = new Map();
function uniqueName(url) {
  let n = decodeURIComponent(url.split('?')[0].split('/').pop() || 'file').replace(/[^a-zA-Z0-9._-]/g, '-');
  if (usedNames.has(n) && usedNames.get(n) !== url) {
    const h = createHash('sha1').update(url).digest('hex').slice(0, 6);
    const dot = n.lastIndexOf('.');
    n = dot > 0 ? n.slice(0, dot) + '-' + h + n.slice(dot) : n + '-' + h;
  }
  usedNames.set(n, url);
  return n;
}

const CLEAN_SELECTORS = [
  'script', 'style', 'noscript', 'iframe', '.sharedaddy', '.share-buttons', '.sd-sharing', '.sd-like',
  '.jp-relatedposts', '#jp-post-flair', '.jp-post-flair', '.entry-footer', '.entry-meta', '.post-navigation',
  '.comments-area', '.wpcnt', '.wp-block-buttons', '.wp-block-social-links', '.wp-block-file__embed',
  '.jetpack_subscription_widget', '.wpforms-container', '.contact-form', 'form', '.jp-video'
];

function limpiarHtml(html) {
  let h = html;
  h = h.replace(/<p>(\s|&nbsp;|<br\s*\/?>)*<\/p>/gi, '');
  h = h.replace(/<div>(\s|&nbsp;|<br\s*\/?>)*<\/div>/gi, '');
  h = h.replace(/<span>(\s|&nbsp;)*<\/span>/gi, '');
  h = h.replace(/&nbsp;/g, ' ');
  h = h.replace(/\n{3,}/g, '\n\n');
  h = h.replace(/(<br\s*\/?>\s*){2,}/gi, '<br>');
  return h.trim();
}

const files = readdirSync(RAW).sort();
for (const f of files) {
  const html = await readFile(RAW + '/' + f, 'utf8');
  const $ = cheerio.load(html);
  const canonical = $('link[rel=canonical]').attr('href') || '';
  const rawTitle = ($('h1.entry-title').first().text() || $('title').first().text() || '').trim();
  const title = rawTitle.replace(/\s*[\u2013-]\s*Asociaci.n de la Comunidad Hispano Palestina Jerusal.n\s*$/, '').trim();
  const fm = f.match(/^(\d{3})-(\d{4})_(\d{2})_(\d{2})_(.+)\.html$/);
  const isPost = !!fm;
  const date = fm ? fm[2] + '-' + fm[3] + '-' + fm[4] : '';
  const rel = canonical.replace(BASE, '').replace(/^\/|\/$/g, '');
  const slug = isPost ? slugify(fm[5]) : (rel.replace(/[^a-z0-9-]/gi, '_') || 'home');
  const og = $('meta[property="og:image"]').attr('content') || '';

  let $c = $('.entry-content').first();
  if (!$c.length) $c = $('article .entry-content, .post-content, main').first();
  for (const sel of CLEAN_SELECTORS) $c.find(sel).remove();
  $c.find('*').each((_, el) => {
    const t = ($(el).text() || '').trim();
    if (/^(Comparte|Compartelo|Compártelo|Me gusta|Cargando|← Volver|Publicidad)$/i.test(t) && !$(el).children().length) $(el).remove();
  });
  const imgUrls = [];
  $c.find('img').each((_, el) => {
    const $el = $(el);
    const cand = [$el.attr('data-orig-file'), $el.attr('data-lazy-src'), $el.attr('data-src'), $el.attr('src')]
      .find((s) => s && /^https?:\/\//.test(s) && !/pixel\.wp\.com|gravatar|\.gif$/.test(s));
    if (!cand) { $el.remove(); return; }
    $el.attr('src', cand); imgUrls.push(cand);
    for (const k of Object.keys(el.attribs)) if (k !== 'src' && k !== 'alt') delete el.attribs[k];
  });
  const docUrls = [];
  $c.find('a[href]').each((_, el) => {
    const href = $(el).attr('href') || '';
    if (/\.(pdf|docx?|xlsx?|pptx?|odt|ods)(\?|$)/i.test(href)) { docUrls.push(href); $(el).attr('data-doc-url', href); }
  });

  const localMap = {};
  for (const u of [...new Set(imgUrls)]) {
    const n = uniqueName(u);
    if (await download(u, OUT_IMG + '/' + n)) localMap[u] = '/images/uploads/' + n;
    else report.missing.push(u);
  }
  for (const u of [...new Set(docUrls)]) {
    const n = uniqueName(u);
    if (await download(u, OUT_DOCS + '/' + n)) localMap[u] = '/documentos/' + n;
    else report.missing.push(u);
  }
  $c.find('img').each((_, el) => { const s = $(el).attr('src'); if (localMap[s]) $(el).attr('src', localMap[s]); });
  $c.find('a[data-doc-url]').each((_, el) => { const s = $(el).attr('data-doc-url'); $(el).attr('href', localMap[s] || s); $(el).removeAttr('data-doc-url'); });
  $c.find('*').each((_, el) => {
    for (const k of Object.keys(el.attribs || {})) {
      if (/^(data-|srcset|sizes|loading|decoding|width|height|role|tabindex|aria-)/.test(k)) delete el.attribs[k];
      if (k === 'class' && !/^(wp-block-|align)/.test(el.attribs[k])) delete el.attribs[k];
    }
  });

  let portada = '';
  if (og) { const n = uniqueName(og); if (await download(og, OUT_IMG + '/' + n)) portada = '/images/uploads/' + n; }
  if (!portada) portada = $c.find('img').first().attr('src') || '';

  const bodyHtml = limpiarHtml($c.html() || '');
  const resumen = ($c.text() || '').replace(/\s+/g, ' ').trim().slice(0, 220);
  const categorias = $('.cat-links a, a[rel=category]').map((_, e) => $(e).text().trim()).get()
    .filter((c) => c && c !== 'Sin categoría' && c.length < 40);

  if (isPost) {
    const data = {
      slug, title, date, tipo: tipoDe(slug, title),
      categorias: [...new Set(categorias)],
      resumen, portada,
      originalUrl: canonical || BASE + '/',
      html: bodyHtml
    };
    await writeFile(OUT_POSTS + '/' + slug + '.json', JSON.stringify(data, null, 2), 'utf8');
    report.posts.push({ slug, title, date, tipo: data.tipo, portada });
    console.log('POST ' + date + ' | ' + data.tipo.padEnd(13) + ' | ' + slug);
  } else {
    await writeFile(OUT_EXTRACTED + '/' + slug + '.html', bodyHtml, 'utf8');
    await writeFile(OUT_EXTRACTED + '/' + slug + '.txt', ($c.text() || '').replace(/\n{3,}/g, '\n\n').trim(), 'utf8');
    report.pages.push({ slug, title });
    console.log('PAGE ' + slug);
  }
}

await download(BASE + '/wp-content/uploads/2024/01/cropped-image-2.png', 'public/images/logo.png');
await writeFile('_migration/report.json', JSON.stringify(report, null, 2), 'utf8');
console.log('\nPOSTS: ' + report.posts.length + ' | PAGES: ' + report.pages.length + ' | MISSING: ' + report.missing.length);
