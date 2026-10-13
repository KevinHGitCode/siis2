export interface Pilar {
  titulo: string;
  texto: string;
  icono: 'codigo' | 'edificio' | 'equipo';
  color: 'teal' | 'rojo' | 'marca';
  fechaConfirmada: string; // AAAA-MM-DD en que se confirmó el dato en que se apoya
}

// "Qué hacemos": solo hechos ya confirmados (Aura en vivo, enfoque en la universidad y la región, equipo de 4 con docente líder).
// Misión, visión y líneas de investigación NO van aquí hasta que el semillero las defina.
export const PILARES: Pilar[] = [
  { titulo: 'Software real', texto: 'Aura, nuestra app de asistencia, ya está en vivo.', icono: 'codigo', color: 'marca', fechaConfirmada: '2026-09-13' },
  { titulo: 'Para la universidad', texto: 'Aplicado a la universidad y a la región.', icono: 'edificio', color: 'teal', fechaConfirmada: '2026-09-01' },
  { titulo: 'En equipo', texto: 'Cuatro integrantes, con docente líder.', icono: 'equipo', color: 'rojo', fechaConfirmada: '2026-09-01' },
];
