export type VaccinesObj = {
  [id: string]: VaccineObj;
};

export type VaccineObj = {
  name: string;
  date: Date;
  dosage: VaccineDosage;
  babyId: string;
  notes?: string;
};

export type VaccineDosage = {
  age: number; // in Months
  dose: number;
  unique: boolean;
  booster: boolean;
};
