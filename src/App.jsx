// import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";
import Login from './scenes/Login';
import Home from './scenes/Home';
import Cart from './scenes/Cart';
import NavBar from './NavBar/NavBar';
import NotFound from './NotFound/NotFound';
import EbookListingPage from './scenes/EbookListingPage';
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
          <Route path="/Books" element={<EbookListingPage />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

