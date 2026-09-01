# Prompt — crear la primera página (`/SIIS2`)

Copia esto en una sesión de Claude Code dentro de `C:\Projects\siis2-web` cuando
quieras llevar el esqueleto a una v1 pulida.

---

Estás en `siis2-web`: sitio estático (Astro + Tailwind v4) del **Semillero de
Investigación de Ingeniería de Sistemas 2 (SIIS2)** de la Universidad de La
Guajira, sede Maicao. Se despliega en `https://desarrollougmaicao.com/SIIS2`
(`base: '/SIIS2'` ya configurado). Es el **hub** del que van a colgar las páginas
de los proyectos del semillero, así que los componentes tienen que ser
reutilizables.

El esqueleto ya existe: `src/pages/index.astro`, `BaseLayout.astro`,
`Header/Footer/Section/ProjectCard/PersonCard/AchievementCard/ComingSoon`, y los
datos en `src/data/*.ts`. Lee `CLAUDE.md` y `README.md` antes de tocar nada.

## Objetivo

Dejar la home `/SIIS2` lista para publicar y para indexar en Google, **solo con la
información confirmada** (abajo). Lo no confirmado se queda como "Próximamente" o
borrador — no inventes datos.

## Información confirmada

- **Nombre:** Semillero de Investigación de Ingeniería de Sistemas 2 — sigla SIIS2.
- **Adscripción:** programa de Ingeniería de Sistemas, sede Maicao, Universidad de La Guajira.
- **Fundación:** 2026.
- **Docente líder:** Carlos Deluquez Garizado (confirmar ortografía).
- **Integrantes (nombres públicos, rol "Desarrollador"):** Kevin Díaz, Daniel Sierra, Luis Zapata, Renzo Sánchez.
- **Proyectos:** Aura («asistencia uniguajira») — asistencia por QR + estadísticas;
  Sofía («inventario uniguajira») — inventario. Ambos desplegados en subcarpetas
  del mismo dominio (confirmar la ruta exacta antes de fijar el `href`).
- **Logro:** el equipo ganó la hackathon de **Colombia 5.0** (detalles pendientes)
  → artículo en `src/pages/logros/colombia-5-0.astro`.

## Tareas

1. **Diseño.** Estética institucional pero moderna, limpia, con buen ritmo
   vertical. Modo claro. Responsive real (probar 375 px y 1280 px). Tipografía
   legible; jerarquía clara. La paleta `brand-*` de `src/styles/global.css` es
   provisional (azul) hasta que llegue el logo — déjala centralizada ahí para
   cambiar el color en un solo lugar.
2. **Hero.** Título = nombre largo, con la sigla clara. Subtítulo de una frase.
   Dos CTAs: "Ver proyectos" y "Conocer el semillero".
3. **Secciones** (en este orden): Qué es · Integrantes (+ docente líder) ·
   Proyectos · Logros · Cómo ingresar (Próximamente) · Contacto (Próximamente).
4. **Componentes reutilizables.** `ProjectCard`, `PersonCard`, `AchievementCard`
   deben quedar aptos para reusarse en las futuras páginas de proyectos. Si algo
   está muy pegado a la home, extráelo.
5. **SEO técnico.** Verifica en `BaseLayout.astro`: `<title>` único y descriptivo,
   meta description (~150 car.), canonical, Open Graph, `lang="es"`, `JSON-LD`
   `ResearchOrganization` válido. Genera una imagen OG (`public/og.png`, 1200×630)
   o al menos deja el `<meta property="og:image">` listo. Confirma que
   `@astrojs/sitemap` produce URLs con `/SIIS2/`.
6. **Keywords objetivo** (trabájalas en headings y texto, sin relleno):
   "semillero ingeniería de sistemas Uniguajira", "SIIS2",
   "semillero investigación sistemas Maicao", "asistencia uniguajira",
   "inventario uniguajira".
7. **Enlaces internos.** Cada `ProjectCard` enlaza a la página del proyecto; el
   footer repite esos enlaces. Deja preparado (comentado o en datos) el enlace de
   vuelta hub ↔ proyecto que se pondrá en cada proyecto.
8. **Accesibilidad.** Contraste AA, `alt` en imágenes, foco visible, un solo `<h1>`.
9. **Verificación.** `npm run build` sin errores ni warnings. Revisa el HTML de
   `dist/SIIS2/index.html`: title, meta, JSON-LD, headings.

## Fuera de alcance (no hacer)

- No crear secciones de misión/visión/líneas de investigación/RedCOLSI/cómo
  ingresar/contacto con datos inventados.
- No agregar integrantes ni datos de contacto.
- No backend, no formularios que envíen a ningún lado todavía.
- No enrutar SEO de Aura como si su casa fuera este dominio (es producto aparte).

Al terminar, resume qué quedó publicable y qué sigue bloqueado por los pendientes
del prof. Carlos Deluquez.
