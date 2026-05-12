"use client";

import {
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import DefaultCTA, { DefaultCTAProps } from "./DefaultCTA";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

export type CarouselCTABlockProps = {
  autoplay: boolean;
  height: "full" | "80" | "50";
  items: DefaultCTAProps[];
};

export default function CarouselCTABlock(props: CarouselCTABlockProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

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
    <Carousel
      setApi={setApi}
      plugins={
        props.autoplay
          ? [
              Autoplay({
                delay: 5000,
              }),
            ]
          : []
      }
      opts={{ loop: true }}
      className="relative"
    >
      <CarouselContent>
        {props.items.map((item) => {
          item.height = props.height;
          return (
            <CarouselItem key={item.id}>
              <DefaultCTA {...item} isSlide={true} />
            </CarouselItem>
          );
        })}
      </CarouselContent>
      <div className="absolute bottom-2 left-1/2 z-5 flex w-fit -translate-x-1/2 items-center justify-center">
        {props.items.map((item, index) => {
          return (
            <div
              key={"dot" + item.id}
              className="group cursor-pointer p-3"
              onClick={() => api?.scrollTo(index)}
            >
              <div
                className={cn(
                  "group-hover:bg-sun size-2.5 rounded-full border bg-white",
                  index === current - 1 && "bg-trinidad!",
                )}
              ></div>
            </div>
          );
        })}
      </div>
      <CarouselNext className="bg-background hover:bg-muted right-5 hidden md:flex" />
      <CarouselPrevious className="bg-background hover:bg-muted left-5 hidden md:flex" />
    </Carousel>
  );
}
