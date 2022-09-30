import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Home, Login, Register, Donor } from "./pages";
import './App.css';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/donor' element={<Donor />} />
        <Route path='/token' />

      </Routes>
    </Router>
  );
}

export default App;
