export interface Proyecto {
  nombre: string;
  alias: string; // como lo busca la gente en Google
  descripcion: string;
  href: string; // ruta en el MISMO dominio (subcarpeta). CONFIRMAR la ruta real de despliegue.
  estado: 'Desplegado' | 'En desarrollo' | 'En pausa';
  imagen?: string;
}

export const PROYECTOS: Proyecto[] = [
  {
    nombre: 'Aura',
    alias: 'asistencia uniguajira',
    descripcion:
      'Control de eventos y registro de asistencia por código QR, con estadísticas en tiempo real.',
    href: '/asistencia-uniguajira', // CONFIRMAR ruta real
    estado: 'Desplegado',
  },
  {
    nombre: 'Sofía',
    alias: 'inventario uniguajira',
    descripcion: 'Sistema de gestión de inventario para la universidad.',
    href: '/inventario-uniguajira', // CONFIRMAR ruta real
    estado: 'Desplegado',
  },
];
