import React from 'react'
import { Link } from 'react-router-dom'
import { Container, Navbar, Button, Nav } from 'react-bootstrap'

const NavigationBar = ({ user, handleLogout }) => {
  return(
    <Navbar bg="light" expand="md">
      <Container>
        <Navbar.Brand>Blogs App</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
        <Navbar.Collapse>
          <Nav>
            <Nav.Link as={Link} to={'/'}>Blogs</Nav.Link>
            <Nav.Link as={Link} to={'/users'}>Users</Nav.Link>
          </Nav>
          <span> {user.name} ({user.username}) is logged in </span>
          <Button className="ml-4" variant="primary" type="submit" onClick={handleLogout}>
        logout
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavigationBar
