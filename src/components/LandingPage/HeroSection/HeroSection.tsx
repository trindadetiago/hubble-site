import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './HeroSection.css';  

import { fetchCount } from '../../../api/api_count';

const HeroSection: React.FC = () => {
  const [countData, setCountData] = React.useState({ count_laboratorio: 0, count_projeto: 0, count_pessoa: 0 });

  const fetchData = async () => {
    try {
      const data = await fetchCount();
      setCountData(data);
    } catch (error) {
      console.error('Error fetching count:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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
            <div className="circle-number c1_number">{countData.count_laboratorio}</div>
            <div className="circle-name c1_name">Laboratórios</div>
          </Link>
          <Link to="/laboratorios" className="hero-circle c2">
            <div className="circle-number c2_number">{countData.count_projeto}</div>
            <div className="circle-name c2_name">Projetos</div>
          </Link>
          <Link to="/laboratorios" className="hero-circle c3">
            <div className="circle-number c3_number">{countData.count_pessoa}</div>
            <div className="circle-name c3_name">Membros</div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
