"use client";

import Link from "next/link";
import { useScroll, useTransform, motion } from "motion/react";
import { usePathname } from "next/navigation";
import { useRef } from "react";
import neim from "@/public/logos/neim.jpg";
import ufba from "@/public/logos/ufba.jpg";
import ids from "@/public/logos/ids.jpg";
import cb from "@/public/logos/cb.jpg";

export type FooterProps = {};

export default function Footer(props: FooterProps) {
  const pathname = usePathname();
  if (pathname === "/mapa") return null;
  return (
    <footer>
      <LogoBar />
    </footer>
  );
}

const LogoBar = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "start center"],
  });
  const { scrollYProgress: scrollYProgress2 } = useScroll({
    target: ref,
    offset: ["start center", "end center"],
  });
  const width = useTransform(scrollYProgress, [0, 1], ["50%", "100%"]);
  const borderRadius = useTransform(scrollYProgress, [0, 1], ["2rem", "0rem"]);
  return (
    <>
      <motion.div
        ref={ref}
        style={{ width, borderRadius }}
        className="bg-light-green mx-auto min-w-fit px-6 py-16 [&_img]:h-10"
      >
        <div className="flex flex-col justify-center gap-12 mix-blend-multiply md:flex-row">
          <div className="flex flex-col items-center gap-4 md:items-start">
            <div className="text-xs tracking-widest uppercase opacity-80">
              Realização
            </div>
            <div className="flex gap-4">
              <Link
                href="https://www.neim.ufba.br/"
                target="_blank"
                title="NEIM - Núcleo de Estudos Interdisciplinares sobre a Mulher"
              >
                <img
                  src={neim.src}
                  alt="NEIM - Núcleo de Estudos Interdisciplinares sobre a Mulher"
                  className=""
                />
              </Link>
              <Link
                href="https://ufba.br/"
                target="_blank"
                title="Universidade Federal da Bahia"
                className=""
              >
                <img
                  src={ufba.src}
                  alt="Universidade Federal da Bahia"
                  className=""
                />
              </Link>
            </div>
          </div>
          <div className="flex flex-col items-center gap-4 md:items-start">
            <div className="text-xs tracking-widest uppercase opacity-80">
              Apoio
            </div>
            <div className="flex gap-4">
              <Link
                href="https://www.ids.ac.uk/"
                target="_blank"
                title="Institute of Development Studies"
              >
                <img
                  src={ids.src}
                  alt="Institute of Development Studies"
                  className=""
                />
              </Link>
              <Link
                href="https://counteringbacklash.org/"
                target="_blank"
                title="Countering Backlash"
              >
                <img src={cb.src} alt="Countering Backlash" className="" />
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};
