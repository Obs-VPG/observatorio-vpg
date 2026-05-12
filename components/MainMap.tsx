"use client";

import {
  Map,
  MapClusterLayer,
  MapControls,
  MapPopup,
  MapRef,
} from "@/components/ui/map";
import mapStyle from "@/lib/mapStyle.json";
import type { GeoJSON } from "geojson";
import { Dispatch, SetStateAction, useCallback, useState } from "react";
import { DataPointInterface } from "./MapPage";

type MainMapProps = {
  selectedPoint: {
    coordinates: [number, number];
    properties: DataPointInterface;
  } | null;
  setSelectedPoint: Dispatch<
    SetStateAction<{
      coordinates: [number, number];
      properties: DataPointInterface;
    } | null>
  >;
  data: GeoJSON;
};

export function MainMap({
  selectedPoint,
  setSelectedPoint,
  data,
}: MainMapProps) {
  const [ref, setRef] = useState<MapRef | null>(null);
  const measuredRef = useCallback((node: any) => {
    setRef(node);
  }, []);

  return (
    <section className="h-full w-full">
      <Map
        ref={measuredRef}
        center={[-47.882778, -15.793889]}
        zoom={3.5}
        styles={{ light: mapStyle as any }}
        theme="light"
      >
        <MapClusterLayer<DataPointInterface>
          data={data as any}
          clusterRadius={80}
          clusterMaxZoom={4}
          clusterColors={["#1c1e1d", "#123d31", "#FDAC39"]}
          clusterThresholds={[5, 20]}
          pointColor="#123d31"
          onPointClick={(feature, coordinates) => {
            setSelectedPoint({
              coordinates,
              properties: feature.properties,
            });
          }}
        />

        {selectedPoint && (
          <MapPopup
            key={`${selectedPoint.coordinates[0]}-${selectedPoint.coordinates[1]}`}
            longitude={selectedPoint.coordinates[0]}
            latitude={selectedPoint.coordinates[1]}
            onClose={() => setSelectedPoint(null)}
            closeOnClick={false}
            focusAfterOpen={false}
            closeButton
          >
            <div className="max-w-3xs space-y-1.5 p-1 xl:space-y-2">
              {/* <div className="w-8 h-8 rounded-full mb-3 bg-everglade-900 -rotate-6"></div> */}
              <p className="text-base leading-tight font-bold text-balance">
                {selectedPoint.properties.name}
              </p>
            </div>
          </MapPopup>
        )}
        <MapControls />
      </Map>
    </section>
  );
}
