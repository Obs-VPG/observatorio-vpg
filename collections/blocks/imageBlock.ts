import { Block } from "payload";
import { urlField } from "../fields/commonFields";

export const imageBlock: Block = {
  labels: { singular: "Imagem", plural: "Imagens" },
  slug: "imageBlock",
  fields: [urlField],
};
