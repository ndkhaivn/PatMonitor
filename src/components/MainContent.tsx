import React, { useState } from 'react'
import { Navbar, Alignment, Button, Spinner, AnchorButton, NumericInput, Position, Tag, ControlGroup } from '@blueprintjs/core'
import PatientSelect from './PatientSelect'
import { useDispatch, useSelector } from "react-redux"

import { ApplicationState } from '../store/index';
import { Progress } from '../store/patients/types';
import PatientsMonitor from './PatientsMonitor';
import { setCholesterolTimer } from '../store/system/actions';
import CholesterolBarChart from './CholesterolBarChart';

/**
 *
 * MainContent component: Display components
 * + PatientSelect
 * + PatientsMonitor
 * + button for opening PatientSelect
 * + Timer input field
 */
export default function MainContent() {
  
  const [selectDialogOpen, setSelectDialogOpen] = useState(false);    // initially hide PatientSelect
  const [reloadTimeout, setReloadTimeout] = useState(5);              // default timeout = 5s

  const dispatch = useDispatch();
  
  const toggleSelectDialog = () => { setSelectDialogOpen(!selectDialogOpen) };

  // Connect to store
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
          
        {/* Refresh timer */}
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
      <CholesterolBarChart />

    </div>
  );
}