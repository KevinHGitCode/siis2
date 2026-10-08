// Donde cuelga lo estatico que NO es una pagina (imagenes, favicon y, por astro.config.mjs, los JS/CSS generados).
//
// El sitio ocupa la raiz del dominio, y en el hosting cada cosa de la raiz de dist/ necesita su propio enlace en public_html.
// Agrupando todo bajo /siis2/ alcanza UN enlace de carpeta (public_html/siis2 -> dist/siis2) mas los archivos que DEBEN estar en la
// raiz: index.html (el portal), robots.txt y los sitemap. Las paginas siguen en las mismas URLs (/ y /siis2/...).
//
// Si se cambia, hay que mover tambien public/siis2/ (las imagenes y el favicon) y build.assets en astro.config.mjs.
export const ASSETS = '/siis2';
