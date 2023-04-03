import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { logout, signInWithGoogle } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';

export default function NavBar({ Link }) {
  const [user] = useAuthState(auth);

  return (<Navbar bg="dark" expand="lg" variant='dark' sticky="top">
    <Container fluid>
      <Navbar.Brand as={Link} to="/Home">RowdE-Books</Navbar.Brand>
      <Navbar.Toggle aria-controls="navbarScroll" />
      <Navbar.Collapse id="navbarScroll">
        <Nav className="me-auto my-2 my-lg-0" style={{
          maxHeight: '100px'
        }} navbarScroll>

          <NavDropdown title="Resources" id="navbarScrollingDropdown">
            <NavDropdown.Item href="https://react-bootstrap.github.io/">React Bootstrap</NavDropdown.Item>
            <NavDropdown.Item href="https://firebase.google.com/">
              Firebase
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="https://github.com/MrSyn88/RowdE-Books">
              Our GitHub
            </NavDropdown.Item>
          </NavDropdown>
          <Nav.Link as={Link} to="/Books" >
            Books
          </Nav.Link>
          <Nav.Link as={Link} to="/Cart">Cart</Nav.Link>
        </Nav>
        <Form className="d-flex">
          <Form.Control type="search" placeholder="Search" className="me-2" aria-label="Search" />
          <Button variant="outline-success">Search</Button>
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
