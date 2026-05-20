"use client";

import { Case } from "@/payload-types";
import CaseInfo from "./CaseInfo";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { PlusIcon, SlidersHorizontal, Trash } from "lucide-react";
import { Input } from "./ui/input";
import { useMap } from "react-map-gl/maplibre";

export type CaseListProps = {
  cases: Partial<Case>[];
  setSelectedPoint: Dispatch<SetStateAction<Partial<Case> | null>>;
};

const perPage = 12;

export default function CaseList({ cases, setSelectedPoint }: CaseListProps) {
  const { casesMap } = useMap();
  const [filteredCases, setFilteredCases] = useState<Partial<Case>[]>([]);
  const [renderedCases, setRenderedCases] = useState<Partial<Case>[]>([]);
  useEffect(() => {
    setFilteredCases(cases);
  }, [cases]);
  useEffect(() => {
    setRenderedCases(cases.slice(0, perPage));
  }, [filteredCases]);
  const loadMore = () => {
    setRenderedCases(
      cases.slice(0, Math.min(renderedCases.length + perPage, cases.length)),
    );
  };
  return (
    <>
      {/* List */}
      <div className="relative grid w-full divide-y bg-white px-6">
        {renderedCases?.map((CASE, index) => {
          return (
            <div
              key={`list-${CASE.id}-${index}`}
              className="py-4"
              // onMouseEnter={() => setSelectedPoint(CASE)}
            >
              <CaseInfo
                data={CASE}
                size="md"
                setSelectedPoint={setSelectedPoint}
              />
            </div>
          );
        })}
      </div>
      <div className="px-6">
        {renderedCases.length < cases.length && (
          <Button
            className="h-16 w-full items-center"
            variant={"secondary"}
            onClick={loadMore}
          >
            Exibir mais <PlusIcon />
          </Button>
        )}
      </div>
    </>
  );
}
