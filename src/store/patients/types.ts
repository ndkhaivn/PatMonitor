import Patient from '../../DataModel/Patient';

// Redux's type convention @@context/ACTION_TYPE
export enum PatientsActionTypes {
  FETCH_REQUEST = "@@patients/FETCH_REQUEST",
  FETCH_PROGRESS = "@@patients/FETCH_PROGRESS",
  FETCH_DONE = "@@patients/FETCH_DONE",
  CLEAR_PATIENTS = "@@patients/CLEAR_PATIENTS",
  TOGGLE_MONITOR_PATIENT = "@@patients/TOGGLE_MONITOR",
  FETCH_CHOLESTEROL_REQUEST = "@@patients/FETCH_CHOLESTEROL_REQUEST",
  FETCH_CHOLESTEROL_DONE = "@@patients/FETCH_CHOLESTEROL_DONE",
}

export interface Progress {
  loaded: number,
  total: number | undefined
}

export interface PatientsState {
  readonly loading: Progress | boolean
  readonly data: Patient[]
}