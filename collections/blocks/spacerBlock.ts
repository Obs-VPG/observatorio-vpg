import { Block } from 'payload';

export const spacerBlock: Block = {
  labels: { singular: 'Espaçador', plural: 'Espaçadores' },
  slug: 'spacerBlock',
  fields: [
    {
      name: 'size',
      type: 'radio',
      label: 'Tamanho',
      defaultValue: 'P',
      options: ['P', 'M', 'G']
    }
  ]
};
