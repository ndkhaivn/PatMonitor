import { ThunkAction } from 'redux-thunk';
import { AnyAction } from "redux";
import Practitioner from '../../DataModel/Practitioner';
import DataSource from '../../DataModel/DataSource';
import FHIRServer from '../../DataModel/FHIRServer';
import { PatientsActionTypes } from './types';
import Patient from '../../DataModel/Patient';
import { AppThunk } from '..';
import { Identifier } from '../../DataModel/Resource';

const dataSource: DataSource = new FHIRServer();

export const fetchPatients = (practitionerIdentifier: Identifier): AppThunk<void> => async (dispatch) => {

  const progressUpdate = (data: Patient[], progress: { loaded: number, total: number }) => {
    console.log(progress);
    dispatch({
      type: PatientsActionTypes.FETCH_PROGRESS,
      loading: progress,
      payload: data
    });
  }

  dispatch({
    type: PatientsActionTypes.FETCH_REQUEST
  });

  await dataSource.getPatientList(practitionerIdentifier, progressUpdate);

}