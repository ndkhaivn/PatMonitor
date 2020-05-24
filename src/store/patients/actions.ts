import { ThunkAction } from 'redux-thunk';
import { AnyAction } from "redux";
import Practitioner from '../../DataModel/Practitioner';
import { dataSource } from '../../DataModel/DataSource';
import FHIRServer from '../../DataModel/FHIRServer';
import { PatientsActionTypes, Progress } from './types';
import Patient from '../../DataModel/Patient';
import { AppThunk } from '..';
import { Identifier, Observation } from '../../DataModel/Resource';

export const fetchPatients = (practitionerIdentifier: Identifier): AppThunk<void> => async (dispatch) => {

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

  dispatch({
    type: PatientsActionTypes.FETCH_REQUEST
  });

  await dataSource.getPatientList(practitionerIdentifier, progressUpdate);

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