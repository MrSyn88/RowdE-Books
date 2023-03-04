import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from './scenes/Login';
import Home from './scenes/Home';
//import books from './scenes./books'

function App() {
  return (
    <div className="App">
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
