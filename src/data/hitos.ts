import { LOGROS } from './logros';

export interface Hito {
  titulo: string;
  // AAAA-MM-DD o solo AAAA. Sin definir = "Fecha por confirmar" (no se inventa).
  fecha?: string;
  // Si la fecha es la de CONFIRMACIÓN del dato y no la del hecho real, se dice en pantalla.
  fechaEsDeConfirmacion?: boolean;
  fechaRegistro: string; // AAAA-MM-DD en que se cargó al sitio
  verificacionEnCurso?: boolean;
  href?: string;
}

// Línea de tiempo de /siis2. Los logros de logros.ts entran solos; los hitos de abajo ya están confirmados.
export const HITOS: Hito[] = [
  { titulo: 'Nace el semillero SIIS2', fecha: '2026', fechaRegistro: '2026-09-01' },
  {
    titulo: 'Aura, la app de asistencia, en vivo',
    fecha: '2026-09-13',
    fechaEsDeConfirmacion: true, // se confirmó ese día que estaba en línea; se desconoce el día real de su despliegue
    fechaRegistro: '2026-09-13',
    href: 'https://asistencia.desarrollougmaicao.com',
  },
  ...LOGROS.map((l) => ({
    titulo: l.titulo,
    fecha: l.fecha,
    fechaRegistro: l.fechaRegistro,
    verificacionEnCurso: !l.fecha,
    href: l.href,
  })),
];
