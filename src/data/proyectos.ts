export interface Proyecto {
  nombre: string;
  alias: string; // como lo busca la gente en Google
  descripcion: string;
  href?: string; // URL absoluta (subdominio propio). Sin definir = "enlace pendiente" en la tarjeta.
  estado: 'Desplegado' | 'En desarrollo' | 'En pausa' | 'Sin confirmar';
  imagen?: string;
  // Fecha (AAAA-MM-DD) en que SE CONFIRMÓ este dato, no la fecha real del hecho
  // si esa no se conoce. Ver CLAUDE.md > "Fechas — regla obligatoria".
  fechaConfirmada: string;
}

export const PROYECTOS: Proyecto[] = [
  {
    nombre: 'Aura',
    alias: 'asistencia uniguajira',
    descripcion:
      'Control de eventos y registro de asistencia por código QR, con estadísticas en tiempo real.',
    href: 'https://asistencia.desarrollougmaicao.com', // en vivo, confirmado por Kevin
    estado: 'Desplegado',
    fechaConfirmada: '2026-09-13', // fecha en que se confirmó la URL en vivo (no la fecha real de despliegue, que no se conoce)
  },
  {
    nombre: 'Sofía',
    alias: 'inventario uniguajira',
    descripcion: 'Sistema de gestión de inventario para la universidad.',
    // PENDIENTE: no aparece en public_html (solo "asistencia" e "invoritech", que
    // es un proyecto distinto). Confirmar repo, estado real y subdominio.
    estado: 'Sin confirmar',
    fechaConfirmada: '2026-09-01', // fecha en que Kevin la nombró como proyecto del semillero
  },
];
