import { Reducer } from "redux";
import { PatientsState, PatientsActionTypes } from "./types";
import Patient from '../../DataModel/Patient';

export const initialState: PatientsState = {
  data: [],
  loading: false
}

const indexOfPatient = (patients: Patient[], patientId: string): number => {
  return patients.findIndex(patient => patient.id === patientId);
}

const reducer: Reducer<PatientsState> = (state = initialState, action) => {
  switch (action.type) {
    case PatientsActionTypes.FETCH_REQUEST: {
      return { ...state, loading: true }
    }
    case PatientsActionTypes.FETCH_PROGRESS: {
      return { ...state, loading: action.loading, data: state.data.concat(action.payload) }
    }
    case PatientsActionTypes.FETCH_DONE: {
      return { ...state, loading: false }
    }
    case PatientsActionTypes.CLEAR_PATIENTS: {
      return initialState
    }
    case PatientsActionTypes.TOGGLE_MONITOR_CHOLESTEROL: {
      // find the index of target patient
      let newData = [ ...state.data ];
      let idx = indexOfPatient(newData, action.patientId);
      // toggle monitoring cholesterol this patient
      newData[idx].cholesterol.monitored = !newData[idx].cholesterol.monitored;
      return { ...state, data: newData};
    }
    case PatientsActionTypes.TOGGLE_MONITOR_BLOOD_PRESSURE: {
      // find the index of target patient
      let newData = [ ...state.data ];
      let idx = indexOfPatient(newData, action.patientId);
      // toggle monitoring blood pressure this patient
      newData[idx].bloodPressure.monitored = !newData[idx].bloodPressure.monitored;
      return { ...state, data: newData};
    }
    case PatientsActionTypes.TOGGLE_MONITOR_BLOOD_PRESSURE_HISTORY: {
      // find the index of target patient
      let newData = [ ...state.data ];
      let idx = indexOfPatient(newData, action.patientId);
      // toggle monitoring blood pressure this patient
      newData[idx].historyMonitored = !newData[idx].historyMonitored;
      return { ...state, data: newData};
    }
    case PatientsActionTypes.FETCH_CHOLESTEROL_REQUEST: {
      // find index of target patient & set cholesterol loading
      let newData = [ ...state.data ];
      let idx = indexOfPatient(newData, action.patientId);
      newData[idx].cholesterol.loading = true;
      return { ...state, data: newData };
    }
    case PatientsActionTypes.FETCH_CHOLESTEROL_DONE: {
      // find index of target patient & set result cholesterol
      let newData = [ ...state.data ];
      let idx = indexOfPatient(newData, action.patientId);
      newData[idx].cholesterol.loading = false;
      newData[idx].cholesterol.data = action.payload;
      return { ...state, data: newData };
    }
    case PatientsActionTypes.FETCH_BLOOD_PRESSURE_REQUEST: {
      // find index of target patient & set blood pressure loading
      let newData = [ ...state.data ];
      let idx = indexOfPatient(newData, action.patientId);
      newData[idx].bloodPressure.loading = true;
      return { ...state, data: newData };
    }
    case PatientsActionTypes.FETCH_BLOOD_PRESSURE_DONE: {
      // find index of target patient & set result blood pressure
      let newData = [ ...state.data ];
      let idx = indexOfPatient(newData, action.patientId);
      newData[idx].bloodPressure.loading = false;
      newData[idx].bloodPressure.data = action.payload;
      return { ...state, data: newData };
    }
    default:
      return state
  }
}

export { reducer as patientsReducer }