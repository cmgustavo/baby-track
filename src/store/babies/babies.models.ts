export type BabiesObj = {
  [id: string]: BabyObj;
};

export type BabyObj = {
  dni: number;
  name: string;
  birth: Date;
  gender: string;
  length: number;
  weight: number;
  place: string;
  mother: string;
  father: string;
  pediatrician: string;
  notes: string;
};
