import React from 'react';

import IndividualInstance from '../components/shared/IndividualInstance/IndividualInstance';

const Vinculos: React.FC = () => {
  return (
    <div style={{ paddingLeft: '15%', paddingRight: '15%'}}>
        <h1 
        style={{ marginTop: '100px', marginBottom: '40px' }}>
        Vinculos
        </h1>
        <IndividualInstance 
         title="Vinculos 1"
         subtitle="Technology, Research and Innovation Lab"
         />
         <IndividualInstance 
         title="Vinculos 2"
         subtitle="Universidade Federal de Alagoas"
         />
    </div>
  );
};

export default Vinculos;
