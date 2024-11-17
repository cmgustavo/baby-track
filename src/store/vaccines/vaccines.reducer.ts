import {BabiesActionType, BabyActionTypes, BabiesStatus} from './babies.types';
import {BabiesObj, BabyObj} from './babies.models';

export const BabiesReduxPersistBlackList: (keyof BabiesState)[] = ['status'];

export interface BabiesState {
  status: BabiesStatus;
  babies: BabiesObj;
}

const initialState: BabiesState = {
  status: null,
  babies: {},
};

export const BabiesReducer = (
  state: BabiesState = initialState,
  action: BabiesActionType,
): BabiesState => {
  switch (action.type) {
    case BabyActionTypes.BABY_SUCCESS:
      return {
        ...state,
        status: 'success',
        babies: action.payload,
      };
    case BabyActionTypes.BABY_FAILED:
      return {
        ...state,
        status: 'failed',
      };

    case BabyActionTypes.BABY_CREATE:
      return {
        ...state,
        babies: {
          ...state.babies,
          [action.payload.id]: action.payload,
        },
      };

    case BabyActionTypes.BABY_DELETE:
      if (Object.keys(state.babies).length > 0) {
        const {[action.payload]: _, ...newBaby} = state.babies as {
          [key: string]: BabyObj;
        };
        return {
          ...state,
          babies: newBaby,
        };
      }
      return state;

    case BabyActionTypes.BABY_UPDATE:
      return {
        ...state,
        babies: {
          ...state.babies,
          [action.payload.id]: action.payload,
        },
      };

    default:
      return state;
  }
};
