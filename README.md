# siis2-web

Sitio que ocupa la **raíz de `https://desarrollougmaicao.com`**.

- **`/`** — portal del dominio: presenta "Desarrollo Uniguajira Maicao" y enlaza al semillero y a sus
  proyectos. No es una página de paso: tiene contenido propio y su propio SEO.
- **`/siis2`** — página del **Semillero de Investigación de Ingeniería de Sistemas 2 (SIIS2)**,
  Universidad de La Guajira, sede Maicao. Hub de la red: enlaza a cada proyecto, y cada proyecto
  enlaza de vuelta acá.

Por qué separados y no `/` = directamente el semillero: el dominio se llama "desarrollo UG
Maicao", no "SIIS2" — atar la raíz a un semillero específico le cierra la puerta a que el dominio
crezca con más grupos/proyectos, y liga su identidad a una composición de estudiantes que rota
cada año. Separado, además, `/` puede posicionar por el término genérico del dominio mientras
`/siis2` posiciona por el semillero — dos apuestas en vez de una. Detalle en el segundo cerebro:
`MyBrain/proyectos/idea-web-semillero-siis2.md`.

## Stack

- **Astro** (estático) + **Tailwind CSS v4** (vía `@tailwindcss/vite`)
- `@astrojs/sitemap` para `sitemap-index.xml`, `@astrojs/mdx` para artículos
- Mismo enfoque que el blog personal (`C:\Projects\Blog\blog`)

## Comandos

```bash
npm install
npm run dev      # http://localhost:4321/
npm run build    # genera dist/
npm run preview
```

> Si `npm install` falla por versiones, alinea `package.json` con las del blog
> (`C:\Projects\Blog\blog\package.json`).

## Despliegue (hosting compartido — confirmado 13 sept 2026)

`desarrollougmaicao.com` es hosting compartido (SSH: `u946584072@us-bos-web1978`), no un VPS con
nginx propio. `public_html/` es el document root del dominio raíz y **ya tiene otros proyectos
ahí** (`public_html/asistencia`, `public_html/invoritech`) vinculados como **subdominios**
(`asistencia.desarrollougmaicao.com`, `invoritech.desarrollougmaicao.com`).

**Este sitio es estático: no hace falta Node en el servidor.** Se construye localmente y solo se
sube `dist/`:

```bash
npm run build
rsync -avz dist/ u946584072@us-bos-web1978:~/public_html/
# alternativa sin rsync:
# scp -r dist/* u946584072@us-bos-web1978:~/public_html/
```

⚠️ **No borrar ni sobreescribir** `public_html/asistencia` ni `public_html/invoritech` — ninguno
de los archivos de `dist/` choca con esos nombres, así que es seguro fusionar (sin `--delete` en
rsync, sin `rm` previo).

⚠️ **Contenido duplicado:** como esas carpetas de subdominio viven dentro del document root de la
raíz, también quedan visibles en `desarrollougmaicao.com/asistencia` y `.../invoritech`. Por eso
`public/robots.txt` las bloquea (`Disallow`) — así Google solo indexa la versión del subdominio.

- `robots.txt` y el `sitemap-index.xml` quedan en la raíz del dominio (`.../sitemap-index.xml`).
- Verificar el sitio en **Google Search Console** (registro TXT en el DNS) apenas esté publicado.

## Marca

Logo real de SIIS2 cargado el 2026-09-13 desde `Asistencia-Uniguajira/public/images/`.

- `brand/siis2-logo-*-original.png` — archivos fuente sin tocar (6000×3375, ~5–7MB c/u).
  No se sirven en la web, quedan como archivo.
- `public/images/logo/siis2-logo-{colores,blanco,negro}.png` — versiones recortadas
  (sin el margen transparente) y reducidas (640px de ancho) para uso en el sitio.
- `public/images/logo/siis2-logo-colores-header.png` — versión más chica (320px) para
  el header.
- `public/favicon.png` — favicon generado a partir de la versión a color.
- La paleta `brand-*` en `src/styles/global.css` sale del naranja del logo (ya no es el
  azul provisional).

Para regenerar las versiones web si llega un logo nuevo, usar `sharp` (ya es dependencia):
`trim()` + `resize({ width: 640 })` + `png({ compressionLevel: 9 })`.

## Dónde está el contenido

Todo el texto editable vive en `src/data/`:

| Archivo | Contiene |
|---|---|
| `semillero.ts` | Identidad, docente líder, descripción SEO. Campos `null`/`[]` = pendientes. |
| `integrantes.ts` | Los 4 integrantes (nombres públicos autorizados). |
| `proyectos.ts` | Aura («asistencia uniguajira») y Sofía («inventario uniguajira»). ⚠️ Confirmar `href` real. |
| `logros.ts` | Hackathon Colombia 5.0 → artículo en `src/pages/siis2/logros/`. |

`src/pages/index.astro` (el portal) arma su directorio a partir de `SEMILLERO` y `PROYECTOS` — no
duplicar esos datos ahí. El diseño de `/siis2` se arma componiendo secciones en
`src/pages/siis2/index.astro` con los componentes de `src/components/`.

## Pendiente (documento para el prof. Carlos Deluquez)

Grupo de investigación (código Minciencias), líneas de investigación, misión/visión,
RedCOLSI, coordinador, **cómo ingresar**, correo oficial, redes, formulario de
contacto, producción académica formal, permiso institucional para publicar, plan
de traspaso al graduarse, datos del hackathon Colombia 5.0.

Ficha completa en el segundo cerebro: `MyBrain/proyectos/idea-web-semillero-siis2.md`.
