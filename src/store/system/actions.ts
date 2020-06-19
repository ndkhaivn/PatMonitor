import { AppThunk } from '..';
import { SystemActionTypes } from './types';
import { fetchPatientCholesterol, fetchPatientBloodPressure } from '../patients/actions';

/**
 * Start a timer for refreshing cholesterol dadta (stop the old timer if exist)
 * @param {number} durationInSecond
 * @returns {AppThunk<void>}
 */
export const setCholesterolTimer = (durationInSecond: number): AppThunk<void> => (dispatch, getState) => {

  // Timer handler (called when timeout)
  const updateClinicalData = () => {
    const patients = getState().patients.data;
    
    const cholesterolPatients = patients.filter(patient => patient.cholesterol.monitored);
    cholesterolPatients.forEach(patient => { dispatch(fetchPatientCholesterol(patient.id)) });

    const bloodPressurePatients = patients.filter(patient => patient.bloodPressure.monitored);
    bloodPressurePatients.forEach(patient => { dispatch(fetchPatientBloodPressure(patient.id)) });
  }

  // Setup new timer
  const timer = setInterval(updateClinicalData, durationInSecond * 1000);

  // Store the new timer
  dispatch({
    type: SystemActionTypes.SET_TIMER,
    payload: timer
  });
}

export const setBloodPressureThreshold = (systolic: number, diastolic: number): AppThunk<void> => (dispatch) => {

  dispatch({
    type: SystemActionTypes.SET_BLOOD_PRESSURE_THRESHOLD_X,
    payload: systolic
  });

  dispatch({
    type: SystemActionTypes.SET_BLOOD_PRESSURE_THRESHOLD_Y,
    payload: diastolic
  });

}