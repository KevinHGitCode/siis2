import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import tailwindcss from '@tailwindcss/vite';

// El sitio se despliega en https://desarrollougmaicao.com/SIIS2
// La raiz "/" se redirige (301) a "/SIIS2" a nivel de servidor (ver README).
export default defineConfig({
  site: 'https://desarrollougmaicao.com',
  base: '/SIIS2',
  trailingSlash: 'ignore',
  integrations: [mdx(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
