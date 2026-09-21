import { writeFile, mkdir } from 'node:fs/promises';
const BASE='https://comunidadhispanopalestinamadridblog.wordpress.com';
const H={'user-agent':'Mozilla/5.0 (compatible; AHPJ-migration/1.0)'};
const get = async (u) => { const r = await fetch(u,{headers:H}); return {status:r.status, text: await r.text()}; };

await mkdir('_migration/raw/feeds',{recursive:true});
await mkdir('_migration/raw/pages',{recursive:true});

// 1) feeds (contenido completo de las entradas)
for (let p=1;p<=6;p++){
  const u = BASE+'/feed/'+(p>1?'?paged='+p:'');
  const r = await get(u);
  const items = [...r.text.matchAll(/<item>[\s\S]*?<\/item>/g)].length;
  await writeFile('_migration/raw/feeds/feed-'+p+'.xml', r.text, 'utf8');
  console.log('feed',p,r.status,'items',items);
  if (items===0) break;
}

// 2) sitemap
const sm = await get(BASE+'/sitemap.xml');
await writeFile('_migration/raw/sitemap.xml', sm.text, 'utf8');
const locs=[...sm.text.matchAll(/<loc>(.*?)<\/loc>/g)].map(m=>m[1]);
const pages = locs.filter(u=>!/\/\d{4}\/\d{2}\/\d{2}\//.test(u) || u===BASE+'/');
console.log('sitemap',locs.length,'pages',pages.length);

// 3) HTML de todas las URLs (paginas y entradas)
let i=0;
for (const u of locs){
  const slug = u.replace(BASE,'').replace(/^\/|\/$/g,'').replace(/[^a-zA-Z0-9-]/g,'_') || 'home';
  const r = await get(u);
  await writeFile('_migration/raw/pages/'+String(++i).padStart(3,'0')+'-'+slug+'.html', r.text, 'utf8');
  console.log('page',i,r.status,u);
}
console.log('DONE');
