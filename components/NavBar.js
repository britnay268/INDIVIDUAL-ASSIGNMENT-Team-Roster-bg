/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import {
  Navbar, Container, Nav, Button,
} from 'react-bootstrap';
import { signOut } from '../utils/auth';
import SearchBar from './SearchBar';

export default function NavBar() {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Link passHref href="/">
          <Navbar.Brand style={{ fontFamily: 'Luminari', fontSize: '30px', color: 'darkviolet' }}>GNF</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Link passHref href="/">
              <Nav.Link>Home</Nav.Link>
            </Link>
            <Link passHref href="/teams">
              <Nav.Link>Teams</Nav.Link>
            </Link>
            <Link passHref href="/team/new">
              <Nav.Link>Add Team</Nav.Link>
            </Link>
            <Link passHref href="/members">
              <Nav.Link>Players</Nav.Link>
            </Link>
            <Link passHref href="/member/new">
              <Nav.Link>Add Player</Nav.Link>
            </Link>
          </Nav>
          <Nav>
            <SearchBar />
            <hr />
            <Button variant="danger" onClick={signOut}>Sign Out</Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
