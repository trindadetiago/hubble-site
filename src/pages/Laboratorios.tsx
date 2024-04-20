import React from 'react';

import IndividualInstance from '../components/shared/IndividualInstance/IndividualInstance';

const Laboratorios: React.FC = () => {
  return (
    <div style={{ paddingLeft: '15%', paddingRight: '15%'}}>
        <h1 
        style={{ marginTop: '100px', marginBottom: '40px' }}>
        Laboratórios
        </h1>
        <IndividualInstance 
         title="TRIL"
         subtitle="Technology, Research and Innovation Lab"
         />
         <IndividualInstance 
         title="Laboratório de Computação Científica e Visualização"
         subtitle="Universidade Federal de Alagoas"
         />
    </div>
  );
};

export default Laboratorios;
