import {Effect} from '../index';
import {babiesSuccess, babiesFailed} from './index';

export const initializeBabies =
  (): Effect<Promise<any>> => async (dispatch, getState) => {
    const {BABIES} = getState();
    try {
      const babies = BABIES.babies;
      console.log('[babies.effects.ts:8] BABIES', babies); /* TODO */
      dispatch(babiesSuccess(babies));
    } catch (error: any) {
      dispatch(babiesFailed());
    }
  };
