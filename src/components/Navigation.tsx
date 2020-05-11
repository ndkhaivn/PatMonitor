import { Navbar, Alignment, Button } from '@blueprintjs/core';
import React from 'react';

export default function Navigation() {
  return (
    <Navbar className="bp3-dark">
      <Navbar.Group>
        <Navbar.Heading>PatMonitor</Navbar.Heading>
      </Navbar.Group>
      <Navbar.Group align={Alignment.RIGHT}>
        <Button className="bp3-minimal" icon="user" />
        <Button className="bp3-minimal" icon="cog" />
      </Navbar.Group>
    </Navbar>
  );
}