import React, { useEffect } from 'react'
import { Navbar, Alignment, Button } from '@blueprintjs/core'
import PatientSelect from './PatientSelect'
import { useTable } from "react-table";
import PatientsTable from './PatientsTable';
import { useDispatch } from "react-redux"

import { fetchPatients } from '../store/patients/actions';
import { Identifier } from '../DataModel/Resource';
import FHIRServer from '../DataModel/FHIRServer';


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

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPatients(new Identifier("http://hl7.org/fhir/sid/us-npi", "500")));
  }, []);

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