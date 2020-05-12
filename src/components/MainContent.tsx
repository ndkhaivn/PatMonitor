import React from "react"
import FHIRServer from "../DataModel/FHIRServer";


export default function MainContent() {
  return (
    <div className="main-content">

<div className="tbl-header">
          <table cellPadding="0" cellSpacing="0">
            <thead>
              <tr>
                <th>Patient Name</th>
                <th>Total Cholesterol</th>
                <th>Time</th>
              </tr>
            </thead>
          </table>
        </div>
        <div className="tbl-content">
          <table cellPadding="0" cellSpacing="0">
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


    </div>


  )
}

console.log("test");
let obj = new FHIRServer('https://fhir.monash.edu/hapi-fhir-jpaserver/fhir/', "http://hl7.org/fhir/sid/us-npi")

let patientList = obj.getPatientList("500").then(result => {
  console.log("Patient List: ", result);

  
});

let patientInfo = obj.getPatientInfo("29163").then(result =>
  console.log("Patient Info: ", result)
  );


let cholesterolMeasurement = obj.getCholesterol("29163").then(result =>
  console.log("Cholesterol Measurement: ", result)
  );

