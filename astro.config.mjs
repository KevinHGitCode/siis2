import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import tailwindcss from '@tailwindcss/vite';

// El sitio ocupa la RAIZ de https://desarrollougmaicao.com.
// "/" es el portal del dominio; "/siis2" es la pagina del semillero.
// Otros proyectos (Aura, Sofia) viven en sus propias subcarpetas, servidos por
// otras apps detras del mismo dominio (ver README - nginx).
export default defineConfig({
  site: 'https://desarrollougmaicao.com',
  trailingSlash: 'ignore',
  integrations: [mdx(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
