import { lazy, Suspense } from 'react'
import './App.css';
import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";
import NavBar from './NavBar/NavBar';
import Footer from './component/Footer'
import NotFound from './NotFound/NotFound';
import { ShoppingCartProvider } from './context/shoppingCartContext';
import "@stripe/stripe-js";
import LoadingSpinner from './LoadingSpinner/LoadingSpinner';


// lazy loading these components, prevents users from downloading everything at once
const Home = lazy(() => import('./scenes/Home'))
const Books = lazy(() => import('./Books/Books'))
const Checkout = lazy(() => import('./scenes/Checkout'))
const Admin = lazy(() => import('./Admin/Admin'))
const Cancelled = lazy(() => import('./scenes/Cancelled'))
const Success = lazy(() => import('./scenes/Success'))


function App() {
  return (
    <BrowserRouter>
      <ShoppingCartProvider>  
        <div className="App">
          <NavBar Link={Link} />
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              <Route exact path="/" element={<Navigate to="/Home" />} />
              <Route path="/Home" element={<Home />} />
              <Route path="/Checkout" element={<Checkout />} />
              <Route path="/Books" element={<Books />} />
              <Route path="/Admin" element={<Admin />} />
              <Route path="/Cancelled" element={<Cancelled />} />
              <Route path="/Success" element={<Success />} />
              <Route path='*' element={<NotFound />} />
            </Routes>
          </Suspense>
          <Footer/>
        </div>
      </ShoppingCartProvider>    
    </BrowserRouter>
  );
}

export default App;
