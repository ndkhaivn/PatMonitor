import React from 'react';
import { Dialog, Classes, Button, Intent } from '@blueprintjs/core';
import Patient from '../DataModel/Patient';
import { useDispatch } from 'react-redux';
import { PatientsActionTypes } from '../store/patients/types';


export default function PatientInfoDialog({ isOpen, toggleOpen, patient }: { isOpen: boolean, toggleOpen: () => void, patient: Patient }) {

  // TODO: Patient doesn't have address
  const address = patient.address ? patient.address[0] : undefined;
  const dispatch = useDispatch();

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
          <div className={Classes.DIALOG_FOOTER_ACTIONS}>
            <Button intent={Intent.DANGER} onClick={stopMonitoring}>Stop Monitoring</Button>
          </div>
      </div>

    </Dialog>
  );
}
