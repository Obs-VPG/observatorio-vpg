'use client';

import Map, {
  Layer,
  MapRef,
  Marker,
  Popup,
  Source,
  StyleSpecification
} from 'react-map-gl/maplibre';
// @ts-ignore
import 'maplibre-gl/dist/maplibre-gl.css';
import mapStyle from '@/lib/mapStyle.json';
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
  useRef,
  useState
} from 'react';
import { DataPointInterface } from './MainWrapper';
import type { GeoJSON } from 'geojson';
import { Case } from '@/payload-types';
import Pin from './Pin';
import { GeoJSONSource } from 'maplibre-gl';
import { casesToGeoJSON } from '@/lib/utils';
import {
  clusterLayer,
  clusterCountLayer,
  unclusteredPointLayer
} from '@/lib/layers';
import CasePopup from './CasePopup';

export type MapComponentProps = {
  selectedPoint: Case | null;
  setSelectedPoint: Dispatch<SetStateAction<Case | null>>;
  data: Case[];
};

export default function MapComponent({
  selectedPoint,
  setSelectedPoint,
  data
}: MapComponentProps) {
  const mapRef = useRef<MapRef>(null);

  const [hoveredPolygon, setHoveredPolygon] = useState<any>(null);
  const onClick = (event: any) => {
    if (event.features?.length > 0) {
      const feature = event.features[0];
      const featureId = feature?.layer.id;
      const clusterSource = mapRef?.current?.getSource(
        'cases'
      ) as GeoJSONSource;
      const clusterId = feature.properties.cluster_id;

      if (featureId === 'clusters') {
        clusterSource
          .getClusterExpansionZoom(clusterId)
          .then((zoom: any) => {
            mapRef?.current?.easeTo({
              center: feature.geometry.coordinates,
              zoom,
              duration: 500
            });
          })
          .catch((err) => {
            console.log(err);
            return;
          });
      }
      if (featureId === 'unclustered-point') {
        setSelectedPoint({
          ...feature.properties,
          geo: JSON.parse(feature.properties.geo)
        });
      }
    }
  };
  const onMove = (e: any) => {
    let mapLibreInteractiveEl = document?.getElementsByClassName(
      'maplibregl-canvas-container maplibregl-interactive maplibregl-touch-drag-pan maplibregl-touch-zoom-rotate'
    )[0];
    if (e.features.length > 0) {
      const feature = e.features[0];
      mapLibreInteractiveEl.setAttribute('style', 'cursor: pointer');
      if (hoveredPolygon !== null) {
        mapRef?.current?.setFeatureState(
          { source: hoveredPolygon.source, id: hoveredPolygon.id },
          { hover: false }
        );
      }
      setHoveredPolygon({ id: feature.id, source: feature.source });
      mapRef?.current?.setFeatureState(
        { source: feature.source, id: feature.id },
        { hover: true }
      );
    } else {
      mapLibreInteractiveEl.setAttribute('style', '');
    }
  };
  const onLeave = (e: any) => {
    if (hoveredPolygon !== null) {
      mapRef?.current?.setFeatureState(
        { source: hoveredPolygon.source, id: hoveredPolygon.id },
        { hover: false }
      );
    }
    setHoveredPolygon(null);
  };

  return (
    <section className="w-full h-full border border-dashed">
      <Map
        id="casesMap"
        ref={mapRef}
        initialViewState={{
          longitude: -47.882778,
          latitude: -15.793889,
          zoom: 3.5
        }}
        style={{ width: '100%', height: '100%' }}
        mapStyle={mapStyle as StyleSpecification}
        interactiveLayerIds={[clusterLayer.id, unclusteredPointLayer.id]}
        onClick={onClick}
        // reuseMaps
        onMouseMove={onMove}
        onMouseLeave={onLeave}
      >
        <Source
          id="cases"
          type="geojson"
          data={casesToGeoJSON(data)}
          cluster={true}
          clusterMaxZoom={14}
          clusterRadius={50}
        >
          <Layer {...clusterLayer} />
          <Layer {...clusterCountLayer} />
        </Source>
        <Source
          id="cases-unclustered"
          type="geojson"
          data={casesToGeoJSON(data)}
          cluster={true}
          clusterMaxZoom={14}
          clusterRadius={50}
          promoteId={'id'}
        >
          <Layer {...unclusteredPointLayer} />
        </Source>
        {selectedPoint && (
          <Popup
            key={selectedPoint.geo[0] + selectedPoint.geo[1]}
            longitude={selectedPoint.geo[0]}
            latitude={selectedPoint.geo[1]}
            onClose={() => setSelectedPoint(null)}
            className="group"
          >
            <div className="">
              <CasePopup CASE={selectedPoint} />
            </div>
          </Popup>
        )}
      </Map>
    </section>
  );
}
