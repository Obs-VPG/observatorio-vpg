"use client";

import { cn } from "@/lib/utils";
import { RichText } from "@payloadcms/richtext-lexical/react";
import Buttons from "./Buttons";

export type DefaultCTAProps = {
  id?: string | null;
  title: string | null;
  label?: string | null;
  subtitle?: string | null;
  variant?: "dark" | "light" | "sun" | null;
  buttons?:
    | { label: string; iconSlug: string; variant: string; url: string }[]
    | any[]
    | null;
  imageUrl?: string | null;
  imagePosition?: "none" | "left" | "right" | "background" | null;
  content?: any | null;
  height?: "auto" | "full" | "50" | "80" | null;
  centered?: boolean;
  isSlide?: boolean;
};

export default function DefaultCTA({
  title,
  label,
  subtitle,
  variant,
  imagePosition,
  buttons,
  imageUrl,
  content,
  height,
  centered,
  isSlide = false,
}: DefaultCTAProps) {
  return (
    <section
      className={cn(
        "bg-background relative flex min-h-[40svh] max-w-svw items-center justify-center overflow-hidden bg-cover bg-center font-sans dark:bg-black",
        imagePosition !== "background" &&
          imagePosition !== "none" &&
          "px-4 py-6 lg:px-8",
        (variant === "dark" || variant === "sun") &&
          "bg-everglade bg-fixed text-white",
        isSlide && "h-full",
      )}
      style={{
        backgroundImage:
          imagePosition === "background" && !imageUrl?.includes(".mp4")
            ? `url('${imageUrl}')`
            : "",
      }}
    >
      <div
        className={cn(
          "container mx-auto grid w-full justify-between md:items-center",
          centered &&
            "**-w-min! justify-center **:mx-auto! **:text-center! [&_li]:text-left!",
          imageUrl &&
            imagePosition !== "background" &&
            imagePosition !== "none" &&
            "gap-8 px-0! md:grid-cols-2 md:px-4",
        )}
      >
        {imagePosition === "background" &&
          imageUrl &&
          imageUrl.includes(".mp4") && (
            <div className="absolute top-0 left-0 z-1 h-svh w-svw bg-cover bg-center">
              <video
                className="videoTag object-fit h-full w-full object-cover"
                autoPlay
                loop
                muted
                playsInline
              >
                <source src={imageUrl} type="video/mp4" />
              </video>
            </div>
          )}
        {/* Content */}
        <div
          className={cn(
            "relative z-2 order-2 flex w-full items-center pt-8 pb-12 md:order-1 md:min-h-[33svh] md:justify-center md:py-20 lg:py-24",
            imagePosition === "left" && "md:order-2",
            imagePosition === "background" && "py-18",
            height === "full" && "md:min-h-[calc(100svh-4rem)]",
            height === "80" && "md:min-h-[80svh]",
            height === "50" && "md:min-h-[calc(50svh+4rem)]",
          )}
        >
          <div
            className={cn(
              "flex flex-col",
              imageUrl &&
                imagePosition !== "background" &&
                imagePosition !== "none" &&
                "px-4",
            )}
          >
            <p
              className={cn(
                "text-muted-foreground mb-2 max-w-prose text-sm font-medium tracking-widest text-balance uppercase md:text-base lg:text-lg xl:text-xl dark:text-stone-200",
                (variant === "sun" || variant === "dark") && "text-sun-200",
              )}
            >
              {label}
            </p>
            <h1
              className={cn(
                "text-dark-blue text-3xl leading-[1.2]! font-bold tracking-tight text-balance md:max-w-4xl md:text-4xl lg:max-w-7xl lg:text-5xl dark:text-zinc-50",
                (variant === "sun" || variant === "dark") &&
                  "text-trinidad-100",
              )}
            >
              {title}
            </h1>
            {subtitle ? (
              <p
                className={cn(
                  "mt-2 w-full max-w-prose text-lg leading-snug tracking-[0.018rem] text-balance text-stone-700 md:mt-3 md:text-xl lg:max-w-prose lg:text-2xl xl:mt-4 dark:text-zinc-100",
                  (variant === "sun" || variant === "dark") && "text-stone-100",
                  centered && "mx-auto",
                )}
              >
                {subtitle}
              </p>
            ) : null}{" "}
            {content ? (
              <RichText
                data={content}
                className={cn(
                  "prose mt-6 max-w-prose",
                  imagePosition === "background" && "**:text-stone-0!",
                  (variant === "sun" || variant === "dark") &&
                    "**:text-stone-100!",
                )}
              />
            ) : null}
            {buttons!.length > 0 && (
              <div className="mt-5 flex flex-col flex-wrap gap-3 text-base font-medium sm:flex-row md:mt-8">
                <Buttons buttons={buttons} />
              </div>
            )}
          </div>
        </div>
        {/* Image */}
        {imageUrl &&
        imagePosition !== "background" &&
        imagePosition !== "none" ? (
          <div
            className={cn(
              "order-1 h-full px-4 md:order-2 md:px-0",
              imagePosition === "left" && "md:order-1",
              height === "full" && "h-svh",
              height === "80" && "h-[80svh]",
            )}
          >
            <div
              className={cn(
                "relative h-full overflow-hidden",
                height === "full" || height === "80" || height === "50"
                  ? ""
                  : "max-h-[40svh] md:max-h-[60svh] md:min-h-96",
              )}
            >
              <img
                src={imageUrl}
                alt=""
                className="h-full w-full object-cover object-center"
              />
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
