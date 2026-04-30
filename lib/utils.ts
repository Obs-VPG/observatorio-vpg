import { Case } from '@/payload-types';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { GeoJSON } from 'geojson';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function casesToGeoJSON(cases: Case[]) {
  return {
    type: 'FeatureCollection',
    crs: {
      type: 'name',
      properties: { name: 'urn:ogc:def:crs:OGC:1.3:CRS84' }
    },
    features: cases.map((c) => {
      return {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: c.geo
        },
        properties: {
          ...c
        }
      };
    })
  } as GeoJSON;
}
