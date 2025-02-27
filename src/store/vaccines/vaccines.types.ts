import {VaccinesObj, VaccineObj} from './vaccines.models.ts';

export type VaccinesStatus = 'success' | 'failed' | null;

export enum VaccineActionTypes {
  VACCINE_REGISTER_SUCCESS = 'VACCINE/REGISTER_SUCCESS',
  VACCINE_REGISTER_FAILED = 'VACCINE/FAILED',
  VACCINE_CREATE_REGISTER = 'VACCINE/CREATE_REGISTER',
  VACCINE_DELETE_REGISTER = 'VACCINE/DELETE_REGISTER',
  VACCINE_UPDATE_REGISTER = 'VACCINE/UPDATE_REGISTER',
}

interface VaccineRegisterSuccess {
  type: typeof VaccineActionTypes.VACCINE_REGISTER_SUCCESS;
  payload: VaccinesObj;
}

interface VaccineRegisterFailed {
  type: typeof VaccineActionTypes.VACCINE_REGISTER_FAILED;
}

interface VaccineCreateRegister {
  type: typeof VaccineActionTypes.VACCINE_CREATE_REGISTER;
  payload: {
    id: string;
    vaccine: VaccineObj;
  };
}

interface VaccineDeleteRegister {
  type: typeof VaccineActionTypes.VACCINE_DELETE_REGISTER;
  payload: string;
}

interface VaccineUpdateRegister {
  type: typeof VaccineActionTypes.VACCINE_UPDATE_REGISTER;
  payload: {id: string; vaccine: VaccineObj};
}

export type VaccinesActionType =
  | VaccineRegisterSuccess
  | VaccineRegisterFailed
  | VaccineCreateRegister
  | VaccineDeleteRegister
  | VaccineUpdateRegister;
