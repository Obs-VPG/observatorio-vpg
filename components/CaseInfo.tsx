"use client";

import { Case } from "@/payload-types";
import Link from "next/link";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { ArrowRight, Crosshair, Pin } from "lucide-react";
import { useMap } from "react-map-gl/maplibre";
import { Badge } from "./ui/badge";
import { Dispatch, SetStateAction, useId } from "react";

export type CaseInfoProps = {
  data: Partial<Case>;
  size?: "md" | "sm";
  setSelectedPoint?: Dispatch<SetStateAction<Partial<Case> | null>>;
};

export default function CaseInfo({
  data,
  size = "sm",
  setSelectedPoint,
}: CaseInfoProps) {
  const id = useId();
  const { casesMap } = useMap();
  const [min, max] = size === "md" ? [120, 130] : [78, 84];
  const startDate = data.startDate ? new Date(data.startDate) : false;
  const endDate = data.endDate ? new Date(data.endDate) : false;
  let dateOptions =
    data.dateAccuracy === "day"
      ? { year: "numeric", month: "numeric", day: "numeric" }
      : data.dateAccuracy === "month"
        ? { year: "numeric", month: "numeric" }
        : { year: "numeric" };
  const onCenter = () => {
    if (setSelectedPoint) setSelectedPoint(data);
    casesMap?.flyTo({ zoom: 13, center: data.geo });
  };
  return (
    <div className={cn("flex flex-col")}>
      {startDate ? (
        <p
          className={cn(
            "text-muted-foreground mb-1 text-xs tracking-wider uppercase",
          )}
        >
          {startDate ? (
            <span>
              {startDate.toLocaleDateString("pt-BR", dateOptions as any)}
            </span>
          ) : null}
          {endDate && !data.isActive ? (
            <span>
              {" "}
              - {endDate.toLocaleDateString("pt-BR", dateOptions as any)}
            </span>
          ) : null}
          {data.isActive ? <span>- Presente</span> : null}
        </p>
      ) : null}
      <h2
        className={cn(
          "mb-4 text-base leading-tight font-bold text-pretty",
          size === "md" && "mb-2 text-lg lg:text-xl",
        )}
      >
        {data.name}
      </h2>
      <div className="mb-4 flex flex-wrap items-center gap-1">
        {data?.intersectionNames
          ? data?.intersectionNames?.map((intersection, index) => {
              return (
                <Badge
                  key={`${id}-badge-intersection-${index}-${intersection}`}
                  className={cn(
                    "bg-light-green",
                    index === (data.intersectionNames as string[]).length - 1 &&
                      "",
                  )}
                >
                  {intersection}
                </Badge>
              );
            })
          : null}
        {data?.typeNames
          ? data?.typeNames?.map((typeName, index) => {
              return (
                <Badge
                  key={`${id}-badge-type-${index}-${typeName}`}
                  className="bg-light-green"
                >
                  Violência {typeName}
                </Badge>
              );
            })
          : null}
      </div>

      <p
        className={cn(
          "text-muted-foreground mb-3 text-sm leading-snug text-pretty",
          size === "md" && "",
        )}
      >
        {data.description && data.description?.length > max
          ? data.description?.slice(0, min) + "..."
          : data.description}
      </p>
      <div
        className={cn(
          size === "md" && "flex items-center justify-between gap-2",
        )}
      >
        <Link href={`/conflito/${data.slug}`} title={data.name}>
          <Button
            size={size === "md" ? "default" : "sm"}
            className={cn(
              "bg-yellow-orange-200 w-full",
              size === "md" && "grow",
            )}
            variant={"secondary"}
          >
            Acessar caso <ArrowRight />
          </Button>
        </Link>
        {size === "md" && (
          <Button
            variant={"ghost"}
            className="hidden font-light hover:border-neutral-200 md:flex"
            size={"default"}
            onClick={onCenter}
          >
            <Crosshair />
            Centralizar no mapa
          </Button>
        )}
      </div>
    </div>
  );
}
