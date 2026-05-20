import { CollectionConfig } from "payload";

import { descriptionField, nameField, slugField } from "./fields/commonFields";
import { richTextBlock } from "./blocks/richTextBlock";
import { spacerBlock } from "./blocks/spacerBlock";
import { defaultCTABlock } from "./blocks/defaultCTA";
import { carouselCTABlock } from "./blocks/carouselCTA";

export const Pages: CollectionConfig = {
  slug: "pages",
  labels: { singular: "Página", plural: "Páginas" },
  admin: {
    useAsTitle: "name",
    description: "Página de conteúdo",
    components: {
      edit: {
        beforeDocumentControls: [
          "@/components/payload/ui/BeforeControls#VisitContent",
        ],
      },
    },
  },
  fields: [
    nameField,
    slugField,
    descriptionField,
    {
      name: "content",
      label: "Conteúdo",
      labels: { singular: "Bloco", plural: "Bloco" },
      type: "blocks",
      blocks: [richTextBlock, spacerBlock, defaultCTABlock, carouselCTABlock],
    },
  ],
};
