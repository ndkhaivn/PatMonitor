import React from 'react';
import { Dialog, Classes, Button, Intent } from '@blueprintjs/core';
import Patient from '../DataModel/Patient';
import { useDispatch } from 'react-redux';
import { PatientsActionTypes } from '../store/patients/types';

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

  // Tell the store to stop monitoring this patient
  const stopMonitoring = () => {
    dispatch({
      type: PatientsActionTypes.TOGGLE_MONITOR_PATIENT,
      patientId: patient.id
    });
    toggleOpen();
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

      {/* Stop Monitoring button */}
      <div className={Classes.DIALOG_FOOTER}>
          <div className={Classes.DIALOG_FOOTER_ACTIONS}>
            <Button intent={Intent.DANGER} onClick={stopMonitoring}>Stop Monitoring</Button>
          </div>
      </div>

    </Dialog>
  );
}
