import {MedicalKitObj, MedicineObj} from './kit.models.ts';

export type KitStatus = 'success' | 'failed' | null;

export enum KitActionTypes {
  KIT_SUCCESS = 'KIT/SUCCESS',
  KIT_FAILED = 'KIT/FAILED',
  MEDICINE_CREATE = 'MEDICINE/CREATE',
  MEDICINE_MODIFY = 'MEDICINE/MODIFY',
  MEDICINE_DELETE = 'MEDICINE/DELETE',
}

interface KitSuccess {
  type: typeof KitActionTypes.KIT_SUCCESS;
  payload: MedicalKitObj; // All babies
}

interface KitFailed {
  type: typeof KitActionTypes.KIT_FAILED;
}

interface CreateMedicine {
  type: typeof KitActionTypes.MEDICINE_CREATE;
  payload: {
    id: string;
    medicine: MedicineObj;
  };
}

interface ModifyMedicine {
  type: typeof KitActionTypes.MEDICINE_MODIFY;
  payload: {
    id: string;
    medicine: MedicineObj;
  };
}

interface DeleteMedicine {
  type: typeof KitActionTypes.MEDICINE_DELETE;
  payload: string;
}

export type KitActionType =
  | KitSuccess
  | KitFailed
  | CreateMedicine
  | ModifyMedicine
  | DeleteMedicine;
