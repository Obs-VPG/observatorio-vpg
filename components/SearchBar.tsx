"use client";

import { Search, SlidersHorizontal, Trash, XIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";
import { useDebounce } from "@/lib/useDebounce";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

import { useState, useEffect } from "react";
import SearchFilters from "./SearchFilters";
import Link from "next/link";
import { Badge } from "./ui/badge";
import { find } from "lodash";

export type SearchBarProps = {
  filters: {
    id: string;
    name: string;
    slug: string;
    additionalType: string;
  }[];
};

export default function SearchBar({ filters: filtersData }: SearchBarProps) {
  const path = usePathname();
  const searchParams = useSearchParams();
  const [value, setValue] = useState("");
  const router = useRouter();
  const [prevValue, setPrevValue] = useState("XXX");

  const [activeFilters, setActiveFilters] = useState<{
    intersection: null | string;
    offenseType: null | string;
    q: null | string;
    startDate: null | string;
    endDate: null | string;
  }>({
    intersection: null,
    offenseType: null,
    q: null,
    startDate: null,
    endDate: null,
  });

  const q = searchParams.get("q");
  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");
  const offenseType = searchParams.get("offenseType");
  const intersection = searchParams.get("intersection");

  useEffect(() => {
    setActiveFilters({ intersection, offenseType, q, startDate, endDate });
  }, [q, startDate, offenseType, endDate, intersection]);

  const debouncedValue = useDebounce(value);

  useEffect(() => {
    if (q && !value) {
      setValue(q);
    }
  }, [q]);

  useEffect(() => {
    if (prevValue !== "XXX") {
      const params = new URLSearchParams();

      if (debouncedValue) {
        params.set("q", debouncedValue);
      }

      if (offenseType) {
        params.set("offenseType", offenseType);
      }

      if (intersection) {
        params.set("intersection", intersection);
      }

      if (startDate) {
        params.set("startDate", String(startDate));
      }

      if (endDate) {
        params.set("endDate", String(endDate));
      }

      router.push(`${path}?${params.toString()}`);
    }
  }, [debouncedValue, router]);

  useEffect(() => {
    setTimeout(() => {
      setPrevValue("");
    }, 2000);
  }, []);

  const removeFilter = (filterType: string, slug?: string) => {
    let newFilters = { ...activeFilters };
    if (filterType === "date") {
      newFilters.startDate = null;
      newFilters.endDate = null;
    }
    if (filterType === "intersection") {
      newFilters.intersection =
        newFilters.intersection
          ?.split(",")
          .filter((s) => s !== slug)
          .join(",") || null;
    }
    if (filterType === "offenseType") {
      newFilters.offenseType =
        newFilters.offenseType
          ?.split(",")
          .filter((s) => s !== slug)
          .join(",") || null;
    }

    const params = new URLSearchParams();

    if (debouncedValue) {
      params.set("q", debouncedValue);
    }

    if (newFilters.offenseType) {
      params.set("offenseType", newFilters.offenseType);
    }

    if (newFilters.intersection) {
      params.set("intersection", newFilters.intersection);
    }

    if (newFilters.startDate) {
      params.set("startDate", String(newFilters.startDate));
    }

    if (newFilters.endDate) {
      params.set("endDate", String(newFilters.endDate));
    }

    router.push(`${path}?${params.toString()}`);
  };
  return (
    <div
      className={cn(
        "sticky top-0 z-9 grid w-full gap-3 border-b bg-white px-3 py-3",
      )}
    >
      <div className="flex gap-3">
        <div className="relative w-full">
          <Button
            className="absolute top-0 right-0 z-2 px-3"
            variant={"ghost"}
            size="icon"
            title="Buscar"
          >
            <Search />
          </Button>
          <Input
            className="w-full bg-[#fff]!"
            type="text"
            placeholder="Busca"
            value={value}
            onChange={(event) => {
              setValue(event.target.value);
            }}
          />
        </div>

        <SearchFilters filters={filtersData} />
      </div>
      {intersection || offenseType || startDate || endDate || q ? (
        <div className="flex flex-wrap gap-1.5">
          {intersection
            ? intersection.split(",").map((item) => {
                const obj = find(filtersData, (o) => o.slug === item);
                if (!obj) return null;
                return (
                  <Button
                    key={obj?.id + "-filterBadge"}
                    size="xs"
                    className="hover:bg-yellow-orange bg-yellow-orange/60 cursor-pointer duration-200"
                    onClick={() => removeFilter("intersection", obj?.slug)}
                  >
                    {obj?.name} <XIcon />
                  </Button>
                );
              })
            : null}
          {offenseType
            ? offenseType.split(",").map((item) => {
                const obj = find(filtersData, (o) => o.slug === item);
                if (!obj) return null;
                return (
                  <Button
                    key={obj?.id + "-filterBadge"}
                    size="xs"
                    className="hover:bg-yellow-orange bg-yellow-orange/60 cursor-pointer duration-200"
                    onClick={() => removeFilter("offenseType", obj?.slug)}
                  >
                    {obj?.name} <XIcon />
                  </Button>
                );
              })
            : null}
          {startDate || endDate ? (
            <Button
              key={"startEnd"}
              size="xs"
              className="hover:bg-yellow-orange bg-yellow-orange/60 cursor-pointer duration-200"
              onClick={() => removeFilter("date")}
            >
              {startDate && !endDate
                ? "A partir de "
                : endDate && !startDate
                  ? "Até "
                  : "De "}{" "}
              {startDate} {startDate && endDate ? " a " : null} {endDate}{" "}
              <XIcon />
            </Button>
          ) : null}
          <Link
            href={`${path}`}
            title="Limpar busca"
            className="inline leading-0"
          >
            <Button size={"xs"} variant={"secondary"}>
              Limpar filtros <Trash />
            </Button>
          </Link>
        </div>
      ) : null}
    </div>
  );
}
