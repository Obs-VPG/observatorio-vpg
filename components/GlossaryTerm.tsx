"use client";
import { DefinedTerm } from "@/payload-types";
import { motion, useScroll, useTransform } from "motion/react";
import Link from "next/link";
import { useRef } from "react";

export type GlossaryTermProps = {
  termo: DefinedTerm;
  filterKey: string;
  filterKeySlug: string;
  groupKeys: string[];
  filtersMap: any;
};

export default function GlossaryTerm({
  termo,
  filterKey,
  filterKeySlug,
  groupKeys,
  filtersMap,
}: GlossaryTermProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 70%", "end 30%"],
  });
  const { opacity, y } = useTransform(scrollYProgress, [0, 0.1, 0.7, 1], {
    opacity: [0.1, 1, 1, 0.1],
    y: [0, 0, 0, -75],
  });
  return (
    <>
      <div ref={ref} className="relative my-8 h-svh md:pl-56 lg:pl-64">
        <motion.div
          style={{ opacity, y }}
          className="sticky top-1/2 -translate-y-1/2 md:border-l md:pl-6"
        >
          <h3 className="mb-3 text-3xl font-bold md:text-4xl lg:text-5xl">
            {termo.name.toLocaleLowerCase()}{" "}
          </h3>
          <p className="text-yellow-orange-500 mb-5 text-sm tracking-wider md:text-base">
            [{filterKey}]
          </p>
          <p className="text-muted-foreground max-w-2xl text-lg leading-relaxed font-thin md:text-xl lg:text-2xl">
            {termo.description}
          </p>
        </motion.div>
      </div>
    </>
  );
}
