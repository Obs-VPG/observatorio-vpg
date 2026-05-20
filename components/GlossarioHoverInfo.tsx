"use client";

import { InfoIcon } from "lucide-react";
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "@/components/ui/hover-card";
import Link from "next/link";

export type GlossarioHoverInfoProps = {};

export default function GlossarioHoverInfo(props: GlossarioHoverInfoProps) {
  return (
    <HoverCard>
      <HoverCardTrigger>
        <div className="bg-light-green text-everglade flex size-3 items-center justify-center rounded-full font-mono text-[10px]">
          ?
        </div>
      </HoverCardTrigger>
      <HoverCardContent>
        Visite o nosso{" "}
        <Link
          href="/glossario"
          className="decoration-yellow-orange hover:text-everglade font-medium underline decoration-2 underline-offset-2"
        >
          glossário
        </Link>{" "}
        para ver a descrição desde e de outros termos.
      </HoverCardContent>
    </HoverCard>
  );
}
