"use client";

import { motion } from "motion/react";
import Link from "next/link";
export type HeroProps = {};

export default function Hero(props: HeroProps) {
  return (
    <div className="">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="mt-[10vw] flex flex-col items-center justify-center px-6 text-center lg:mb-8"
      >
        <motion.h1 className="text-muted-foreground mb-6 text-sm tracking-widest text-balance uppercase md:mb-8 md:text-base xl:text-lg">
          Observatório de Violência Política de Gênero
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5, ease: "easeInOut" }}
          className="text-everglade mb-6 text-[clamp(2.25rem,4vw,4rem)] leading-[1.1] font-medium text-balance md:mb-[5svw] md:max-w-5/6"
        >
          Uma iniciativa NEIM-UFBA para a promoção de um ambiente político justo
          e seguro para pessoas de todos os gêneros.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5, ease: "easeInOut" }}
          className="grid items-center gap-4 sm:flex lg:gap-8"
        >
          <Link
            href="/quem-somos"
            className="hover:bg-yellow-orange decoration-yellow-orange flex h-10 items-center justify-center rounded-xs px-4 tracking-wider uppercase underline decoration-2 underline-offset-4 duration-150"
          >
            Saiba mais
          </Link>
          <Link
            href="/mapa"
            className="bg-yellow-orange-200 hover:bg-yellow-orange flex h-12 items-center justify-center rounded-xs px-6 tracking-wider uppercase duration-150 lg:text-lg"
          >
            Mapa de conflitos
          </Link>
          <Link
            href="/contato"
            className="hover:bg-yellow-orange decoration-yellow-orange flex h-10 items-center justify-center rounded-xs px-4 tracking-wider uppercase underline decoration-2 underline-offset-4 duration-150"
          >
            Colabore
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
