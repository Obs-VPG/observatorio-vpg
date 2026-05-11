import { CollectionConfig, Field } from "payload";

import {
  descriptionField,
  locationField,
  nameField,
  slugField,
  urlField,
} from "./fields/commonFields";

export const Cases: CollectionConfig = {
  slug: "cases",
  labels: { singular: "Conflito", plural: "Conflitos" },
  admin: {
    useAsTitle: "name",
    // description:
    //   'Coleção de termos definidos para uso no cadastro de conteúdos no site.',
    // group: 'Configuração',
    // defaultColumns: ['name', 'additionalType', 'description']
  },
  fields: [
    {
      name: "name",
      label: "Título do Conflito",
      type: "text",
      admin: {
        description:
          "Título curto do episódio de violência de gênero, com até cerca de 156 caracteres. Deve ser elaborado com a concisão de uma manchete de jornal.",
      },
      required: true,
    },
    slugField,
    {
      name: "victim",
      label: "Vítima",
      type: "relationship",
      relationTo: "persons",
      hasMany: true,
      required: true,
    },
    {
      name: "description",
      label: "Descrição",
      type: "textarea",
      admin: {
        description:
          "De forma resumida, relatar o ocorrido. Não há limite de caracteres, mas não é a intenção aqui se prolongar muito, devendo-se priorizar a inserção de fontes externas para quem quiser maiores informações.",
      },
      required: true,
    },
    {
      name: "offenseType",
      label: "Tipo de Violência",
      type: "relationship",
      relationTo: "definedTerms",
      filterOptions: { additionalType: { in: ["offenseType"] } },
      hasMany: true,
      admin: {
        description:
          "Marque, dentre as opções, de qual(is) forma(s) a violência se deu.",
      },
    },
    {
      name: "typeNames",
      type: "text",
      virtual: "offenseType.name",
      admin: { hidden: true },
    },
    {
      name: "intersections",
      label: "Intersecções do Conflito",
      type: "relationship",
      relationTo: "definedTerms",
      filterOptions: { additionalType: { in: ["intersection"] } },
      hasMany: true,
      admin: {
        description:
          "Marque, dentre as opções, quais são as intersecções envolvidas no conflito.",
      },
    },

    {
      name: "intersectionNames",
      type: "text",
      virtual: "intersections.name",
      admin: { hidden: true },
    },
    {
      name: "sphere",
      label: "Âmbito onde ocorreram as ações",
      type: "radio",
      options: ["Pessoalmente", "Meio Digital", "Ambos", "Outro"],
      required: true,
    },
    {
      name: "sphereOther",
      label: "Âmbito onde ocorreram as ações - Outro",
      type: "textarea",
      admin: {
        description: "Descreva em que âmbito ocorreu o conflito.",
        condition: (data, siblingData, { blockData, path, user }) => {
          return siblingData.sphere === "Outro";
        },
      },
    },
    { ...locationField, required: true } as Field,
    {
      type: "row",
      fields: [
        {
          name: "startDate",
          label: "Data de Início",
          type: "date",
          admin: { date: { pickerAppearance: "default" } },
          required: true,
        },
        {
          name: "endDate",
          label: "Data de Término",
          type: "date",
          admin: {
            date: { pickerAppearance: "default" },
            condition: (data, siblingData, { blockData, path, user }) => {
              return !data.isActive;
            },
          },
        },
      ],
    },
    {
      type: "row",
      fields: [
        {
          type: "radio",
          name: "dateAccuracy",
          label: "Qual a precisão da data reportada?",
          options: [
            { label: "Dia", value: "day" },
            { label: "Mês", value: "month" },
            { label: "Ano", value: "year" },
          ],
          defaultValue: "month",
        },
        {
          type: "checkbox",
          name: "isActive",
          label: "O caso ainda está em andamento?",
        },
      ],
    },
    {
      name: "actors",
      label: "Atores envolvidos",
      type: "relationship",
      relationTo: "definedTerms",
      filterOptions: { additionalType: { in: ["actors"] } },
      hasMany: true,
    },
    {
      name: "actorNames",
      type: "text",
      virtual: "actors.name",
      admin: { hidden: true },
    },

    {
      name: "refs",
      type: "array",
      label: "Referências",
      labels: { singular: "Referência", plural: "Referências" },
      fields: [
        {
          name: "description",
          label: "Descrição",
          type: "textarea",
          required: true,
        },
        { ...urlField, required: true } as Field,
      ],
    },
  ],
};
