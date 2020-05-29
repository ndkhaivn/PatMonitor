import { Practitioner, MaybePractitioner } from '../../DataModel/Practitioner';
import FHIRServer from '../../DataModel/FHIRServer';
import { PractitionerActionTypes } from './types';
import { Identifier } from '../../DataModel/Resource';
import { dataSource } from '../../DataModel/DataSource';
import { AppThunk } from '..';
import { fetchPatients } from '../patients/actions';

/**
 * async function for fetching practitioner information from dataSource
 * @param {Identifier} practitionerIdentifier
 * @returns {AppThunk<void>}
 */
export const fetchPractitioner = (practitionerIdentifier: Identifier): AppThunk<void> => async (dispatch) => {

  // Set loading
  dispatch({
    type: PractitionerActionTypes.FETCH_REQUEST,
  });

  const practitioner = await dataSource.getPractitioner(practitionerIdentifier);

  // Set results
  dispatch({
    type: PractitionerActionTypes.FETCH_DONE,
    payload: practitioner
  });

  if (practitioner) {
    dispatch(fetchPatients(practitioner.ids));
  } else {
    // fetch empty ids to reset patients state
    dispatch(fetchPatients([]));
  }
  
}