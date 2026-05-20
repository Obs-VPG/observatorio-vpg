// import BlockRenderer from '@/components/blocks/BlockRenderer';
import BlockRenderer from "@/components/blocks/BlockRenderer";
import { getDocBySlug } from "@/lib/local-api";
import { cn } from "@/lib/utils";

import { Page } from "@/payload-types";
import { Metadata, ResolvingMetadata } from "next";

export type PagePageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{
    q: string;
    p: string;
  }>;
};

export async function generateMetadata(
  { params }: PagePageProps,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { slug } = await params;

  return {
    title: `Observatório de Violência Política de Gênero`,
  };
}

export default async function PagePage({
  params,
  searchParams: searchParamsPromise,
}: PagePageProps) {
  const { slug } = await params;
  const doc = (await getDocBySlug("pages", slug)) as Page | null;
  if (!doc) return "Not found.";
  return (
    <div className="">
      <h1
        className={cn(
          "px-6 pt-12 text-center text-4xl leading-[1.15] font-bold text-balance sm:text-5xl md:px-10 lg:text-6xl xl:px-16 xl:pt-16 xl:text-6xl 2xl:text-7xl",
        )}
      >
        {doc.name}
      </h1>
      {/* <div className="container mx-auto py-12 prose">
        <h1>{doc.name}</h1>
        <p className="lead">{doc.description}</p>
        <Link href={'/sitemap'}>Página Inicial</Link>
      </div> */}
      {doc.content?.map((block, index) => {
        return (
          <BlockRenderer
            key={slug + index + "block" + block.id}
            block={block}
            index={index}
          />
        );
      })}
    </div>
  );
}
