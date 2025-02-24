import {Effect} from '../index';
import {appSuccess, appFailed} from './index';
import {deleteBaby} from '../babies';

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
    const {APPOINTMENTS} = getState();
    try {
      const appointments = APPOINTMENTS.appointments;
      Object.keys(appointments).forEach(key => {
        if (appointments[key].babyId === id) {
          delete appointments[key];
        }
      });
      dispatch(deleteBaby(id));
      return true;
    } catch (error: any) {
      return false;
    }
  };
