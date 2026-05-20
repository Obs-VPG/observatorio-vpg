import { CollectionConfig } from "payload";

import {
  descriptionField,
  nameField,
  richTextField,
  slugField,
} from "./fields/commonFields";
import { richTextBlock } from "./blocks/richTextBlock";
import { spacerBlock } from "./blocks/spacerBlock";
import { defaultCTABlock } from "./blocks/defaultCTA";
import { carouselCTABlock } from "./blocks/carouselCTA";

export const Posts: CollectionConfig = {
  slug: "posts",
  labels: { singular: "Post", plural: "Posts" },
  admin: {
    useAsTitle: "name",
    description: "Postagem do blog.",
    components: {
      edit: {
        beforeDocumentControls: [
          "@/components/payload/ui/BeforeControls#VisitContent",
        ],
      },
    },
  },
  fields: [nameField, slugField, descriptionField, richTextField],
};
