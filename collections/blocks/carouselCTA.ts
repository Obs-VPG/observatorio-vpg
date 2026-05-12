import { Block } from "payload";
import { defaultCTABlock } from "./defaultCTA";

export const carouselCTABlock: Block = {
  labels: { singular: "Carousel de CTA", plural: "Carousel de CTAs" },
  slug: "carouselCTABlock",
  fields: [
    {
      name: "autoplay",
      label: "Autoplay?",
      type: "checkbox",
      defaultValue: true,
    },
    {
      name: "height",
      label: "Altura (mínima)",
      type: "select",
      options: [
        { label: "Full Screen", value: "full" },
        { label: "80% da tela", value: "80" },
        { label: "50% da tela", value: "50" },
      ],
      defaultValue: "80",
      required: true,
    },
    {
      name: "items",
      label: { singular: "CTA", plural: "CTAs" },
      type: "blocks",
      blocks: [defaultCTABlock],
    },
  ],
};
