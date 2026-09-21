# Web de la Asociación Hispano Palestina de Madrid

Sitio web estático construido con **Astro** para la Asociación de la Comunidad Hispano
Palestina Jerusalén (AHPJ), conocida como **Comunidad Palestina de Madrid**.

- **Dominio previsto:** https://comunidadpalestina.madrid
- **Idiomas:** español (`/`) y árabe (`/ar/`, con maquetación RTL)
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
  favicon.svg  CNAME  robots.txt
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
    ui.ts                    Textos de interfaz en español y árabe
    utils.ts                 Utilidades de idioma, rutas y fechas
  layouts/BaseLayout.astro   Cabecera HTML, metadatos y SEO
  pages/                     Rutas en español
  pages/ar/                  Mismas rutas en árabe
  styles/global.css          Sistema de diseño
scripts/                     Scripts de migración y verificación (uso puntual)
```

Las páginas comparten componentes: `src/pages/*.astro` y `src/pages/ar/*.astro` son
envoltorios finos que pasan `lang="es"` o `lang="ar"` a los componentes de
`src/components/pages/`.

---

## Cómo editar el contenido

| Qué quieres cambiar | Dónde |
| --- | --- |
| Emails, Instagram, dominio, presidencia | `src/data/site.ts` |
| Secciones del menú | `src/data/nav.ts` |
| Eventos del calendario | `src/data/eventos.ts` |
| Apariciones en prensa | `src/data/prensa.ts` |
| Textos de interfaz (ambos idiomas) | `src/i18n/ui.ts` |
| Publicaciones | `src/data/publicaciones/*.json` |
| Aviso legal | `src/components/pages/AvisoLegalPage.astro` |
| Cole Árabe | `src/components/pages/ColeArabePage.astro` |

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

## Despliegue en GitHub Pages

1. Crea el repositorio y sube el proyecto a la rama `main`.
2. En **Settings > Pages**, selecciona **Source: GitHub Actions**.
3. El flujo `.github/workflows/deploy.yml` compila y publica automáticamente en cada
   push a `main`.
4. El archivo `public/CNAME` ya contiene `comunidadpalestina.madrid`, de modo que el
   sitio se publica con el dominio propio.
5. **DNS** en el proveedor del dominio:
   - Registros `A` para `comunidadpalestina.madrid` hacia:
     `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - Registro `CNAME` para `www` hacia `<usuario>.github.io`
6. Marca **Enforce HTTPS** cuando el certificado esté emitido.

El dominio canónico está configurado en `astro.config.mjs` (`site`), por lo que el
sitemap y las etiquetas canónicas ya apuntan a https://comunidadpalestina.madrid.

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
- [ ] El dossier de prensa (`/prensa/dossier`) se guarda como PDF desde el navegador
- [ ] Revisar los enlaces a medios (algunos son de 2017 y pueden haber caducado)

### Traducción al árabe
- [ ] Los textos institucionales ya están traducidos; las publicaciones del archivo
      histórico permanecen en español, como se indica en su ficha
