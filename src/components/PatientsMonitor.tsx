import React, { useState, useMemo } from "react"
import { MenuItem, Label, InputGroup, Dialog, Icon, Spinner, Intent } from "@blueprintjs/core";
import { Select, ItemRenderer, MultiSelect } from "@blueprintjs/select";
import { useSelector } from 'react-redux';
import { ApplicationState } from '../store/index';
import Patient from '../DataModel/Patient';
import PatientsTable from "./PatientsTable";
import { useDispatch } from 'react-redux';
import { PatientsActionTypes } from "../store/patients/types";
import { fetchPatientCholesterol } from "../store/patients/actions";
import { Observation } from '../DataModel/Resource';
import PatientInfoDialog from "./PatientInfoDialog";

const emptyPatient = new Patient({
  id: "",
  name: [],
  gender: "",
  birthDate: "",
  address: [],
});

export default function PatientsMonitor() {

  const dispatch = useDispatch();

  const [detailDialogOpen, setDetailDialogOpen] = useState(false);
  const toggleDetailDialog = () => { setDetailDialogOpen(!detailDialogOpen) };
  const [displayedPatient, setDisplayedPatient] = useState(emptyPatient);

  let patients: Patient[] = useSelector((state: ApplicationState) => state.patients.data);
  patients = patients.filter(patient => patient.isMonitored === true);

  let sumCholesterol = 0;
  let effectivePatientsCount = 0;
  patients.forEach(patient => {
    if (patient.totalCholesterol?.value) {
      sumCholesterol += patient.totalCholesterol.value.value;
      effectivePatientsCount++;
    }
  });
  const averageCholesterol = effectivePatientsCount ? sumCholesterol/effectivePatientsCount : null;

  const isAboveAverageCholesterol = (patient: Patient): boolean => {
    if (!averageCholesterol || !(patient.totalCholesterol?.value.value)) { // if average or cholesterol value not found
      return false;
    } else {
      return patient.totalCholesterol?.value.value > averageCholesterol;
    }
  }

  const warningMarkup = <Icon icon="warning-sign" intent={Intent.WARNING}/>

  const columns = React.useMemo(
    () => [
      {
        Header: 'Name',
        accessor: (patient: Patient)  => { return patient.name[0].toString() },
      },
      {
        Header: 'Total Cholesterol',
        accessor: (patient: Patient)  => { return patient },
        Cell: ({ value }: { value: Patient }) => 
          value.cholesterolLoading ? 
            <Spinner size={Spinner.SIZE_SMALL} /> : 
            value.totalCholesterol === null ? "N/A" : [(isAboveAverageCholesterol(value) && warningMarkup), value.totalCholesterol?.value.toString()]
      },
      {
        Header: 'Time',
        accessor: (patient: Patient)  => { return patient.totalCholesterol?.effectiveDateTime },
      },
    ],
    [averageCholesterol]
  );

  // const filterPatient = (patients: Patient[], query: string) => {
  //   if (!patients) {
  //     return []
  //   }

  //   return patients.filter((patient: Patient) => {
  //     const normalizedName = patient.name[0].toString().toLowerCase();
  //     const normalizedQuery = query.toLowerCase();
  //     return normalizedName.indexOf(normalizedQuery) >= 0;
  //   });
  // }
  console.log("rendering select");

  const noDataMessage = "You are not monitoring any patients, add new patients to monitor";

  return (
    <div>
      <PatientInfoDialog
        patient={displayedPatient}
        isOpen={detailDialogOpen}
        toggleOpen={toggleDetailDialog}
      />

      <PatientsTable data={patients} columns={columns} onClickRow={(patient: Patient) => { toggleDetailDialog(); setDisplayedPatient(patient)}} noDataMessage={noDataMessage}/>
    </div>
    
  )
}
