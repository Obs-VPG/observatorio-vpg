"use client";

import { cn } from "@/lib/utils";
import { motion } from "motion/react";

export type DivFadeInProps = { className?: string; children: React.ReactNode };

export default function DivFadeIn({ className, children }: DivFadeInProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
