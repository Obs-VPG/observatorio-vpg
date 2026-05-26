"use client";
import { MenuIcon } from "lucide-react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer";

import { useState } from "react";
import { Config1 } from "@/payload-types";
import { Button } from "./ui/button";
import { DynamicContentLink } from "./DynamicContentLink";
import Link from "next/link";

export type NavDrawerProps = { config: Config1 };

export default function NavDrawer({ config }: NavDrawerProps) {
  const [open, setOpen] = useState(false);
  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger className="md:hidden">
        <MenuIcon className="size-5" />
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className="text-muted-foreground text-xs tracking-wider uppercase">
            Menu
          </DrawerTitle>
        </DrawerHeader>
        <div className="flex w-full flex-col px-4 pb-5">
          {config.mainMenu.map((menuItem) => {
            return (
              <Button
                key={`menu-nav-${menuItem.id}`}
                variant={"ghost"}
                onClick={() => setOpen(false)}
                asChild
              >
                <DynamicContentLink
                  slug={(menuItem.link!.internalContent?.value as any)?.slug}
                  collection={menuItem.link!.internalContent?.relationTo || ""}
                  href={
                    menuItem.link?.linkType === "external"
                      ? menuItem.link!.url
                      : undefined
                  }
                >
                  {menuItem.label}
                </DynamicContentLink>
              </Button>
            );
          })}
          <p className="mt-3 text-center text-xs opacity-25">
            Desenvolvido por{" "}
            <Link
              href={"https://viniciusofp.com.br"}
              target="_blank"
              className="font-medium hover:underline"
            >
              viniciusofp
            </Link>
            .
          </p>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
