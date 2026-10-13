export interface Proyecto {
  nombre: string;
  alias: string; // como lo busca la gente en Google
  descripcion: string;
  href?: string; // URL absoluta (subdominio propio). Sin definir = "Sin enlace público" en la tarjeta.
  estado: 'Desplegado' | 'En desarrollo' | 'En pausa' | 'Sin confirmar' | 'Acceso restringido';
  icono?: 'codigo' | 'qr' | 'candado'; // ilustración del póster de la tarjeta (SVG propio, sin capturas)
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
    icono: 'qr',
    fechaConfirmada: '2026-09-13', // fecha en que se confirmó la URL en vivo (no la fecha real de despliegue, que no se conoce)
  },
  {
    nombre: 'Sofía',
    alias: 'inventario uniguajira',
    descripcion: 'Sistema de gestión de inventario para la universidad.',
    // Decisión de Kevin (2026-10-13): etiqueta "Acceso restringido" aprobada. Funciona
    // al 100%, pero se mantiene SIN `href` (sin enlace público) a propósito: acceso
    // restringido. No agregar href sin que él lo pida.
    // PENDIENTE (para después, no ahora): saber cuál repo de C:\Projects es este proyecto.
    estado: 'Acceso restringido',
    icono: 'candado',
    fechaConfirmada: '2026-10-13', // fecha en que Kevin decidió la etiqueta y el acceso restringido
  },
];
