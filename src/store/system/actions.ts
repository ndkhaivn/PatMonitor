import { AppThunk } from '..';
import { SystemActionTypes } from './types';
import { fetchPatientCholesterol, fetchPatientBloodPressure } from '../patients/actions';

/**
 * Start a timer for refreshing cholesterol data (stop the old timer if exist)
 * @param {number} durationInSecond
 * @returns {AppThunk<void>}
 */
export const setUpdateTimer = (durationInSecond: number): AppThunk<void> => (dispatch, getState) => {

  // Timer handler (called when timeout)
  const updateClinicalData = () => {
    const patients = getState().patients.data;
    
    const cholesterolPatients = patients.filter(patient => patient.cholesterol.monitored);
    cholesterolPatients.forEach(patient => { dispatch(fetchPatientCholesterol(patient.id)) });

    const bloodPressurePatients = patients.filter(patient => patient.bloodPressure.monitored);
    bloodPressurePatients.forEach(patient => { dispatch(fetchPatientBloodPressure(patient.id)) });

    dispatch({
      type: SystemActionTypes.SET_TIME_LEFT,
      payload: durationInSecond
    });
  }

  // Setup new timer
  const timer = setInterval(updateClinicalData, durationInSecond * 1000);

  const countdownTimer = setInterval(() => dispatch({ type: SystemActionTypes.COUNTDOWN }), 1000);

  dispatch({
    type: SystemActionTypes.SET_TIME_LEFT,
    payload: durationInSecond
  });
  // Store the new timer
  dispatch({
    type: SystemActionTypes.SET_TIMER,
    payload: timer,
    countdown: countdownTimer
  });
}

export /**
 * 
 * Set the blood pressure threshold, values above these threshold will be highlighted
 * @param {number} systolic
 * @param {number} diastolic
 * @returns {AppThunk<void>}
 */
const setBloodPressureThreshold = (systolic: number, diastolic: number): AppThunk<void> => (dispatch) => {

  dispatch({
    type: SystemActionTypes.SET_BLOOD_PRESSURE_THRESHOLD_X,
    payload: systolic
  });

  dispatch({
    type: SystemActionTypes.SET_BLOOD_PRESSURE_THRESHOLD_Y,
    payload: diastolic
  });

}