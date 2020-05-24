import { ThunkAction } from 'redux-thunk';
import { AnyAction } from "redux";
import Practitioner from '../../DataModel/Practitioner';
import FHIRServer from '../../DataModel/FHIRServer';
import { PractitionerActionTypes } from './types';

export const fetchPractitioner = (practitionerIdentifier: string): ThunkAction<void, {}, string, AnyAction> => (dispatch) => {

  dispatch({
    type: PractitionerActionTypes.FETCH_REQUEST,
  });

  // dispatch({
  //   type: PractitionerActionTypes.FETCH_DONE,
  //   payload: new Practitioner(practitionerIdentifier)
  // });
}