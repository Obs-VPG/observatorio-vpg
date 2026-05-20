import { Case } from "@/payload-types";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { GeoJSON } from "geojson";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function casesToGeoJSON(cases: Partial<Case>[]) {
  return {
    type: "FeatureCollection",
    crs: {
      type: "name",
      properties: { name: "urn:ogc:def:crs:OGC:1.3:CRS84" },
    },
    features: cases.map((c) => {
      return {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: c.geo,
        },
        properties: {
          ...c,
        },
      };
    }),
  } as GeoJSON;
}

export function getYearBoundaryISO(year: number, type: "min" | "max"): string {
  const date =
    type === "min"
      ? new Date(Date.UTC(year, 0, 1, 0, 0, 0, 0))
      : new Date(Date.UTC(year, 11, 31, 23, 59, 59, 999));

  return date.toISOString();
}

export function mapArray(array: any[], keyKey: string, valueKey: string) {
  let res: any = {};
  array.forEach((item) => {
    res[item[keyKey]] = item[valueKey];
  });
  return res;
}
