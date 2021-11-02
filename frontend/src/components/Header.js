import '../index.css'
import React, { useContext, useEffect } from 'react'
import { AppContext } from '../context'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { USER_LOGIN, USER_LOGOUT } from '../constants/actionConstants'
const Header = ({ history, location }) => {
  const { userInfo, dispatchEvents } = useContext(AppContext)

  const logoutHandler = (e) => {
    e.preventDefault()
    dispatchEvents(USER_LOGOUT)
  }

  return (
    <header className='header'>
      <Navbar bg='primary' variant='dark' expand='lg'>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>TogetherTrek</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          {!userInfo ? (
            <Navbar.Collapse id='basic-navbar-nav'>
              <Nav className='ms-auto'>
                <LinkContainer to='./login'>
                  <Nav.Link>Sign In</Nav.Link>
                </LinkContainer>
                <LinkContainer to='./register'>
                  <Nav.Link>Register User</Nav.Link>
                </LinkContainer>
              </Nav>
            </Navbar.Collapse>
          ) : (
            <Navbar.Collapse id='basic-navbar-nav'>
              <Nav className='ms-auto'>
                <LinkContainer to='./users'>
                  <Nav.Link> Users</Nav.Link>
                </LinkContainer>
                <LinkContainer to='./friends'>
                  <Nav.Link> Friends</Nav.Link>
                </LinkContainer>
                <LinkContainer to='./notifications'>
                  <Nav.Link> Notifications</Nav.Link>
                </LinkContainer>
                <LinkContainer to='./posts'>
                  <Nav.Link> Posts</Nav.Link>
                </LinkContainer>
                <LinkContainer to='./createpost'>
                  <Nav.Link> Create Post</Nav.Link>
                </LinkContainer>
                <NavDropdown title={userInfo.username} id='basic-nav-dropdown'>
                  <LinkContainer to='./profile'>
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={(e) => logoutHandler(e)}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          )}
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
