import React, { useState } from "react"
import { InputGroup, Button, Navbar, Alignment, Spinner, Icon, ControlGroup, NumericInput, Position, Tag, Card, Elevation, H4, Intent } from '@blueprintjs/core';
import { useDispatch } from 'react-redux';
import { Identifier } from "../DataModel/Resource";
import { fetchPractitioner } from '../store/practitioner/actions';
import { useSelector } from 'react-redux';
import { ApplicationState } from '../store/index';
import { setUpdateTimer, setBloodPressureThreshold } from '../store/system/actions';
import { SystemActionTypes } from "../store/system/types";
import CountdownTimer from "./CountdownTimer";

/**
 * Sidebar component: Contain input field for entering practitioner identifier and practitioner info
 */
export default function Sidebar() {

  const [practitionerIdentifier, setPractitionerIdentifier] = useState("");

  // Connect to store
  const practitioner = useSelector((state: ApplicationState) => state.practitioner.data);
  const loadingPractitioner = useSelector((state: ApplicationState) => state.practitioner.loading);
  const loadingPatients = useSelector((state: ApplicationState) => state.patients.loading);

  const [reloadTimeout, setReloadTimeout] = useState(10);              // default timeout = 10s

  // default threshold = 0
  const [systolicThreshold, setSystolicThreshold] = useState(0);      
  const [diastolicThreshold, setDiastolicThreshold] = useState(0);

  const dispatch = useDispatch();
  // Tell the store to fetch the practitioner with identifier
  const enterPractitioner = () => {
    dispatch(fetchPractitioner(new Identifier("http://hl7.org/fhir/sid/us-npi", practitionerIdentifier)));
  }

  const applyBloodPressureThreshold = () => {
    dispatch(setBloodPressureThreshold(systolicThreshold, diastolicThreshold));
  }

  const loading = loadingPractitioner || loadingPatients;

  // conditional markup of practitioner: practitioner info if defined or 404 error if null
  const practitionerMarkup = 
    practitioner ? 
      <div>
        <H4>Practitioner Info</H4>
        <table>
          <tbody>
            <tr>
              <td> Name </td>
              <td> {practitioner.name[0].toString()} </td>
            </tr> 
            <tr>
              <td valign="top"> Address </td>
              <td> {practitioner.address[0]?.line.join(" ")}, <br/> {practitioner.address[0]?.city} {practitioner.address[0]?.postalCode}, <br/> {practitioner.address[0]?.state}, {practitioner.address[0]?.country} </td>
            </tr>
          </tbody>
        </table>
      </div> :
    practitioner === null ?
      <div>
        <Icon icon="warning-sign" intent={Intent.DANGER}/>
        <span> 404 Practitioner not found! </span>
      </div>
    : null


  return (
    <div className="sidebar bp3-dark">
      <Navbar>
        <Navbar.Group>
          <Navbar.Heading>PatMonitor</Navbar.Heading>
        </Navbar.Group>
        <Navbar.Group align={Alignment.RIGHT}>
          <Button className="bp3-minimal" icon="user" />
          <Button className="bp3-minimal" icon="cog" />
        </Navbar.Group>
      </Navbar>

      <div className="sidebar-content">

        {/* Enter practitioner identifier */}
        <InputGroup
          leftIcon="diagnosis"
          rightElement={loading ? <Spinner size={Spinner.SIZE_SMALL}/> : <Button icon="key-enter" minimal={true} onClick={enterPractitioner}/>}
          onChange={(event: any) => setPractitionerIdentifier(event.target.value)}
          placeholder="Practitioner Identifier"
          value={practitionerIdentifier}
          large={true}
        />
    
        <Card className="sidebar-card" elevation={Elevation.TWO}>
          {practitionerMarkup}
        </Card>

        <Card className="sidebar-card" elevation={Elevation.TWO}>
          <H4> Update Timer </H4>
          <CountdownTimer />
          <ControlGroup>
            <NumericInput
              fill={true}
              buttonPosition={Position.LEFT} 
              rightElement={<Tag minimal={true}>s</Tag>}
              onValueChange={(value) => setReloadTimeout(value)}
              value={reloadTimeout}
            />
            <Button icon="stopwatch" intent={Intent.PRIMARY} onClick={ () => dispatch(setUpdateTimer(reloadTimeout)) }/>
            <Button icon="cross" intent={Intent.DANGER} onClick={ () => dispatch({ type: SystemActionTypes.STOP_TIMER }) }/>
          </ControlGroup>
        </Card>

        <Card className="sidebar-card" elevation={Elevation.TWO}>
          <H4> Blood Pressure Threshold </H4>
          <NumericInput
            fill={true}
            buttonPosition={Position.LEFT} 
            rightElement={<Tag minimal={true}>systolic</Tag>}
            onValueChange={(value) => setSystolicThreshold(value)}
            value={systolicThreshold}
          />
          <br />
          <NumericInput
            fill={true}
            buttonPosition={Position.LEFT} 
            rightElement={<Tag minimal={true}>diastolic</Tag>}
            onValueChange={(value) => setDiastolicThreshold(value)}
            value={diastolicThreshold}
          />
          <br />
          <Button intent={Intent.PRIMARY} onClick={applyBloodPressureThreshold}> Apply </Button>
        </Card>

      </div>

    </div>
  )
}
