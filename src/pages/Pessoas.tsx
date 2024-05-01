import React, { useState, useEffect } from 'react';

import IndividualInstance from '../components/shared/IndividualInstance/IndividualInstance';
import EditModal from '../components/shared/Modal/EditModal';
import DeleteModal from '../components/shared/Modal/DeleteModal';
import Popup from '../components/shared/Modal/Popup';

import { fetchPessoas, editPessoa, createPessoa, deletePessoa } from '../api/api_pessoas';

import './Styles.css'; 

const Pessoas: React.FC = () => {
    const editInstanceClick = (Id: string, pess_nome: string, pess_email: string, id_curso: string, pess_matricula: string, pess_role: string) => {
        setDataPlaceholders({ 
            Id: { data_type: "string", value: Id, readOnly: true},
            PessNome: { data_type: "string", value: pess_nome, readOnly: false },
            PessEmail: { data_type: "string", value: pess_email, readOnly: false },
            IdCurso: { data_type: "id_curso", value: id_curso, readOnly: false },
            PessMatricula: { data_type: "string", value: pess_matricula, readOnly: false },
            PessRole: { data_type: "role", value: pess_role, readOnly: false }
          });
        setEditModalOpen(true);
    };

    const editInstanceConfirm = async (dataa: string) => {
        console.log("Edit Instance Confirm 1")
        console.log(dataa)
        let jsonData = JSON.parse(dataa);
        const id = jsonData.Id.value;
        jsonData = {pess_nome: jsonData.PessNome.value, pess_email: jsonData.PessEmail.value, id_curso_pessoa: jsonData.IdCurso.value, pess_matricula: jsonData.PessMatricula.value, pess_role: jsonData.PessRole.value}
        console.log("Edit Instance Confirm 2")
        console.log(jsonData)
        try {
            await editPessoa(id, jsonData);
            console.log("Sucesso")
            await fetchData();
            setEditModalOpen(false)
            handleSuccess("Pessoa Editada com Sucesso!");
        } catch (error) {
            console.error('Error editing pessoa:', error);
            handleError("Erro ao editar pessoa!");
        }
    };

    const createInstanceClick = () => {
        setCreateModalOpen(true);
    }

    const createInstanceConfirm = async (dataa: string) => {
        console.log(dataa)
        let jsonData = JSON.parse(dataa);
        jsonData = {pess_nome: jsonData.PessNome.value, pess_email: jsonData.PessEmail.value, id_curso_pessoa: jsonData.IdCurso.value, pess_matricula: jsonData.PessMatricula.value, pess_role: jsonData.PessRole.value}
        console.log(jsonData)
        try {
            await createPessoa(jsonData);
            console.log("Sucesso")
            await fetchData();
            setCreateModalOpen(false)
            handleSuccess("Pessoa Criada com Sucesso!");
        } catch (error) {
            console.error('Error creating pessoa:', error);
            handleError("Erro ao criar pessoa!");
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
            await deletePessoa(deleteDataId);
            await fetchData();
            setDeleteModalOpen(false);
            handleSuccess("Pessoa Deletada com Sucesso!");
        } catch (error) {
            console.error('Error deleting pessoa:', error);
            handleError("Erro ao deletar pessoa!");
        }
    }

    const [pessData, setPessData] = useState([]);

    const fetchData = async () => {
        try {
            const data = await fetchPessoas();
            setPessData(data);
        } catch (error) {
            console.error('Error fetching pessoas:', error);
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
        PessNome: { data_type: "string", value: "", readOnly: false },
        PessEmail: { data_type: "string", value: "", readOnly: false },
        IdCurso: { data_type: "id_curso", value: "", readOnly: false },
        PessMatricula: { data_type: "string", value: "", readOnly: false },
        PessRole: { data_type: "role", value: "", readOnly: false }
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
            Pessoas
            </h1>
            {/* <IndividualInstance 
            title="TRIL"
            subtitle="Technology, Research and Innovation Lab"
            onEdit={() => editInstanceClick('0', "TRIL", "A", "0")}
            onDelete={() => deleteInstanceClick('0')}
            />
            <IndividualInstance 
            title="Laboratório de Computação Científica e Visualização"
            subtitle="Universidade Federal de Alagoas"
            onEdit={() => editInstanceClick('0', "TRIL", "A", "0")}
            onDelete={() => deleteInstanceClick('0')}
            /> */}

            {pessData.map((pess: any) => (
                <IndividualInstance
                    key={pess.id}
                    title={pess.pess_nome}
                    subtitle={"Matrícula: " + pess.pess_matricula + " | Email: " + pess.pess_email + " | Curso: " + pess.id_curso_pessoa + " | Role: " + pess.pess_role}
                    onEdit={() => editInstanceClick(pess.id, pess.pess_nome, pess.pess_email, pess.id_curso_pessoa, pess.pess_matricula, pess.pess_role)}
                    onDelete={() => deleteInstanceClick(pess.id)}
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
            title="Editar Pessoa"
            />
            <DeleteModal
            isOpen = {isDeleteModalOpen}
            onClose={() => setDeleteModalOpen(false)}
            onConfirm={deleteInstanceConfirm}
            />
            <EditModal
            data = {{
                Id: { data_type: "string", value: "", readOnly: true },
                PessNome: { data_type: "string", value: "", readOnly: false },
                PessEmail: { data_type: "string", value: "", readOnly: false },
                IdCurso: { data_type: "id_curso", value: "", readOnly: false },
                PessMatricula: { data_type: "string", value: "", readOnly: false },
                PessRole: { data_type: "role", value: "", readOnly: false }
              }}
            isOpen = {isCreateModalOpen}
            onClose={() => setCreateModalOpen(false)}
            onConfirm={createInstanceConfirm}
            title="Adicionar Pessoa"
            />
            <Popup message={successMessage} type="positive" show={showSuccess} />
            <Popup message={errorMessage} type="negative" show={showError} />
        </div>
    );
};

export default Pessoas;
