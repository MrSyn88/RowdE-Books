import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { logout, signInWithGoogle } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import { useShoppingCart } from '../context/shoppingCartContext';

export default function NavBar({ Link }) {
  const [user] = useAuthState(auth);
  const {openCart, cartQuantity} = useShoppingCart();
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
          <Nav.Link as={Link} to="/Books" >
            Books
          </Nav.Link>
          <Nav.Link as={Link} to="/Cart">Cart</Nav.Link>
        </Nav>
        <Button style={{width: "4rem", height: "3rem", position: "relative"}} variant="outline-primary" className='' onClick={openCart}>
          Cart
          <div style={{width:"1.5rem", color: "white", height:"1.5rem", position: "absolute", bottom: 0, right:0, transform: "translate(25%, 25%)" }} className='rounded-circle bg-danger d-flex justify-content-center align-items-center'>{cartQuantity}</div>
        </Button>
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
