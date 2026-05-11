"use client";

import { SlidersHorizontal, Trash } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";

export type SearchProps = {};

export default function Search(props: SearchProps) {
  return (
    <div
      className={cn(
        "sticky top-0 z-9 flex w-full gap-3 border-b bg-white px-6 py-3",
      )}
    >
      <div className="relative w-full">
        <Button
          className="absolute top-1 right-1 z-2 px-3"
          variant={"outline"}
          size="sm"
        >
          Buscar
          <Search />
        </Button>
        <Input className="w-full bg-[#fff]!" type="text" />
      </div>

      <Button className="px-3" variant={"outline"}>
        Filtros
        <SlidersHorizontal />
      </Button>
      <Button className="px-3" variant={"outline"}>
        Limpar
        <Trash />
      </Button>
    </div>
  );
}
