import React, { useState, useEffect } from 'react';

import IndividualInstance from '../components/shared/IndividualInstance/IndividualInstance';
import EditModal from '../components/shared/Modal/EditModal';
import DeleteModal from '../components/shared/Modal/DeleteModal';
import Popup from '../components/shared/Modal/Popup';

import { fetchLabs, editLab, deleteLab, createLab } from '../api/api_laboratorio';

import './Styles.css'; 

const Laboratorios: React.FC = () => {
    const editInstanceClick = (labId: string, labNome: string, descricao: string) => {
        setDataPlaceholders(
            { Id: { data_type: "string", value: labId, readOnly: true},
            Nome: { data_type: "string", value: labNome, readOnly: false },
            Descricao: { data_type: "string", value: descricao, readOnly: false }  
        });
        setEditModalOpen(true);
    };

    const editInstanceConfirm = async (dataa: string) => {
        console.log(dataa)
        const jsonData = JSON.parse(dataa);
        console.log(jsonData)
        try {
            await editLab(jsonData.Id.value, { name: jsonData.Nome.value, descricao: jsonData.Descricao.value });
            console.log("Sucesso")
            await fetchData();
            handleSuccess("Laboratório Editado com Sucesso!");
        } catch (error) {
            console.error('Error editing lab:', error);
            handleError("Erro ao editar laboratório!");
        }
        setEditModalOpen(false)
    };

    const createInstanceClick = () => {
        setCreateModalOpen(true);
    }

    const createInstanceConfirm = async (dataa: string) => {
        console.log(dataa)
        const jsonData = JSON.parse(dataa);
        console.log(jsonData)
        try {
            await createLab({ name: jsonData.Nome.value, descricao: jsonData.Descricao.value });
            console.log("Sucesso")
            handleSuccess("Laboratório Criado com Sucesso!");
            setCreateModalOpen(false);
            await fetchData();
        } catch (error) {
            handleError("Erro ao criar laboratório!");
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
            await deleteLab(deleteDataId);
            await fetchData();
            handleSuccess("Laboratório Deletado com Sucesso!");
        } catch (error) {
            console.error('Error deleting lab:', error);
            handleError("Erro ao deletar laboratório!");
        }
        setDeleteModalOpen(false);
    }

    const [labData, setLabData] = useState([]);

    const fetchData = async () => {
        try {
            const data = await fetchLabs();
            setLabData(data);
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
        Nome: { data_type: "string", value: "", readOnly: false},
        Descricao: { data_type: "string", value: "", readOnly: false}
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
            Laboratórios
            </h1>
            {/* <IndividualInstance 
            title="TRIL"
            subtitle="Technology, Research and Innovation Lab"
            onEdit={() => editInstanceClick('0', "TRIL")}
            onDelete={() => deleteInstanceClick('0')}
            />
            <IndividualInstance 
            title="Laboratório de Computação Científica e Visualização"
            subtitle="Universidade Federal de Alagoas"
            onEdit={() => editInstanceClick('0', "LCCV")}
            onDelete={() => deleteInstanceClick('0')}
            /> */}

            {labData.map((lab: any) => (
                <IndividualInstance
                    key={lab.id}
                    title={lab.name}
                    subtitle={lab.descricao}
                    onEdit={() => editInstanceClick(lab.id, lab.name, lab.descricao)}
                    onDelete={() => deleteInstanceClick(lab.id)}
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
            title="Editar Laboratório"
            />
            <DeleteModal
            isOpen = {isDeleteModalOpen}
            onClose={() => setDeleteModalOpen(false)}
            onConfirm={deleteInstanceConfirm}
            />
            <EditModal
            data = {{
                Id: { data_type: "string", value: "", readOnly: true },
                Nome: { data_type: "string", value: "", readOnly: false},
                Descricao: { data_type: "string", value: "", readOnly: false}
            }}
            isOpen = {isCreateModalOpen}
            onClose={() => setCreateModalOpen(false)}
            onConfirm={createInstanceConfirm}
            title="Criar Laboratório"
            />
            <Popup message={successMessage} type="positive" show={showSuccess} />
            <Popup message={errorMessage} type="negative" show={showError} />
        
        </div>
    );
};

export default Laboratorios;
