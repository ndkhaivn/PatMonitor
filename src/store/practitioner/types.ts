import { MaybePractitioner } from '../../DataModel/Practitioner';

// Redux's type convention @@context/ACTION_TYPE
export enum PractitionerActionTypes {
  FETCH_REQUEST = '@@practitioner/FETCH_REQUEST',
  FETCH_DONE = '@@practitioner/FETCH_DONE',
}

export interface PractitionerState {
  readonly loading: boolean
  readonly data: MaybePractitioner
}