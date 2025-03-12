export type AppointmentsObj = {
  [id: string]: AppointmentObj;
};

export type AppointmentObj = {
  notes: string;
  date: Date;
  age: number;
  length: number;
  weight: number;
  head: number;
  babyId: string;
  hour?: string;
};
