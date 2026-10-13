# Changelog — siis2-web

Registro con fecha de las decisiones y cambios de fondo del proyecto. Fecha real
del hecho cuando se conoce; si no, la fecha en que se confirmó el dato (aclarado
en cada caso). Ver la regla completa en `CLAUDE.md`.

## 2026-10-13

- Decisión de Kevin: **Sofía va en la página** (sigue listada en `/siis2` como hasta ahora, sin enlace público; las instrucciones sobre ella vienen después) e **Invoritech no va** (no se lista ni se enlaza). No hay cambios de datos ni de build por esta decisión. El `Disallow` de `/invoritech/` en `robots.txt` se mantiene: evita contenido duplicado y es independiente de esta decisión.
- **Revisión de diseño, bloque 1 (3 correcciones).** (1) Sofía pasa de «Desplegado» + «Enlace pendiente» (contradictorio) a la etiqueta **«Acceso restringido»** con pie «Sin enlace público»; `Proyecto.estado` suma ese valor, `fechaConfirmada: '2026-10-13'`. (2) **Contraste AA:** `brand-700` #d9630d → #a94908 y `brand-800` #b34f0b → #8a3d05 (blanco sobre 700 = 5,76:1; antes 3,66:1); `text-slate-400` → `text-slate-500` donde era texto legible; se quitó `opacity-80` de la tarjeta sin enlace. (3) **`/siis2/logros/colombia-5-0/` queda `noindex, follow`** (prop `noindex` en `BaseLayout`) y fuera del sitemap (`filter` en `astro.config.mjs`) hasta confirmar fecha, categoría, participantes y enlace oficial; sin `Disallow` en robots.txt para que Google pueda ver el noindex. `dist/` reconstruido; verificado en local.
- **Rediseño con identidad (fases 1–3 de la revisión de diseño).** Resultado de 6 revisiones en paralelo (diseño, aspirante,
  evaluador institucional, visitante recurrente, lector exigente y viabilidad técnica).
  - *Peso y compartir:* el logo pasa de PNG a `<Picture>` (AVIF/WebP bajo `/siis2/_astro/`: hero de 200 KB a ~28 KB, header de 66 KB a ~7 KB);
    favicon de 140 KB a 2 KB (`favicon-32/48.png` + `apple-touch-icon.png`); imágenes 1200×630 por página (`og-siis2.png`, `og-portal.png`)
    con `og:image:width/height/alt` y `twitter:image`; se quitó una marquita suelta que traía el logo original. Todo lo genera `scripts/generar-assets.mjs`.
  - *Identidad:* colores reales medidos del logo (`wayuu-teal/red/yellow`, `brand-600` = naranja del logo), titulares en Bricolage Grotesque
    (~41 KB, autoalojada), banda wayuu en SVG (hero, divisores, remate de tarjetas), animaciones de entrada y de scroll solo con CSS y
    `prefers-reduced-motion`.
  - *Contenido con prueba, sin inventar:* ficha del semillero (universidad, programa, docente líder, año y «Grupo de investigación: por confirmar»,
    con «Datos actualizados el 13 oct 2026» tomado de los datos), «Qué hacemos» (3 hechos confirmados), equipo en fichas con iniciales (sin fotos
    hasta que haya autorización), proyectos como pósters con su fecha de confirmación, línea de tiempo con las fechas que ya existían
    (`hitos.ts`; Colombia 5.0 con «Fecha por confirmar» y «Verificación en curso») y un solo bloque «Súmate» que reemplaza las dos cajas
    «Próximamente» (pasos y contacto marcados «Por definir»/«Por confirmar»). Se quitó el texto visible «Borrador — …».
  - *Navegación:* botón «Quiero unirme» en el header y el hero, menú móvil con `<details>` (antes en móvil no había navegación) y enlaces del
    header absolutos a `/siis2/#…`, que ahora también funcionan desde la subpágina de Colombia 5.0.
  - *Datos estructurados:* `/` con `WebSite`; `/siis2/` con `ResearchOrganization` (logo) y `BreadcrumbList`.
  - *Corregido:* el artículo de Colombia 5.0 decía «obtuvo el primer lugar», dato que no está confirmado; ahora dice solo que ganó la hackathon.
  - *Pendiente:* la miniatura de Aura con captura real (datos demo), el RSS y «Últimas novedades» en el portal cuando haya más de un hito con fecha,
    y las fotos del equipo (con consentimiento). `dist/` reconstruido; verificado en local (escritorio y móvil).

## 2026-10-07

