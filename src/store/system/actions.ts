import { AppThunk } from '..';
import { SystemActionTypes } from './types';
import { fetchPatientCholesterol } from '../patients/actions';

/**
 * Start a timer for refreshing cholesterol dadta (stop the old timer if exist)
 * @param {number} durationInSecond
 * @returns {AppThunk<void>}
 */
export const setCholesterolTimer = (durationInSecond: number): AppThunk<void> => (dispatch, getState) => {

  // Timer handler (called when timeout)
  const updateCholesterol = () => {
    const patients = getState().patients.data;
    const monitoredPatients = patients.filter(patient => patient.isMonitored === true);
    monitoredPatients.forEach(patient => {
      dispatch(fetchPatientCholesterol(patient.id));
    });
  }

  // Setup new timer
  const timer = setInterval(updateCholesterol, durationInSecond * 1000);

  // Store the new timer
  dispatch({
    type: SystemActionTypes.SET_TIMER,
    payload: timer
  });

}