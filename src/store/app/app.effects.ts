import {Effect} from '../index';
import {appSuccess, appFailed} from './index';
import {deleteBaby} from '../babies';
import {deleteAppointment} from '../appointments';
import {vaccineDeleteRegister} from "../vaccines";

export const initializeApp = (): Effect<Promise<any>> => async dispatch => {
  try {
    dispatch(appSuccess());
  } catch (error: any) {
    dispatch(appFailed());
  }
};

export const deleteBabyAndLinked =
  (id: string): Effect<Promise<boolean>> =>
  async (dispatch, getState) => {
    const {BABIES, APPOINTMENTS, VACCINES} = getState();
    try {
      const appointments = APPOINTMENTS.appointments;
      Object.keys(appointments).forEach(key => {
        if (appointments[key].babyId === id) {
          dispatch(deleteAppointment(key));
        }
      });
      const vaccines = VACCINES.vaccines;
      Object.keys(vaccines).forEach(key => {
        if (vaccines[key].babyId === id) {
          dispatch(vaccineDeleteRegister(key));
        }
      });
      const babies = BABIES.babies;
      Object.keys(babies).forEach(key => {
        if (key === id) {
          dispatch(deleteBaby(key));
        }
      });
      return true;
    } catch (error: any) {
      return false;
    }
  };
