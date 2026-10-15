# ADR 0001 — Tamaño de las fotos del equipo en `/siis2/`

- **Estado:** propuesto, **diferido** (no se implementa ahora).
- **Fecha:** 2026-10-14 (decisión de Kevin Díaz).

## Contexto

El 2026-10-14 se agregaron los retratos del equipo como tarjetas verticales 4:5 de ancho completo de columna
(4 columnas en escritorio, ~240 px de ancho × 300 px de alto cada una; en móvil una por fila, ~90 % del ancho).
Kevin observó que las fotos de los cuatro desarrolladores **ocupan demasiado espacio** frente al resto de la página.

## Decisión

No cambiar el diseño por ahora. Se deja registrado para retomarlo más adelante y proponer otras opciones.

## Opciones a evaluar (sin implementar)

1. **Fila compacta:** foto cuadrada o circular de ~96 px con nombre y rol al lado (como las iniciales de antes, pero con foto).
2. **Rejilla densa:** 4–6 columnas de retratos pequeños (~120–160 px) con el nombre debajo; en móvil 2 por fila.
3. **Retrato con nombre superpuesto:** foto 1:1 más baja, con el nombre sobre una franja inferior (cuidando el contraste AA).
4. **Foto en miniatura que se amplía al tocar** (`<dialog>`/`:target`, sin librerías), para mantener la calidad sin gastar altura.
5. **Foto de grupo única** de ancho completo y bajo alto, con los nombres en una lista debajo.

Criterios: altura total de la sección «Equipo», peso de imagen (hoy ~55 KB por retrato), contraste AA, móvil primero,
sin librerías de animación ni JS pesado.

## Consecuencias

- Mientras tanto, el cambio de tamaño es solo de CSS/markup: `src/components/PersonCard.astro` y la rejilla de
  `src/pages/siis2/index.astro`. Los retratos 4:5 de `src/assets/equipo/` sirven también para recortes más pequeños
  (si hiciera falta otra proporción, se ajusta `scripts/generar-equipo.mjs`).
