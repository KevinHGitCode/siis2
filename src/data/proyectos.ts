export interface Proyecto {
  nombre: string;
  alias: string; // como lo busca la gente en Google
  descripcion: string;
  href?: string; // URL absoluta (subdominio propio). Sin definir = "enlace pendiente" en la tarjeta.
  estado: 'Desplegado' | 'En desarrollo' | 'En pausa';
  imagen?: string;
}

export const PROYECTOS: Proyecto[] = [
  {
    nombre: 'Aura',
    alias: 'asistencia uniguajira',
    descripcion:
      'Control de eventos y registro de asistencia por código QR, con estadísticas en tiempo real.',
    href: 'https://asistencia.desarrollougmaicao.com', // confirmado 13 sept 2026 (public_html/asistencia)
    estado: 'Desplegado',
  },
  {
    nombre: 'Sofía',
    alias: 'inventario uniguajira',
    descripcion: 'Sistema de gestión de inventario para la universidad.',
    // PENDIENTE: no aparece en public_html (solo "asistencia" e "invoritech").
    // Confirmar dónde está desplegada o si todavía no tiene subdominio propio.
    estado: 'Desplegado',
  },
];
