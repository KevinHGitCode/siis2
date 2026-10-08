import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import tailwindcss from '@tailwindcss/vite';

// El sitio ocupa la RAIZ de https://desarrollougmaicao.com.
// "/" es el portal del dominio; "/siis2" es la pagina del semillero.
// Otros proyectos (Aura, Sofia) viven en sus propias subcarpetas, servidos por
// otras apps detras del mismo dominio (ver README - nginx).
//
// Para que en el hosting alcance UN solo enlace de carpeta (public_html/siis2 -> dist/siis2) en vez de uno por cada cosa de dist/,
// TODO lo estatico que no es una pagina (JS/CSS generados, imagenes, favicon) cuelga de /siis2/: ver src/consts.ts (ASSETS) y
// public/siis2/. En la raiz solo quedan index.html, robots.txt y los sitemap, que tienen que estar ahi.
export default defineConfig({
  site: 'https://desarrollougmaicao.com',
  trailingSlash: 'ignore',
  build: { assets: 'siis2/_astro' }, // los JS/CSS generados salen en dist/siis2/_astro y se piden como /siis2/_astro/...
  integrations: [mdx(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
