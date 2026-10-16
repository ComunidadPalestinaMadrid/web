# Web de la Asociación Hispano Palestina de Madrid

Sitio web estático construido con **Astro** para la Asociación de la Comunidad Hispano
Palestina Jerusalén (AHPJ), conocida como **Comunidad Palestina de Madrid**.

- **Dominio previsto:** https://comunidadpalestina.madrid
- **Idioma:** español. La web se desarrolla **sin traducciones** por ahora (ver "Traducción" al final)
- **Diseño:** predominantemente blanco, con acentos en los colores palestinos
  (rojo `#ce1126`, verde `#007a3d`, negro) y filetes con la bandera.

---

## Puesta en marcha

```bash
npm install        # instala dependencias
npm run dev        # servidor de desarrollo en http://localhost:4321
npm run build      # genera el sitio estático en dist/
npm run preview    # previsualiza dist/
```

> En Windows, si Astro se queja al escribir su telemetría, ejecuta los comandos con
> `$env:ASTRO_TELEMETRY_DISABLED='1'` (o usa `npx astro telemetry disable`).

---

## Estructura

```
public/
  images/logo.png            Logo de la asociación
  images/uploads/            Fotografías descargadas de la web antigua
  documentos/                PDF descargados de la web antigua
  favicon.svg  .nojekyll  robots.txt
src/
  components/                Header, Footer, tarjetas y páginas completas
  data/
    site.ts                  Datos de la asociación (emails, redes, dominio)
    nav.ts                   Secciones del menú
    publicaciones/*.json     33 entradas migradas de la web antigua
    publicaciones.ts         Carga y utilidades de las publicaciones
    eventos.ts               Calendario de eventos (y generador .ics)
    prensa.ts                Apariciones en medios
  i18n/
    ui.ts                    Textos de la interfaz (solo español)
    utils.ts                 Utilidades de rutas, textos y fechas
  layouts/BaseLayout.astro   Cabecera HTML, metadatos y SEO
  pages/                     Rutas del sitio
  styles/global.css          Sistema de diseño
scripts/                     Scripts de migración y verificación (uso puntual)
```

Las páginas de `src/pages/` son envoltorios finos que renderizan los componentes de
`src/components/pages/`, donde vive el contenido de cada sección.

---

## Cómo editar el contenido

| Qué quieres cambiar | Dónde |
| --- | --- |
| Emails, Instagram, dominio, presidencia | `src/data/site.ts` |
| Secciones del menú | `src/data/nav.ts` |
| Eventos del calendario | `src/data/eventos.ts` |
| Apariciones en prensa | `src/data/prensa.ts` |
| Textos de la interfaz | `src/i18n/ui.ts` |
| Publicaciones | `src/data/publicaciones/*.json` |
| Aviso legal | `src/components/pages/AvisoLegalPage.astro` |
| Cole Árabe | `src/components/pages/ColeArabePage.astro` |
| Portada: parrilla de posts y bloque del Cole | `src/components/pages/InicioPage.astro` |

Los posts cuya `portada` esté vacía muestran el marcador gris
`public/images/placeholder.svg`. Las fotos del Cole Árabe de la portada son
`public/images/uploads/cole-1.jpg` y `cole-2.jpg`.

Para añadir una publicación, crea un archivo JSON en `src/data/publicaciones/` con
esta forma:

```json
{
  "slug": "mi-entrada",
  "title": "Título",
  "date": "2026-05-01",
  "tipo": "noticia",
  "categorias": ["Madrid"],
  "resumen": "Entradilla corta.",
  "portada": "/images/uploads/foto.jpg",
  "originalUrl": "https://...",
  "html": "<p>Contenido…</p>"
}
```

`tipo` puede ser: `noticia`, `comunicado`, `campana`, `articulo` o `nota-prensa`.

---

## Tipografías

El sitio usa dos tipografías de Google Fonts, **autoalojadas** (se descargan en el build
mediante los paquetes `@fontsource`, así que el navegador del visitante no hace ninguna
petición a Google):

| Uso | Tipografía |
| --- | --- |
| Titulares, navegación, botones, etiquetas, fechas y metadatos | **Barlow Condensed** |
| Texto corrido: párrafos, artículos, entradillas y texto legal | **Lora** |

Se cargan solo los pesos y el subconjunto latino necesarios (Barlow Condensed 400/600/700;
Lora 400/400 cursiva/700), desde `src/layouts/BaseLayout.astro`. Las variables
`--fuente` y `--fuente-texto` de `src/styles/global.css` controlan todo el sistema: para
cambiar de tipografía basta con editar esas dos líneas.

---

## Despliegue en GitHub Pages

El sitio se publica automáticamente con el flujo `.github/workflows/deploy.yml` en cada
push a `main`. **Ya está desplegado y funcionando** en
https://comunidadpalestina.madrid.

### Puesta en marcha (una sola vez)

> **Requisito de plan:** con GitHub Free, Pages solo funciona en repositorios
> **públicos**. Si el repositorio es privado necesitas GitHub Pro/Team, o cambiar la
> visibilidad a pública en **Settings > General > Danger Zone > Change visibility**.
> (Este repositorio ya es público.)

