import { dataSource } from '../../DataModel/DataSource';
import { PatientsActionTypes, Progress } from './types';
import Patient from '../../DataModel/Patient';
import { AppThunk } from '..';
import { Observation, BloodPressure } from '../../DataModel/Resource';
import { ApplicationState } from '../index';

const HISTORY_COUNT = 5;

/**
 * async function to fetch patients from dataSource
 * @param {string[]} practitionerIDs
 * @returns {AppThunk<void>}
 */
export const fetchPatients = (practitionerIDs: string[]): AppThunk<void> => async (dispatch) => {

  const progressUpdate = (data: Patient[], progress: Progress) => {
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
 * async function to fetch patient cholesterol from dataSource
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

/**
* async function to fetch blood pressure from dataSource
* @param {string} patientId
* @returns {AppThunk<void>}
*/
export const fetchPatientBloodPressure = (patientId: string): AppThunk<void> => async (dispatch, getState) => {

  let count = 1;
  const patients = getState().patients.data;
  let idx = patients.findIndex(patient => patient.id === patientId);
  const patient = patients[idx];
  if (patient.historyMonitored) {
    count = HISTORY_COUNT;
  }

  // Set loading
  dispatch({
    type: PatientsActionTypes.FETCH_BLOOD_PRESSURE_REQUEST,
    patientId
  });

  // get data from dataSource
  const bloodPressureData: BloodPressure[] | null = await dataSource.getBloodPressure(patientId, count);

  // Set results
  dispatch({
    type: PatientsActionTypes.FETCH_BLOOD_PRESSURE_DONE,
    patientId,
    payload: bloodPressureData
  });
}

export const toggleMonitorPatient = (patient: Patient, type: string): AppThunk<void> => async (dispatch, getState) => {

  dispatch({
    type: type,
    patientId: patient.id
  })

  switch (type) {
    case PatientsActionTypes.TOGGLE_MONITOR_CHOLESTEROL: 
      if (patient.cholesterol.monitored) {
        dispatch(fetchPatientCholesterol(patient.id));
      } else {
        dispatch({
          type: PatientsActionTypes.FETCH_CHOLESTEROL_DONE,
          patientId: patient.id,
          payload: undefined
        });
      }
      break;
    
    case PatientsActionTypes.TOGGLE_MONITOR_BLOOD_PRESSURE: 
      if (patient.bloodPressure.monitored) {
        dispatch(fetchPatientBloodPressure(patient.id));
      } else {
        dispatch({
          type: PatientsActionTypes.FETCH_BLOOD_PRESSURE_DONE,
          patientId: patient.id,
          payload: undefined
        });
        // Also disable history together with blood pressure
        if (patient.historyMonitored) {
          dispatch({
            type: PatientsActionTypes.TOGGLE_MONITOR_BLOOD_PRESSURE_HISTORY,
            patientId: patient.id
          })
        }
      }
      break;
    
    case PatientsActionTypes.TOGGLE_MONITOR_BLOOD_PRESSURE_HISTORY:
      if (patient.historyMonitored) {
        dispatch(fetchPatientBloodPressure(patient.id));
      }
      break;
  }

}