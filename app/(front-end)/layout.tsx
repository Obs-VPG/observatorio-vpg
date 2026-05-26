import type { Metadata } from "next";
import {
  Gabarito,
  Arvo,
  Andada_Pro,
  Geist_Mono,
  Inter,
  IBM_Plex_Sans,
} from "next/font/google";

import "maplibre-gl/dist/maplibre-gl.css";
import "./globals.css";

import Nav from "@/components/Nav";
import Footer from "@/collections/Footer";

const sans = Gabarito({
  subsets: ["latin"],
  variable: "--font-sans",
});

const serif = Andada_Pro({
  subsets: ["latin"],
  variable: "--font-serif",
});
const mono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});
export const metadata: Metadata = {
  title: "Observatório de Violência Política de Gênero",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${sans.variable} ${serif.variable} ${mono.variable}`}
    >
      <body className="pt-16 antialiased">
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
