import { Reducer } from "redux";
import { SystemState, SystemActionTypes } from "./types";

export const initialState: SystemState = {
  timer: undefined
}

const reducer: Reducer<SystemState> = (state = initialState, action) => {
  switch (action.type) {
    case SystemActionTypes.SET_TIMER: {
      if (state.timer) {
        // Stop the old timer
        clearInterval(state.timer);
      }
      // Keep track of the new timer
      return { timer: action.payload }
    }
    default:
      return state
  }
}

export { reducer as systemReducer }