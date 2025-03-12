export type MedicalKitObj = {
  [id: string]: MedicineObj;
};

export type MedicineObj = {
  name: string;
  dosage?: string;
  expiration?: Date;
  quantity?: number;
  notes?: string;
};
