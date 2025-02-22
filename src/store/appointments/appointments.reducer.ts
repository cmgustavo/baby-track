import {
  AppointmentsActionType,
  AppointmentActionTypes,
  AppointmentStatus,
} from './appointments.types';
import {AppointmentsObj, AppointmentObj} from './appointments.models';

export const AppointmentsReduxPersistBlackList: (keyof AppointmentsState)[] = [
  'status',
];

export interface AppointmentsState {
  status: AppointmentStatus;
  appointments: AppointmentsObj;
}

const initialState: AppointmentsState = {
  status: null,
  appointments: {},
};

export const AppointmentsReducer = (
  state: AppointmentsState = initialState,
  action: AppointmentsActionType,
): AppointmentsState => {
  switch (action.type) {
    case AppointmentActionTypes.APPOINTMENT_SUCCESS:
      return {
        ...state,
        status: 'success',
        appointments: action.payload,
      };
    case AppointmentActionTypes.APPOINTMENT_FAILED:
      return {
        ...state,
        status: 'failed',
      };

    case AppointmentActionTypes.APPOINTMENT_CREATE:
      return {
        ...state,
        appointments: {
          ...state.appointments,
          [action.payload.id]: action.payload.appointment,
        },
      };

    case AppointmentActionTypes.APPOINTMENT_DELETE:
      if (Object.keys(state.appointments).length > 0) {
        const {[action.payload]: _, ...newAppointment} = state.appointments as {
          [key: string]: AppointmentObj;
        };
        return {
          ...state,
          appointments: newAppointment,
        };
      }
      return state;

    case AppointmentActionTypes.APPOINTMENT_UPDATE:
      return {
        ...state,
        appointments: {
          ...state.appointments,
          [action.payload.id]: action.payload.appointment,
        },
      };

    default:
      return state;
  }
};
