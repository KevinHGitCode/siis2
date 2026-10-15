// Recorta y comprime las fotos del equipo (originales de ~50 MB, fuera del repo) a retratos 4:5 de 640x800 en src/assets/equipo/.
//   node scripts/generar-equipo.mjs [carpeta-con-originales]
// Las personas sin autorización para aparecer en el sitio (SIN_PUBLICAR) salen a brand/equipo-sin-publicar/, que no entra al build.
// Cada encuadre se definió viendo la foto: `cx` = centro de la cara y `ty` = coronilla, en px de una vista de 700 px de ancho.
// El retrato mide 340 px de alto en esa vista y deja la cabeza en el tercio superior (la cara queda centrada en horizontal).
import sharp from 'sharp';
import { mkdirSync } from 'node:fs';

const CARPETA = process.argv[2] ?? 'C:/Users/kdiaz/Pictures/equipo siis2';
const FOTOS = {
  kevin: { cx: 345, ty: 53 },
  daniel: { cx: 347, ty: 30 },
  luis: { cx: 356, ty: 65 },
  renzo: { cx: 340, ty: 52 },
  carlos: { cx: 328, ty: 35 },
  wence: { cx: 330, ty: 45 },
};
const SIN_PUBLICAR = ['wence'];
const ALTO_VISTA = 340;
const ANCHO_VISTA = ALTO_VISTA * 0.8;

mkdirSync('src/assets/equipo', { recursive: true });
mkdirSync('brand/equipo-sin-publicar', { recursive: true });

for (const [nombre, { cx, ty }] of Object.entries(FOTOS)) {
  const entrada = `${CARPETA}/${nombre}.png`;
  const { width, height } = await sharp(entrada, { limitInputPixels: false }).rotate().metadata().then((m) => ({ width: m.width, height: m.height }));
  const k = width / 700;
  const alto = Math.round(ALTO_VISTA * k);
  const ancho = Math.round(ANCHO_VISTA * k);
  const top = Math.min(Math.max(0, Math.round((ty - 40) * k)), height - alto);
  const left = Math.min(Math.max(0, Math.round((cx - ANCHO_VISTA / 2) * k)), width - ancho);
  await sharp(entrada, { limitInputPixels: false })
    .rotate()
    .extract({ left, top, width: ancho, height: alto })
    .resize(640, 800)
    .toColourspace('srgb')
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(`${SIN_PUBLICAR.includes(nombre) ? 'brand/equipo-sin-publicar' : 'src/assets/equipo'}/${nombre}.jpg`);
  console.log(nombre, { left, top, ancho, alto });
}
