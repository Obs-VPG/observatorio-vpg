// import BlockRenderer from '@/components/blocks/BlockRenderer';
import { CustomRichText } from "@/components/blocks/RichTextConverter";
import { getDocBySlug } from "@/lib/local-api";
import { cn } from "@/lib/utils";

import { Post } from "@/payload-types";
import { ChevronRight } from "lucide-react";
import { Metadata, ResolvingMetadata } from "next";
import Link from "next/link";

export type PostPageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{
    q: string;
    p: string;
  }>;
};

export async function generateMetadata(
  { params }: PostPageProps,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { slug } = await params;

  return {
    title: `Observatório de Violência Política de Gênero`,
  };
}

export default async function PostPage({
  params,
  searchParams: searchParamsPromise,
}: PostPageProps) {
  const { slug } = await params;
  const doc = (await getDocBySlug("posts", slug)) as Post | null;
  if (!doc) return "Not found.";
  const publishDate = new Date(doc.createdAt);
  return (
    <div className="mx-auto w-fit">
      {" "}
      <div className="flex flex-wrap items-center justify-center gap-2 gap-y-1 pb-4 text-center text-xs uppercase opacity-30 duration-200 hover:opacity-100 lg:pb-8">
        <Link href="/" className="text-everglade hover:text-everglade-600">
          Observatório de Violência Política de Gênero
        </Link>{" "}
        <ChevronRight className="size-4" />{" "}
        <Link href="/blog" className="text-everglade hover:text-everglade-600">
          Blog
        </Link>{" "}
        <ChevronRight className="size-4" /> Caso
      </div>
      <div
        className={cn(
          "mx-auto mb-6 grid w-fit max-w-full justify-center px-6 md:mb-8 md:px-10 lg:mb-10 xl:px-16",
        )}
      >
        <div className="prose lg:prose-lg xl:prose-xl prose-a:duration-75 prose-a:decoration-yellow-orange prose-a:hover:text-everglade decoration-everglade prose-a:decoration-[0.2ex] prose-a:underline-offset-[0.2ex] prose-h1:font-bold text-pretty">
          <h1 className="mb-3!">{doc.name}</h1>
          <p className="text-muted-foreground my-0!">
            {publishDate.toLocaleDateString("pt-BR", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
          {doc.description ? (
            <p className="lead mb-12!">{doc.description}</p>
          ) : null}
          <CustomRichText lexicalData={doc.body as any} />
        </div>
      </div>
    </div>
  );
}
