import React from 'react';
import { Dialog, Classes, Button, Intent } from '@blueprintjs/core';


export default function PatientInfoDialog({ isOpen, toggleOpen }: { isOpen: boolean, toggleOpen: () => void }) {
  return (
    <Dialog
      icon="pulse"
      onClose={toggleOpen}
      // onOpening={toggleOpen}
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
              <td> 2362364 </td>
            </tr> 
            <tr>
              <td> Full name </td>
              <td> John Doe </td>
            </tr>
            <tr>
              <td> Gender </td>
              <td> Male </td>
            </tr>
            <tr>
              <td> Date of Birth </td>
              <td> 15/08/1989 </td>
            </tr>
            <tr>
              <td> Address </td>
              <td> Unit 1, 1 Chester Avenue <br/> Clayton 3168 <br/> Victoria, Australia </td>
            </tr>

          </tbody>
          {/* <b> Full name </b>
          <span> John Doe </span> */}
        </table>

      </div>

      <div className={Classes.DIALOG_FOOTER}>
          <div className={Classes.DIALOG_FOOTER_ACTIONS}>
            <Button intent={Intent.DANGER} onClick={() => {}}>Stop Monitoring</Button>
          </div>
      </div>

    </Dialog>
  );
}
