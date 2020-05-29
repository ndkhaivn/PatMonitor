import React, { useState } from "react"
import { InputGroup, Button, Navbar, Alignment, Spinner, Icon } from '@blueprintjs/core';
import { useDispatch } from 'react-redux';
import { Identifier } from "../DataModel/Resource";
import { fetchPractitioner } from '../store/practitioner/actions';
import { useSelector } from 'react-redux';
import { ApplicationState } from '../store/index';
import { Intent } from '@blueprintjs/core';

/**
 * Sidebar component: Contain input field for entering practitioner identifier and practitioner info
 */
export default function Sidebar() {

  const [practitionerIdentifier, setPractitionerIdentifier] = useState("");

  // Connect to store
  const practitioner = useSelector((state: ApplicationState) => state.practitioner.data);
  const loadingPractitioner = useSelector((state: ApplicationState) => state.practitioner.loading);
  const loadingPatients = useSelector((state: ApplicationState) => state.patients.loading);

  const dispatch = useDispatch();
  // Tell the store to fetch the practitioner with identifier
  const enterPractitioner = () => {
    dispatch(fetchPractitioner(new Identifier("http://hl7.org/fhir/sid/us-npi", practitionerIdentifier)));
  }

  const loading = loadingPractitioner || loadingPatients;

  // conditional markup of practitioner: practitioner info if defined or 404 error if null
  const practitionerMarkup = 
    practitioner ? 
      <div>
        <h2>Practitioner Info</h2>
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

      {/* Enter practitioner identifier */}
      <InputGroup
        leftIcon="diagnosis"
        rightElement={loading ? <Spinner size={Spinner.SIZE_SMALL}/> : <Button icon="key-enter" minimal={true} onClick={enterPractitioner}/>}
        onChange={(event: any) => setPractitionerIdentifier(event.target.value)}
        placeholder="Practitioner Identifier"
        value={practitionerIdentifier}
        large={true}
      />
      
      <div className="practitioner-info">
        {practitionerMarkup}
      </div>
      
    </div>
  )
}
