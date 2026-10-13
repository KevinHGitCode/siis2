import { SEMILLERO } from '../data/semillero';
import { INTEGRANTES } from '../data/integrantes';
import { ASSETS } from '../consts';

export const SITIO = 'https://desarrollougmaicao.com';

export function schemaSemillero(url: string) {
  return {
    '@type': 'ResearchOrganization',
    '@id': `${SITIO}/siis2/#semillero`,
    name: SEMILLERO.nombreLargo,
    alternateName: SEMILLERO.nombreCorto,
    url,
    foundingDate: SEMILLERO.fundacion,
    description: SEMILLERO.descripcionSEO,
    logo: { '@type': 'ImageObject', url: `${SITIO}${ASSETS}/apple-touch-icon.png`, width: 180, height: 180 },
    parentOrganization: {
      '@type': 'CollegeOrUniversity',
      name: SEMILLERO.universidad,
      url: SEMILLERO.universidadUrl,
    },
    member: INTEGRANTES.map((i) => ({ '@type': 'Person', name: i.nombre })),
  };
}

export function schemaMigas(items: { nombre: string; url: string }[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.nombre, item: it.url })),
  };
}

export function graph(nodos: object[]) {
  return { '@context': 'https://schema.org', '@graph': nodos };
}
