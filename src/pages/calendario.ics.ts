import type { APIRoute } from 'astro';
import { generarIcs } from '../data/eventos';

export const GET: APIRoute = () =>
  new Response(generarIcs(), {
    headers: {
      'Content-Type': 'text/calendar; charset=utf-8',
      'Content-Disposition': 'inline; filename="comunidad-palestina-madrid.ics"'
    }
  });
