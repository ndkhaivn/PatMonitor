import { Reducer } from "redux";
import { PatientsState, PatientsActionTypes } from "./types";

export const initialState: PatientsState = {
  data: [],
  loading: false
}

const reducer: Reducer<PatientsState> = (state = initialState, action) => {
  switch (action.type) {
    case PatientsActionTypes.FETCH_REQUEST: {
      return { ...state, loading: true }
    }
    case PatientsActionTypes.FETCH_PROGRESS: {
      return { ...state, loading: action.loading, data: state.data.concat(action.payload) }
    }
    default:
      return state
  }
}

export { reducer as patientsReducer }