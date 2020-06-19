import { Reducer } from "redux";
import { SystemState, SystemActionTypes } from "./types";

export const initialState: SystemState = {
  timer: undefined,
  countdownTimer: undefined,
  timeLeft: undefined,
  systolicThreshold: undefined,
  diastolicThreshold: undefined
}

const reducer: Reducer<SystemState> = (state = initialState, action) => {
  switch (action.type) {
    case SystemActionTypes.SET_TIMER: {
      // Stop the old timers
      if (state.timer) {
        clearInterval(state.timer);
      }
      if (state.countdownTimer) {
        clearInterval(state.countdownTimer);
      }
      // Keep track of the new timer
      return { 
        ...state,
        timer: action.payload,
        countdownTimer: action.countdown
      }
    }
    case SystemActionTypes.STOP_TIMER: {

      // Stop the old timers
      if (state.timer) {
        clearInterval(state.timer);
      }
      if (state.countdownTimer) {
        clearInterval(state.countdownTimer);
      }

      // Without any new timer
      return {
        ...state,
        timer: undefined,
        countdownTimer: undefined,
        timeLeft: undefined
      }
    }
    case SystemActionTypes.SET_TIME_LEFT: {
      return {
        ...state,
        timeLeft: action.payload
      }
    }
    case SystemActionTypes.COUNTDOWN: {
      return {
        ...state,
        timeLeft: state.timeLeft ? state.timeLeft - 1 : undefined
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