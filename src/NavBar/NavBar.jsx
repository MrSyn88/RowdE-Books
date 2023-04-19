import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { isAdmin, logout, signInWithGoogle } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom'
import { useShoppingCart } from '../context/shoppingCartContext';
import logo from '../images/rowde-books-low-resolution-logo-white-on-transparent-background.png'
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';


export default function NavBar({ Link }) {
  const [user] = useAuthState(auth);
  const { openCart, cartQuantity } = useShoppingCart();
  const [admin, setAdmin] = useState(false);
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");

  const sendEmHome = () => {
    return <Navigate to="/Home" />
  }

  // Check if user is admin
  if (user) {
    isAdmin(user.uid).then((value) => {
      if (value === true) {
        setAdmin(true);
      }
    })
  }

  const handleSearch = () => {
    window.localStorage.setItem('searchbarSubmittedText', JSON.stringify(searchValue));
    navigate("/Books");
  };

  return (<Navbar bg="dark" expand="lg" variant='dark' sticky="top">
    <Container fluid>
      <Navbar.Brand as={Link} to="/Home">
        <img
          src={logo}
          width="234.375"
          height="30"
          className="d-inline-block align-top"
          alt="React Bootstrap logo"
        />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="navbarScroll" />
      <Navbar.Collapse id="navbarScroll">
        <Nav className="me-auto my-2 my-lg-0" style={{
          maxHeight: '100px'
        }} navbarScroll>
          <Nav.Link as={Link} to="/Books" >
            Books
          </Nav.Link>
          {/*<Nav.Link as={Link} to="/Cart">Cart</Nav.Link>*/}
          {user && admin === true ?
            <Nav.Link as={Link} to="/Admin">Admin</Nav.Link>
            : null}
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
        </Nav>
        <Button className='me-3' style={{ width: "4rem", height: "3rem", position: "relative" }} variant="outline-primary" onClick={openCart}>
          Cart
          <div style={{ width: "1.5rem", color: "white", height: "1.5rem", position: "absolute", bottom: 0, right: 0, transform: "translate(25%, 25%)" }} className='rounded-circle bg-danger d-flex justify-content-center align-items-center'>{cartQuantity}</div>
        </Button>
        <Form className="d-flex" onSubmit={handleSearch} >
          <Form.Control type="search" placeholder="Search" className="me-2" aria-label="Search" onChange={(event => setSearchValue(event.target.value))} />
          <Button className='me-2' variant="outline-success" onClick={handleSearch} onChange={(event => setSearchValue(event.target.value))}>Search</Button>
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
              <Link to="/Home">
                <Button
                  variant="outline-danger"
                  onClick={() => {
                    sendEmHome()
                    logout()
                  }}
                >
                  Log out
                </Button>
              </Link>
            </>
          )}
        </Form>
      </Navbar.Collapse>
    </Container>
  </Navbar>);
}