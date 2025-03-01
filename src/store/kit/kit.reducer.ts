import {KitStatus} from './kit.types.ts';
import {MedicalKitObj, MedicineObj} from './kit.models.ts';
import {KitActionType, KitActionTypes} from './kit.types.ts';

export const KitReduxPersistBlackList: (keyof KitState)[] = ['status'];

export interface KitState {
  status: KitStatus;
  kit: MedicalKitObj;
}

const initialState: KitState = {
  status: null,
  kit: {},
};

export const KitReducer = (
  state: KitState = initialState,
  action: KitActionType,
): KitState => {
  switch (action.type) {
    case KitActionTypes.KIT_SUCCESS:
      return {
        ...state,
        status: 'success',
        kit: action.payload,
      };
    case KitActionTypes.KIT_FAILED:
      return {
        ...state,
        status: 'failed',
      };

    case KitActionTypes.MEDICINE_CREATE:
      return {
        ...state,
        kit: {
          ...state.kit,
          [action.payload.id]: action.payload.medicine,
        },
      };

    case KitActionTypes.MEDICINE_DELETE:
      if (Object.keys(state.kit).length > 0) {
        const {[action.payload]: _, ...newKit} = state.kit as {
          [key: string]: MedicineObj;
        };
        return {
          ...state,
          kit: newKit,
        };
      }
      return state;

    case KitActionTypes.MEDICINE_MODIFY:
      return {
        ...state,
        kit: {
          ...state.kit,
          [action.payload.id]: action.payload.medicine,
        },
      };

    default:
      return state;
  }
};
