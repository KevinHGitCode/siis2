export interface Logro {
  titulo: string;
  fecha?: string;
  resumen: string;
  href?: string; // artículo ampliado dentro de /SIIS2/logros/*
  imagen?: string;
}

export const LOGROS: Logro[] = [
  {
    titulo: 'Ganadores de la hackathon en Colombia 5.0',
    resumen:
      'El equipo del semillero participó en el evento Colombia 5.0 y ganó la hackathon. Detalles, categoría y fotos: pendiente de confirmar con el semillero.',
    href: '/siis2/logros/colombia-5-0',
  },
];
