import React from 'react';
import { Dialog, Classes, Button, Intent, Switch } from '@blueprintjs/core';
import Patient from '../DataModel/Patient';
import { useDispatch, useSelector } from 'react-redux';
import { PatientsActionTypes } from '../store/patients/types';
import { toggleMonitorPatient } from '../store/patients/actions';
import { ApplicationState } from '../store/index';

/**
 * PatientInfoDialog component, for displaying patient's info and a button to stop monitoring that patient
 *
 * @export
 * @param {{ isOpen: boolean, toggleOpen: () => void, patient: Patient }} { isOpen, toggleOpen, patient }
 * @returns
 */
export default function PatientInfoDialog({ isOpen, toggleOpen, patient }: { isOpen: boolean, toggleOpen: () => void, patient: Patient }) {

  const address = patient.address ? patient.address[0] : undefined;
  const dispatch = useDispatch();
  const systolicThreshold = useSelector((state: ApplicationState) => state.system.systolicThreshold);

  const systolicAboveThreshold = systolicThreshold !== undefined
    && (patient.bloodPressure.data)
    && (patient.bloodPressure.data[0].systolic.value.value > systolicThreshold);

  // Tell the store to stop monitoring this patient (cholesterol or blood pressure)
  const toggleSwitch = (type: string) => {
    dispatch(toggleMonitorPatient(patient, type));
  };

  return (
    <Dialog
      icon="pulse"
      onClose={toggleOpen}
      title="Patient Info"
      isOpen={isOpen}
      canOutsideClickClose={true}
      canEscapeKeyClose={true}
    >

      {/* Table content */}
      <div className={Classes.DIALOG_BODY}>
        <table id="patient-info">
          <tbody>
            <tr> 
              <td> ID </td>
              <td> {patient.id} </td>
            </tr> 
            <tr>
              <td> Full name </td>
              <td> {patient.name[0]?.toString()} </td>
            </tr>
            <tr>
              <td> Gender </td>
              <td> {patient.gender} </td>
            </tr>
            <tr>
              <td> Date of Birth </td>
              <td> {patient.birthDate} </td>
            </tr>
            <tr>
              <td> Address </td>
              <td> {address?.line.join(" ")}, <br/> {address?.city} {address?.postalCode}, <br/> {address?.state}, {address?.country} </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className={Classes.DIALOG_FOOTER}>
          <Switch 
            checked={patient.cholesterol.monitored} 
            label="Monitor Cholesterol" 
            onChange={() => toggleSwitch(PatientsActionTypes.TOGGLE_MONITOR_CHOLESTEROL)} 
          />
          <Switch 
            checked={patient.bloodPressure.monitored} 
            label="Monitor Blood Pressure" 
            onChange={() => toggleSwitch(PatientsActionTypes.TOGGLE_MONITOR_BLOOD_PRESSURE)} 
          />
          <Switch 
            checked={patient.historyMonitored} 
            label="Monitor Blood Pressure History" 
            onChange={() => toggleSwitch(PatientsActionTypes.TOGGLE_MONITOR_BLOOD_PRESSURE_HISTORY)} 
            disabled={ !Boolean(systolicAboveThreshold) }
          />
      </div>

    </Dialog>
  );
}
