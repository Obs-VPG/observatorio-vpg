"use client";
import { type CarouselApi } from "@/components/ui/carousel";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import mapStyle from "@/lib/mapStyle.json";
import { Case } from "@/payload-types";
import Autoplay from "embla-carousel-autoplay";
import Fade from "embla-carousel-fade";

import { useEffect, useMemo, useState } from "react";
import Map, { Marker, StyleSpecification } from "react-map-gl/maplibre";
import Pin from "../Pin";
import { ArrowRight, ChevronLeft, ChevronRight, Eye } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import DivFadeIn from "../DivFadeIn";

export type LastCasesProps = { cases: Case[] };

export default function LastCases(props: LastCasesProps) {
  const { cases } = props;

  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  const currentCase: Case = useMemo(() => cases[current - 1], [current, cases]);
  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);
  return (
    <DivFadeIn className="px-6 py-[10svh] md:px-10 xl:px-16">
      <div className="bg-light-green items-center justify-center gap-8 rounded-2xl p-3 md:grid md:grid-cols-2">
        <div className="relative block">
          <div className="from-light-green absolute top-0 left-0 z-5 h-full w-12 bg-linear-to-r to-transparent"></div>
          <div className="from-light-green absolute top-0 right-0 z-5 h-full w-12 bg-linear-to-l to-transparent"></div>
          <Carousel
            setApi={setApi}
            opts={{ loop: true }}
            plugins={[
              Autoplay({
                delay: 5000,
              }),
            ]}
          >
            <div className="text-yellow-orange mb-4 flex items-center justify-center gap-8">
              <button className="hover:text-everglade flex size-12 cursor-pointer items-center justify-center rounded-full pr-1 duration-200 hover:bg-white">
                <ChevronLeft
                  className="size-8"
                  onClick={() => api?.scrollPrev()}
                />
              </button>
              <p className="text-center text-xs font-medium tracking-wider text-stone-800 uppercase">
                Últimos casos registrados
              </p>
              <button
                className="hover:text-everglade flex size-12 cursor-pointer items-center justify-center rounded-full pl-1 duration-200 hover:bg-white"
                onClick={() => api?.scrollNext()}
              >
                <ChevronRight className="size-8" />
              </button>
            </div>
            <CarouselContent className="">
              {cases.map((doc, index) => {
                const startDate = doc.startDate
                  ? new Date(doc.startDate)
                  : false;
                const endDate = doc.endDate ? new Date(doc.endDate) : false;
                let dateOptions =
                  doc.dateAccuracy === "day"
                    ? { year: "numeric", month: "long", day: "numeric" }
                    : doc.dateAccuracy === "month"
                      ? { year: "numeric", month: "long" }
                      : { year: "numeric" };
                return (
                  <CarouselItem key={doc.id} className="">
                    <div className="p-6 text-center">
                      {startDate ? (
                        <p className="text-muted-foreground mb-5 text-sm tracking-wider uppercase opacity-80">
                          {startDate ? (
                            <span>
                              {startDate.toLocaleDateString(
                                "pt-BR",
                                dateOptions as any,
                              )}{" "}
                            </span>
                          ) : null}
                          {endDate && !doc.isActive ? (
                            <span>
                              {" "}
                              -{" "}
                              {endDate.toLocaleDateString(
                                "pt-BR",
                                dateOptions as any,
                              )}
                            </span>
                          ) : null}
                          {doc.isActive ? <span>- Presente</span> : null}
                        </p>
                      ) : null}
                      <h3 className="text-everglade mb-8 text-[clamp(2rem,3svw,3.5rem)] leading-none font-semibold text-balance">
                        {doc.name}
                      </h3>
                      <p className="font-ui text-muted-foreground mx-auto mb-6 line-clamp-3 w-full max-w-md text-sm md:text-base xl:text-lg">
                        {doc.description}
                      </p>
                      <Link href={`/conflito/${doc.slug}`} title={doc.name}>
                        <Button
                          className="bg-yellow-orange-200"
                          variant={"secondary"}
                        >
                          Acessar caso <ArrowRight />
                        </Button>
                      </Link>
                    </div>
                  </CarouselItem>
                );
              })}
            </CarouselContent>

            <div className="mt-8 mb-4 flex justify-center gap-2">
              {cases.map((c, index) => (
                <button
                  className={cn(
                    "bg-everglade/30 hover:bg-everglade/80 h-2 w-8 cursor-pointer rounded-xs duration-75",
                    current - 1 === index && "bg-everglade",
                  )}
                  key={`dot-${c.id}`}
                  onClick={() => api?.scrollTo(index)}
                ></button>
              ))}
            </div>
          </Carousel>
        </div>
        <div className="relative h-96 max-h-132 overflow-hidden rounded-xl border md:block md:h-full">
          <Link
            href="/mapa"
            className="absolute z-5 flex h-full w-full flex-col items-center justify-center rounded-xl bg-white/50 p-6 backdrop-blur-sm duration-500 hover:opacity-100 md:opacity-0"
          >
            <Eye className="text-everglade fill-yellow-orange [&_circle]:fill-everglade mb-4 size-16" />
            <p className="decoration-yellow-orange text-center text-2xl text-balance underline decoration-2 underline-offset-4">
              Navegue pelo mapa de casos de violência política de gênero.
            </p>
          </Link>
          <Map
            style={{ width: "100%", height: "100%" }}
            initialViewState={{
              longitude: -47.882778,
              latitude: -15.793889,
              zoom: 2.5,
            }}
            touchZoomRotate={false}
            touchPitch={false}
            scrollZoom={false}
            doubleClickZoom={false}
            dragRotate={false}
            // mapStyle={mapStyle as StyleSpecification}
            mapStyle={
              "https://api.maptiler.com/maps/019ff13d-04c2-75bb-b4dd-c57349ef3f7e/style.json?key=E18e9Ku9PccdMIbYJCZ9"
            }
          >
            {currentCase ? (
              <Marker
                latitude={currentCase.geo[1]}
                longitude={currentCase.geo[0]}
                anchor="bottom"
              >
                <Pin></Pin>
              </Marker>
            ) : null}
          </Map>
        </div>
      </div>
    </DivFadeIn>
  );
}
