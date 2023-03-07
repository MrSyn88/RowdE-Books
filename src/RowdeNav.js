import React, { Component } from 'react';
import { Button, Container, Form, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { Link } from "react-router-dom";
import Routes from './RowdeRoutes';

class RowdeNav extends Component {
    render() {
        return (
            <React.Fragment>
                <Navbar bg="light" expand="lg">
                    <Container fluid>
                        <Navbar.Brand as={Link} to="/home">RowdyE-Books</Navbar.Brand>
                        <Navbar.Toggle aria-controls="navbarScroll" />
                        <Navbar.Collapse id="navbarScroll">
                            <Nav
                                className="me-auto my-2 my-lg-0"
                                style={{ maxHeight: '100px' }}
                                navbarScroll
                            >
                                <Nav.Link as={Link} to="/login">Login</Nav.Link>

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
                                <Nav.Link as={Link} to="/home" disabled>
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
                <Routes />
            </React.Fragment>
        );
    }

}
export default RowdeNav;