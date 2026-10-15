# Changelog — siis2-web

Registro con fecha de las decisiones y cambios de fondo del proyecto. Fecha real
del hecho cuando se conoce; si no, la fecha en que se confirmó el dato (aclarado
en cada caso). Ver la regla completa en `CLAUDE.md`.

## 2026-10-15

- **Portal de aplicaciones integrado: `/siis2/portal/`.** Reemplaza al sitio aparte «Portal-UG» (repo `ZapataMor/Portal-UG`, hoy en `/Portal-UG/`) para mantener un solo lugar. Página nueva con el estilo del sitio (hero, banda wayuu, tarjetas con el logo de cada app sobre fondo oscuro) que lleva al **inicio de sesión** de cada aplicación; los contadores («3 en vivo», «1 próximamente», «Datos del…») se calculan desde los datos, no están escritos a mano. Icono de cuadrícula arriba a la derecha en `/` y en `/siis2` (componente `BotonApps`) y enlace en el pie. Entra al sitemap y lleva `ItemList` + migas en JSON-LD.
- **Qué se tomó del portal viejo:** las 4 aplicaciones, sus URLs y logos, y el texto de bienvenida. **Qué se descartó** por no estar confirmado o ser fecha relativa: «Latencia 42 ms», «3 servicios activos» fijo, las versiones (`v3.4.0`…) y «ETA próx. semana». Logos de 1–4 MB (PNG 6000×3375, con un número de diapositiva en la esquina) pasan a 15–56 KB, recortados al contenido (`scripts/generar-apps.mjs`); sale AVIF/WebP con `<Picture>`.
- **Sofía** pasa de «Acceso restringido» (sin enlace) a **«En vivo» con enlace a su login** (`maicao-inventario.desarrollougmaicao.com/login`), por decisión de Kevin: la restricción solo existía porque aún no había portal. `fechaConfirmada: 2026-10-15`. El pie ya no dice «acceso restringido» (queda «sin enlace público» si una app no tiene URL).
- **ELISA** (Medición de servicios) y **Servicios tecnológicos** viven en `src/data/aplicaciones.ts`, no en `proyectos.ts`: el semillero no ha confirmado que sean proyectos suyos, y `proyectos.ts` alimenta la sección «Lo que hemos construido». Servicios tecnológicos queda «Próximamente» y sin enlace hasta que Kevin confirme que está en vivo.
- **Foto de fondo en el hero del portal** (pedido de Kevin): `fondo-campus-maicao.png` del repo Portal-UG (1920×1080, 2,8 MB) pasa a JPG de 260 KB en `src/assets/fondos/` y se sirve en AVIF/JPG (24–118 KB según el ancho). Capa `slate-900/75` encima para que el texto blanco pase AA; la imagen es decorativa (`alt=""`). La genera `scripts/generar-apps.mjs`.
- **Aura en el portal lleva a su login** (`/login`), no a su landing (pedido de Kevin). `Proyecto` suma `hrefLogin`/`fechaLogin`: la home y `/siis2` siguen enlazando la landing; el portal usa el login. Verificado: `/login` responde 200 con formulario de acceso.
- **`/Portal-UG/` redirige a `/siis2/portal/`.** Kevin borró la carpeta vieja del servidor (daba 404); la redirección 301 va en `public_html/.htaccess` (regla en el README, sección Despliegue). No se hizo en el build (meta-refresh) para no añadir otra carpeta a la raíz de `dist/` ni otro enlace en `public_html`.

- **Páginas de error 404, 403 y 500** (`src/components/PaginaError.astro` + `src/pages/siis2/{404,403,500}.astro`) con el estilo del sitio: código grande, mensaje claro, botones al inicio, al semillero y al portal; el 500 suma «Intentar de nuevo». `noindex` y fuera del sitemap (`filter` en `astro.config.mjs`). Salen en `dist/siis2/<código>/` y el servidor las toma con `ErrorDocument` (README > Despliegue). No se inventó ningún canal de contacto: el 403 dice «avisa al equipo del semillero».

## 2026-10-14

- **Fotos del equipo.** Kevin entregó los retratos (PNG de ~50 MB cada uno) de Kevin, Daniel, Luis, Renzo y del docente líder Carlos Deluquez. `scripts/generar-equipo.mjs` los recorta a 4:5 (640×800) centrando la cara y los deja en `src/assets/equipo/` (~55 KB cada uno); el sitio los sirve en AVIF/JPG con `<Picture>`. `PersonCard` pasa a tarjeta con retrato y el docente lleva su foto circular; quien no tenga foto conserva el avatar de iniciales. `Integrante` suma `foto` (nombre de archivo) y `fechaFoto` (2026-10-14, cuando se recibió).
- **ADR 0001 (diferido):** Kevin considera que los retratos de los cuatro desarrolladores ocupan mucho espacio; el rediseño se propondrá más adelante (`docs/adr/0001-tamano-fotos-equipo.md`).
- Pendiente: consentimiento formal de las personas que aparecen en las fotos (ver pendientes del README).

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

- **Banda wayuu propia: se aplica la V3.** A partir de una franja de Uniguajira que pasó Kevin se midió el motivo (periodo de 252 px, ancho de 65 px,
  colores #e75e4e/#f5a536/#22b4b7) y se dibujaron tres versiones en `brand/patrones/` (`wayuu-v1-fiel.svg`, `wayuu-v2-geometrica.svg`,
  `wayuu-v3-paleta-semillero.svg`; se conservan las tres; las genera `scripts/generar-patrones.mjs`). Kevin eligió la **V3** (geometría de V2 con los colores del
  logo SIIS2: rojo #d22d17, amarillo #f9ae06, teal #02b4b4 + naranja #f85906) y reemplaza la banda de rombos en el hero (sube desde el borde inferior),
  el pie, el bloque «Súmate», las tarjetas de proyecto, el portal `/` y las imágenes para compartir. Las bandas horizontales son `src/styles/banda-v3.svg`
  y `banda-v3-arriba.svg` (la tira girada 90°; Vite las incrusta en el CSS, 0 peticiones). Sigue siendo un motivo derivado del diseño de la universidad:
  conviene la autorización de Comunicaciones de Uniguajira (pendiente «permiso formal»). Se dibujó solo la mitad visible de la franja (la referencia está
  cortada en el borde izquierdo). `dist/` reconstruido; verificado en local.

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
