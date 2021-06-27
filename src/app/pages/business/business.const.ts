export const ADDRESS_INPUTS = [
  {
    class: 'form-group col-12 col-md-4',
    label: 'Nome da Rua',
    placeholder: 'Digite o nome da rua',
    control: 'addressName',
    type: 'text',
    required: true,
  },
  {
    class: 'form-group col-12 col-md-2',
    label: 'Bairro',
    placeholder: 'Digite o nome do bairro',
    control: 'neighborhood',
    type: 'text',
    required: true,
  },
  {
    class: 'form-group col-12 col-md-2',
    label: 'Estado',
    placeholder: 'Digite o nome do estado',
    control: 'state',
    type: 'text',
    required: true,
  },
  {
    class: 'form-group col-12 col-md-2',
    label: 'Cidade',
    placeholder: 'Digite o nome da cidade',
    control: 'city',
    type: 'text',
    required: true,
  },
];

export const BUSINESS_INPUTS = [
  {
    class: 'form-group col-12 col-md-4',
    label: 'Nome',
    placeholder: 'Digite o nome do polo',
    control: 'businessName',
    type: 'text',
    required: true,
  },
  {
    class: 'form-group col-12 col-md-2',
    label: 'Business',
    placeholder: 'Digite o tipo do polo',
    control: 'type',
    type: 'text',
    required: true,
  },
  {
    class: 'form-group col-12 col-md-2',
    label: 'Valuation (R$)',
    placeholder: 'Digite o valor do polo',
    control: 'valuation',
    type: 'currency',
    required: true,
  },
  {
    class: 'form-group col-12 col-md-2',
    label: 'CNPJ',
    placeholder: 'Digite o CNPJ do polo',
    control: 'cnpj',
    type: 'cnpj',
    required: true,
  },
];
