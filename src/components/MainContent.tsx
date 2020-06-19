import React, { useState } from 'react'
import { Navbar, Alignment, Button, Spinner, AnchorButton, NumericInput, Position, Tag, ControlGroup } from '@blueprintjs/core'
import PatientSelect from './PatientSelect'
import { useSelector } from "react-redux"

import { ApplicationState } from '../store/index';
import { Progress } from '../store/patients/types';
import PatientsMonitor from './PatientsMonitor';
import CholesterolBarChart from './CholesterolBarChart';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from 'react-router-dom';
import BloodPressureHistoryMonitor from './BloodPressureHistoryMonitor';

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
      <Router>
        <Navbar className="toolbar">
          <Navbar.Group>
            <Link to="/">
              <Button className="bp3-minimal" icon="home" text="Monitor" />
            </Link>
            <Link to="/cholesterol">
              <Button className="bp3-minimal" icon="pulse" text="Cholesterol" />
            </Link>
            <Link to="/blood-pressure">
              <Button className="bp3-minimal" icon="pulse" text="Blood Pressure" />
            </Link>
          </Navbar.Group>
          
          {/* Refresh timer */}
          <Navbar.Group align={Alignment.RIGHT}> 
            {loadingMarkup}
            <AnchorButton text="Patient" icon="plus" onClick={toggleSelectDialog}/>
          </Navbar.Group>
        </Navbar>

        <PatientSelect isOpen={selectDialogOpen} toggleOpen={toggleSelectDialog} />

        <Switch>
          
          <Route exact path="/">
            <PatientsMonitor />
          </Route>

          <Route path="/cholesterol">
            <CholesterolBarChart />
          </Route>

          <Route path="/blood-pressure">
            <BloodPressureHistoryMonitor />
          </Route>

          {/* Redirect all 404's to home */}
          <Redirect to='/' />

        </Switch>

        
      
      </Router>
    </div>
  );
}