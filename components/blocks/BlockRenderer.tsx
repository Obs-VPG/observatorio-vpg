import { cn } from "@/lib/utils";
import { CustomRichText } from "./RichTextConverter";
import DefaultCTA from "./DefaultCTA";
import CarouselCTABlock from "./CarouselCTABlock";

export type BlockRendererProps = {
  block: any;
  index: number;
  params?: {
    q: string;
    p: string;
  };
  lang?: string;
};

export default async function BlockRenderer({
  block,
  index,
  params,
  lang = "pt-BR",
}: BlockRendererProps) {
  if (block.blockType === "defaultCTABlock") {
    return <DefaultCTA key={`block_${block.id}_${index}`} {...block} />;
  }
  if (block.blockType === "carouselCTABlock") {
    return <CarouselCTABlock key={`block_${block.id}_${index}`} {...block} />;
  }
  if (block.blockType === "richTextBlock") {
    return (
      <div
        key={`block_${block.id}_${index}`}
        className={cn(
          "mx-auto my-6 grid w-fit max-w-full px-6 md:my-8 md:px-10 lg:my-10 xl:px-16",
          block.centered && "justify-center",
        )}
      >
        <div className="prose lg:prose-lg xl:prose-xl prose-a:duration-75 prose-a:decoration-yellow-orange prose-a:hover:text-everglade decoration-everglade prose-a:decoration-[0.2ex] prose-a:underline-offset-[0.2ex] prose-h1:font-bold text-pretty">
          <CustomRichText lexicalData={block.body as any} />
        </div>
      </div>
    );
  }

  if (block.blockType === "spacerBlock") {
    return (
      <div
        key={`block_${block.id}_${index}`}
        className={cn(
          "h-4 w-full md:h-8",
          block.size === "M" && "h-8 md:h-16",
          block.size === "G" && "h-12 md:h-24",
        )}
      ></div>
    );
  }
  return (
    <div className="w-full text-xs wrap-break-word">
      {JSON.stringify(block)}
    </div>
  );
}
