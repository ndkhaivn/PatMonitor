import React from 'react';

export default function PatientsTable() {
  var columns: string[] = [];
  var data: string[] = [];

  return (
    <div className="tbl-header">
      <table cellPadding="0" cellSpacing="0">
        <thead>
          <tr>
            <th>Patient Name</th>
            <th>Total Cholesterol</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>ZHANG WEI</td>
            <td>20 mg/dL </td>
            <td>2005-09-27 48:33+10:00</td>
          </tr>
          <tr>
            <td>ANIKA AADESH</td>
            <td>33 mg/dL </td>
            <td>2005-09-27 48:33+10:00</td>
          </tr>
          <tr>
            <td>HILAL AKAY</td>
            <td>12 mg/dL </td>
            <td>2005-09-27 48:33+10:00</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
