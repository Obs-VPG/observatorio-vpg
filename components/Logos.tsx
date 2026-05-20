"use client";

import neim from "@/public/logos/neim.jpg";
import ufba from "@/public/logos/ufba.jpg";
import ids from "@/public/logos/ids.jpg";
import cb from "@/public/logos/cb.jpg";

import Marquee from "react-fast-marquee";
import Link from "next/link";

export type LogosProps = {};

export default function Logos(props: LogosProps) {
  return (
    <>
      <Marquee
        className="flex items-center **:duration-125 **:ease-in-out [&_img]:max-h-10 [&_img]:w-auto [&_img]:max-w-36 [&_img]:opacity-70 [&_img]:hover:opacity-100"
        pauseOnHover={true}
        speed={20}
      >
        <Link
          href="https://www.neim.ufba.br/"
          target="_blank"
          title="NEIM - Núcleo de Estudos Interdisciplinares sobre a Mulher"
        >
          <img
            src={neim.src}
            alt="NEIM - Núcleo de Estudos Interdisciplinares sobre a Mulher"
            className="mx-[8vw]"
          />
        </Link>
        <Link
          href="https://ufba.br/"
          target="_blank"
          title="Universidade Federal da Bahia"
        >
          <img
            src={ufba.src}
            alt="Universidade Federal da Bahia"
            className="mx-[8vw]"
          />
        </Link>
        <Link
          href="https://www.ids.ac.uk/"
          target="_blank"
          title="Institute of Development Studies"
        >
          <img
            src={ids.src}
            alt="Institute of Development Studies"
            className="mx-[8vw]"
          />
        </Link>
        <Link
          href="https://counteringbacklash.org/"
          target="_blank"
          title="Countering Backlash"
        >
          <img src={cb.src} alt="Countering Backlash" className="mx-[8vw]" />
        </Link>
      </Marquee>
    </>
  );
}
