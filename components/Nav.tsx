import { cn } from "@/lib/utils";
import Link from "next/link";
import Logo from "./Logo";
import { getPayload } from "payload";
import config from "@payload-config";
import { Button } from "./ui/button";
import { DynamicContentLink } from "./DynamicContentLink";
import { MenuIcon } from "lucide-react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer";

const payload = await getPayload({ config });

export type NavProps = {} & React.ComponentProps<"div">;

export default async function Nav({}: NavProps) {
  const config = await payload.findGlobal({
    slug: "config",
    select: { mainMenu: true },
  });
  return (
    <div
      className={cn(
        "bg-light-green border-everglade/5 fixed inset-0 z-10 flex h-16 w-full items-center justify-between gap-3 border-b px-6 pl-2 md:px-10 md:pl-6 xl:px-16 xl:pl-12",
      )}
    >
      <Link
        href="/"
        title="Observatório de Violência Política de Gênero"
        className="rounded-b-2xl p-3 px-4"
      >
        <Logo className="h-10 w-auto" />
      </Link>
      <div className="hidden items-center md:flex">
        {config.mainMenu.map((menuItem) => {
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
              >
                {menuItem.label}
              </DynamicContentLink>
            </Button>
          );
        })}
      </div>
      <Drawer>
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
                  asChild
                >
                  <DynamicContentLink
                    slug={(menuItem.link!.internalContent?.value as any)?.slug}
                    collection={
                      menuItem.link!.internalContent?.relationTo || ""
                    }
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
    </div>
  );
}
