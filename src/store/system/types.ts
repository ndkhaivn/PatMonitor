// Redux's type convention @@context/ACTION_TYPE
export enum SystemActionTypes {
  SET_TIMER = "@@app/SET_TIME",
}

export interface SystemState {
  readonly timer: number | undefined
}