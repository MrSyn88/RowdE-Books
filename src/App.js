import './App.css';
import React from 'react';
import Routes from './RowdeRoutes';
import { BrowserRouter as Router } from 'react-router-dom';
import RowdeNav from './RowdeNav';

const App = () =>
  <Router>
    <React.Fragment>
      <RowdeNav />
      <Routes />
    </React.Fragment>
  </Router>
export default App;
