import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import LandingPage from './pages/LandingPage';
import Laboratorios from './pages/Laboratorios/Laboratorios';
import Projetos from './pages/Projetos';
import Pessoas from './pages/Pessoas';
import Vinculos from './pages/Vinculos';
import Sobre from './pages/Sobre';

import Navbar from './components/shared/Navbar/Navbar';  

const App: React.FC = () => {
  return (
    <Router>
      <Navbar /> 
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/Laboratorios" element={<Laboratorios />} />
        <Route path="/Projetos" element={<Projetos />} />
        <Route path="/Pessoas" element={<Pessoas />} />
        <Route path="/Vinculos" element={<Vinculos />} />
        <Route path="/Sobre" element={<Sobre />} />
      </Routes>
    </Router>
  );
};

export default App;
