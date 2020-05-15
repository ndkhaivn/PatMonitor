import { Reducer } from "redux";
import { PractitionerState, PractitionerActionTypes } from "./types";

export const initialState: PractitionerState = {
  data: [],
  loading: false
}

const reducer: Reducer<PractitionerState> = (state = initialState, action) => {
  switch (action.type) {
    case PractitionerActionTypes.FETCH_REQUEST: {
      return { ...state, loading: true }
    }
    case PractitionerActionTypes.FETCH_DONE: {
      return { ...state, loading: false, data: action.payload }
    }
    default:
      return state
  }
}

export { reducer as practitionerReducer }