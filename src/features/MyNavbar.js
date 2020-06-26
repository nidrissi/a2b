import React from 'react';
import { NavLink } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function MyNavbar() {
  return (
    <Navbar bg="light" expand="lg" className="mb-3">
      <NavLink to="/" className="navbar-brand">arXiv2bib</NavLink>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <NavLink to="/" className="nav-link"><FontAwesomeIcon icon="search" /> Search</NavLink>
          <NavLink to="/about" className="nav-link"><FontAwesomeIcon icon="project-diagram" /> About</NavLink>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
