import {
  VaccinesActionType,
  VaccineActionTypes,
  VaccinesStatus,
} from './vaccines.types.ts';
import {VaccinesObj, VaccineObj} from './vaccines.models.ts';

export const VaccinesReduxPersistBlackList: (keyof VaccinesState)[] = [
  'status',
];

export interface VaccinesState {
  status: VaccinesStatus;
  vaccines: VaccinesObj;
}

const initialState: VaccinesState = {
  status: null,
  vaccines: {},
};

export const VaccinesReducer = (
  state: VaccinesState = initialState,
  action: VaccinesActionType,
): VaccinesState => {
  switch (action.type) {
    case VaccineActionTypes.VACCINE_REGISTER_SUCCESS:
      return {
        ...state,
        status: 'success',
        vaccines: action.payload,
      };
    case VaccineActionTypes.VACCINE_REGISTER_FAILED:
      return {
        ...state,
        status: 'failed',
      };

    case VaccineActionTypes.VACCINE_CREATE_REGISTER:
      return {
        ...state,
        vaccines: {
          ...state.vaccines,
          [action.payload.id]: action.payload.vaccine,
        },
      };

    case VaccineActionTypes.VACCINE_DELETE_REGISTER:
      if (Object.keys(state.vaccines).length > 0) {
        const {[action.payload]: _, ...newVaccineRegister} = state.vaccines as {
          [key: string]: VaccineObj;
        };
        return {
          ...state,
          vaccines: newVaccineRegister,
        };
      }
      return state;

    case VaccineActionTypes.VACCINE_UPDATE_REGISTER:
      return {
        ...state,
        vaccines: {
          ...state.vaccines,
          [action.payload.id]: action.payload.vaccine,
        },
      };

    default:
      return state;
  }
};
