// import BlockRenderer from '@/components/blocks/BlockRenderer';
import BlockRenderer from "@/components/blocks/BlockRenderer";
import DivFadeIn from "@/components/DivFadeIn";
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
    <DivFadeIn className="py-4 md:py-8 xl:py-10">
      <h1
        className={cn(
          "text-everglade mt-8 mb-10 px-6 text-[10svw] leading-none font-medium text-balance sm:mx-auto sm:text-center md:px-10 md:text-7xl lg:max-w-5/6 xl:px-1 xl:text-8xl",
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
    </DivFadeIn>
  );
}
