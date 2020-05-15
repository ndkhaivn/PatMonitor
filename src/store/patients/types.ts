import Patient from '../../DataModel/Patient';

// Redux's type convention @@context/ACTION_TYPE
export enum PatientsActionTypes {
  FETCH_REQUEST = "@@patients/FETCH",
  FETCH_PROGRESS = "@@patients/FETCH_PROGRESS",
  MONITOR_PATIENT = "@@patients/MONITOR",
  STOP_MONITOR_PATIENT = '@@patients/STOP_MONITOR_PATIENT'
}

export interface PatientsState {
  readonly loading: { loaded: number, total: number } | boolean
  readonly data: Patient[]
}