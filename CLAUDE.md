# CLAUDE.md — siis2-web

Sitio estático de la raíz de `desarrollougmaicao.com`. `/` = portal del dominio,
`/siis2` = página del semillero SIIS2 (Universidad de La Guajira, Maicao). Cabeza
de la red de páginas de los proyectos del semillero.

## Reglas

- **Idioma:** todo el contenido visible en español.
- **Stack:** Astro + Tailwind v4. Sin backend. Nada que rompa el build estático.
- **SEO primero:** cada página con `<title>`, meta description, canonical, headings
  semánticos, `alt` en imágenes. No romper el `JSON-LD` de `BaseLayout.astro`.
- **URLs en minúscula.** `/siis2`, no `/SIIS2`. No usar `base` en `astro.config.mjs`
  — el sitio ocupa la raíz del dominio; los proyectos (Aura, Sofía) son otras apps
  detrás del mismo dominio, no parte de este build.
- **`/` no es un redirect ni una copia de `/siis2`.** Es un portal con contenido
  propio (directorio de semillero + proyectos). No vaciarlo ni volverlo un "paso".
- **Contenido en `src/data/*.ts`**, no incrustado en los `.astro`. El portal
  (`src/pages/index.astro`) construye su directorio desde `SEMILLERO` y
  `PROYECTOS` — no dupliques esos datos ahí.
- **No inventar datos del semillero.** Lo que no está confirmado va como
  "Próximamente" o marcado como borrador. Lista de pendientes en el README y en
  `MyBrain/proyectos/idea-web-semillero-siis2.md`.
- **Nombres de integrantes:** solo los 4 ya autorizados. No agregar personas ni
  datos de contacto sin confirmación.

## Fechas — regla obligatoria (desde 13 sept 2026)

Este proyecto puede seguir vivo por años. Sin fecha, se pierde el "cuándo pasó qué".

- Toda entrada nueva o editada en `src/data/*.ts` lleva su campo de fecha
  (`fechaConfirmada`, `fechaRegistro`, etc.) en formato `AAAA-MM-DD`.
- **La fecha es de cuándo SE CONFIRMÓ el dato, no una fecha inventada.** Si no se
  sabe la fecha real del hecho (ej. cuándo se desplegó algo por primera vez), se
  anota cuándo se confirmó y se aclara la diferencia (ver `Proyecto.fechaConfirmada`
  como ejemplo).
- Todo cambio de fondo (nueva página, decisión de arquitectura, dato nuevo,
  corrección) se anota con fecha real en `CHANGELOG.md` — nunca "hoy" ni fechas
  relativas.
- Esta misma disciplina aplica en `MyBrain/proyectos/idea-web-semillero-siis2.md`.

## Estructura de salida (importante para el despliegue)

En el hosting, `public_html` enlaza `dist/` con **un enlace por cada entrada de la raíz de `dist/`**. Para que sean pocos, la raíz de
`dist/` solo debe tener `index.html`, `robots.txt`, los `sitemap` y la carpeta `siis2/`. Todo lo estático (imágenes, favicon, JS/CSS
generados) va bajo `/siis2/`: `public/siis2/…`, `ASSETS` en `src/consts.ts` y `build.assets: 'siis2/_astro'`. **No pongas carpetas
nuevas en `public/` ni en la raíz de `dist/`**; cuélgalas de `public/siis2/`. Las URLs de las páginas no cambian.

## Marca y diseño (desde 13 oct 2026)

- **Logo:** siempre con `<Picture>` de `astro:assets` desde `src/assets/logo/siis2-logo.png` (sale como AVIF/WebP bajo `/siis2/_astro/`). Los
  derivados (logo recortado, iconos, imágenes OG) se regeneran con `node scripts/generar-assets.mjs` a partir de `brand/`. No pongas PNG pesados en `public/`.
- **Color:** para texto pequeño solo `brand-700/800` (pasan AA). `brand-600` y `wayuu-*` son decorativos. Todo texto nuevo debe dar ≥ 4,5:1.
- **Banda wayuu:** adorno de marca, no un tejido auténtico; nunca detrás de texto. No presentarla como patrón cultural «oficial».
- **Movimiento:** solo `opacity`/`transform`, con `prefers-reduced-motion`; sin librerías de animación ni parallax.
- **Lo que falta se dice con `DatoPendiente`** («Por confirmar», «En definición»); no se rellena con texto genérico ni se inventan fotos, cifras o testimonios.
- **Fechas visibles** salen de los datos (`fechaConfirmada`, `fechaRegistro`) con `src/lib/fechas.ts`; no usar la fecha del build para datos.
- **Astro:** en una plantilla, si un texto va justo antes de `{expresión}` en otra línea, el espacio se pierde: déjalos en la misma línea.

## Comandos

`npm run dev` · `npm run build` · `npm run preview`
