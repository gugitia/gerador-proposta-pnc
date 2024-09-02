import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import "./styles.css";
import "../../global.css";

function StaffNavbar() {
  return (
    <div className="App">
      <Navbar bg="dark" variant="dark" expand="lg">
        <Navbar.Brand as={Link} to="/staff-menu">
          Agil
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link as={Link} to="/concessionarias">
              Concessionarias
            </Nav.Link>
            <Nav.Link as={Link} to="/propostas">
              Propostas
            </Nav.Link>
            <Nav.Link as={Link} to="/clientes">
              Clientes
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export default StaffNavbar;
