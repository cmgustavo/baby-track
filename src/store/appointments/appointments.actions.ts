import {AppointmentsObj, AppointmentObj} from './appointments.models';
import {
  AppointmentsActionType,
  AppointmentActionTypes,
} from './appointments.types';

export const appointmentsSuccess = (
  appointments: AppointmentsObj,
): AppointmentsActionType => ({
  type: AppointmentActionTypes.APPOINTMENT_SUCCESS,
  payload: appointments,
});

export const appointmentsFailed = (): AppointmentsActionType => ({
  type: AppointmentActionTypes.APPOINTMENT_FAILED,
});

export const createAppointment = (
  id: string,
  appointment: AppointmentObj,
): AppointmentsActionType => ({
  type: AppointmentActionTypes.APPOINTMENT_CREATE,
  payload: {id: id, appointment: appointment},
});

export const deleteAppointment = (id: string): AppointmentsActionType => ({
  type: AppointmentActionTypes.APPOINTMENT_DELETE,
  payload: id,
});

export const updateAppointment = (
  id: string,
  appointment: AppointmentObj,
): AppointmentsActionType => ({
  type: AppointmentActionTypes.APPOINTMENT_UPDATE,
  payload: {id: id, appointment: appointment},
});
