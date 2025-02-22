import {Effect} from '../index';
import {babiesSuccess, babiesFailed} from './index';

export const initializeBabies =
  (): Effect<Promise<any>> => async (dispatch, getState) => {
    const {BABIES, APPOINTMENTS} = getState();
    try {
      const babies = BABIES.babies;
      if (Object.keys(babies).length === 0) {
        const appointments = APPOINTMENTS.appointments;
        // remove all appointments
        Object.keys(appointments).forEach(key => {
          delete appointments[key];
        });
      }
      dispatch(babiesSuccess(babies));
    } catch (error: any) {
      dispatch(babiesFailed());
    }
  };
