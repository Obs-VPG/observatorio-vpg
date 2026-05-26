"use client";

import Link from "next/link";
import { useScroll, useTransform, motion, cubicBezier } from "motion/react";
import { usePathname } from "next/navigation";
import { useRef } from "react";
import neim from "@/public/logos/neim.jpg";
import ufba from "@/public/logos/ufba.jpg";
import ids from "@/public/logos/ids.jpg";
import cb from "@/public/logos/cb.jpg";
import Logo from "./Logo";
import { Case, Page } from "@/payload-types";
import { DynamicContentLink } from "./DynamicContentLink";
import { Button } from "./ui/button";

export type FooterProps = {
  menu: {
    label?: string | null;
    link?: {
      linkType?: ("external" | "internal") | null;
      url?: string | null;
      internalContent?:
        | ({
            relationTo: "pages";
            value: string | Page;
          } | null)
        | ({
            relationTo: "cases";
            value: string | Case;
          } | null);
      targetBlank?: boolean | null;
    };
    id?: string | null;
  }[];
};

export default function Footer(props: FooterProps) {
  const { menu } = props;
  const pathname = usePathname();
  if (pathname === "/mapa") return null;
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "start center"],
  });
  const { scrollYProgress: scrollYProgress2 } = useScroll({
    target: ref,
    offset: ["start center", "end center"],
  });
  const { width, borderRadius } = useTransform(scrollYProgress, [0, 1], {
    width: ["50%", "100%"],
    borderRadius: ["2rem", "0rem"],
  });
  return (
    <footer>
      <motion.div
        ref={ref}
        style={{ width, borderRadius }}
        className="bg-light-green relative z-3 mx-auto overflow-hidden px-6 py-12 max-md:w-full! max-md:rounded-none! md:min-w-fit [&_img]:h-10"
      >
        <Logo className="mx-auto my-12 h-16 w-auto max-w-5/6" />
        <hr className="my-16" />{" "}
        <div className="mt-16 grid items-center justify-center md:flex">
          {menu.map((menuItem) => {
            return (
              <Button
                key={`menu-nav-${menuItem.id}`}
                variant={"ghost"}
                className="px-3 lg:px-5"
                asChild
              >
                <DynamicContentLink
                  slug={(menuItem.link!.internalContent?.value as any)?.slug}
                  collection={menuItem.link!.internalContent?.relationTo || ""}
                  href={menuItem.link!.url || undefined}
                  className="text-xs tracking-wider uppercase"
                >
                  {menuItem.label}
                </DynamicContentLink>
              </Button>
            );
          })}
        </div>
        <hr className="my-16" />
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
        <p className="text-muted-foreground mt-12 w-full text-center text-xs leading-loose">
          Observatório de Violência Política de Gênero | Núcleo de Estudos
          Interdisciplinares sobre a Mulher - Universidade Federal da Bahia{" "}
          <br />
          Desenvolvido por{" "}
          <Link
            href="https://www.viniciusofp.com.br"
            className="font-medium hover:text-black"
          >
            viniciusofp
          </Link>
          .
        </p>
      </motion.div>
    </footer>
  );
}
