import React from "react";
import { NavLink } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

/** A react-router powered navigation bar. */
const AppNavbar: React.FC<{}> = () => {
  return (
    <Navbar bg="light" expand="lg" className="mb-3">
      <NavLink to="/" className="navbar-brand">
        arXiv2BibLaTeX
      </NavLink>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <NavLink to="/" exact className="nav-link">
            <FontAwesomeIcon icon="search" /> Search
          </NavLink>
          <NavLink to="/diy" className="nav-link">
            <FontAwesomeIcon icon="tools" /> DIY
          </NavLink>
          <NavLink to="/settings" className="nav-link">
            <FontAwesomeIcon icon="cog" /> Settings
          </NavLink>
          <NavLink to="/help" className="nav-link">
            <FontAwesomeIcon icon="question" /> Help
          </NavLink>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default AppNavbar;
