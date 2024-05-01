import React from 'react';

interface IndividualLabProps {
    lab_nome: string;
    lab_descricao: string;
    quantidade_pessoas: number;
    quantidade_projetos: number;
}

const IndividualLab: React.FC<IndividualLabProps> = ({
    lab_nome,
    lab_descricao,
    quantidade_pessoas,
    quantidade_projetos,
}) => {
    return (
        <div className='LabContainer'>
            <h2>{lab_nome}</h2>
            <p>Número de membros: {quantidade_pessoas}</p>
            <p>Número de projetos: {lab_descricao}</p>
        </div>
    );
};

export default IndividualLab;