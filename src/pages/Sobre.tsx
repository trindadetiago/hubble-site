import React from 'react';

const Sobre: React.FC = () => {
  return (
    <div style={{ paddingLeft: '15%', paddingRight: '15%'}}>
        <h1 
        style={{ marginTop: '100px', marginBottom: '40px' }}>
        Sobre
        </h1>
        <div style={{ display: 'flex', height: '200px', width: '100%', flexDirection: 'row' }}>
            <div style={{ marginBottom: '20px', width: '50%' }}>
                <p style={{ fontSize: '1.2rem'}}>
                    O Hubble foi desenvolvido como projeto da cadeira Banco de Dados,
                    ministrada pelo professor Marcelo Iury.
                </p>
                <p style={{ fontSize: '1.2rem'}}>
                    A equipe realizadora do projeto é composta por:
                </p>
                <ul style={{ fontSize: '1.2rem'}}>
                    <li>Tiago Trindade</li>
                    <li>Felipe Duarte</li>
                    <li>Davi Nasiasene</li>
                </ul>
            </div>
            <div style={{ display: 'flex', marginBottom: '20px', width: '50%', justifyContent: 'center', alignContent: 'center', alignItems: 'center'}}>
                <img src='/logo512.png' alt="Logo" style={{ width: '350px', height: '350px', marginLeft: '150px' }} />
            </div>
        </div>
    </div>
  );
};

export default Sobre;
