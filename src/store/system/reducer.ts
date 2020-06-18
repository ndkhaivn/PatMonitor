import { Reducer } from "redux";
import { SystemState, SystemActionTypes } from "./types";

export const initialState: SystemState = {
  timer: undefined,
  systolicThreshold: undefined,
  diastolicThreshold: undefined
}

const reducer: Reducer<SystemState> = (state = initialState, action) => {
  switch (action.type) {
    case SystemActionTypes.SET_TIMER: {
      if (state.timer) {
        // Stop the old timer
        clearInterval(state.timer);
      }
      // Keep track of the new timer
      return { 
        ...state,
        timer: action.payload 
      }
    }
    case SystemActionTypes.SET_BLOOD_PRESSURE_THRESHOLD_X: {
      return {
        ...state,
        systolicThreshold: action.payload
      }
    }
    case SystemActionTypes.SET_BLOOD_PRESSURE_THRESHOLD_Y: {
      return {
        ...state,
        diastolicThreshold: action.payload
      }
    }
    default:
      return state
  }
}

export { reducer as systemReducer }