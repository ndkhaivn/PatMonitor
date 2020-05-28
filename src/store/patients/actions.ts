import { ThunkAction } from 'redux-thunk';
import { AnyAction } from "redux";
import { dataSource } from '../../DataModel/DataSource';
import FHIRServer from '../../DataModel/FHIRServer';
import { PatientsActionTypes, Progress } from './types';
import Patient from '../../DataModel/Patient';
import { AppThunk } from '..';
import { Identifier, Observation } from '../../DataModel/Resource';

export const fetchPatients = (practitionerIDs: string[]): AppThunk<void> => async (dispatch) => {

  const progressUpdate = (data: Patient[], progress: Progress) => {
    console.log(progress);
    dispatch({
      type: PatientsActionTypes.FETCH_PROGRESS,
      loading: progress,
      payload: data
    });
  }

  dispatch({
    type: PatientsActionTypes.CLEAR_PATIENTS
  });

  if (practitionerIDs.length === 0) {
    return []
  }

  dispatch({
    type: PatientsActionTypes.FETCH_REQUEST
  });

  await dataSource.getPatientList(practitionerIDs, progressUpdate);

  dispatch({
    type: PatientsActionTypes.FETCH_DONE
  });

}

export const fetchPatientCholesterol = (patientId: string): AppThunk<void> => async (dispatch) => {
  dispatch({
    type: PatientsActionTypes.FETCH_CHOLESTEROL_REQUEST,
    patientId
  });

  const cholesterolData: Observation | null = await dataSource.getCholesterol(patientId);

  dispatch({
    type: PatientsActionTypes.FETCH_CHOLESTEROL_DONE,
    patientId,
    payload: cholesterolData
  });
}