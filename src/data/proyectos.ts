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
    // Sin `href` A PROPÓSITO (no por falta de dato): Kevin confirmó que está
    // 100% funcional, pero pidió mantenerla oculta, sin enlace público, solo
    // mostrar información, hasta nuevo aviso. No agregar href sin que él lo pida.
    // PENDIENTE (para luego, no ahora): cuál repo de C:\Projects es este proyecto.
    estado: 'Desplegado',
    fechaConfirmada: '2026-09-13', // fecha en que Kevin confirmó "100% funcional" + ocultarla
  },
];
