// Genera los recursos visuales derivados del logo (se corre en local; el resultado se versiona).
//   node scripts/generar-assets.mjs
// - src/assets/logo/siis2-logo.png        fuente recortada para astro:assets (Astro saca AVIF/WebP bajo /siis2/_astro)
// - public/siis2/favicon-*.png, apple-touch-icon.png   iconos livianos (recorte del "2" del logo)
// - public/siis2/images/og/*.png          imagenes 1200x630 para compartir
import sharp from 'sharp';
import { mkdirSync } from 'node:fs';

const ORIGINAL = 'brand/siis2-logo-colores-original.png';
const COLOR = { teal: '#02b4b4', rojo: '#d22d17', amarillo: '#f9ae06', naranja: '#f85906', marca: '#a94908', fondo: '#fff3e7', tinta: '#1f1d1b' };

mkdirSync('src/assets/logo', { recursive: true });
mkdirSync('public/siis2/images/og', { recursive: true });

// El original trae una marquita suelta en una esquina que agranda el recorte: se detecta (componentes pequenos) y se deja fuera.
async function cuerpoDelLogo() {
  const e = 4;
  const { data, info } = await sharp(ORIGINAL).resize({ width: 6000 / e }).ensureAlpha().extractChannel(3).raw().toBuffer({ resolveWithObject: true });
  const { width: w, height: h } = info;
  const etiqueta = new Int32Array(w * h);
  const comps = [];
  for (let i = 0; i < w * h; i++) {
    if (data[i] < 24 || etiqueta[i]) continue;
    const id = comps.length + 1;
    const c = { area: 0, x0: w, y0: h, x1: 0, y1: 0 };
    const pila = [i];
    etiqueta[i] = id;
    while (pila.length) {
      const j = pila.pop();
      const x = j % w, y = (j - x) / w;
      c.area++; c.x0 = Math.min(c.x0, x); c.x1 = Math.max(c.x1, x); c.y0 = Math.min(c.y0, y); c.y1 = Math.max(c.y1, y);
      for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
        const nx = x + dx, ny = y + dy;
        if (nx < 0 || ny < 0 || nx >= w || ny >= h) continue;
        const k = ny * w + nx;
        if (data[k] >= 24 && !etiqueta[k]) { etiqueta[k] = id; pila.push(k); }
      }
    }
    comps.push(c);
  }
  const total = comps.reduce((a, c) => a + c.area, 0);
  const grandes = comps.filter((c) => c.area >= total * 0.01);
  const left = Math.max(0, Math.min(...grandes.map((c) => c.x0)) * e - 24);
  const top = Math.max(0, Math.min(...grandes.map((c) => c.y0)) * e - 24);
  const right = Math.min(6000, Math.max(...grandes.map((c) => c.x1)) * e + 24);
  const bottom = Math.min(3375, Math.max(...grandes.map((c) => c.y1)) * e + 24);
  return { left, top, width: right - left, height: bottom - top };
}

const cuerpo = await cuerpoDelLogo();
const recorte = await sharp(ORIGINAL).extract(cuerpo).png().toBuffer();
await sharp(recorte).trim().resize({ width: 1280 }).png({ compressionLevel: 9 }).toFile('src/assets/logo/siis2-logo.png');

const dos = () => sharp(ORIGINAL).extract({ left: 3330, top: 930, width: 1580, height: 1580 });
const icono = { palette: true, quality: 90, compressionLevel: 9 };
await dos().resize(180).png(icono).toFile('public/siis2/apple-touch-icon.png');
await dos().resize(48).png(icono).toFile('public/siis2/favicon-48.png');
await dos().resize(32).png(icono).toFile('public/siis2/favicon-32.png');

const banda = (alto) => {
  const k = alto / 14;
  const w = 40 * k;
  return `<pattern id="wy" width="${w}" height="${alto}" patternUnits="userSpaceOnUse"><g transform="scale(${k})">
<path d="M10 1L19 7L10 13L1 7Z" fill="${COLOR.teal}"/><path d="M10 4.5L13.5 7L10 9.5L6.5 7Z" fill="${COLOR.fondo}"/>
<path d="M30 1L39 7L30 13L21 7Z" fill="${COLOR.rojo}"/><path d="M30 4.5L33.5 7L30 9.5L26.5 7Z" fill="${COLOR.amarillo}"/></g></pattern>`;
};

const FUENTE = "font-family=\"'Segoe UI', Arial, Helvetica, sans-serif\"";
const lineas = (xs, x, y, size, paso, color, peso) =>
  xs.map((t, i) => `<text x="${x}" y="${y + i * paso}" font-size="${size}" font-weight="${peso}" fill="${color}" ${FUENTE}>${t}</text>`).join('');

const marco = (cuerpo) => `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630"><defs>${banda(28)}</defs>
<rect width="1200" height="630" fill="${COLOR.fondo}"/><rect y="0" width="1200" height="28" fill="url(#wy)"/><rect y="602" width="1200" height="28" fill="url(#wy)"/>${cuerpo}</svg>`;

const logo = await sharp('src/assets/logo/siis2-logo.png').resize({ width: 500 }).toBuffer();
const logoAlto = (await sharp(logo).metadata()).height;

const ogSiis2 = marco(
  lineas(['Semillero de', 'Investigación de', 'Ingeniería de', 'Sistemas 2'], 620, 215, 52, 62, COLOR.tinta, 700) +
    lineas(['Universidad de La Guajira · Sede Maicao'], 620, 480, 26, 0, '#5b5955', 400) +
    lineas(['desarrollougmaicao.com/siis2'], 620, 530, 24, 0, COLOR.marca, 600),
);
await sharp(Buffer.from(ogSiis2))
  .composite([{ input: logo, left: 70, top: Math.round((630 - logoAlto) / 2) }])
  .png({ compressionLevel: 9 })
  .toFile('public/siis2/images/og/og-siis2.png');

const ogPortal = marco(
  lineas(['Desarrollo', 'Uniguajira Maicao'], 90, 250, 78, 92, COLOR.tinta, 700) +
    lineas(['Proyectos de software de la Universidad de La Guajira'], 90, 440, 30, 0, '#5b5955', 400) +
    lineas(['desarrollougmaicao.com'], 90, 500, 26, 0, COLOR.marca, 600),
);
await sharp(Buffer.from(ogPortal)).png({ compressionLevel: 9 }).toFile('public/siis2/images/og/og-portal.png');

console.log('Recursos generados.');
