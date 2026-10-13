const MESES = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];

// "2026-10-13" -> "13 oct 2026"; "2026" -> "2026". Se parte el texto a mano para no depender de la zona horaria.
export function formatearFecha(valor: string): string {
  const [anio, mes, dia] = valor.split('-');
  if (!mes || !dia) return anio;
  return `${Number(dia)} ${MESES[Number(mes) - 1]} ${anio}`;
}

// La fecha más reciente entre las que ya vienen en los datos (AAAA-MM-DD); no usa la fecha del build.
export function masReciente(fechas: string[]): string {
  return [...fechas].sort().at(-1) ?? '';
}
