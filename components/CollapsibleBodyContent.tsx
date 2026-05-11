"use client";

import { cn } from "@/lib/utils";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";

export type CollapsibleBodyContentProps = {
  text: string;
};

export default function CollapsibleBodyContent({
  text,
}: CollapsibleBodyContentProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <section
        className={cn(
          "relative overflow-hidden",
          !open && text.length > 500 && "max-h-48",
        )}
        aria-hidden={!open}
      >
        <div className="text-muted-foreground pb-5 text-center leading-relaxed text-pretty md:text-lg xl:text-[1.5svw]">
          {text}
        </div>
        {!open && text.length > 500 && (
          <div className="from-background/90 via-background/80 absolute bottom-0 left-0 z-2 h-5/6 w-full bg-linear-to-t via-35% to-transparent"></div>
        )}
        {open && (
          <div className="flex justify-center">
            <Button variant={"outline"} onClick={() => setOpen(false)}>
              Ocultar texto <ChevronUp />
            </Button>
          </div>
        )}
      </section>
      <div className="flex justify-center">
        {" "}
        {!open && text.length > 500 && (
          <Button
            variant={"default"}
            className="px-8"
            size={"lg"}
            onClick={() => setOpen(true)}
            aria-expanded={open}
            aria-controls="body-content"
          >
            Expandir o texto <ChevronDown />
          </Button>
        )}
      </div>
    </>
  );
}
