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

export const vaccinesConstantList = [
  {
    name: 'BCG - Tuberculosis',
    description:
      'The Bacillus Calmette-Guérin (BCG) vaccine protects against tuberculosis (TB), particularly severe forms like meningitis and miliary TB in infants and young children. It is usually administered at birth as an intradermal injection, leaving a characteristic scar.',
  },
  {
    name: 'Hepatitis B',
    description:
      'The Hepatitis B vaccine protects against the Hepatitis B virus, which can cause chronic liver infections, cirrhosis, and liver cancer. It is typically given in multiple doses, starting at birth, to provide long-term immunity.',
  },
  {
    name: 'Neumococo (Pneumococcal Vaccine)',
    description:
      'The pneumococcal vaccine protects against Streptococcus pneumoniae, a bacterium responsible for pneumonia, meningitis, and sepsis. There are different versions, such as PCV13 and PPSV23, covering various strains of the bacteria.',
  },
  {
    name: 'Quíntuple (Pentavalent Vaccine)',
    description:
      'The pentavalent vaccine protects against five diseases: diphtheria, tetanus, pertussis (whooping cough), Hepatitis B, and Haemophilus influenzae type b (Hib), which causes meningitis and other infections. It is administered in multiple doses during infancy.',
  },
  {
    name: 'IPV - Poliomielitis (Inactivated Polio Vaccine)',
    description:
      'The inactivated polio vaccine (IPV) protects against poliomyelitis, a viral disease that can cause paralysis. It is administered as an injection and is part of routine immunization schedules, often combined with other vaccines.',
  },
  {
    name: 'Rotavirus',
    description:
      'The rotavirus vaccine protects against rotavirus infections, which cause severe diarrhea, dehydration, and gastroenteritis in infants and young children. It is given orally in multiple doses.',
  },
  {
    name: 'Meningococo (Meningococcal Vaccine)',
    description:
      "The meningococcal vaccine protects against Neisseria meningitidis, which can cause meningitis and bloodstream infections. Different versions cover different strains (A, B, C, W, Y), and it is administered according to the child's age and risk factors.",
  },
];

export const dosageByVaccine = [
  {
    vaccineId: 0,
    age: 0,
    dose: 1,
    unique: true,
    booster: false,
    stage: 'Recién Nacido',
  },
  {
    vaccineId: 1,
    age: 0,
    dose: 1,
    unique: true,
    booster: false,
    stage: 'Recién Nacido',
  },
  {
    vaccineId: 1,
    age: 132,
    dose: 2,
    unique: true,
    booster: true,
    stage: '11 años',
  },
  {
    vaccineId: 2,
    age: 2,
    dose: 1,
    unique: false,
    booster: false,
    stage: '2 meses',
  },
  {
    vaccineId: 2,
    age: 4,
    dose: 2,
    unique: false,
    booster: false,
    stage: '4 meses',
  },
  {
    vaccineId: 2,
    age: 6,
    dose: 3,
    unique: false,
    booster: true,
    stage: '6 meses',
  },
  {
    vaccineId: 3,
    age: 2,
    dose: 1,
    unique: false,
    booster: false,
    stage: '2 meses',
  },
  {
    vaccineId: 3,
    age: 4,
    dose: 2,
    unique: false,
    booster: false,
    stage: '4 meses',
  },
  {
    vaccineId: 3,
    age: 6,
    dose: 3,
    unique: false,
    booster: false,
    stage: '6 meses',
  },
  {
    vaccineId: 3,
    age: 15,
    dose: 4,
    unique: false,
    booster: true,
    stage: '15-18 meses',
  },
  {
    vaccineId: 4,
    age: 2,
    dose: 1,
    unique: false,
    booster: false,
    stage: '2 meses',
  },
  {
    vaccineId: 4,
    age: 4,
    dose: 2,
    unique: false,
    booster: false,
    stage: '4 meses',
  },
  {
    vaccineId: 4,
    age: 6,
    dose: 3,
    unique: false,
    booster: false,
    stage: '6 meses',
  },
  {
    vaccineId: 4,
    age: 60,
    dose: 4,
    unique: false,
    booster: true,
    stage: '5 años',
  },
  {
    vaccineId: 5,
    age: 2,
    dose: 1,
    unique: false,
    booster: false,
    stage: '2 meses',
  },
  {
    vaccineId: 5,
    age: 4,
    dose: 2,
    unique: false,
    booster: false,
    stage: '4 meses',
  },
  {
    vaccineId: 6,
    age: 2,
    dose: 1,
    unique: false,
    booster: false,
    stage: '2 meses',
  },
  {
    vaccineId: 6,
    age: 4,
    dose: 2,
    unique: false,
    booster: false,
    stage: '4 meses',
  },
  {
    vaccineId: 6,
    age: 15,
    dose: 3,
    unique: false,
    booster: true,
    stage: '15 meses',
  },
  {
    vaccineId: 6,
    age: 132,
    dose: 4,
    unique: true,
    booster: false,
    stage: '11 años',
  },
];

export const calendarVaccines = [
  {
    name: 'BCG - Tuberculosis',
    description: '',
  },
  {
    name: 'Hepatitis B',
    description: '',
  },
  {
    name: 'Neumococo',
    description: '',
  },
  {
    name: 'Quíntuple',
    description: '',
  },
  {
    name: 'IPV - Poliomielitis',
    description: '',
  },
  {
    name: 'Rotavirus',
    description: '',
  },
  {
    name: 'Meningococo',
    description: '',
  },
];
