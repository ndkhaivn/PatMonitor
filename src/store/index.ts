import Practitioner from '../DataModel/Practitioner';
import { PractitionerState } from './practitioner/types';
import { PatientsState } from './patients/types';
import { practitionerReducer } from './practitioner/reducer';
import { patientsReducer } from './patients/reducer';
import { combineReducers, AnyAction } from 'redux';
import { ThunkAction } from 'redux-thunk';


export interface ApplicationState {

  practitioner: PractitionerState,
  patients: PatientsState
}

export const createRootReducer = () =>
  combineReducers({
    practitioner: practitionerReducer,
    patients: patientsReducer
  })

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  ApplicationState,
  unknown,
  AnyAction
>