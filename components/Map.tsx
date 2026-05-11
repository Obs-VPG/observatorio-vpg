"use client";

import Map, {
  Layer,
  MapRef,
  Popup,
  Source,
  StyleSpecification,
} from "react-map-gl/maplibre";
// @ts-ignore
import {
  clusterCountLayer,
  clusterLayer,
  unclusteredPointLayer,
} from "@/lib/layers";
import mapStyle from "@/lib/mapStyle.json";
import { casesToGeoJSON } from "@/lib/utils";
import { Case } from "@/payload-types";
import { GeoJSONSource } from "maplibre-gl";
import { Dispatch, SetStateAction, useRef, useState } from "react";
import CasePopup from "./CasePopup";

export type MapComponentProps = {
  selectedPoint: Partial<Case> | null;
  setSelectedPoint: Dispatch<SetStateAction<Partial<Case> | null>>;
  data: Partial<Case>[];
  sortCases: any;
};

export default function MapComponent({
  selectedPoint,
  setSelectedPoint,
  data,
  sortCases,
}: MapComponentProps) {
  const mapRef = useRef<MapRef>(null);

  const [hoveredPolygon, setHoveredPolygon] = useState<any>(null);
  const onClick = (event: any) => {
    if (event.features?.length > 0) {
      const feature = event.features[0];
      const featureId = feature?.layer.id;
      const clusterSource = mapRef?.current?.getSource(
        "cases",
      ) as GeoJSONSource;
      const clusterId = feature.properties.cluster_id;

      if (featureId === "clusters") {
        clusterSource
          .getClusterExpansionZoom(clusterId)
          .then((zoom: any) => {
            mapRef?.current?.easeTo({
              center: feature.geometry.coordinates,
              zoom,
              duration: 500,
            });
          })
          .catch((err) => {
            console.log(err);
            return;
          });
      }
      if (featureId === "unclustered-point") {
        let popupPoint = {
          ...feature.properties,
          geo: JSON.parse(feature.properties.geo),
        };
        if (feature.properties.intersectionNames) {
          popupPoint.intersectionNames = JSON.parse(
            popupPoint.intersectionNames,
          );
        }
        if (feature.properties.typeNames) {
          popupPoint.typeNames = JSON.parse(popupPoint.typeNames);
        }
        setSelectedPoint(popupPoint);
      }
    }
  };
  const onMove = (e: any) => {
    let mapLibreInteractiveEl = document?.getElementsByClassName(
      "maplibregl-canvas-container",
    )[0];
    if (e.features.length > 0) {
      const feature = e.features[0];
      mapLibreInteractiveEl.setAttribute("style", "cursor: pointer");
      if (hoveredPolygon !== null) {
        mapRef?.current?.setFeatureState(
          { source: hoveredPolygon.source, id: hoveredPolygon.id },
          { hover: false },
        );
      }
      setHoveredPolygon({ id: feature.id, source: feature.source });
      mapRef?.current?.setFeatureState(
        { source: feature.source, id: feature.id },
        { hover: true },
      );
    } else {
      mapLibreInteractiveEl.setAttribute("style", "");
    }
  };
  const onLeave = (e: any) => {
    if (hoveredPolygon !== null) {
      mapRef?.current?.setFeatureState(
        { source: hoveredPolygon.source, id: hoveredPolygon.id },
        { hover: false },
      );
    }
    setHoveredPolygon(null);
  };

  return (
    <Map
      id="casesMap"
      ref={mapRef}
      initialViewState={{
        longitude: -47.882778,
        latitude: -15.793889,
        zoom: 2.5,
      }}
      style={{ width: "100%", height: "100%" }}
      mapStyle={mapStyle as StyleSpecification}
      interactiveLayerIds={
        [clusterLayer.id, unclusteredPointLayer.id] as string[]
      }
      onClick={onClick}
      // reuseMaps
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      dragRotate={false}
      touchPitch={false}
      touchZoomRotate={false}
      onLoad={() => {
        sortCases(mapRef?.current?.getCenter());
      }}
      onMoveEnd={() => {
        sortCases(mapRef?.current?.getCenter());
      }}
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
        promoteId={"id"}
      >
        <Layer {...unclusteredPointLayer} />
      </Source>
      {selectedPoint && selectedPoint.geo?.length == 2 && (
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
  );
}
