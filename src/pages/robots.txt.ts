import type { APIRoute } from 'astro';
import { ORIGIN, BASE } from '../i18n/utils';

export const GET: APIRoute = () => {
  const prefijo = BASE && BASE !== '/' ? BASE : '';
  const body = [
    'User-agent: *',
    'Allow: /',
    '',
    'Sitemap: ' + ORIGIN + prefijo + '/sitemap-index.xml',
    ''
  ].join('\n');
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
