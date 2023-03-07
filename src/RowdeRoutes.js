import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from "./scenes/Home";
import Login from "./scenes/Login"
//import books from './scenes/books'

const RowdeRoutes = () => 
        <Routes>
            <Route exact path="/" element={<Navigate to="/home" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<Home />} />
            {/* <Route path="/books" element={<books />} /> */}
        </Routes>
export default RowdeRoutes;