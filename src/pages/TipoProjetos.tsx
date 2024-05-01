import React, { useState, useEffect } from 'react';

import IndividualInstance from '../components/shared/IndividualInstance/IndividualInstance';
import EditModal from '../components/shared/Modal/EditModal';
import DeleteModal from '../components/shared/Modal/DeleteModal';
import Popup from '../components/shared/Modal/Popup';

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
            setEditModalOpen(false);
            handleSuccess("Tipo de Projeto editado com sucesso!");
        } catch (error) {
            console.error('Error editing lab:', error);
            handleError("Erro ao editar Tipo de Projeto!");
        }
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
            setCreateModalOpen(false)
            handleSuccess("Tipo de Projeto criado com sucesso!");
        } catch (error) {
            console.error('Error creating lab:', error);
            handleError("Erro ao criar Tipo de Projeto!");
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
            setDeleteModalOpen(false);
            handleSuccess("Tipo de Projeto deletado com sucesso!");
        } catch (error) {
            console.error('Error deleting lab:', error);
            handleError("Erro ao deletar Tipo de Projeto!");
        }
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

    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSuccess = (message: string) => {
        setSuccessMessage(message);
        setShowSuccess(true);
    };

    const handleError = (message: string) => {
        setErrorMessage(message);
        setShowError(true);
    };

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
            title="Editar Tipo de Projeto"
            />
            <DeleteModal
            isOpen = {isDeleteModalOpen}
            onClose={() => setDeleteModalOpen(false)}
            onConfirm={deleteInstanceConfirm}
            />
            <EditModal
            data = {{
                Id: { data_type: "string", value: "", readOnly: true },
                tipro_nome: { data_type: "string", value: "", readOnly: false },
            }}
            isOpen = {isCreateModalOpen}
            onClose={() => setCreateModalOpen(false)}
            onConfirm={createInstanceConfirm}
            title="Adicionar Tipo de Projeto"
            />
            <Popup message={successMessage} type="positive" show={showSuccess} />
            <Popup message={errorMessage} type="negative" show={showError} />
        
        </div>
    );
};

export default TipoProjetos;
