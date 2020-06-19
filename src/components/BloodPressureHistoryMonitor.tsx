import React from 'react'
import BloodPressureHistoryCard from './BloodPressureHistoryCard';
import { useSelector } from 'react-redux';
import Patient from '../DataModel/Patient';
import { ApplicationState } from '../store/index';
import { H3 } from '@blueprintjs/core';

/**
*
* BloodPressureHistoryMonitor component
* Monitor all patients that are being monitored by the blood pressure history
*/
export default function BloodPressureHistoryMonitor() {

  // Connect to the store to get the patient list
  let patients: Patient[] = useSelector((state: ApplicationState) => state.patients.data);
  // Only display monitored patients
  patients = patients.filter(patient => patient.bloodPressure.monitored && patient.historyMonitored );

  return (
    <div id="blood-pressure-history">
      <H3 className="text-center"> HIGH BLOOD PRESSURE MONITOR </H3>
      { patients.map(patient => <BloodPressureHistoryCard patient={patient} />) }
    </div>
  )
}
