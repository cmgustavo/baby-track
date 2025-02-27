import {Effect} from '../index';
import {vaccineRegisterSuccess, vaccineRegisterFailed} from './index';

export const initializeVaccines =
  (): Effect<Promise<any>> => async (dispatch, getState) => {
    const {VACCINES} = getState();
    try {
      const vaccines = VACCINES.vaccines;
      dispatch(vaccineRegisterSuccess(vaccines));
    } catch (error: any) {
      dispatch(vaccineRegisterFailed());
    }
  };
