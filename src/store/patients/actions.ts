import { dataSource } from '../../DataModel/DataSource';
import { PatientsActionTypes, Progress } from './types';
import Patient from '../../DataModel/Patient';
import { AppThunk } from '..';
import { Observation } from '../../DataModel/Resource';


/**
 * async function to fetch patients from dataSource
 * @param {string[]} practitionerIDs
 * @returns {AppThunk<void>}
 */
export const fetchPatients = (practitionerIDs: string[]): AppThunk<void> => async (dispatch) => {

  const progressUpdate = (data: Patient[], progress: Progress) => {
    console.log(progress);
    dispatch({
      type: PatientsActionTypes.FETCH_PROGRESS,
      loading: progress,
      payload: data
    });
  }

  // Clear current stored patients
  dispatch({
    type: PatientsActionTypes.CLEAR_PATIENTS
  });

  if (practitionerIDs.length === 0) {
    return []
  }

  // Set loading
  dispatch({
    type: PatientsActionTypes.FETCH_REQUEST
  });

  // Get data
  await dataSource.getPatientList(practitionerIDs, progressUpdate);

  // Set result
  dispatch({
    type: PatientsActionTypes.FETCH_DONE
  });

}

/**
 * async function to fetch practitioner from dataSource
 * @param {string} patientId
 * @returns {AppThunk<void>}
 */
export const fetchPatientCholesterol = (patientId: string): AppThunk<void> => async (dispatch) => {
  // Set loading
  dispatch({
    type: PatientsActionTypes.FETCH_CHOLESTEROL_REQUEST,
    patientId
  });

  // get data from dataSource
  const cholesterolData: Observation | null = await dataSource.getCholesterol(patientId);

  // Set results
  dispatch({
    type: PatientsActionTypes.FETCH_CHOLESTEROL_DONE,
    patientId,
    payload: cholesterolData
  });
}