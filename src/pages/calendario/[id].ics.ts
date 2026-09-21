import type { APIRoute } from 'astro';
import { EVENTOS, generarIcsEvento } from '../../data/eventos';

export function getStaticPaths() {
  return EVENTOS.map((evento) => ({ params: { id: evento.id }, props: { evento } }));
}

export const GET: APIRoute = ({ props }) =>
  new Response(generarIcsEvento(props.evento), {
    headers: {
      'Content-Type': 'text/calendar; charset=utf-8',
      'Content-Disposition': 'attachment; filename="' + props.evento.id + '.ics"'
    }
  });
