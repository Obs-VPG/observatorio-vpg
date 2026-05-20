"use client";

import { DefinedTerm } from "@/payload-types";
import GlossaryTerm from "./GlossaryTerm";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import Link from "next/link";

export type GlossaryTermCategoryProps = {
  groupKey: any;
  group: any;
  filtersMap: any;
  groupKeys: any;
};

export default function GlossaryTermCategory({
  groupKey,
  group,
  filtersMap,
  groupKeys,
}: GlossaryTermCategoryProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 70%", "end 30%"],
  });

  const { opacity2, color } = useTransform(
    scrollYProgress,
    [0, 0.01, 0.99, 1],
    {
      opacity2: [0.1, 1, 1, 0.1],
      color: ["#000", "#f77409", "#f77409", "#000000"],
    },
  );
  return (
    <>
      <div className="fixed top-1/2 left-6 z-2 hidden w-fit -translate-y-1/2 md:left-10 md:block xl:left-16">
        <motion.h1
          style={{
            opacity: opacity2,
          }}
          className="mb-5 text-3xl font-extrabold"
        >
          Glossário{" "}
        </motion.h1>
        <ul className="text-yellow-orange-500 font-serif">
          {groupKeys.map((key: string) => {
            // @ts-ignore
            return (
              <motion.li
                style={{
                  opacity: key === groupKey ? opacity2 : 0.01,
                  color,
                  zIndex: key === groupKey ? 3 : 0,
                }}
                key={`anchor-link-${key}-${groupKey}`}
              >
                <Link href={`#${key}`}>{filtersMap[key]}</Link>
              </motion.li>
            );
          })}
        </ul>
      </div>
      <div ref={ref} className="grid" id={groupKey}>
        {group?.map((termo: DefinedTerm) => {
          return (
            <GlossaryTerm
              key={`${termo.id}`}
              filterKey={filtersMap[groupKey as "racialIdentity"]}
              filterKeySlug={groupKey}
              termo={termo}
              groupKeys={groupKeys}
              filtersMap={filtersMap}
            />
          );
        })}
      </div>
    </>
  );
}
