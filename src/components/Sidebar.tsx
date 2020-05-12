import React, { useState } from "react"
import Navigation from './Navigation';
import { InputGroup } from '@blueprintjs/core';

export default function Sidebar() {

  const [practitionerID, setPractitionerID] = useState("");

  return (
    <div className="sidebar">
      <Navigation />

      <InputGroup
          leftIcon="user"
          onChange={(event: any) => setPractitionerID(event.target.value)}
          placeholder="Practitioner ID"
          value={practitionerID}
      />

    </div>
  )
}
