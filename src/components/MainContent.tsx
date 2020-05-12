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
