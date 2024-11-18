import {Effect} from '../index';
import {appointmentsSuccess, appointmentsFailed} from './index';

export const initializeAppointments =
  (): Effect<Promise<any>> => async (dispatch, getState) => {
    const {APPOINTMENTS} = getState();
    try {
      const appointments = APPOINTMENTS.appointments;
      dispatch(appointmentsSuccess(appointments));
    } catch (error: any) {
      dispatch(appointmentsFailed());
    }
  };
