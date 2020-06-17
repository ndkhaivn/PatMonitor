import React from "react"
import { Dialog, Icon, Spinner, Checkbox } from "@blueprintjs/core";
import { useSelector } from 'react-redux';
import { ApplicationState } from '../store/index';
import Patient from '../DataModel/Patient';
import PatientsTable from "./PatientsTable";
import { useDispatch } from 'react-redux';
import { PatientsActionTypes } from "../store/patients/types";
import { fetchPatientCholesterol, fetchPatientBloodPressure, toggleMonitorPatient } from "../store/patients/actions";

/**
 * Modal for toggling monitoring patients
 * @param {{ isOpen: boolean, toggleOpen: () => void }} { isOpen, toggleOpen }
 */
export default function PatientSelect({ isOpen, toggleOpen } : { isOpen: boolean, toggleOpen: () => void }) {

  const dispatch = useDispatch();

  // on click on patient: toggle monitoring that patient
  const clickMonitorPatient = (patient: Patient, type: string) => {
    dispatch(toggleMonitorPatient(patient, type));
  }

  // Table structure
  const columns = React.useMemo(
    () => [
      {
        Header: 'ID',
        accessor: (patient: Patient)  => { return patient.id },
      },
      {
        Header: 'Title',
        accessor: (patient: Patient)  => { return patient.name[0].prefix?.[0] },
      },
      {
        Header: 'First name',
        accessor: (patient: Patient)  => { return patient.name[0].given?.join(" ") },
      },
      {
        Header: 'Last name',
        accessor: (patient: Patient)  => { return patient.name[0].family },
      },
      {
        Header: 'Monitoring Cholesterol',
        accessor: (patient: Patient) => patient,
        Cell: ({ value }: { value: Patient }) => { 
          return <Checkbox 
            large={true}
            checked={value.isMonitoredCholesterol} 
            onChange={() => clickMonitorPatient(value, PatientsActionTypes.TOGGLE_MONITOR_CHOLESTEROL) } 
          />
        } 
      },
      {
        Header: 'Monitoring Blood Pressure',
        accessor: (patient: Patient) => patient,
        Cell: ({ value }: { value: Patient }) => { 
          return <Checkbox 
            large={true}
            checked={value.isMonitoredBloodPressure} 
            onChange={() => clickMonitorPatient(value, PatientsActionTypes.TOGGLE_MONITOR_BLOOD_PRESSURE) } 
          />
        } 
      }
    ],
    []
  );

  // Connect to store
  const loading = useSelector((state: ApplicationState) => state.patients.loading);
  const patients: Patient[] = useSelector((state: ApplicationState) => state.patients.data);

  const noDataMessage = "No patients found!";
  // Modal title icon will be a spinner if the patients are still being fetched
  const iconMarkup = loading ? <div className="spinner"><Spinner size={Spinner.SIZE_SMALL} /> </div> : "pulse"

  return (
    <Dialog
      icon={iconMarkup}
      title={" Monitor new patient"}
      isOpen={isOpen}
      canOutsideClickClose={true}
      canEscapeKeyClose={true}
      onClose={toggleOpen}
    >
      <PatientsTable columns={columns} data={patients} onClickRow={() => {}} noDataMessage={noDataMessage}/>
    </Dialog>
  )
}
