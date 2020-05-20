import { AppThunk } from '..';
import { SystemActionTypes } from './types';
import { fetchPatientCholesterol } from '../patients/actions';

export const setCholesterolTimer = (durationInSecond: number): AppThunk<void> => (dispatch, getState) => {

  const updateCholesterol = () => {
    const patients = getState().patients.data;
    const monitoredPatients = patients.filter(patient => patient.isMonitored === true);
    monitoredPatients.forEach(patient => {
      dispatch(fetchPatientCholesterol(patient.id));
    });
  }

  const timer = setInterval(updateCholesterol, durationInSecond * 1000);

  dispatch({
    type: SystemActionTypes.SET_TIMER,
    payload: timer
  });

}