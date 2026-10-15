import { PROYECTOS, type Proyecto } from './proyectos';

// Aplicaciones del portal (/siis2/portal/): cada una lleva al inicio de sesión de su app.
// Aura y Sofía salen de PROYECTOS (una sola fuente para URL, estado y fecha); aquí solo se les añade categoría y logo.
// Las demás son aplicaciones de la universidad cuya autoría del semillero no está confirmada, por eso no están en PROYECTOS.
export interface Aplicacion {
  nombre: string;
  categoria: string;
  descripcion: string;
  href?: string;
  estado: Proyecto['estado'];
  logo?: string; // archivo en src/assets/apps, sin extensión (lo genera scripts/generar-apps.mjs)
  fechaConfirmada: string; // AAAA-MM-DD en que SE CONFIRMÓ el dato
}

const EXTRA: Record<string, Pick<Aplicacion, 'categoria' | 'logo'>> = {
  Aura: { categoria: 'Asistencia', logo: 'aura' },
  Sofía: { categoria: 'Inventario y activos', logo: 'sofia' },
};

const deProyectos: Aplicacion[] = PROYECTOS.filter((p) => EXTRA[p.nombre]).map((p) => ({
  nombre: p.nombre,
  descripcion: p.descripcion,
  href: p.hrefLogin ?? p.href, // el portal lleva al inicio de sesión; si el proyecto no tiene landing aparte, href ya es el login
  estado: p.estado,
  fechaConfirmada: p.fechaLogin ?? p.fechaConfirmada,
  ...EXTRA[p.nombre],
}));

// Datos tomados del repo Portal-UG (2026-10-15). Se omitieron las versiones, la latencia y el «próx. semana» de ese portal:
// no estaban confirmados o eran fechas relativas. El estado de cada una lo confirma Kevin.
const otras: Aplicacion[] = [
  {
    nombre: 'ELISA',
    categoria: 'Medición de servicios',
    descripcion:
      'Evaluación en Línea de Satisfacción y Atención al Usuario: seguimiento de los indicadores de calidad de los servicios prestados.',
    href: 'https://medicion.desarrollougmaicao.com',
    estado: 'Desplegado',
    logo: 'elisa',
    fechaConfirmada: '2026-10-15',
  },
  {
    nombre: 'Servicios tecnológicos',
    categoria: 'Infraestructura y soporte',
    descripcion: 'Plataforma de gestión y soporte de la infraestructura tecnológica de la universidad.',
    // Sin href a propósito: el repo Portal-UG la marcaba inactiva (sertech.desarrollougmaicao.com). Se enlaza cuando Kevin confirme que está en vivo.
    estado: 'Próximamente',
    fechaConfirmada: '2026-10-15',
  },
];

export const APLICACIONES: Aplicacion[] = [...deProyectos, ...otras];