1. Sube el proyecto a la rama `main`.
2. El flujo usa `actions/configure-pages` con `enablement: true`, que **crea el sitio de
   Pages automáticamente** la primera vez. Si el token no tuviera permiso, actívalo a mano
   en **Settings > Pages > Source: GitHub Actions** y vuelve a lanzar el flujo.
3. Lanza el despliegue con un push a `main`, o desde **Actions > Deploy web a GitHub
   Pages > Run workflow**.

### Dominio propio: comunidadpalestina.madrid

El dominio se sirve **en la raíz** del sitio (no en `/web/`), así que `astro.config.mjs`
fija `site: https://comunidadpalestina.madrid` y `base: '/'`.

> **Por qué el flujo no usa las salidas de `configure-pages`:** esa acción deduce la ruta
> base del `html_url` de la API de Pages, y con un dominio propio puede seguir devolviendo
> la ruta del repositorio (`/web`), lo que rompería todos los assets
> ([actions/configure-pages#67](https://github.com/actions/configure-pages/issues/67)).
> Por eso el flujo no le pasa `SITE_URL` ni `BASE_PATH` a la compilación: la
> configuración del dominio vive en `astro.config.mjs`.

**DNS** en el panel del proveedor (DonDominio). Hay que **borrar los registros de parking**
que trae el dominio por defecto y dejar solo estos:

| Tipo | Nombre | Valor |
| --- | --- | --- |
| `A` | `@` | `185.199.108.153` |
| `A` | `@` | `185.199.109.153` |
| `A` | `@` | `185.199.110.153` |
| `A` | `@` | `185.199.111.153` |
| `AAAA` (opcional) | `@` | `2606:50c0:8000::153`, `…8001::153`, `…8002::153`, `…8003::153` |
| `CNAME` | `www` | `comunidadpalestinamadrid.github.io` |

El dominio se añade en **Settings > Pages > Custom domain** del repositorio.

### Certificado TLS (HTTPS)

**No hace falta certbot.** Certbot sirve para servidores propios (escribe en la
configuración de tu servidor web y resuelve el reto HTTP-01 contra él). En GitHub Pages no
tienes acceso al servidor: GitHub **emite y renueva el certificado por su cuenta** con
Let's Encrypt en cuanto los DNS son correctos.

1. Espera a que el dominio resuelva (`Resolve-DnsName comunidadpalestina.madrid`).
2. En **Settings > Pages**, la casilla **Enforce HTTPS** aparece cuando el certificado ya
   está emitido (puede tardar **hasta 24 h**). Márcala.
3. Si tras 24 h no aparece, casi siempre es un `CNAME` de `www` mal puesto o un registro
   `A` de parking que sigue ahí.

### Compilar en local

```bash
npm run build      # por defecto: dominio propio, base /
npm run preview    # http://localhost:4321/
```

Para reproducir la antigua URL provisional de GitHub Pages:

```bash
# Windows PowerShell
$env:SITE_URL='https://comunidadpalestinamadrid.github.io'; $env:BASE_PATH='/web'; npm run build
```

---

## Migración desde la web antigua

Se ha migrado automáticamente el contenido de
https://comunidadhispanopalestinamadridblog.wordpress.com:

- **33 entradas** (2017–2024) con su texto e imágenes, clasificadas por tipo.
- **14 páginas** (quiénes somos, historia, cultura, gastronomía, notas de prensa,
  calendario, contacto, sugerencias…). Su texto se ha integrado en las secciones nuevas.
- **52 fotografías**, el logo de la asociación y **2 documentos PDF** alojados en
  `public/`.

El HTML original descargado se conserva en `_migration/raw/` y el contenido extraído en
`_migration/extracted/` (`raw/` no se versiona). Los scripts de `scripts/` permiten
repetir la migración.

Un enlace externo no se pudo descargar (un PDF alojado en `eccpalestine.org` que ya
devuelve 404); el enlace se ha conservado apuntando al original.

---

## Pendiente de completar

### Datos legales — `AvisoLegalPage.astro`
- [ ] CIF de la asociación
- [ ] Número de inscripción en el Registro Nacional de Asociaciones
- [ ] Domicilio social completo
- [ ] Revisión jurídica del texto

### Quiénes somos — `QuienesSomosPage.astro`
- [ ] Nombres de vicepresidencia, secretaría, tesorería y vocalías (ahora aparecen como `[PENDIENTE]`)
- [ ] Número de personas socias

### Cole Árabe — `ColeArabePage.astro`
- [ ] Texto definitivo de la escuela, profesorado, calendario y precios
- [ ] Horarios reales de los grupos (los actuales son de ejemplo)

### Calendario — `src/data/eventos.ts`
- [ ] Sustituir los 12 eventos de ejemplo por los reales (marcados con `prueba: true`)

### Prensa
- [ ] Revisar los enlaces a medios (algunos son de 2017 y pueden haber caducado)

### Traducción
- [ ] La web es **solo en español** por ahora. Si más adelante se traduce, el punto de
      partida es `src/i18n/ui.ts` (textos de interfaz) y volver a añadir los idiomas en
      `astro.config.mjs` y las rutas correspondientes.
