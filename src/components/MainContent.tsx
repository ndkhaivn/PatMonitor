import React from 'react'
import { Navbar, Alignment, Button } from '@blueprintjs/core'
import PatientSelect from './PatientSelect'

export default function MainContent() {
  
  return (
    <div className="main-content">
      <Navbar className="toolbar">
        <Navbar.Group>
          <PatientSelect />
        </Navbar.Group>
      </Navbar>

    </div>
  );
}
