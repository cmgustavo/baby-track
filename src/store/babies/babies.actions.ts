import {BabiesObj, BabyObj} from './babies.models';
import {BabiesActionType, BabyActionTypes} from './babies.types';

export const babiesSuccess = (babies: BabiesObj): BabiesActionType => ({
  type: BabyActionTypes.BABY_SUCCESS,
  payload: babies,
});

export const babiesFailed = (): BabiesActionType => ({
  type: BabyActionTypes.BABY_FAILED,
});

export const createBaby = (id: string, baby: BabyObj): BabiesActionType => ({
  type: BabyActionTypes.BABY_CREATE,
  payload: {id: id, baby: baby},
});

export const deleteBaby = (id: string): BabiesActionType => ({
  type: BabyActionTypes.BABY_DELETE,
  payload: id,
});

export const updateBaby = (id: string, baby: BabyObj): BabiesActionType => ({
  type: BabyActionTypes.BABY_UPDATE,
  payload: {id: id, baby: baby},
});
