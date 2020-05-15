import { ThunkAction } from 'redux-thunk';
import { AnyAction } from "redux";
import Practitioner from '../../DataModel/Practitioner';
import DataSource from '../../DataModel/DataSource';
import FHIRServer from '../../DataModel/FHIRServer';
import { PractitionerActionTypes } from './types';

const dataSource: DataSource = new FHIRServer();

export const fetchPractitioner = (practitionerIdentifier: string): ThunkAction<void, {}, string, AnyAction> => (dispatch) => {
  dispatch({
    type: PractitionerActionTypes.FETCH_DONE,
    payload: new Practitioner(practitionerIdentifier)
  });
}