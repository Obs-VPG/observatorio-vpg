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
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { YearPicker } from "./ui/year-picker";

export type SearchFiltersProps = {
  filters: {
    id: string;
    name: string;
    slug: string;
    additionalType: string;
  }[];
};

export default function SearchFilters({ filters }: SearchFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [selectedOffenseTypes, setSelectedOffenseTypes] = useState<string[]>(
    [],
  );

  const [selectedIntersections, setSelectedIntersections] = useState<string[]>(
    [],
  );

  const [dateStart, setDateStart] = useState<number | undefined>();
  const [dateEnd, setDateEnd] = useState<number | undefined>();

  const q = searchParams.get("q");

  const offenseTypes = useMemo(
    () => filters.filter((filter) => filter.additionalType === "offenseType"),
    [filters],
  );

  const intersections = useMemo(
    () => filters.filter((filter) => filter.additionalType === "intersection"),
    [filters],
  );

  useEffect(() => {
    const offenseTypeParams = searchParams.get("offenseType")?.split(",") ?? [];

    const intersectionParams =
      searchParams.get("intersection")?.split(",") ?? [];

    const startDateParam = searchParams.get("startDate");
    const endDateParam = searchParams.get("endDate");

    setSelectedOffenseTypes(offenseTypeParams.filter(Boolean));

    setSelectedIntersections(intersectionParams.filter(Boolean));

    setDateStart(startDateParam ? Number(startDateParam) : undefined);

    setDateEnd(endDateParam ? Number(endDateParam) : undefined);
  }, [searchParams]);

  const toggleValue = (
    value: string,
    checked: boolean,
    setter: React.Dispatch<React.SetStateAction<string[]>>,
  ) => {
    setter((prev) => {
      if (checked) {
        return [...prev, value];
      }

      return prev.filter((item) => item !== value);
    });
  };

  const onApply = () => {
    const params = new URLSearchParams();

    if (q) {
      params.set("q", q);
    }

    if (selectedOffenseTypes.length > 0) {
      params.set("offenseType", selectedOffenseTypes.join(","));
    }

    if (selectedIntersections.length > 0) {
      params.set("intersection", selectedIntersections.join(","));
    }

    if (dateStart) {
      params.set("startDate", String(dateStart));
    }

    if (dateEnd) {
      params.set("endDate", String(dateEnd));
    }

    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="relative px-3" variant="outline">
          Filtros
          {q ||
          dateEnd ||
          dateStart ||
          selectedIntersections.length > 0 ||
          selectedOffenseTypes.length > 0 ? (
            <div className="bg-everglade-500 absolute -top-1 -left-1 z-5 size-2.5 rounded-full"></div>
          ) : null}
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
          {/* Tipo de violência */}
          <FieldSet>
            <FieldLegend variant="label">Tipo de violência</FieldLegend>

            <FieldGroup className="grid grid-cols-2 gap-3 gap-y-2">
              {offenseTypes.map((filter) => {
                const checked = selectedOffenseTypes.includes(filter.slug);

                return (
                  <Field
                    key={`offense-${filter.slug}`}
                    orientation="horizontal"
                  >
                    <Checkbox
                      id={`offense-${filter.slug}`}
                      checked={checked}
                      onCheckedChange={(value) =>
                        toggleValue(
                          filter.slug,
                          value === true,
                          setSelectedOffenseTypes,
                        )
                      }
                    />

                    <FieldLabel
                      htmlFor={`offense-${filter.slug}`}
                      className="cursor-pointer font-normal"
                    >
                      {filter.name}
                    </FieldLabel>
                  </Field>
                );
              })}
            </FieldGroup>
          </FieldSet>

          {/* Intersecções */}
          <FieldSet>
            <FieldLegend variant="label">Intersecções</FieldLegend>

            <FieldGroup className="grid grid-cols-2 gap-3 gap-y-2">
              {intersections.map((filter) => {
                const checked = selectedIntersections.includes(filter.slug);

                return (
                  <Field
                    key={`intersection-${filter.slug}`}
                    orientation="horizontal"
                  >
                    <Checkbox
                      id={`intersection-${filter.slug}`}
                      checked={checked}
                      onCheckedChange={(value) =>
                        toggleValue(
                          filter.slug,
                          value === true,
                          setSelectedIntersections,
                        )
                      }
                    />

                    <FieldLabel
                      htmlFor={`intersection-${filter.slug}`}
                      className="cursor-pointer font-normal"
                    >
                      {filter.name}
                    </FieldLabel>
                  </Field>
                );
              })}
            </FieldGroup>
          </FieldSet>

          {/* Datas */}
          <FieldSet>
            <FieldLegend variant="label" className="mb-1">
              Recorte Temporal
            </FieldLegend>

            <FieldGroup className="grid gap-3 md:grid-cols-2">
              <Field className="gap-y-1">
                <FieldLabel
                  className="text-muted-foreground text-xs font-normal"
                  htmlFor="dateStart"
                >
                  A partir de
                </FieldLabel>

                <YearPicker
                  placeholder="Selecione o ano"
                  value={dateStart}
                  onChange={setDateStart}
                />
              </Field>

              <Field className="gap-y-1">
                <FieldLabel
                  className="text-muted-foreground text-xs font-normal"
                  htmlFor="dateEnd"
                >
                  Até
                </FieldLabel>

                <YearPicker
                  placeholder="Selecione o ano"
                  value={dateEnd}
                  onChange={setDateEnd}
                />
              </Field>
            </FieldGroup>
          </FieldSet>

          {dateEnd && dateStart && dateEnd < dateStart ? (
            <div className="-mt-2 text-red-600/60">
              A data final deve ser maior que a data de início!
            </div>
          ) : null}
        </div>

        <DialogFooter className="sm:justify-end">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Cancelar
            </Button>
          </DialogClose>

          <DialogClose asChild>
            <Button
              type="button"
              onClick={onApply}
              disabled={Boolean(dateEnd && dateStart && dateEnd < dateStart)}
            >
              Aplicar
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
