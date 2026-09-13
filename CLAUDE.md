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

## Comandos

`npm run dev` · `npm run build` · `npm run preview`
