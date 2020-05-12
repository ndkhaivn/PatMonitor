import React from 'react';
import { Dialog, Classes } from '@blueprintjs/core';


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
              <td> Unit 1, 1 Chester Avenue, Clayton VIC 3168, Australia </td>
            </tr>

          </tbody>
          {/* <b> Full name </b>
          <span> John Doe </span> */}
        </table>

      </div>

    </Dialog>
  );
}
