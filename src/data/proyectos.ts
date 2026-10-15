export interface Proyecto {
  nombre: string;
  alias: string; // como lo busca la gente en Google
  descripcion: string;
  href?: string; // URL absoluta (subdominio propio; en el portal, la del inicio de sesión). Sin definir = "Sin enlace público" en la tarjeta.
  // Solo si el proyecto tiene landing además del login: el portal (/siis2/portal/) usa esta URL; la home y /siis2 siguen con `href`.
  hrefLogin?: string;
  fechaLogin?: string; // AAAA-MM-DD en que se confirmó `hrefLogin`
  estado: 'Desplegado' | 'En desarrollo' | 'En pausa' | 'Sin confirmar' | 'Acceso restringido' | 'Próximamente';
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
    href: 'https://asistencia.desarrollougmaicao.com', // landing, en vivo, confirmado por Kevin
    hrefLogin: 'https://asistencia.desarrollougmaicao.com/login', // el portal lleva aquí (pedido de Kevin, 2026-10-15; responde 200 con formulario de acceso)
    fechaLogin: '2026-10-15',
    estado: 'Desplegado',
    icono: 'qr',
    fechaConfirmada: '2026-09-13', // fecha en que se confirmó la URL en vivo (no la fecha real de despliegue, que no se conoce)
  },
  {
    nombre: 'Sofía',
    alias: 'inventario uniguajira',
    descripcion: 'Sistema de gestión de inventario para la universidad.',
    // 2026-10-13: Kevin la había dejado «Acceso restringido» y sin enlace porque aún no había portal. 2026-10-15: con el portal
    // (/siis2/portal/) cada aplicación lleva a su inicio de sesión, así que Sofía pasa a «En vivo» con el enlace al login
    // (URL tomada del repo Portal-UG, confirmada por Kevin al integrarlo).
    // PENDIENTE (para después, no ahora): saber cuál repo de C:\Projects es este proyecto.
    href: 'https://maicao-inventario.desarrollougmaicao.com/login',
    estado: 'Desplegado',
    icono: 'codigo',
    fechaConfirmada: '2026-10-15', // fecha en que Kevin confirmó que el portal lleva al login de Sofía
  },
];
