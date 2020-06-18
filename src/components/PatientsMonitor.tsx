import React, { useState } from "react"
import { Icon, Spinner, Intent } from "@blueprintjs/core";
import { useSelector } from 'react-redux';
import { ApplicationState } from '../store/index';
import Patient from '../DataModel/Patient';
import PatientsTable from "./PatientsTable";
import PatientInfoDialog from "./PatientInfoDialog";

// Initialize an empty patient for displaying in PatientInfoDialog
const emptyPatient = new Patient("", [], "", "", []);

/**
 * PatientMonitor component for displaying monitored patients and detailed view
 */
export default function PatientsMonitor() {

  // Connect to the store to get the patient list
  let patients: Patient[] = useSelector((state: ApplicationState) => state.patients.data);
  // Only display monitored patients
  patients = patients.filter(patient => patient.cholesterol.monitored || patient.bloodPressure.monitored);

  const [detailDialogOpen, setDetailDialogOpen] = useState(false);
  const [displayedPatient, setDisplayedPatient] = useState(emptyPatient);

  const toggleDetailDialog = () => { setDetailDialogOpen(!detailDialogOpen) };

  // Finding the average cholesterol level
  let sumCholesterol = 0;
  let effectivePatientsCount = 0;
  patients.forEach(patient => {
    if (patient.cholesterol.data?.value) { // ignore patients without cholesterol value
      sumCholesterol += patient.cholesterol.data?.value.value;
      effectivePatientsCount++;
    }
  });
  const averageCholesterol = effectivePatientsCount ? sumCholesterol/effectivePatientsCount : null;

  // Function for checking whether a patient has above-average cholesterol level
  const isAboveAverageCholesterol = (patient: Patient): boolean => {
    if (!averageCholesterol || !(patient.cholesterol.data?.value.value)) { // if average or cholesterol value not found
      return false;
    } else {
      return patient.cholesterol.data?.value.value > averageCholesterol;
    }
  }

  const warningMarkup = <Icon icon="warning-sign" intent={Intent.WARNING}/>

  // Columns that will be passed into PatientsTable
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
          value.cholesterol.loading ? 
            <Spinner size={Spinner.SIZE_SMALL} /> : 
            value.cholesterol.data === null ? "N/A" : [(isAboveAverageCholesterol(value) && warningMarkup), value.cholesterol.data?.value.toString()]
      },
      {
        Header: 'Time',
        accessor: (patient: Patient)  => { return patient.cholesterol.data?.effectiveDateTime },
      },
      {
        Header: 'Systolic Blood Pressure',
        accessor: (patient: Patient)  => patient,
        Cell: ({ value }: { value: Patient }) => 
          value.bloodPressure.loading ? 
            <Spinner size={Spinner.SIZE_SMALL} /> : 
            value.bloodPressure === null ? "N/A" : value.bloodPressure.data === undefined ? null : value.bloodPressure.data![0].systolic.value.toString()
      }, 
      {
        Header: 'Diastolic Blood Pressure',
        accessor: (patient: Patient)  => patient,
        Cell: ({ value }: { value: Patient }) => 
          value.bloodPressure.loading ? 
            <Spinner size={Spinner.SIZE_SMALL} /> : 
            value.bloodPressure === null ? "N/A" : value.bloodPressure.data === undefined ? null : value.bloodPressure.data![0].diastolic.value.toString()
      },
      {
        Header: 'Time1',
        accessor: (patient: Patient)  => { return patient.bloodPressure.data?.[0].systolic.effectiveDateTime },
      }
    ],
    [averageCholesterol]
  );

  const noDataMessage = "You are not monitoring any patients, add new patients to monitor";

  return (
    <div>
      <PatientInfoDialog
        patient={displayedPatient}
        isOpen={detailDialogOpen}
        toggleOpen={toggleDetailDialog}
      />

      <PatientsTable 
        data={patients} 
        columns={columns} 
        noDataMessage={noDataMessage} 
        onClickRow={(patient: Patient) => { toggleDetailDialog(); setDisplayedPatient(patient)}}
      />
    </div>
    
  )
}
