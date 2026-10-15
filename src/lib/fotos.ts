// Fotos del equipo: retratos 4:5 generados por scripts/generar-equipo.mjs en src/assets/equipo/.
// Se piden por nombre de archivo sin extensión (ej. 'kevin'); astro:assets las sirve en AVIF/WebP bajo /siis2/_astro/.
const fotos = import.meta.glob<ImageMetadata>('../assets/equipo/*.jpg', { eager: true, import: 'default' });

export const fotoEquipo = (nombre?: string): ImageMetadata | undefined => (nombre ? fotos[`../assets/equipo/${nombre}.jpg`] : undefined);

// Logos de las aplicaciones del portal: src/assets/apps/*.png, generados por scripts/generar-apps.mjs.
const apps = import.meta.glob<ImageMetadata>('../assets/apps/*.png', { eager: true, import: 'default' });

export const fotoApp = (nombre?: string): ImageMetadata | undefined => (nombre ? apps[`../assets/apps/${nombre}.png`] : undefined);
