"use client";

import { useEffect, useMemo, useState } from "react";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "./ui/button";
import { SlidersHorizontal } from "lucide-react";

import {
  FieldSet,
  FieldLegend,
  FieldGroup,
  Field,
  FieldLabel,
} from "./ui/field";

import { Checkbox } from "./ui/checkbox";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

export type SearchFiltersProps = {
  filters: {
    id: string;
    name: string;
    slug: string;
    additionalType: string;
  }[];
};

export default function SearchFilters({ filters }: SearchFiltersProps) {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const router = useRouter();
  const path = usePathname();
  const searchParams = useSearchParams();
  const q = searchParams.get("q");
  const filtersQ = searchParams.get("filters");

  useEffect(() => {
    console.log(filtersQ);
    if (filtersQ) setSelectedFilters(filtersQ?.split(","));
  }, [filtersQ]);

  const offenseTypes = useMemo(
    () => filters.filter((f) => f.additionalType === "offenseType"),
    [filters],
  );

  const intersections = useMemo(
    () => filters.filter((f) => f.additionalType === "intersection"),
    [filters],
  );

  const toggleFilter = (filterId: string, checked: boolean) => {
    setSelectedFilters((prev) => {
      if (checked) {
        return [...prev, filterId];
      }

      return prev.filter((id) => id !== filterId);
    });
  };

  const onApply = () => {
    console.log(selectedFilters);

    router.push(
      `${path}${q ? `?q=${q}` : ""}${selectedFilters.length > 0 ? `${q ? "&" : "?"}filters=${selectedFilters.join(",")}` : ``}`,
    );

    // do something with selectedFilters
    // example:
    // router.push(...)
    // setSearchParams(...)
    // call parent callback(...)
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="px-3" variant="outline">
          Filtros
          <SlidersHorizontal />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader hidden>
          <DialogTitle>Filtros</DialogTitle>

          <DialogDescription>
            Utilize os filtros abaixo para refinar a sua busca.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4">
          <FieldSet>
            <FieldLegend variant="label">Tipo de violência</FieldLegend>

            <FieldGroup className="grid grid-cols-2 gap-3 gap-y-2">
              {offenseTypes.map((filter) => {
                const checked = selectedFilters.includes(filter.slug);

                return (
                  <Field
                    key={`field-filter-${filter.slug}`}
                    orientation="horizontal"
                  >
                    <Checkbox
                      id={`field-filter-${filter.slug}`}
                      name={`field-filter-${filter.slug}`}
                      checked={checked}
                      onCheckedChange={(value) =>
                        toggleFilter(filter.slug, value === true)
                      }
                    />

                    <FieldLabel
                      htmlFor={`field-filter-${filter.slug}`}
                      className="cursor-pointer font-normal"
                    >
                      {filter.name}
                    </FieldLabel>
                  </Field>
                );
              })}
            </FieldGroup>
          </FieldSet>

          <FieldSet>
            <FieldLegend variant="label">Intersecções</FieldLegend>

            <FieldGroup className="grid grid-cols-2 gap-3 gap-y-2">
              {intersections.map((filter) => {
                const checked = selectedFilters.includes(filter.slug);

                return (
                  <Field
                    key={`field-filter-${filter.slug}`}
                    orientation="horizontal"
                  >
                    <Checkbox
                      id={`field-filter-${filter.slug}`}
                      name={`field-filter-${filter.slug}`}
                      checked={checked}
                      onCheckedChange={(value) =>
                        toggleFilter(filter.slug, value === true)
                      }
                    />

                    <FieldLabel
                      htmlFor={`field-filter-${filter.slug}`}
                      className="cursor-pointer font-normal"
                    >
                      {filter.name}
                    </FieldLabel>
                  </Field>
                );
              })}
            </FieldGroup>
          </FieldSet>
        </div>

        <DialogFooter className="sm:justify-end">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Cancelar
            </Button>
          </DialogClose>

          <DialogClose asChild>
            <Button type="button" onClick={onApply}>
              Aplicar
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
