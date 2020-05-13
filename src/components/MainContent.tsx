import React from 'react'
import { Navbar, Alignment, Button } from '@blueprintjs/core'
import PatientSelect from './PatientSelect'
import { useTable } from "react-table";
import PatientsTable from './PatientsTable';


export default function MainContent() {

  const columns = React.useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'name',
      },
      {
        Header: 'Total Cholesterol',
        accessor: 'totalCholesterol',
        Cell: (props:any) => <div> {props.value} mg/dL </div>
      },
      {
        Header: 'Time',
        accessor: 'time',
      },
    ],
    []
  );

  var data: any[] = [
    {
      name: 'Zhang Wei',
      totalCholesterol: '33',
      time: new Date().toISOString(),
    },
    {
      name: 'Abuja Aadesh',
      totalCholesterol: '20',
      time: new Date().toISOString(),
    },
    {
      name: 'Hilal akay',
      totalCholesterol: '10',
      time: new Date().toISOString(),
    },
  ];

  return (
    <div className="main-content">
      <Navbar className="toolbar">
        <Navbar.Group>
          <PatientSelect />
        </Navbar.Group>
      </Navbar>

      <PatientsTable columns={columns} data={data}/>

    </div>
  );
}

let patientIds = ["141425", "120561", "354393", "2378875", "844863"];
let dataSource = new FHIRServer('https://fhir.monash.edu/hapi-fhir-jpaserver/fhir/', "http://hl7.org/fhir/sid/us-npi");

console.log(offlinePatients(patientIds, dataSource));



function test() {
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

function offlinePatients(patientIDs: string[], dataSource: DataSource) {
  let patientsArray:Patient[] = [];
  for (let i = 0; i<patientIDs.length; i++) {
    let newPatient = new Patient(patientIDs[i], "Patient" + i, dataSource);
    newPatient.totalChol = new Cholesterol("time", 100, "mg/dL");
    newPatient.patientInfo = new PatientInfo("birthDate", "gender", {
      line: ["line"], 
      city: "city",
      state: "state",
      country: "country"    
    });
    patientsArray.push(newPatient);

  
    
  }


  return patientsArray;
}

function fullTest() {
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