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
  appointment: AppointmentObj,
): AppointmentsActionType => ({
  type: AppointmentActionTypes.APPOINTMENT_CREATE,
  payload: appointment,
});

export const deleteAppointment = (id: string): AppointmentsActionType => ({
  type: AppointmentActionTypes.APPOINTMENT_DELETE,
  payload: id,
});

export const updateAppointment = (
  appointment: AppointmentObj,
): AppointmentsActionType => ({
  type: AppointmentActionTypes.APPOINTMENT_UPDATE,
  payload: appointment,
});
