import { DynamicContentLink } from "@/components/DynamicContentLink";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { cn } from "@/lib/utils";
import config from "@payload-config";
import { getPayload } from "payload";
const payload = await getPayload({ config });

export type BlogPageProps = { searchParams: Promise<{ page: string }> };

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const { page } = await searchParams;
  const data = await payload.find({
    collection: "posts",
    limit: 2,
    page: page ? parseInt(page) : 1,
    select: { name: true, slug: true, description: true, createdAt: true },
  });
  if (!(data.docs.length > 0)) return null;
  return (
    <div className="mb-16 py-4 md:py-8 xl:py-10">
      <div className="px-6 md:px-10 xl:px-16">
        <h1
          className={cn(
            "text-everglade mt-8 mb-10 px-6 text-[12svw] leading-none font-bold text-balance sm:text-center sm:leading-[1.15] md:mb-16 md:px-10 lg:text-8xl xl:px-16",
          )}
        >
          Blog
        </h1>
      </div>
      <div className="grid divide-y border-y">
        {data.docs.map((doc) => {
          const publishDate = new Date(doc.createdAt);
          return (
            <DynamicContentLink
              key={doc.id}
              slug={doc.slug}
              collection="posts"
              className="hover:bg-yellow-orange/40 relative flex flex-col gap-6 gap-y-2 px-6 py-6 md:flex-row md:items-center md:px-10 md:py-0 xl:px-16"
            >
              <p className="text-evergreen">
                {publishDate.toLocaleDateString("pt-BR")}
              </p>
              <h2 className="w-full font-mono text-2xl font-bold md:py-3 xl:text-3xl">
                <span className="md:hidden">{doc.name}</span>
                <div className="hidden md:flex lg:hidden">
                  {doc.name.slice(0, 50)}
                  {doc.name.length > 50 ? "..." : null}
                </div>
                <div className="hidden lg:flex xl:hidden">
                  {doc.name.slice(0, 72)}
                  {doc.name.length > 72 ? "..." : null}
                </div>
                <div className="hidden xl:flex 2xl:hidden">
                  {doc.name.slice(0, 72).trim()}
                  {doc.name.length > 72 ? "..." : null}
                </div>
                <div className="hidden 2xl:flex">
                  {doc.name.slice(0, 90).trim()}
                  {doc.name.length > 90 ? "..." : null}
                </div>
              </h2>
              <p className="text-muted-foreground max-w-prose text-sm md:hidden">
                {doc.description}
              </p>
            </DynamicContentLink>
          );
        })}
      </div>
    </div>
  );
}
