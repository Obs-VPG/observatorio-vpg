import { LUCIDE_ICONS } from "@/lib/lucide-icons";
import { BlocksFeature, lexicalEditor } from "@payloadcms/richtext-lexical";
import { Field, slugField as payloadSlugField } from "payload";

export const nameField: Field = {
  label: "Nome",
  name: "name",
  required: true,
  type: "text",
};

const psf = payloadSlugField({ fieldToUse: "name" });

export const slugField: Field = {
  ...psf,
  admin: {
    ...psf.admin,
    description:
      'A slug é uma versão do "Nome" somente em letras minúsculas e sem caracteres especiais. Ela é usada como  identificador único do conteúdo legível para humanos, principalmente para a construção de URLs.',
  },
} as Field;

export const descriptionField: Field = {
  name: "description",
  label: "Descrição curta",
  type: "textarea",
  maxLength: 500,
};

export const urlField: Field = {
  name: "url",
  label: "Site / Link",
  type: "text",
  validate: (value: any) => {
    let url;
    const errorMsg = "Digite um URL válido.";
    try {
      url = new URL(value);
    } catch (_) {
      if (value) return errorMsg;
    }

    return (
      Boolean(
        url?.protocol === "http:" || url?.protocol === "https:" || !value,
      ) || errorMsg
    );
  },
};

export const locationField: Field = {
  label: "Localização",
  name: "geo",
  type: "point",

  admin: {
    components: {
      Field: "@/components/payload/ui/location#LocationField",
    },
    description:
      "Você provavelmente não quer mexer nos campos de latitude e longitude! Use o mapa e o campo de busca acima dele.",
  },
};
export const linkField: Field = {
  name: "link",
  type: "group",
  fields: [
    {
      name: "linkType",
      label: "Tipo de link",
      type: "select",
      options: [
        { value: "external", label: "Link Externo" },
        { value: "internal", label: "Link Interno" },
      ],
      defaultValue: "external",
    },
    {
      ...urlField,
      admin: {
        condition: (data, siblingData, { blockData, path, user }) => {
          if (siblingData.linkType === "external") {
            return true;
          }
          return false;
        },
      },
      required: true,
    } as Field,
    {
      name: "internalContent",
      label: "Conteúdo Interno",
      type: "relationship",
      relationTo: ["pages", "cases"],
      admin: {
        condition: (data, siblingData, { blockData, path, user }) => {
          if (siblingData.linkType === "internal") {
            return true;
          }
          return false;
        },
      },
      required: true,
    },
    {
      name: "targetBlank",
      type: "checkbox",
      label: "Abrir em uma nova guia",
      defaultValue: true,
    },
  ],
};

export const buttonsField: Field = {
  name: "buttons",
  label: "Botão",
  labels: { singular: "Botão", plural: "Botões" },
  type: "array",
  fields: [
    { name: "label", label: "Texto", type: "text", localized: true },
    {
      name: "iconSlug",
      label: "Ícone",
      type: "select",
      options: LUCIDE_ICONS as any,
      admin: {
        description: "Adicone um ícone https://lucide.dev/icons/",
      },
    },
    {
      name: "iconPosition",
      label: "Posição do Ícone",
      type: "radio",
      options: [
        { label: "À Direita", value: "right" },
        { label: "À Esquerda", value: "left" },
      ],
      defaultValue: "left",
    },
    {
      name: "variant",
      label: "Variante",
      type: "select",
      options: [
        { value: "default", label: "Padrão" },
        { value: "secondary", label: "Secundário" },
        { value: "outline", label: "Contorno" },
        { value: "ghost", label: "Fantasma" },
        { value: "link", label: "Link" },
      ],
      defaultValue: "default",
    },
    linkField,
  ],
};
export const socialMediaField: Field = {
  label: "Redes Sociais",
  labels: { singular: "Rede Social", plural: "Redes Sociais" },
  name: "socialMedia",
  type: "array",
  fields: [
    { ...urlField, label: "URL" },
    {
      name: "type",
      label: "Rede",
      type: "select",
      options: [
        { label: "Instagram", value: "instagram" },
        { label: "Youtube", value: "youtube" },
        { label: "Site Pessoal", value: "personalWebsite" },
        { label: "Facebook", value: "facebook" },
        { label: "Linkedin", value: "linkedin" },
        { label: "TikTok", value: "tiktok" },
        { label: "Substack", value: "substack" },
        { label: "Twitter / X", value: "twitter" },
        { label: "Bluesky", value: "bluesky" },
        { label: "Flickr", value: "flickr" },
      ],
    },
  ],
};

export const richTextField: Field = {
  name: "body",
  type: "richText",
  label: "Conteúdo",
  localized: true,
  editor: lexicalEditor({
    features: ({ defaultFeatures }) => [
      ...defaultFeatures,
      BlocksFeature({
        blocks: [
          {
            slug: "videoEmbed",
            fields: [urlField],
          },
          {
            slug: "code",
            fields: [{ name: "code", type: "code", label: "Código" }],
          },
          { slug: "socialMedia", fields: [socialMediaField] },
          {
            slug: "buttons",
            labels: { singular: "Botões", plural: "Botões" },
            fields: [{ ...buttonsField }],
          },
        ],
      }),
    ],
  }),
};
