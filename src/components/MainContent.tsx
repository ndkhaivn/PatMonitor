import React from "react"
import FHIRServer from "../DataModel/FHIRServer";
import Patient from "../DataModel/Patient";
import DataSource from "../DataModel/DataSource";
import Practitioner from "../DataModel/Practitioner";


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

function test() {
  console.log("BEGIN TEST");
  let dataSource = new FHIRServer('https://fhir.monash.edu/hapi-fhir-jpaserver/fhir/', "http://hl7.org/fhir/sid/us-npi");
  let practitioner = new Practitioner("500", dataSource);

  let patientList = dataSource.getPatientList("500").then(result => {
    console.log("Patient List: ", result);
  
  });

  
  let patientInfo = dataSource.getPatientInfo("29163").then(result =>
    console.log("Patient Info: ", result)
    );


  let cholesterolMeasurement = dataSource.getCholesterol("29163").then(result =>
    console.log("Cholesterol Measurement: ", result)
    );
}


function dummyPatients(patientIDs: string[], dataSource: DataSource) {
  let patientsArray:Patient[] = [];
  for (let i = 0; i<patientIDs.length; i++) {
    let newPatient = new Patient(patientIDs[i], "Patient" + i, dataSource);
    newPatient.getCholesterol();
    newPatient.getPersonalInfo();
    patientsArray.push(newPatient);
    
  }


  return patientsArray;
}

let patientIds = ["141425", "120561", "354393", "2378875", "844863"];
let dataSource = new FHIRServer('https://fhir.monash.edu/hapi-fhir-jpaserver/fhir/', "http://hl7.org/fhir/sid/us-npi");

//console.log(dummyPatients(patientIds, dataSource))

fullTest()

function fullTest() {
  console.log("BEGIN TEST");
  let dataSource = new FHIRServer('https://fhir.monash.edu/hapi-fhir-jpaserver/fhir/', "http://hl7.org/fhir/sid/us-npi");
  let practitioner = new Practitioner("500", dataSource);

  let patientList = dataSource.getPatientList("500").then(result => {   
    console.log("Patient List: ", result);
    result.forEach(function(element: Patient) {
      element.getPersonalInfo();
      element.getCholesterol();
      
    });
  });

  
  
}