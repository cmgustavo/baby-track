import {BabiesObj, BabyObj} from './babies.models';

export type BabiesStatus = 'success' | 'failed' | null;

export enum BabyActionTypes {
  BABY_SUCCESS = 'BABY/SUCCESS',
  BABY_FAILED = 'BABY/FAILED',
  BABY_CREATE = 'BABY/CREATE',
  BABY_DELETE = 'BABY/DELETE',
  BABY_UPDATE = 'BABY/UPDATE',
}

interface BabySuccess {
  type: typeof BabyActionTypes.BABY_SUCCESS;
  payload: BabiesObj; // All babies
}

interface BabyFailed {
  type: typeof BabyActionTypes.BABY_FAILED;
}

interface CreateBaby {
  type: typeof BabyActionTypes.BABY_CREATE;
  payload: {
    id: string;
    baby: BabyObj;
  };
}

interface DeleteBaby {
  type: typeof BabyActionTypes.BABY_DELETE;
  payload: string;
}

interface UpdateBaby {
  type: typeof BabyActionTypes.BABY_UPDATE;
  payload: {id: string; baby: BabyObj};
}

export type BabiesActionType =
  | BabySuccess
  | BabyFailed
  | CreateBaby
  | DeleteBaby
  | UpdateBaby;
