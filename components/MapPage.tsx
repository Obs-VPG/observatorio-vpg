"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Case } from "@/payload-types";
import { distance } from "@turf/distance";
import { point } from "@turf/helpers";
import { useEffect, useRef, useState } from "react";
import { MapProvider } from "react-map-gl/maplibre";
import CaseList from "./CaseList";
import Logos from "./Logos";
import MapComponent from "./Map";
import { Button } from "./ui/button";
import { EarthIcon, List, MapIcon } from "lucide-react";
import SearchBar from "./SearchBar";

export type MapPageProps = {
  cases: Partial<Case>[];
  filters: {
    id: string;
    name: string;
    slug: string;
    additionalType: string;
  }[];
};

export default function MapPage({ cases, filters }: MapPageProps) {
  const scrollAreaRef = useRef<HTMLDivElement | null>(null);
  const [showMap, setShowMap] = useState(false);
  const [selectedPoint, setSelectedPoint] = useState<Partial<Case> | null>(
    null,
  );
  const [sorteredCases, setSorteredCases] = useState<Partial<Case>[]>([]);
  useEffect(() => {
    setSorteredCases(cases);
  }, [cases]);
  const onSortCases = (center: { lng: number; lat: number }) => {
    const centerPoint = point([center?.lng || 0, center?.lat || 0]);

    const sortedCases = [...cases].sort((a, b) => {
      const distA = distance(centerPoint, point(a.geo as [number, number]));
      const distB = distance(centerPoint, point(b.geo as [number, number]));
      return distA - distB; // ascending
    });
    setSorteredCases(sortedCases);
    const viewport = scrollAreaRef.current?.querySelector(
      "[data-radix-scroll-area-viewport]",
    );

    viewport?.scrollTo({
      top: 0,
      behavior: "instant",
    });
  };
  return (
    <MapProvider>
      <div className="bg-light-green relative md:flex">
        <Button
          className="absolute right-4 bottom-4 z-10 h-10 rounded-full border border-black/10 shadow-lg md:hidden"
          variant={"secondary"}
          onClick={() => setShowMap((prev) => !prev)}
        >
          {showMap ? (
            <>
              <List className="size-4" />
              Lista
            </>
          ) : (
            <>
              <EarthIcon className="size-4" />
              Mapa
            </>
          )}
        </Button>
        {/* Map */}
        <div
          className={cn(
            "h-[calc(100svh-4rem)] w-full",
            !showMap && "hidden md:block",
          )}
        >
          <MapComponent
            selectedPoint={selectedPoint}
            setSelectedPoint={setSelectedPoint}
            data={cases}
            sortCases={onSortCases}
          />
        </div>

        {/* Cases List */}
        <div
          className={cn(
            "w-full max-w-3xl shrink-0 md:w-1/2",
            showMap && "hidden md:block",
          )}
        >
          <ScrollArea
            ref={scrollAreaRef}
            className="h-[calc(100svh-4rem)] w-full border-l bg-white"
          >
            <div className="flex min-h-[calc(100svh-4rem)] flex-col justify-between">
              <div className="grid">
                <SearchBar filters={filters} />
                <CaseList
                  cases={sorteredCases}
                  setSelectedPoint={setSelectedPoint}
                />
              </div>
            </div>
          </ScrollArea>
        </div>
      </div>
    </MapProvider>
  );
}
