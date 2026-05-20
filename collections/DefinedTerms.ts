import { CollectionConfig } from "payload";

import { descriptionField, nameField, slugField } from "./fields/commonFields";

export const definedTermsOptions = [
  { label: "Intersecção", value: "intersection", description: "" },
  { label: "Tipo de Violência", value: "offenseType", description: "" },
  { label: "Atores envolvidos", value: "actors", description: "" },
  { label: "Identidade de gênero", value: "genderIdentity", description: "" },
  {
    label: "Identidade étnico-racial",
    value: "racialIdentity",
    description: "",
  },
  { label: "Faixa etária", value: "ageGroup", description: "" },
  { label: "Orientação Sexual", value: "sexualOrientation", description: "" },
];

export const DefinedTerms: CollectionConfig = {
  slug: "definedTerms",
  labels: { singular: "Termo", plural: "Dicionário de Termos" },
  admin: {
    useAsTitle: "name",
    description:
      "Coleção de termos definidos para uso no cadastro de conteúdos no site.",
    group: "Configuração",
    defaultColumns: ["name", "slug", "additionalType", "description"],
  },
  fields: [
    nameField,
    slugField,
    descriptionField,
    {
      label: "Categoria do Termo",
      name: "additionalType",
      type: "select",
      options: definedTermsOptions,
      required: true,
    },
  ],
};
