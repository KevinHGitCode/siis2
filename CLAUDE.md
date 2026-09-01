# CLAUDE.md — siis2-web

Sitio estático del semillero **SIIS2** (Universidad de La Guajira, Maicao).
Hub SEO + cabeza de la red de páginas de los proyectos del semillero.

## Reglas

- **Idioma:** todo el contenido visible en español.
- **Stack:** Astro + Tailwind v4. Sin backend. Nada que rompa el build estático.
- **SEO primero:** cada página con `<title>`, meta description, canonical, headings
  semánticos, `alt` en imágenes. No romper el `JSON-LD` de `BaseLayout.astro`.
- **`base: '/SIIS2'`** en `astro.config.mjs` — no cambiarlo sin actualizar el README
  y el despliegue. Enlaces internos a otras subcarpetas del dominio (proyectos) van
  como rutas absolutas del dominio (`/asistencia-uniguajira`), no bajo `/SIIS2`.
- **Contenido en `src/data/*.ts`**, no incrustado en los `.astro`.
- **No inventar datos del semillero.** Lo que no está confirmado va como
  "Próximamente" o marcado como borrador. Lista de pendientes en el README y en
  `MyBrain/proyectos/idea-web-semillero-siis2.md`.
- **Nombres de integrantes:** solo los 4 ya autorizados. No agregar personas ni
  datos de contacto sin confirmación.

## Comandos

`npm run dev` (sirve en `/SIIS2`) · `npm run build` · `npm run preview`
