import React, { useState, useEffect } from 'react';

import IndividualInstance from '../components/shared/IndividualInstance/IndividualInstance';
import EditModal from '../components/shared/Modal/EditModal';
import DeleteModal from '../components/shared/Modal/DeleteModal';

import { fetchVinculos, editVinculo, deleteVinculo, createVinculo } from '../api/api_vinculos';

import './Styles.css'; 

const Vinculos: React.FC = () => {
    const editInstanceClick = (Id: string, vinc_cargo: string, vinc_carga_horaria: string, vinc_remunerado: string, vinc_data_inicio: string, vinc_data_fim: string, id_pessoa_vinculo: string, id_projeto_vinculo: string) => {
        setDataPlaceholders({ 
            Id: { data_type: "string", value: Id, readOnly: true},
            vinc_cargo: { data_type: "string", value: vinc_cargo, readOnly: false },
            vinc_carga_horaria: { data_type: "string", value: vinc_carga_horaria, readOnly: false },
            vinc_remunerado: { data_type: "bool", value: vinc_remunerado, readOnly: false },
            vinc_data_inicio: { data_type: "data", value: vinc_data_inicio, readOnly: false },
            vinc_data_fim: { data_type: "data", value: vinc_data_fim, readOnly: false },
            id_pessoa_vinculo: { data_type: "id_pessoa_vinculo", value: id_pessoa_vinculo, readOnly: false },
            id_projeto_vinculo: { data_type: "id_projeto_vinculo", value: id_projeto_vinculo, readOnly: false }
        });
        setEditModalOpen(true);
    };

    const editInstanceConfirm = async (dataa: string) => {
        console.log(dataa)
        let jsonData = JSON.parse(dataa);
        const id = jsonData.Id.value;
        jsonData = {vinc_cargo: jsonData.vinc_cargo.value, vinc_carga_horaria: jsonData.vinc_carga_horaria.value, vinc_remunerado: jsonData.vinc_remunerado.value, vinc_data_inicio: jsonData.vinc_data_inicio.value, vinc_data_fim: jsonData.vinc_data_fim.value, id_pessoa_vinculo: jsonData.id_pessoa_vinculo.value, id_projeto_vinculo: jsonData.id_projeto_vinculo.value}
        console.log(jsonData)
        try {
            await editVinculo(id, jsonData);
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
        jsonData = {vinc_cargo: jsonData.vinc_cargo.value, vinc_carga_horaria: jsonData.vinc_carga_horaria.value, vinc_remunerado: jsonData.vinc_remunerado.value, vinc_data_inicio: jsonData.vinc_data_inicio.value, vinc_data_fim: jsonData.vinc_data_fim.value, id_pessoa_vinculo: jsonData.id_pessoa_vinculo.value, id_projeto_vinculo: jsonData.id_projeto_vinculo.value}
        console.log(jsonData)
        try {
            await createVinculo(jsonData);
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
            await deleteVinculo(deleteDataId);
            await fetchData();
        } catch (error) {
            console.error('Error deleting lab:', error);
        }
        setDeleteModalOpen(false);
    }

    const [vincData, setVincData] = useState([]);

    const fetchData = async () => {
        try {
            const data = await fetchVinculos();
            setVincData(data);
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
        vinc_cargo: { data_type: "string", value: "", readOnly: false },
        vinc_carga_horaria: { data_type: "string", value: "", readOnly: false },
        vinc_remunerado: { data_type: "bool", value: "", readOnly: false },
        vinc_data_inicio: { data_type: "vinc_data_inicio", value: "", readOnly: false },
        vinc_data_fim: { data_type: "vinc_data_fim", value: "", readOnly: false },
        id_pessoa_vinculo: { data_type: "id_pessoa_vinculo", value: "", readOnly: false },
        id_projeto_vinculo: { data_type: "id_projeto_vinculo", value: "", readOnly: false }
        });

    return (
        <div style={{ paddingLeft: '15%', paddingRight: '15%'}}>
            <h1 
            style={{ marginTop: '100px', marginBottom: '40px' }}>
            Vínculos
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

            {vincData.map((vinc: any) => (
                <IndividualInstance
                    key={vinc.id}
                    title={vinc.vinc_cargo}
                    subtitle={""}
                    onEdit={() => editInstanceClick(vinc.id, vinc.vinc_cargo, vinc.vinc_carga_horaria, vinc.vinc_remunerado, vinc.vinc_data_inicio, vinc.vinc_data_fim, vinc.id_pessoa_vinculo, vinc.id_projeto_vinculo)}
                    onDelete={() => deleteInstanceClick(vinc.id)}
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

export default Vinculos;
