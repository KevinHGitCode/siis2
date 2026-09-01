# siis2-web

Sitio del **Semillero de Investigación de Ingeniería de Sistemas 2 (SIIS2)** —
Universidad de La Guajira, sede Maicao.

Objetivo: hub del semillero, optimizado para posicionar en Google, y punto de
partida de la **red de páginas** de los proyectos del semillero (cada proyecto
enlaza de vuelta a este hub).

## Stack

- **Astro** (estático) + **Tailwind CSS v4** (vía `@tailwindcss/vite`)
- `@astrojs/sitemap` para `sitemap-index.xml`, `@astrojs/mdx` para artículos
- Mismo enfoque que el blog personal (`C:\Projects\Blog\blog`)

## Comandos

```bash
npm install
npm run dev      # http://localhost:4321/SIIS2
npm run build    # genera dist/
npm run preview
```

> Si `npm install` falla por versiones, alinea `package.json` con las del blog
> (`C:\Projects\Blog\blog\package.json`).

## Despliegue

- Se publica en **`https://desarrollougmaicao.com/SIIS2`** → por eso
  `astro.config.mjs` tiene `base: '/SIIS2'`. El contenido de `dist/` se sirve
  bajo esa ruta.
- La **raíz `/` redirige (301) a `/SIIS2`**. Eso se configura en el servidor,
  no en Astro. Ejemplo nginx:

  ```nginx
  location = / { return 301 /SIIS2; }
  location /SIIS2/ { alias /var/www/siis2-web/dist/; try_files $uri $uri/ =404; }
  ```

- `robots.txt` y el `sitemap` efectivos del dominio deben referenciar
  `https://desarrollougmaicao.com/SIIS2/sitemap-index.xml`. El `public/robots.txt`
  de este repo es la referencia; según cómo quede el dominio raíz puede haber que
  consolidar un único `robots.txt` a nivel de dominio.
- Verificar el sitio en **Google Search Console** (registro TXT en el DNS) apenas
  esté publicado.

## Dónde está el contenido

Todo el texto editable vive en `src/data/`:

| Archivo | Contiene |
|---|---|
| `semillero.ts` | Identidad, docente líder, descripción SEO. Campos `null`/`[]` = pendientes. |
| `integrantes.ts` | Los 4 integrantes (nombres públicos autorizados). |
| `proyectos.ts` | Aura («asistencia uniguajira») y Sofía («inventario uniguajira»). ⚠️ Confirmar `href` real. |
| `logros.ts` | Hackathon Colombia 5.0 → artículo en `src/pages/logros/`. |

El diseño se arma componiendo secciones en `src/pages/index.astro` con los
componentes de `src/components/` (`ProjectCard`, `PersonCard`, `AchievementCard`,
`Section`, `ComingSoon`). Reordenar o duplicar secciones = mover bloques en ese
archivo.

## Pendiente (documento para el prof. Carlos Deluquez)

Grupo de investigación (código Minciencias), líneas de investigación, misión/visión,
RedCOLSI, coordinador, **cómo ingresar**, correo oficial, redes, formulario de
contacto, producción académica formal, permiso institucional para publicar, plan
de traspaso al graduarse, datos del hackathon Colombia 5.0.

Ficha completa en el segundo cerebro: `MyBrain/proyectos/idea-web-semillero-siis2.md`.
