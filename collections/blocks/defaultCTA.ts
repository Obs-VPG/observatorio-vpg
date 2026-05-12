import { Block, Field } from "payload";
import { buttonsField, urlField } from "../fields/commonFields";

export const defaultCTABlock: Block = {
  labels: { singular: "Call-To-Action Padrão", plural: "CTAs Padrão" },
  slug: "defaultCTABlock",
  fields: [
    {
      type: "row",
      fields: [
        {
          name: "imagePosition",
          label: "Posição da Imagem",
          type: "select",
          options: [
            { label: "Sem Imagem", value: "none" },
            { label: "Direita", value: "right" },
            { label: "Esquerda", value: "left" },
            { label: "Pano de Fundo", value: "background" },
          ],
          defaultValue: "none",
        },
        {
          name: "height",
          label: "Altura (mínima)",
          type: "select",
          options: [
            { label: "Automática", value: "auto" },
            { label: "Full Screen", value: "full" },
            { label: "80% da tela", value: "80" },
            { label: "50% da tela", value: "50" },
          ],
          defaultValue: "auto",
        },
        {
          name: "variant",
          label: "Estilo",
          type: "select",
          options: [
            { label: "Claro", value: "light" },
            { label: "Escuro", value: "dark" },
          ],
          defaultValue: "light",
          // admin: {
          //   condition: (data, siblingData, { blockData, path, user }) => {
          //     // Não exibir se imagePosition for 'none'
          //     return siblingData.imagePosition !== 'background';
          //   }
          // }
        },
      ],
    },
    {
      name: "centered",
      type: "checkbox",
      label: "Centralizar conteúdo",
      defaultValue: true,
    },
    {
      ...urlField,
      name: "imageUrl",
      label: "Link da Imagem",
      admin: {
        ...urlField.admin,
        condition: (data, siblingData, { blockData, path, user }) => {
          // Não exibir se imagePosition for 'none'
          return siblingData.imagePosition !== "none";
        },
      },
    } as Field,

    { name: "title", label: "Título", type: "text", localized: true },
    {
      name: "subtitle",
      label: "Subtítulo",
      type: "textarea",
      localized: true,
      admin: { rows: 3 },
    },
    { name: "label", label: "Chapéu", type: "text", localized: true },
    { name: "content", label: "Texto", type: "richText", localized: true },
    buttonsField,
  ],
};
