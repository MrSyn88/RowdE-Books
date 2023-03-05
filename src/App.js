import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from './scenes/Login';
import Home from './scenes/Home';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
//import books from './scenes./books'

function App() {
  return (
    <div className="App">
      <Navbar bg="light" expand="lg">
        <Container fluid>
          <Navbar.Brand href="/Home">RowdyE-Books</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              <Nav.Link href="/Login">Login</Nav.Link>
              
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
              <Nav.Link href="/Home" disabled>
                Books
              </Nav.Link>
            </Nav>
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-success">Search</Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Navigate to="/Home" />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/books" element={<books />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
