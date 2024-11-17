import {AppointmentsObj, AppointmentObj} from './appointments.models';

export type AppointmentStatus = 'success' | 'failed' | null;

export enum AppointmentActionTypes {
  APPOINTMENT_SUCCESS = 'APPOINTMENT/SUCCESS',
  APPOINTMENT_FAILED = 'APPOINTMENT/FAILED',
  APPOINTMENT_CREATE = 'APPOINTMENT/CREATE',
  APPOINTMENT_DELETE = 'APPOINTMENT/DELETE',
  APPOINTMENT_UPDATE = 'APPOINTMENT/UPDATE',
}

interface AppointmentSuccess {
  type: typeof AppointmentActionTypes.APPOINTMENT_SUCCESS;
  payload: AppointmentsObj; // All appointments
}

interface AppointmentFailed {
  type: typeof AppointmentActionTypes.APPOINTMENT_FAILED;
}

interface CreateAppointment {
  type: typeof AppointmentActionTypes.APPOINTMENT_CREATE;
  payload: AppointmentObj;
}

interface DeleteAppointment {
  type: typeof AppointmentActionTypes.APPOINTMENT_DELETE;
  payload: string;
}

interface UpdateAppointment {
  type: typeof AppointmentActionTypes.APPOINTMENT_UPDATE;
  payload: AppointmentObj;
}

export type AppointmentsActionType =
  | AppointmentSuccess
  | AppointmentFailed
  | CreateAppointment
  | DeleteAppointment
  | UpdateAppointment;
