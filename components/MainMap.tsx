'use client';

import {
  Map,
  MapClusterLayer,
  MapControls,
  MapPopup,
  MapRef
} from '@/components/ui/map';
import fakeData from '@/lib/ejatlasData.json';
import mapStyle from '@/lib/mapStyle.json';
import { Dispatch, SetStateAction, useCallback, useState } from 'react';
import { DataPointInterface } from './MainWrapper';

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
};

export function MainMap({ selectedPoint, setSelectedPoint }: MainMapProps) {
  const [ref, setRef] = useState<MapRef | null>(null);
  const measuredRef = useCallback((node: any) => {
    setRef(node);
  }, []);

  let data = {
    ...fakeData,
    features: [
      ...(fakeData as any).features.filter(
        (feat: any) =>
          feat?.geometry?.coordinates?.length === 2 &&
          !isNaN(feat?.geometry?.coordinates[0]) &&
          !isNaN(feat?.geometry?.coordinates[1])
      )
    ]
  };
  return (
    <section className="w-full h-full border border-dashed">
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
          clusterColors={['#1c1e1d', '#123d31', '#FDAC39']}
          clusterThresholds={[5, 20]}
          pointColor="#123d31"
          onPointClick={(feature, coordinates) => {
            setSelectedPoint({
              coordinates,
              properties: feature.properties
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
            <div className="space-y-1.5 xl:space-y-2 p-1 max-w-xs">
              <p className="text-base font-bold text-balance leading-tight">
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
