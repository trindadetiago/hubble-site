import React, { useState, useEffect } from 'react';

import IndividualInstance from '../components/shared/IndividualInstance/IndividualInstance';
import EditModal from '../components/shared/Modal/EditModal';
import DeleteModal from '../components/shared/Modal/DeleteModal';
import CreateModal from '../components/shared/Modal/CreateModal';

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
        const jsonData = JSON.parse(dataa);
        console.log(jsonData)
        try {
            await createLab({ name: jsonData.Nome.value, descricao: jsonData.Descricao.value });
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
            await deleteLab(deleteDataId);
            await fetchData();
        } catch (error) {
            console.error('Error deleting lab:', error);
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
            />
            <DeleteModal
            isOpen = {isDeleteModalOpen}
            onClose={() => setDeleteModalOpen(false)}
            onConfirm={deleteInstanceConfirm}
            />
            <CreateModal
            data = {dataPlaceholders}
            isOpen = {isCreateModalOpen}
            onClose={() => setCreateModalOpen(false)}
            onConfirm={createInstanceConfirm}
            />
        </div>
    );
};

export default Laboratorios;
