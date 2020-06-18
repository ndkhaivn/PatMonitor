import React, { useState } from "react"
import { Icon, Spinner, Intent } from "@blueprintjs/core";
import { useSelector } from 'react-redux';
import { ApplicationState } from '../store/index';
import Patient from '../DataModel/Patient';
import PatientsTable from "./PatientsTable";
import PatientInfoDialog from "./PatientInfoDialog";
import ClinicalData from '../DataModel/ClinicalData';
import { Observation, BloodPressure } from '../DataModel/Resource';

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

  // Function for checking whether a cholesterol value is above-average level
  const isAboveAverageCholesterol = (value: number | undefined): boolean => {
    if (!averageCholesterol || !(value)) { // if average or cholesterol value not found
      return false;
    } else {
      return value > averageCholesterol;
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
        accessor: 'cholesterol.data.value.value',
        Cell: (cellInfo: any) => {
          const cholesterol: ClinicalData<Observation> = cellInfo.row.original.cholesterol;
          return ( 
          <div>
            {cholesterol.loading ? 
              <Spinner size={Spinner.SIZE_SMALL} /> : 
              cholesterol.data === null ? "N/A" : 
                [(isAboveAverageCholesterol(cholesterol.data?.value.value) && warningMarkup), cholesterol.data?.value.toString()]}
          </div>
          )
        }
      },
      {
        Header: 'Time',
        accessor: (patient: Patient)  => { return patient.cholesterol.data?.effectiveDateTime },
      },
      {
        Header: 'Systolic Blood Pressure',
        accessor: (patient: Patient)  => { return patient.bloodPressure.data?.[0].systolic.value.value },
        Cell: (cellInfo: any) => {
          const bloodPressure: ClinicalData<BloodPressure[]> = cellInfo.row.original.bloodPressure;
          return (
            bloodPressure.loading ? 
              <Spinner size={Spinner.SIZE_SMALL} /> : 
              bloodPressure.data === null ? "N/A" : bloodPressure.data === undefined ? null : bloodPressure.data![0].systolic.value.toString()
          )
        }
      }, 
      {
        Header: 'Diastolic Blood Pressure',
        accessor: (patient: Patient)  => { return patient.bloodPressure.data?.[0].diastolic.value.value },
        Cell: (cellInfo: any) => {
          const bloodPressure: ClinicalData<BloodPressure[]> = cellInfo.row.original.bloodPressure;
          return (
            bloodPressure.loading ? 
              <Spinner size={Spinner.SIZE_SMALL} /> : 
              bloodPressure.data === null ? "N/A" : bloodPressure.data === undefined ? null : bloodPressure.data![0].diastolic.value.toString()
          )
        }
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
