import {VaccinesObj, VaccineObj} from './vaccines.models.ts';
import {VaccinesActionType, VaccineActionTypes} from './vaccines.types.ts';

export const vaccineRegisterSuccess = (
  vaccines: VaccinesObj,
): VaccinesActionType => ({
  type: VaccineActionTypes.VACCINE_REGISTER_SUCCESS,
  payload: vaccines,
});

export const vaccineRegisterFailed = (): VaccinesActionType => ({
  type: VaccineActionTypes.VACCINE_REGISTER_FAILED,
});

export const vaccineCreateRegister = (
  id: string,
  vaccine: VaccineObj,
): VaccinesActionType => ({
  type: VaccineActionTypes.VACCINE_CREATE_REGISTER,
  payload: {id: id, vaccine: vaccine},
});

export const vaccineDeleteRegister = (id: string): VaccinesActionType => ({
  type: VaccineActionTypes.VACCINE_DELETE_REGISTER,
  payload: id,
});

export const vaccineUpdateRegister = (
  id: string,
  vaccine: VaccineObj,
): VaccinesActionType => ({
  type: VaccineActionTypes.VACCINE_UPDATE_REGISTER,
  payload: {id: id, vaccine: vaccine},
});
