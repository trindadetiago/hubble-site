import React from 'react';

import IndividualInstance from '../components/shared/IndividualInstance/IndividualInstance';

const Projetos: React.FC = () => {
  return (
    <div style={{ paddingLeft: '15%', paddingRight: '15%'}}>
        <h1 
        style={{ marginTop: '100px', marginBottom: '40px' }}>
        Projetos
        </h1>
        <IndividualInstance 
         title="Projeto 1"
         subtitle="Technology, Research and Innovation Lab"
         />
         <IndividualInstance 
         title="Projeto 2"
         subtitle="Universidade Federal de Alagoas"
         />
    </div>
  );
};

export default Projetos;
