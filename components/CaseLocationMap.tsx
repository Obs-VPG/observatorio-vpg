"use client";

import { Case } from "@/payload-types";
import Map, {
  FullscreenControl,
  MapRef,
  Marker,
  NavigationControl,
  ScaleControl,
  StyleSpecification,
} from "react-map-gl/maplibre";
import mapStyle from "@/lib/mapStyle.json";
import Pin from "./Pin";
import { useEffect, useRef } from "react";

export type CaseLocationMapProps = { doc: Case };

export default function CaseLocationMap({ doc }: CaseLocationMapProps) {
  const ref = useRef<MapRef>(null);
  const zoomMap = () => {
    if (ref.current) {
      ref.current?.flyTo({ center: doc.geo, zoom: 8 });
    }
  };
  return (
    <Map
      ref={ref}
      id={`${doc.id}-map`}
      initialViewState={{
        longitude: doc.geo[0],
        latitude: doc.geo[1],
        zoom: 0,
      }}
      mapStyle={mapStyle as StyleSpecification}
      style={{ width: "100%", height: "100%" }}
      onLoad={() => {
        zoomMap();
      }}
      scrollZoom={false}
    >
      <FullscreenControl position="top-left" />
      <NavigationControl position="top-left" />
      <ScaleControl />
      <Marker
        key={`marker-${doc.id}`}
        longitude={doc.geo[0]}
        latitude={doc.geo[1]}
        anchor="bottom"
        className="pointer-events-none"
      >
        <Pin />
      </Marker>
    </Map>
  );
}
