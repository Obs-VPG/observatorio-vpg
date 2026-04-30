import { Field, slugField as payloadSlugField } from 'payload';

export const nameField: Field = {
  label: 'Nome',
  name: 'name',
  required: true,
  type: 'text'
};

const psf = payloadSlugField({ fieldToUse: 'name' });

export const slugField: Field = {
  ...psf,
  admin: {
    ...psf.admin,
    description:
      'A slug é uma versão do "Nome" somente em letras minúsculas e sem caracteres especiais. Ela é usada como  identificador único do conteúdo legível para humanos, principalmente para a construção de URLs.'
  }
} as Field;

export const descriptionField: Field = {
  name: 'description',
  label: 'Descrição curta',
  type: 'textarea',
  maxLength: 500
};

export const urlField: Field = {
  name: 'url',
  label: 'Site / Link',
  type: 'text',
  validate: (value: any) => {
    let url;
    const errorMsg = 'Digite um URL válido.';
    try {
      url = new URL(value);
    } catch (_) {
      if (value) return errorMsg;
    }

    return (
      Boolean(
        url?.protocol === 'http:' || url?.protocol === 'https:' || !value
      ) || errorMsg
    );
  }
};

export const locationField: Field = {
  label: 'Localização',
  name: 'geo',
  type: 'point',

  admin: {
    components: {
      Field: '@/components/payload/ui/location#LocationField'
    },
    description:
      'Você provavelmente não quer mexer nos campos de latitude e longitude! Use o mapa e o campo de busca acima dele.'
  }
};
