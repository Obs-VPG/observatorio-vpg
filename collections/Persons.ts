import { CollectionConfig } from 'payload';

import { nameField, slugField } from './fields/commonFields';

export const Persons: CollectionConfig = {
  slug: 'persons',
  labels: { singular: 'Pessoa', plural: 'Pessoas' },
  admin: {
    useAsTitle: 'name',
    description: 'Pessoas vítimas de violência política de gênero',

    defaultColumns: ['name', 'filiation', 'occupation']
  },
  fields: [
    nameField,
    slugField,
    {
      name: 'filiation',
      label: 'Filiação',
      type: 'text'
    },
    { name: 'occupation', label: 'Cargo/ocupação', type: 'text' },
    {
      name: 'genderIdentity',
      label: 'Identidade de gênero',
      type: 'relationship',
      relationTo: 'definedTerms',
      filterOptions: { additionalType: { in: ['genderIdentity'] } }
    },
    {
      name: 'racialIdentity',
      label: 'Identidade étnico-racial',
      type: 'relationship',
      relationTo: 'definedTerms',
      filterOptions: { additionalType: { in: ['racialIdentity'] } }
    },
    {
      name: 'ageGroup',
      label: 'Faixa etária',
      type: 'relationship',
      relationTo: 'definedTerms',
      filterOptions: { additionalType: { in: ['ageGroup'] } }
    }
  ]
};
