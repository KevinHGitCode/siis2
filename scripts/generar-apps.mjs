// Comprime los recursos del portal (/siis2/portal/): logos de las apps a src/assets/apps/ y la foto del campus a src/assets/fondos/.
//   node scripts/generar-apps.mjs <carpeta-assets-de-Portal-UG>
// Los originales (PNG blancos con fondo transparente, 6000x3375 y de 1 a 4 MB) viven en el repo ZapataMor/Portal-UG, carpeta assets/.
// La foto de fondo del hero es fondo-campus-maicao.png (1920x1080, 2,8 MB) -> JPG de ~200 KB; Astro la sirve en AVIF/WebP.
// Cada logo trae un numero de diapositiva en la esquina inferior derecha: se borra antes de recortar al contenido.
import sharp from 'sharp';
import { mkdirSync } from 'node:fs';

const CARPETA = process.argv[2];
if (!CARPETA) throw new Error('Uso: node scripts/generar-apps.mjs <carpeta-assets-de-Portal-UG>');
const LOGOS = { aura: 'logo-aura.png', sofia: 'logo-sofia.png', elisa: 'logo-elisa.png' };

mkdirSync('src/assets/apps', { recursive: true });

for (const [nombre, archivo] of Object.entries(LOGOS)) {
  const { data, info } = await sharp(`${CARPETA}/${archivo}`, { limitInputPixels: false }).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width: w, height: h } = info;
  for (let y = Math.floor(h * 0.88); y < h; y++) {
    for (let x = Math.floor(w * 0.9); x < w; x++) data[(y * w + x) * 4 + 3] = 0;
  }
  const limpio = await sharp(data, { raw: { width: w, height: h, channels: 4 } }).png().toBuffer();
  const recortado = await sharp(limpio).trim({ threshold: 8 }).png().toBuffer();
  const { width, height } = await sharp(recortado).metadata();
  // Margen para que el logo no quede pegado a los bordes de la tarjeta.
  const margen = Math.round(width * 0.04);
  await sharp(recortado)
    .extend({ top: margen, bottom: margen, left: margen, right: margen, background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .resize({ width: 720 })
    .png({ compressionLevel: 9, palette: true, quality: 90 })
    .toFile(`src/assets/apps/${nombre}.png`);
  console.log(nombre, { width, height });
}

mkdirSync('src/assets/fondos', { recursive: true });
await sharp(`${CARPETA}/fondo-campus-maicao.png`).resize({ width: 1920 }).jpeg({ quality: 78, mozjpeg: true }).toFile('src/assets/fondos/campus-maicao.jpg');
console.log('fondo campus-maicao');
