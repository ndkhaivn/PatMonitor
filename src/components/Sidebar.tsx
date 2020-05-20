import React, { useState } from "react"
import Navigation from './Navigation';
import { InputGroup, Button } from '@blueprintjs/core';
import { useDispatch } from 'react-redux';
import { fetchPatients } from '../store/patients/actions';
import { Identifier } from "../DataModel/Resource";

export default function Sidebar() {

  const [practitionerIdentifier, setPractitionerIdentifier] = useState("");

  const dispatch = useDispatch();
  const enterPractitioner = () => {
    dispatch(fetchPatients(new Identifier("http://hl7.org/fhir/sid/us-npi", practitionerIdentifier)));
  }

  return (
    <div className="sidebar">
      <Navigation />

      <InputGroup
        leftIcon="diagnosis"
        rightElement={<Button icon="key-enter" minimal={true} onClick={enterPractitioner}/>}
        onChange={(event: any) => setPractitionerIdentifier(event.target.value)}
        placeholder="Practitioner Identifier"
        value={practitionerIdentifier}
        large={true}
      />

    </div>
  )
}
