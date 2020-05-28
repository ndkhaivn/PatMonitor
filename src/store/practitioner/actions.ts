import { Practitioner, MaybePractitioner } from '../../DataModel/Practitioner';
import FHIRServer from '../../DataModel/FHIRServer';
import { PractitionerActionTypes } from './types';
import { Identifier } from '../../DataModel/Resource';
import { dataSource } from '../../DataModel/DataSource';
import { AppThunk } from '..';
import { fetchPatients } from '../patients/actions';

export const fetchPractitioner = (practitionerIdentifier: Identifier): AppThunk<void> => async (dispatch) => {

  dispatch({
    type: PractitionerActionTypes.FETCH_REQUEST,
  });

  const practitioner = await dataSource.getPractitioner(practitionerIdentifier);

  dispatch({
    type: PractitionerActionTypes.FETCH_DONE,
    payload: practitioner
  });

  if (practitioner) {
    dispatch(fetchPatients(practitioner.ids));
  }
  
}