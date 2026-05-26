import { DynamicContentLink } from "@/components/DynamicContentLink";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { cn } from "@/lib/utils";
import config from "@payload-config";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { getPayload } from "payload";
const payload = await getPayload({ config });

export type BlogPageProps = { searchParams: Promise<{ page: string }> };

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const { page } = await searchParams;
  const { docs, totalPages, nextPage, prevPage } = await payload.find({
    collection: "posts",
    limit: 24,
    page: page ? parseInt(page) : 1,
    select: { name: true, slug: true, description: true, createdAt: true },
  });
  if (!(docs.length > 0)) return null;
  return (
    <div className="mb-16 py-4 md:pt-8 xl:pt-10">
      <div className="px-6 md:px-10 xl:px-16">
        <h1
          className={cn(
            "text-everglade mt-8 mb-10 px-6 text-[clamp(1rem,3svw,3rem)] leading-none tracking-widest text-balance uppercase sm:text-center sm:leading-[1.15] md:mb-16 md:px-10 xl:px-16",
          )}
        >
          Blog
        </h1>
      </div>
      <div className="grid divide-y border-y">
        {docs.map((doc) => {
          const publishDate = new Date(doc.createdAt);
          return (
            <DynamicContentLink
              key={doc.id}
              slug={doc.slug}
              collection="posts"
              className="hover:bg-light-green relative flex flex-col gap-6 gap-y-2 px-6 py-6 md:flex-row md:items-center md:px-10 md:py-3 xl:px-16"
            >
              <p className="text-muted-foreground text-sm tracking-widest">
                {publishDate.toLocaleDateString("pt-BR")}
              </p>
              <h2 className="text-everglade w-full text-[clamp(1.5rem,3svw,1.875rem)] leading-tight font-medium text-pretty md:line-clamp-1">
                {doc.name}
              </h2>
              <p className="text-muted-foreground max-w-prose text-sm md:hidden">
                {doc.description}
              </p>
            </DynamicContentLink>
          );
        })}
      </div>
      <div className="footer mt-8 grid grid-cols-3 items-center px-6 text-sm tracking-wide md:px-10 xl:px-16">
        <div>
          {prevPage ? (
            <Link
              href={`/blog?page=${prevPage}`}
              className="text-everglade flex items-center justify-start gap-1 opacity-80 duration-200 hover:opacity-100"
            >
              <ArrowLeft className="size-4" />
              Mais novos
            </Link>
          ) : null}
        </div>
        <div className="flex items-center justify-center text-stone-400 uppercase">
          {page ? page : 1}/{totalPages}
        </div>
        <div>
          {nextPage ? (
            <Link
              href={`/blog?page=${nextPage}`}
              className="text-everglade flex items-center justify-end gap-1 opacity-80 duration-200 hover:opacity-100"
            >
              Mais antigos <ArrowRight className="size-4" />
            </Link>
          ) : null}
        </div>
      </div>
    </div>
  );
}
