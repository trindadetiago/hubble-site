import React, { useState, useEffect } from 'react';

import IndividualInstance from '../components/shared/IndividualInstance/IndividualInstance';
import EditModal from '../components/shared/Modal/EditModal';
import DeleteModal from '../components/shared/Modal/DeleteModal';

import { fetchTipoProjetos, editTipoProjeto, createTipoProjeto, deleteTipoProjeto } from '../api/api_tipo_projetos';

import './Styles.css'; 

const TipoProjetos: React.FC = () => {
    const editInstanceClick = (Id: string, tipro_nome: string) => {
        setDataPlaceholders({ 
            Id: { data_type: "string", value: Id, readOnly: true},
            tipro_nome: { data_type: "string", value: tipro_nome, readOnly: false },
            });
        setEditModalOpen(true);
    };

    const editInstanceConfirm = async (dataa: string) => {
        console.log(dataa)
        let jsonData = JSON.parse(dataa);
        const id = jsonData.Id.value;
        jsonData = {tipro_nome: jsonData.tipro_nome.value}
        console.log(jsonData)
        try {
            await editTipoProjeto(id, jsonData);
            console.log("Sucesso")
            await fetchData();
        } catch (error) {
            console.error('Error editing lab:', error);
        }
        setEditModalOpen(false)
    };

    const createInstanceClick = () => {
        setCreateModalOpen(true);
    }

    const createInstanceConfirm = async (dataa: string) => {
        console.log(dataa)
        let jsonData = JSON.parse(dataa);
        jsonData = {tipro_nome: jsonData.tipro_nome.value}
        console.log(jsonData)
        try {
            await createTipoProjeto(jsonData);
            console.log("Sucesso")
            await fetchData();
        } catch (error) {
            console.error('Error creating lab:', error);
        }
    };

    const deleteInstanceClick = (id: string) => {
        setDeleteDataId(id);
        setDeleteModalOpen(true);
    };

    const [deleteDataId, setDeleteDataId] = useState('');

    const deleteInstanceConfirm = async () => {
        console.log("Deletando", deleteDataId)
        try {
            await deleteTipoProjeto(deleteDataId);
            await fetchData();
        } catch (error) {
            console.error('Error deleting lab:', error);
        }
        setDeleteModalOpen(false);
    }

    const [tipoProjData, setTipoProjData] = useState([]);

    const fetchData = async () => {
        try {
            const data = await fetchTipoProjetos();
            setTipoProjData(data);
        } catch (error) {
            console.error('Error fetching labs:', error);
        }
    };
    
    useEffect(() => {
        fetchData();
    }, []);

    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const [isCreateModalOpen, setCreateModalOpen] = useState(false);

    const [dataPlaceholders, setDataPlaceholders] = useState({
        Id: { data_type: "string", value: "", readOnly: true },
        tipro_nome: { data_type: "string", value: "", readOnly: false },
    });

    return (
        <div style={{ paddingLeft: '15%', paddingRight: '15%'}}>
            <h1 
            style={{ marginTop: '100px', marginBottom: '40px' }}>
            Tipos de Projetos
            </h1>

            {tipoProjData.map((tipoProj: any) => (
                <IndividualInstance
                    key={tipoProj.id}
                    title={tipoProj.tipro_nome}
                    subtitle={""}
                    onEdit={() => editInstanceClick(tipoProj.id, tipoProj.tipro_nome)}
                    onDelete={() => deleteInstanceClick(tipoProj.id)}
                />
            ))}

            <button 
            className='add-button'
            onClick={createInstanceClick}
            >Adicionar</button>

            <EditModal
            data = {dataPlaceholders}
            isOpen = {isEditModalOpen}
            onClose={() => setEditModalOpen(false)}
            onConfirm={editInstanceConfirm}
            />
            <DeleteModal
            isOpen = {isDeleteModalOpen}
            onClose={() => setDeleteModalOpen(false)}
            onConfirm={deleteInstanceConfirm}
            />
            <EditModal
            data = {dataPlaceholders}
            isOpen = {isCreateModalOpen}
            onClose={() => setCreateModalOpen(false)}
            onConfirm={createInstanceConfirm}
            />
        </div>
    );
};

export default TipoProjetos;
