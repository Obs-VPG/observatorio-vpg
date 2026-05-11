"use client";

import { MenuIcon } from "lucide-react";
import Logo from "./Logo";
import { DetailedHTMLProps, HTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";

export type NavProps = {} & React.ComponentProps<"div">;

export default function Nav({ className }: NavProps) {
  return (
    <div
      className={cn(
        "bg-light-green border-everglade/5 fixed inset-0 z-90 flex h-16 w-full items-center justify-between gap-3 border-b px-6 md:px-10 xl:px-16",
        className,
      )}
    >
      <Link href="/" title="Observatório de Violência Política de Gênero">
        <Logo className="h-10 w-fit" />
      </Link>
    </div>
  );
}
