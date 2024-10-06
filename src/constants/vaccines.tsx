export type StagesLive =
  | 'Recién Nacido'
  | '2 meses'
  | '3 meses'
  | '4 meses'
  | '5 meses'
  | '6 meses'
  | '12 meses'
  | '15 meses'
  | '15-18 meses'
  | '18 meses'
  | '24 meses'
  | '5 años'
  | '11 años'
  | 'A partir de los 15 años'
  | 'Adultos';

export const stageLive = [
  'Recién Nacido',
  '2 meses',
  '3 meses',
  '4 meses',
  '5 meses',
  '6 meses',
  '12 meses',
  '15 meses',
  '15-18 meses',
  '18 meses',
  '24 meses',
  '5 años',
  '11 años',
  'A partir de los 15 años',
  'Adultos',
];

export const calendarVaccines = [
  {
    name: 'BCG - Tuberculosis',
    description: '',
    vaccines: [
      {
        dose: 1,
        unique: true,
        booster: false,
        stage: 'Recién Nacido',
      },
    ],
  },
  {
    name: 'Hepatitis B',
    description: '',
    vaccines: [
      {
        dose: 1,
        unique: true,
        booster: false,
        stage: 'Recién Nacido',
      },
      {
        dose: 2,
        unique: true,
        booster: true,
        stage: '11 años',
      },
    ],
  },
  {
    name: 'Neumococo',
    description: '',
    vaccines: [
      {
        dose: 1,
        unique: false,
        booster: false,
        stage: '2 meses',
      },
      {
        dose: 2,
        unique: false,
        booster: false,
        stage: '4 meses',
      },
      {
        dose: 3,
        unique: false,
        booster: true,
        stage: '6 meses',
      },
    ],
  },
  {
    name: 'Quíntuple',
    description: '',
    vaccines: [
      {
        dose: 1,
        unique: false,
        booster: false,
        stage: '2 meses',
      },
      {
        dose: 2,
        unique: false,
        booster: false,
        stage: '4 meses',
      },
      {
        dose: 3,
        unique: false,
        booster: false,
        stage: '6 meses',
      },
      {
        dose: 4,
        unique: false,
        booster: true,
        stage: '15-18 meses',
      },
    ],
  },
  {
    name: 'IPV - Poliomielitis',
    description: '',
    vaccines: [
      {
        dose: 1,
        unique: false,
        booster: false,
        stage: '2 meses',
      },
      {
        dose: 2,
        unique: false,
        booster: false,
        stage: '4 meses',
      },
      {
        dose: 3,
        unique: false,
        booster: false,
        stage: '6 meses',
      },
      {
        dose: 4,
        unique: false,
        booster: true,
        stage: '5 años',
      },
    ],
  },
  {
    name: 'Rotavirus',
    description: '',
    vaccines: [
      {
        dose: 1,
        unique: false,
        booster: false,
        stage: '2 meses',
      },
      {
        dose: 2,
        unique: false,
        booster: false,
        stage: '4 meses',
      },
    ],
  },
  {
    name: 'Meningococo',
    description: '',
    vaccines: [
      {
        dose: 1,
        unique: false,
        booster: false,
        stage: '2 meses',
      },
      {
        dose: 2,
        unique: false,
        booster: false,
        stage: '4 meses',
      },
      {
        dose: 3,
        unique: false,
        booster: true,
        stage: '15 meses',
      },
      {
        dose: 4,
        unique: true,
        booster: false,
        stage: '11 años',
      },
    ],
  },
];
