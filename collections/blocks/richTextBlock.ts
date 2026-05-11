import { Block } from "payload";
import { richTextField } from "../fields/commonFields";

export const richTextBlock: Block = {
  labels: { singular: "Editor de Texto", plural: "Editor de Texto" },
  slug: "richTextBlock",
  fields: [richTextField],
};
