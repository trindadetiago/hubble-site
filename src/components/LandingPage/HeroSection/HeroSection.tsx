import React from 'react';
import { Link } from 'react-router-dom';
import './HeroSection.css';  

const HeroSection: React.FC = () => {
  return (
    <section className="hero">
      <div className="container-left">
        <div className='hero-text'>
          <p>Bem vindo ao</p>
          <h2>Hubble</h2>
          <p>Explore os laboratórios e projetos do Centro de Informática da UFPB</p>
        </div>
      </div>
      <div className="container-right">
        <div className="hero-circles">
          <Link to="/laboratorios" className="hero-circle c1">
            <div className="circle-number c1_number">7</div>
            <div className="circle-name c1_name">Laboratórios</div>
          </Link>
          <Link to="/laboratorios" className="hero-circle c2">
            <div className="circle-number c2_number">13</div>
            <div className="circle-name c2_name">Projetos</div>
          </Link>
          <Link to="/laboratorios" className="hero-circle c3">
            <div className="circle-number c3_number">34</div>
            <div className="circle-name c3_name">Membros</div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
