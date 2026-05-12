import BlockRenderer from "@/components/blocks/BlockRenderer";
import { Page } from "@/payload-types";
import config from "@payload-config";
import { Metadata } from "next";
import { getPayload } from "payload";

const payload = await getPayload({ config });

export const metadata: Metadata = {
  title: "Observatório de Violência Política de Gênero",
};

export default async function IndexPage({}) {
  const data = await payload.findGlobal({
    slug: "config",
    depth: 3,
    select: { homepage: true },
  });
  const doc = data.homepage as Page;
  if (!doc) return "Not found.";
  return (
    <>
      {doc.content?.map((block, index) => {
        return (
          <BlockRenderer
            key={"home" + index + "block" + block.id}
            block={block}
            index={index}
          />
        );
      })}
    </>
  );
}
