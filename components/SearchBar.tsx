"use client";

import { Search, SlidersHorizontal, Trash } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";
import { useDebounce } from "@/lib/useDebounce";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

import { useState, useEffect } from "react";
import SearchFilters from "./SearchFilters";
import Link from "next/link";

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

  const q = searchParams.get("q");
  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");
  const offenseType = searchParams.get("offenseType");
  const intersection = searchParams.get("interserction");

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
  return (
    <div
      className={cn(
        "sticky top-0 z-9 flex w-full gap-3 border-b bg-white px-3 py-3",
      )}
    >
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
      <Link href={`${path}`} title="Limpar busca">
        <Button className="px-3" variant={"outline"}>
          <Trash />
        </Button>
      </Link>
    </div>
  );
}
