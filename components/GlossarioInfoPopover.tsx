"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Link from "next/link";

export type GlossarioInfoPopoverProps = {};

export default function GlossarioInfoPopover(props: GlossarioInfoPopoverProps) {
  return (
    <Popover>
      <PopoverTrigger>
        <div className="bg-light-green text-everglade flex size-3 items-center justify-center rounded-full font-mono text-[10px]">
          ?
        </div>
      </PopoverTrigger>
      <PopoverContent>
        <p>
          Visite o nosso{" "}
          <Link
            href="/glossario"
            className="decoration-yellow-orange hover:text-everglade font-medium underline decoration-2 underline-offset-2"
          >
            glossário
          </Link>{" "}
          para ver a descrição desde e de outros termos.
        </p>
      </PopoverContent>
    </Popover>
  );
}
