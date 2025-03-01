import {Effect} from '../index.ts';
import {kitFailed, kitSuccess} from './kit.actions.ts';

export const initializeKit =
  (): Effect<Promise<any>> => async (dispatch, getState) => {
    const {KIT} = getState();
    try {
      const kit = KIT.kit;
      dispatch(kitSuccess(kit));
    } catch (error: any) {
      dispatch(kitFailed());
    }
  };
