import { PractitionerState } from './practitioner/types';
import { PatientsState } from './patients/types';
import { practitionerReducer } from './practitioner/reducer';
import { patientsReducer } from './patients/reducer';
import { systemReducer } from './system/reducer';
import { combineReducers, AnyAction } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { SystemState } from './system/types';

/**
 * Root state of the store
 * @interface ApplicationState
 */
export interface ApplicationState {
  practitioner: PractitionerState,
  patients: PatientsState,
  system: SystemState
}

export const createRootReducer = () =>
  combineReducers({
    practitioner: practitionerReducer,
    patients: patientsReducer,
    system: systemReducer
  })

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  ApplicationState,
  unknown,
  AnyAction
>