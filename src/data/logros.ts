export interface Logro {
  titulo: string;
  fecha?: string; // fecha REAL del hecho (AAAA-MM-DD). Pendiente hasta confirmarla.
  fechaRegistro: string; // fecha (AAAA-MM-DD) en que se cargó este logro al sitio
  resumen: string;
  href?: string; // artículo ampliado dentro de /siis2/logros/*
  imagen?: string;
}

export const LOGROS: Logro[] = [
  {
    titulo: 'Ganadores de la hackathon en Colombia 5.0',
    fechaRegistro: '2026-09-01',
    resumen:
      'El equipo del semillero participó en el evento Colombia 5.0 y ganó la hackathon. Detalles, categoría y fotos: pendiente de confirmar con el semillero.',
    href: '/siis2/logros/colombia-5-0',
  },
];
