export interface Integrante {
  nombre: string;
  rol: string;
  github?: string;
  linkedin?: string;
  foto?: string; // ruta en /public, ej. "/SIIS2/integrantes/kevin.jpg"
}

// Nombres públicos autorizados (1 sept 2026). Todos "Desarrollador" por ahora.
export const INTEGRANTES: Integrante[] = [
  { nombre: 'Kevin Díaz', rol: 'Desarrollador' },
  { nombre: 'Daniel Sierra', rol: 'Desarrollador' },
  { nombre: 'Luis Zapata', rol: 'Desarrollador' },
  { nombre: 'Renzo Sánchez', rol: 'Desarrollador' },
];
