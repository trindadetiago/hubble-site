import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Import the CSS file

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo-container">
        <img src="/logo192.png" alt="Logo" className="logo" />
        <h1 className="logo-title">Hubble</h1>
      </div>
      <div className="link-container">
        <Link to="/" className="link">Ínicio</Link>
        <Link to="/Laboratorios" className="link">Laboratórios</Link>
        <Link to="/Projetos" className="link">Projetos</Link>
        <Link to="/TipoProjetos" className="link">Tipo de Projetos</Link>
        <Link to="/Pessoas" className="link">Pessoas</Link>
        <Link to="/Vinculos" className="link">Vínculos</Link>
        <Link to="/Sobre" className="link">Sobre</Link>
      </div>
    </nav>
  );
};

export default Navbar;
