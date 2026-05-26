import type { Metadata } from "next";
import { Andada_Pro, Gabarito, Geist_Mono } from "next/font/google";

import "maplibre-gl/dist/maplibre-gl.css";
import "./globals.css";

import Footer from "@/components/Footer";
import Nav from "@/components/Nav";

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
