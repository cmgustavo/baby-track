export type AppointmentsObj = {
  [id: string]: AppointmentObj;
};

export type AppointmentObj = {
  id: string;
  notes: string;
  date: Date;
  age: number;
  length: number;
  weight: number;
  head: number;
};
