// Redux's type convention @@context/ACTION_TYPE
export enum SystemActionTypes {
  SET_TIMER = "@@app/SET_TIMER",
  STOP_TIMER = "@@app/STOP_TIMER",
  SET_BLOOD_PRESSURE_THRESHOLD_X = "@@app/SET_BLOOD_PRESSURE_THRESHOLD_X",
  SET_BLOOD_PRESSURE_THRESHOLD_Y = "@@app/SET_BLOOD_PRESSURE_THRESHOLD_Y"
}

export interface SystemState {
  readonly timer: number | undefined
  readonly systolicThreshold: number | undefined
  readonly diastolicThreshold: number | undefined
}