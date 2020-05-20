import React, { useEffect, useState } from 'react'
import { Navbar, Alignment, Button, Spinner, AnchorButton, NumericInput, Position, Tag, ControlGroup } from '@blueprintjs/core'
import PatientSelect from './PatientSelect'
import PatientsTable from './PatientsTable';
import { useDispatch, useSelector } from "react-redux"

import { fetchPatients, fetchPatientCholesterol } from '../store/patients/actions';
import { Identifier, Observation } from '../DataModel/Resource';
import Patient from '../DataModel/Patient';
import { ApplicationState } from '../store/index';
import { Progress } from '../store/patients/types';
import PatientInfoDialog from './PatientInfoDialog';
import PatientsMonitor from './PatientsMonitor';
import { setCholesterolTimer } from '../store/system/actions';



export default function MainContent() {

  // const data: Patient[] = useSelector((state: ApplicationState) => state.patients.data);
  
  const [selectDialogOpen, setSelectDialogOpen] = useState(false);
  const [reloadTimeout, setReloadTimeout] = useState(5);

  const dispatch = useDispatch();
  
  const toggleSelectDialog = () => { setSelectDialogOpen(!selectDialogOpen) };
  const loading: Progress | boolean = useSelector((state: ApplicationState) => state.patients.loading);

  const loadingMarkup = 
    loading === false ? null : 
    [
      <div className="progress"> <Spinner size={Spinner.SIZE_SMALL} /> </div>,
      <div className="progress"> Loading... ({(loading as Progress).loaded ?? 0}{(loading as Progress).total ? "/" + (loading as Progress).total : ""})</div>
    ]

  return (
    <div className="main-content">
      <Navbar className="toolbar">
        <Navbar.Group>

        <AnchorButton text="Patient" icon="plus" onClick={toggleSelectDialog}/>
        {loadingMarkup}
          
        </Navbar.Group>
          
        <Navbar.Group align={Alignment.RIGHT}> 
          <ControlGroup>
            <NumericInput 
              buttonPosition={Position.LEFT} 
              rightElement={<Tag minimal={true}>s</Tag>}
              onValueChange={(value) => setReloadTimeout(value)}
              value={reloadTimeout}
            />
            <Button icon="stopwatch" onClick={ () => dispatch(setCholesterolTimer(reloadTimeout)) }/>
          </ControlGroup>

        </Navbar.Group>
      </Navbar>

      <PatientSelect isOpen={selectDialogOpen} toggleOpen={toggleSelectDialog} />

      <PatientsMonitor />
      {/* <i id="last-updated" className="bp3-text-muted">
        Last updated: 13/05/2020 19:30{' '}
      </i> */}

    </div>
  );
}