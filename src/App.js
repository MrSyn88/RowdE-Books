// import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";
import Login from './scenes/Login';
import Home from './scenes/Home';
import Cart from './scenes/Cart';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import NavBar from './NavBar/NavBar';
//import books from './scenes./books'

function App() {
  return (
    <BrowserRouter>
    <div className="App">
        <NavBar Link={Link} />
        <Routes>
          <Route exact path="/" element={<Navigate to="/Home" />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/Cart" element={<Cart />} />
          <Route path="/books" element={<books />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

