import React from 'react';

import IndividualInstance from '../components/shared/IndividualInstance/IndividualInstance';

const Pessoas: React.FC = () => {
  return (
    <div style={{ paddingLeft: '15%', paddingRight: '15%'}}>
        <h1 
        style={{ marginTop: '100px', marginBottom: '40px' }}>
        Pessoas
        </h1>
        <IndividualInstance 
         title="Pessoas 1"
         subtitle="Technology, Research and Innovation Lab"
         />
         <IndividualInstance 
         title="Pessoas 2"
         subtitle="Universidade Federal de Alagoas"
         />
    </div>
  );
};

export default Pessoas;
