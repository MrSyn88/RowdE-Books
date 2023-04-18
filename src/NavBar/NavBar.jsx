import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { logout, signInWithGoogle } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';


export default function NavBar({ Link }) {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");


  const handleSearch = () => {
    window.localStorage.setItem('searchbarSubmittedText', JSON.stringify(searchValue));
    navigate("/Books");
  };

  return (<Navbar bg="dark" expand="lg" variant='dark' sticky="top">
    <Container fluid>
      <Navbar.Brand as={Link} to="/Home">RowdE-Books</Navbar.Brand>
      <Navbar.Toggle aria-controls="navbarScroll" />
      <Navbar.Collapse id="navbarScroll">
        <Nav className="me-auto my-2 my-lg-0" style={{
          maxHeight: '100px'
        }} navbarScroll>

          <NavDropdown title="Resources" id="navbarScrollingDropdown">
            <NavDropdown.Item href="https://react.dev" target="_blank">React</NavDropdown.Item>
            <NavDropdown.Item href="https://react-bootstrap.github.io/" target="_blank">React Bootstrap</NavDropdown.Item>
            <NavDropdown.Item href="https://firebase.google.com/" target="_blank">
              Firebase
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="https://github.com/MrSyn88/RowdE-Books" target="_blank">
              Our GitHub
            </NavDropdown.Item>
          </NavDropdown>
          <Nav.Link as={Link} to="/Books" >Books</Nav.Link>
          <Nav.Link as={Link} to="/Cart">Cart</Nav.Link>
        </Nav>
        <Form className="d-flex" onSubmit={handleSearch} >
          <Form.Control type="search" placeholder="Search" className="me-2" aria-label="Search" onChange={(event => setSearchValue(event.target.value))}/>
          <Button variant="outline-success" onClick={handleSearch} onChange={(event => setSearchValue(event.target.value))}>Search</Button>
        </Form>
        <Form className="d-flex">
          {!user ? (
            <Button
              variant="outline-primary"
              onClick={signInWithGoogle}
            >
              Log in
            </Button>
          ) : (
            <>
              <Button
                variant="outline-primary"
                onClick={logout}
              >
                Log out
              </Button>
            </>
          )}
        </Form>
      </Navbar.Collapse>
    </Container>
  </Navbar>);
}
