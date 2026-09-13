# Changelog — siis2-web

Registro con fecha de las decisiones y cambios de fondo del proyecto. Fecha real
del hecho cuando se conoce; si no, la fecha en que se confirmó el dato (aclarado
en cada caso). Ver la regla completa en `CLAUDE.md`.

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
