// import logo from './logo.svg';
import { React, lazy, Suspense } from 'react'
import './App.css';
import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";
import NavBar from './NavBar/NavBar';
import NotFound from './NotFound/NotFound';
import { ShoppingCartProvider } from './context/shoppingCartContext';
import Admin from './Admin/Admin';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';


// lazy loading these components, prevents users from downloading everything at once
const Home = lazy(() => import('./scenes/Home'))
const Cart = lazy(() => import('./scenes/Cart'))
const Books = lazy(() => import('./Books/Books'))
const Checkout = lazy(() => import('./scenes/Checkout'))


function App() {
  return (
    <BrowserRouter>
      <ShoppingCartProvider>  
        <div className="App">
          <NavBar Link={Link} />
          <Suspense fallback={<h1>Loading...</h1>}>
            <Routes>
              <Route exact path="/" element={<Navigate to="/Home" />} />
              <Route path="/Home" element={<Home />} />
              <Route path="/Cart" element={<Cart />} />
              <Route path="/Checkout" element={<Checkout />} />
              <Route path="/Books" element={<Books />} />
              <Route path="/Admin" element={<Admin />} />
              <Route path='*' element={<NotFound />} />
            </Routes>
          </Suspense>
        </div>
      </ShoppingCartProvider>    
    </BrowserRouter>
  );
}

export default App;
