import React, { useState, useMemo } from "react"
import { MenuItem, Label, InputGroup, Dialog, Icon, Spinner } from "@blueprintjs/core";
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

  const columns = React.useMemo(
    () => [
      {
        Header: 'Name',
        accessor: (patient: Patient)  => { return patient.name[0].toString() },
      },
      {
        Header: 'Total Cholesterol',
        accessor: (patient: Patient)  => { return patient.totalCholesterol },
        Cell: ({ value }: { value: Observation | null | undefined }) => value ? value.value.toString() : value === null ? "N/A" : <Spinner size={Spinner.SIZE_SMALL} /> 
      },
      {
        Header: 'Time',
        accessor: (patient: Patient)  => { return patient.totalCholesterol?.effectiveDateTime },
      },
    ],
    []
  );

  let data: Patient[] = useSelector((state: ApplicationState) => state.patients.data);
  data = data.filter(patient => patient.isMonitored === true);

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

      <PatientsTable data={data} columns={columns} onClickRow={(patient: Patient) => { toggleDetailDialog(); setDisplayedPatient(patient)}} noDataMessage={noDataMessage}/>
    </div>
    
  )
}
