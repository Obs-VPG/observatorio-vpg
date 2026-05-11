import { CollectionConfig } from "payload";

import { nameField, slugField } from "./fields/commonFields";
import { richTextBlock } from "./blocks/richTextBlock";
import { spacerBlock } from "./blocks/spacerBlock";

export const Pages: CollectionConfig = {
  slug: "pages",
  labels: { singular: "Página", plural: "Páginas" },
  admin: {
    useAsTitle: "name",
    description: "Página de conteúdo",
  },
  fields: [
    nameField,
    slugField,
    {
      name: "content",
      label: "Conteúdo",
      labels: { singular: "Bloco", plural: "Bloco" },
      type: "blocks",
      blocks: [richTextBlock, spacerBlock],
    },
  ],
};
