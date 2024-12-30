import React from 'react';
import MainPage from './components/MainPage/MainPage';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login/Login';
import MainPage from './components/MainPage/MainPage';
import './App.css';


import Signup from './components/Signup/Signup';
import BusinessSignup from './components/BusinessSignup/BusinessSignup';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<MainPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/business-signup" element={<BusinessSignup />} />
      </Routes>
    </Router>
  );
}

export default App;