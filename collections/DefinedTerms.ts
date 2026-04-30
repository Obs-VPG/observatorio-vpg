import { CollectionConfig } from 'payload';

import { descriptionField, nameField, slugField } from './fields/commonFields';

export const DefinedTerms: CollectionConfig = {
  slug: 'definedTerms',
  labels: { singular: 'Termo', plural: 'Dicionário de Termos' },
  admin: {
    useAsTitle: 'name',
    description:
      'Coleção de termos definidos para uso no cadastro de conteúdos no site.',
    group: 'Configuração',
    defaultColumns: ['name', 'additionalType', 'description']
  },
  fields: [
    nameField,
    descriptionField,
    {
      label: 'Categoria do Termo',
      name: 'additionalType',
      type: 'select',
      options: [
        { label: 'Intersecção', value: 'intersection' },
        { label: 'Tipo de Violência', value: 'offenseType' },
        { label: 'Atores', value: 'actors' },
        { label: 'Identidade de gênero', value: 'genderIdentity' },
        { label: 'Identidade étnico-racial', value: 'racialIdentity' },
        { label: 'Faixa etária', value: 'ageGroup' }
      ],
      required: true
    }
  ]
};
