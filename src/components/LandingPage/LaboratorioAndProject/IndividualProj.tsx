import React from 'react';

import "./Style.css";

interface IndividualProjProps {
    proj_nome: string;
    proj_descricao: string;
    tipo_proj: string;
    lab_nome: string;
    quantidade_pessoas: number;
}

const IndividualProj: React.FC<IndividualProjProps> = ({
    proj_nome,
    proj_descricao,
    tipo_proj,
    lab_nome,
    quantidade_pessoas,
}) => {
    return (
        <div className='ProjContainer'>
            <h2>{proj_nome}</h2>
            <div className='ProjDivider'>
                <div className='ProjDividerLeft'>
                    <h3>{proj_descricao}</h3>
                </div>
                
                <div className='ProjDividerRight'>
                    <p>Tipo Projeto: {tipo_proj}</p>
                    <p>Laboratório: {lab_nome}</p>
                    <p>Número Participantes: {quantidade_pessoas}</p>
                </div>
            </div>
        </div>
    );
}

export default IndividualProj;