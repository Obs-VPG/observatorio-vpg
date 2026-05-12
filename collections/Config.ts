import { GlobalConfig } from "payload";
import { linkField } from "./fields/commonFields";

export const Config: GlobalConfig = {
  slug: "config",
  label: "Configuração",
  fields: [
    {
      name: "homepage",
      label: "Página Inicial",
      type: "relationship",
      relationTo: "pages",
    },
    {
      label: "Menu Principal",
      labels: { plural: "Itens", singular: "Item" },
      name: "mainMenu",
      type: "array",
      required: true,
      fields: [
        { name: "label", type: "text", label: "Nome", localized: true },
        { name: "text", type: "textarea", label: "Texto", localized: true },
        linkField,
        {
          name: "items",
          type: "array",
          label: "Itens",
          fields: [
            linkField,
            { name: "text", type: "textarea", label: "Texto", localized: true },
          ],
        },
      ],
    },
  ],
};
