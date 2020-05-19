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
    case PatientsActionTypes.TOGGLE_MONITOR_PATIENT: {
      let newData = [ ...state.data ];
      let idx = indexOfPatient(newData, action.patientId);
      newData[idx].isMonitored = !newData[idx].isMonitored;
      return { ...state, data: newData};
    }
    case PatientsActionTypes.FETCH_CHOLESTEROL_REQUEST: {
      let newData = [ ...state.data ];
      let idx = indexOfPatient(newData, action.patientId);
      newData[idx].loading = true;
      return { ...state, data: newData };
    }
    case PatientsActionTypes.FETCH_CHOLESTEROL_DONE: {
      let newData = [ ...state.data ];
      let idx = indexOfPatient(newData, action.patientId);
      newData[idx].loading = false;
      newData[idx].totalCholesterol = action.payload;
      return { ...state, data: newData };
    }
    default:
      return state
  }
}

export { reducer as patientsReducer }