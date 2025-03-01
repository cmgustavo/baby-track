import {MedicalKitObj, MedicineObj} from './kit.models.ts';
import {KitActionType, KitActionTypes} from './kit.types.ts';

export const kitSuccess = (kit: MedicalKitObj): KitActionType => ({
  type: KitActionTypes.KIT_SUCCESS,
  payload: kit,
});

export const kitFailed = (): KitActionType => ({
  type: KitActionTypes.KIT_FAILED,
});

export const createMedicine = (
  id: string,
  medicine: MedicineObj,
): KitActionType => ({
  type: KitActionTypes.MEDICINE_CREATE,
  payload: {id: id, medicine: medicine},
});

export const modifyMedicine = (
  id: string,
  medicine: MedicineObj,
): KitActionType => ({
  type: KitActionTypes.MEDICINE_MODIFY,
  payload: {id: id, medicine: medicine},
});

export const deleteMedicine = (id: string): KitActionType => ({
  type: KitActionTypes.MEDICINE_DELETE,
  payload: id,
});
