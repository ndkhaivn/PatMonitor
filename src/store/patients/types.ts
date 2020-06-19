import Patient from '../../DataModel/Patient';

// Redux's type convention @@context/ACTION_TYPE
export enum PatientsActionTypes {
  FETCH_REQUEST = "@@patients/FETCH_REQUEST",
  FETCH_PROGRESS = "@@patients/FETCH_PROGRESS",
  FETCH_DONE = "@@patients/FETCH_DONE",
  CLEAR_PATIENTS = "@@patients/CLEAR_PATIENTS",
  TOGGLE_MONITOR_CHOLESTEROL = "@@patients/TOGGLE_MONITOR_CHOLESTEROL",
  TOGGLE_MONITOR_BLOOD_PRESSURE = "@@patients/TOGGLE_MONITOR_BLOOD_PRESSURE",
  TOGGLE_MONITOR_BLOOD_PRESSURE_HISTORY = "@@patients/TOGGLE_MONITOR_BLOOD_PRESSURE_HISTORY",
  FETCH_CHOLESTEROL_REQUEST = "@@patients/FETCH_CHOLESTEROL_REQUEST",
  FETCH_CHOLESTEROL_DONE = "@@patients/FETCH_CHOLESTEROL_DONE",
  FETCH_BLOOD_PRESSURE_REQUEST = "@@patients/FETCH_BLOOD_PRESSURE_REQUEST",
  FETCH_BLOOD_PRESSURE_DONE = "@@patients/FETCH_BLOOD_PRESSURE_DONE",
}

/**
 *
 * Interface for loading progress (loaded / total)
 * @export
 * @interface Progress
 */
export interface Progress {
  loaded: number,
  total: number | undefined
}

/**
 * State for patients data
 * @export
 * @interface PatientsState
 */
export interface PatientsState {
  readonly loading: Progress | boolean
  readonly data: Patient[]
}