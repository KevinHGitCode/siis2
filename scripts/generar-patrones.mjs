// Dibuja las 3 versiones del patrón wayuu propio (tira vertical, como la referencia) en brand/patrones/
// y, de la V3 (la elegida el 2026-10-13), las dos bandas horizontales que usa el sitio:
//   node scripts/generar-patrones.mjs
// - brand/patrones/wayuu-v1-fiel.svg · wayuu-v2-geometrica.svg · wayuu-v3-paleta-semillero.svg   (se conservan las tres)
// - src/styles/banda-v3.svg         borde recto ARRIBA (la banda "cuelga": pie, bloque Súmate, tarjetas)
// - src/styles/banda-v3-arriba.svg  borde recto ABAJO (la banda "sube": remate del hero)
import { writeFileSync } from 'node:fs';

const envolver = (cuerpo, w, h) =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">\n${cuerpo}\n</svg>\n`;

// V1 · fiel: medidas tomadas de la franja de referencia (ancho 65, periodo 252). Colores de la referencia.
const v1 = (c = { coral: '#e75e4e', amarillo: '#f5a536', teal: '#22b4b7' }) => envolver(`
<g id="coral" fill="none" stroke="${c.coral}" stroke-width="15" stroke-linejoin="miter" stroke-miterlimit="10">
  <path d="M-10 81 L33 135 L-2 179 L33 223 L-2 267 L-10 277"/>
</g>
<use href="#coral" y="-252"/>
<g fill="${c.coral}"><path d="M0 117 L13 136 L0 155Z"/><path d="M0 201 L13 220 L0 238Z"/></g>
<g fill="none" stroke="${c.amarillo}" stroke-width="12" stroke-linejoin="miter" stroke-miterlimit="10"><path d="M41 -2 L-4 58"/><path d="M-4 50 L40 108"/></g>
<path fill="${c.amarillo}" fill-rule="evenodd" d="M19.5 28 L42 54 L19.5 80 L-3 54 Z M19.5 44 L26 54 L19.5 64 L13 54 Z"/>
<path fill="${c.teal}" d="M33.5 170 L41 181 L33.5 192 L26 181 Z"/>`, 64, 252);

// Cuerpo de V2/V3 (sin <svg>): todo a 45° sobre rejilla de 8; tile de 64 × 256.
const cuerpoV2 = (c, idCoral = 'coral') => `
<g id="${idCoral}" fill="none" stroke="${c.coral}" stroke-width="14" stroke-linejoin="miter" stroke-miterlimit="10">
  <path d="M-8 96 L34 140 L-4 180 L34 220 L-8 264"/>
</g>
<use href="#${idCoral}" y="-256"/>
<g fill="${c.coral}"><path d="M0 124 L12 140 L0 156Z"/><path d="M0 204 L12 220 L0 236Z"/></g>
<g fill="none" stroke="${c.amarillo}" stroke-width="12" stroke-linejoin="miter" stroke-miterlimit="10"><path d="M42 2 L2 46 L0 54 L42 100"/></g>
<path fill="${c.amarillo}" fill-rule="evenodd" d="M20 24 L44 52 L20 80 L-4 52 Z M20 40 L28 52 L20 64 L12 52 Z"/>
<path fill="${c.teal}" d="M36 168 L45 180 L36 192 L27 180 Z"/>${c.extra ? `
<g fill="${c.extra}"><path d="M30 126 L36 134 L30 142 L24 134Z"/><path d="M30 206 L36 214 L30 222 L24 214Z"/></g>` : ''}`;

const PALETA_V2 = { coral: '#e75e4e', amarillo: '#f5a536', teal: '#22b4b7', extra: null };
// V3 · paleta del semillero: colores medidos del logo SIIS2 + el naranja del wordmark.
const PALETA_V3 = { coral: '#d22d17', amarillo: '#f9ae06', teal: '#02b4b4', extra: '#f85906' };

const v2 = () => envolver(cuerpoV2(PALETA_V2), 64, 256);
const v3 = () => envolver(cuerpoV2(PALETA_V3), 64, 256);

// Banda horizontal de la V3: la tira girada 90° (borde recto arriba). Tile de 256 × 64 que se repite en X.
// `invertida` la voltea (borde recto abajo). El trazo del coral se duplica a mano porque en un fondo CSS no se puede usar <use> entre tiles.
const bandaV3 = (invertida) => {
  const interior = cuerpoV2(PALETA_V3, 'c');
  const girado = `<g transform="translate(256,0) rotate(90)">${interior}</g>`;
  const cuerpo = invertida ? `<g transform="translate(0,64) scale(1,-1)">${girado}</g>` : girado;
  return envolver(cuerpo, 256, 64);
};

writeFileSync('brand/patrones/wayuu-v1-fiel.svg', v1());
writeFileSync('brand/patrones/wayuu-v2-geometrica.svg', v2());
writeFileSync('brand/patrones/wayuu-v3-paleta-semillero.svg', v3());
writeFileSync('src/styles/banda-v3.svg', bandaV3(false));
writeFileSync('src/styles/banda-v3-arriba.svg', bandaV3(true));
console.log('patrones escritos');
