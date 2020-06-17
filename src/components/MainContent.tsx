import React, { useState } from 'react'
import { Navbar, Alignment, Button, Spinner, AnchorButton, NumericInput, Position, Tag, ControlGroup } from '@blueprintjs/core'
import PatientSelect from './PatientSelect'
import { useDispatch, useSelector } from "react-redux"

import { ApplicationState } from '../store/index';
import { Progress } from '../store/patients/types';
import PatientsMonitor from './PatientsMonitor';
import { setCholesterolTimer } from '../store/system/actions';
import CholesterolBarChart from './CholesterolBarChart';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';

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

            <AnchorButton text="Patient" icon="plus" onClick={toggleSelectDialog}/>
            {loadingMarkup}

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

        <Switch>
          
          <Route path="/cholesterol">
            <CholesterolBarChart />
          </Route>

          <Route path="/blood-pressure">
            
          </Route>

          <Route path="/">
            <PatientsMonitor />
          </Route>
        </Switch>

        
      
      </Router>
    </div>
  );
}