- **Salida de `dist/` ordenada para el hosting.** Antes la raíz de `dist/` tenía `_astro/`, `images/`, `siis2/`, `favicon.png`,
  `index.html`, `robots.txt` y los sitemap, y `public_html` necesitaba un enlace por cada una (los de carpeta se veían como
  subdominios inexistentes en el panel de administración). Ahora lo estático cuelga de `/siis2/` (`public/siis2/images`,
  `public/siis2/favicon.png`, `build.assets: 'siis2/_astro'`, `ASSETS` en `src/consts.ts`) y alcanza **un solo enlace de carpeta**
  (`public_html/siis2`) más los archivos de la raíz. Las URLs de las páginas (`/`, `/siis2/`, `/siis2/logros/…`) no cambian; cambian
  las de los recursos (`/images/…` → `/siis2/images/…`, `/_astro/…` → `/siis2/_astro/…`). Build y vista previa verificados en local.

## 2026-09-01

- Idea registrada en el segundo cerebro: web del semillero SIIS2 + red de páginas
  de proyectos para posicionar en Google.
- Información consolidada: identidad (SIIS2, Ingeniería de Sistemas, sede Maicao,
  fundado 2026), docente líder (Carlos Deluquez Garizado), 4 integrantes, 2
  proyectos (Aura/"asistencia uniguajira", Sofía/"inventario uniguajira"), logro
  en la hackathon de Colombia 5.0.
- Stack decidido: Astro + Tailwind v4 (sobre Laravel/Blade y WordPress).
- Esqueleto generado en `C:\Projects\siis2-web`. Home única en `/SIIS2` con 9
  secciones. Build verificado local.

## 2026-09-13

- Arquitectura de URLs revisada: `/` pasa a ser el **portal propio del dominio**
  (ya no redirige a la página del semillero); `/siis2` (minúscula, antes
  `/SIIS2`) es la página del semillero. Motivo: el dominio se llama
  "Uniguajira Maicao", no "SIIS2" — no atarlo a un solo semillero.
- Hosting real confirmado: compartido (Hostinger, hPanel, SSH
  `u946584072@us-bos-web1978`). `public_html` es el document root de la raíz y
  ya tenía muchos otros proyectos/carpetas ahí.
- Corrección: los proyectos del semillero viven en **subdominios**
  (`asistencia.desarrollougmaicao.com`), no en subcarpetas de la raíz — el plan
  original de `href` internos estaba mal.
- Detectado: `invoritech.desarrollougmaicao.com` es un proyecto **distinto** de
  Sofía — no se decide todavía si pertenece al semillero (pendiente).
- Detectado: **Sofía (inventario) no tiene carpeta ni subdominio visible** en
  `public_html` — estado real sin confirmar.
- Primer despliegue en `desarrollougmaicao.com` vía symlinks desde
  `public_html` hacia `~/desarrollougmaicao.com/siis2-web/dist`.
- El build de Astro falla en el hosting compartido (`Aborted (core dumped)` —
  binario nativo de esbuild/sharp incompatible con esa máquina). Decisión:
  **`dist/` se versiona en git**; el servidor solo hace `git pull`, nunca
  `npm run build`.
- Confirmado por Kevin: `https://asistencia.desarrollougmaicao.com` es la página
  real y en vivo de Aura.
- Regla nueva: todo dato en `src/data/*.ts` lleva fecha de cuándo se confirmó
  (no inventada). Este changelog arranca hoy.
- Kevin confirmó: **Sofía está 100% funcional**, pero pidió mantenerla **oculta,
  sin enlace público** por ahora (solo mostrar información en `/siis2`). No es
  falta de dato — es decisión deliberada, no agregar `href` sin que lo pida.
  Repo real de Sofía en `C:\Projects`: **queda para después** (no se define hoy).
- **Logo real de SIIS2 incorporado.** Kevin pasó los 3 archivos oficiales
  (`SIIS2 Blanco/Colores/Negro.png`, ya usados en el repo de Aura). Se archivaron
  los originales en `brand/`, se generaron versiones web optimizadas (recortadas +
  640px) en `public/images/logo/`, se creó `public/favicon.png` a partir del logo,
  y la paleta `brand-*` pasó del azul provisional al naranja real del wordmark.
  Header y hero de `/siis2` ahora muestran el logo; el portal `/` muestra una
  miniatura del logo solo en la tarjeta de SIIS2 (no en el header del portal, para
  no mezclar la identidad del dominio con la del semillero).
- Corregidos 2 bugs de texto sin espacio ("Sistemasde", "siguientes:Kevin") y un
  `<a>` sin `href` en el footer para Sofía (rompía accesibilidad).
