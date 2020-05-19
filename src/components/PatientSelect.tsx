import React, { useState, useMemo } from "react"
import { MenuItem, Label, InputGroup, Dialog, Icon } from "@blueprintjs/core";
import { Select, ItemRenderer, MultiSelect } from "@blueprintjs/select";
import { useSelector } from 'react-redux';
import { ApplicationState } from '../store/index';
import Patient from '../DataModel/Patient';
import PatientsTable from "./PatientsTable";
import { useDispatch } from 'react-redux';
import { PatientsActionTypes } from "../store/patients/types";
import { fetchPatientCholesterol } from "../store/patients/actions";

export default function PatientSelect({ isOpen, toggleOpen } : { isOpen: boolean, toggleOpen: () => void }) {

  // const [query, setQuery] = useState("")

  const dispatch = useDispatch();

  const handleClickPatient = (patient: Patient) => {
    dispatch({
      type: PatientsActionTypes.TOGGLE_MONITOR_PATIENT,
      patientId: patient.id
    });

    dispatch(fetchPatientCholesterol(patient.id));

  }

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
        Header: 'Monitoring',
        accessor: 'isMonitored',
        Cell: ({ value }: { value: boolean }) => { return <Icon icon={value ? "tick" : "blank"}/> } 
      },
    
    ],
    []
  );

  const data: Patient[] = useSelector((state: ApplicationState) => state.patients.data);

  const tableMarkup = <PatientsTable columns={columns} data={data} onClickRow={handleClickPatient}/>;

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

  return (
    <Dialog
      title="Monitor new patient"
      isOpen={isOpen}
      canOutsideClickClose={true}
      canEscapeKeyClose={true}
      onClose={toggleOpen}
    >
      {tableMarkup}
    </Dialog>
  )
}
