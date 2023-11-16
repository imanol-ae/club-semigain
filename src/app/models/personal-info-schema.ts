export const COLUMNS_SCHEMA = [
  {
    key: 'name',
    type: 'text',
    label: 'Nombre',
  },
  {
    key: 'surname',
    type: 'text',
    label: 'Apellidos',
  },
  {
    key: 'birthdate',
    type: 'date',
    label: 'Nacimiento',
  },
  {
    key: 'gender',
    type: 'text',
    label: 'Sexo',
  },
  {
    key: 'id',
    type: 'text',
    label: 'Número de socio',
  },
  {
    key: 'isEdit',
    type: 'isEdit',
    label: '',
  },
];

export const CONTACT_COLUMNS_SCHEMA = [
  {
    key: 'address',
    type: 'text',
    label: 'Dirección',
  },
  {
    key: 'city',
    type: 'text',
    label: 'Municipio',
  },
  {
    key: 'province',
    type: 'text',
    label: 'Provincia',
  },
  {
    key: 'email',
    type: 'text',
    label: 'Correo electrónico',
  },
  {
    key: 'isEdit',
    type: 'isEdit',
    label: '',
  },
];