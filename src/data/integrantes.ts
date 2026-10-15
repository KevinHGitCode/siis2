export interface Integrante {
  nombre: string;
  rol: string;
  github?: string;
  linkedin?: string;
  foto?: string; // archivo en src/assets/equipo, sin extensión (ej. "kevin"); lo genera scripts/generar-equipo.mjs
  fechaFoto?: string; // AAAA-MM-DD en que se recibió/confirmó la foto
}

// Nombres públicos autorizados (1 sept 2026). Todos "Desarrollador" por ahora.
export const INTEGRANTES: Integrante[] = [
  { nombre: 'Kevin Díaz', rol: 'Desarrollador', foto: 'kevin', fechaFoto: '2026-10-14' },
  { nombre: 'Daniel Sierra', rol: 'Desarrollador', foto: 'daniel', fechaFoto: '2026-10-14' },
  { nombre: 'Luis Zapata', rol: 'Desarrollador', foto: 'luis', fechaFoto: '2026-10-14' },
  { nombre: 'Renzo Sánchez', rol: 'Desarrollador', foto: 'renzo', fechaFoto: '2026-10-14' },
];

// Foto del docente líder (nombre y cargo en SEMILLERO.docenteLider).
export const FOTO_DOCENTE = { foto: 'carlos', fechaFoto: '2026-10-14' };
