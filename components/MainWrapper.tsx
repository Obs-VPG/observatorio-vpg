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
import { List, MapIcon } from "lucide-react";
import Search from "./Search";

export interface DataPointInterface {
  id: number;
  category: number;
  country: string;
  project_status: number;
  status: number;
  reaction: number;
  locale: string;
  headline: string;
  name: string;
  slug: string;
  general: any;
  commodity: string[];
  company: string[];
  type: string[];
}
export type MainWrapperProps = {
  cases: Partial<Case>[];
};

export default function MainWrapper({ cases }: MainWrapperProps) {
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
    const centerPoint = point([center.lng, center.lat]);

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
      <Button
        className="absolute bottom-3 left-3 z-99 md:hidden"
        onClick={() => setShowMap((prev) => !prev)}
      >
        {showMap ? (
          <>
            Exibit Lista <List />
          </>
        ) : (
          <>
            Exibir Mapa <MapIcon />
          </>
        )}
      </Button>
      <div className="bg-light-green md:flex">
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
            className="h-[calc(100svh-4rem)] w-full border-l"
          >
            <div className="grid bg-white">
              <Search />
              <CaseList
                cases={sorteredCases}
                setSelectedPoint={setSelectedPoint}
              />
              <p className="text-muted-foreground relative z-3 mt-8 mb-3 px-6 text-xs tracking-widest uppercase">
                Realização
              </p>
              <div className="border-everglade/5 relative overflow-hidden bg-white p-4 px-1">
                <div className="pointer-events-none absolute top-0 left-1 z-2 h-full w-36 bg-linear-to-r from-white to-transparent"></div>
                <div className="pointer-events-none absolute top-0 right-1 z-2 h-full w-36 bg-linear-to-l from-white to-transparent"></div>
                <Logos />
              </div>
            </div>
          </ScrollArea>
        </div>
      </div>
    </MapProvider>
  );
}
