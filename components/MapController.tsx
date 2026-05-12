"use client";

import { Button } from "@/components/ui/button";
import { useMap } from "@/components/ui/map";
import { Mountain, RotateCcw } from "lucide-react";
import { Dispatch, SetStateAction, useEffect } from "react";

export type MapControllerProps = {
  setPopup: Dispatch<
    SetStateAction<{
      coordinates: [number, number];
      properties: any;
    } | null>
  >;
};

export default function MapController({ setPopup }: MapControllerProps) {
  const { map, isLoaded } = useMap();

  useEffect(() => {
    if (!map || !isLoaded) return;

    const handleMove = () => {
      setPopup(null);
    };

    map.on("move", handleMove);
    return () => {
      map.off("move", handleMove);
    };
  }, [map, isLoaded]);

  if (!isLoaded) return null;

  return (
    <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
      <div className="flex gap-2">
        <Button size="sm" variant="secondary">
          <Mountain className="mr-1.5 size-4" />
          3D View
        </Button>
        <Button size="sm" variant="secondary">
          <RotateCcw className="mr-1.5 size-4" />
          Reset
        </Button>
      </div>
      <div className="bg-background/90 rounded-md border px-3 py-2 font-mono text-xs backdrop-blur">
        <div>Pitch: °</div>
        <div>Bearing: °</div>
      </div>
    </div>
  );
}
