import React, { useState, useEffect } from 'react';

import IndividualInstance from '../../components/shared/IndividualInstance/IndividualInstance';
import EditModal from '../../components/shared/Modal/EditModal';
import DeleteModal from '../../components/shared/Modal/DeleteModal';
import CreateModal from '../../components/shared/Modal/CreateModal';

import { fetchProjetos, editProjeto, deleteProjeto, createProjeto } from '../../api/api_projetos';
import { fetchTipoProjetos } from '../../api/api_tipo_projetos';
import { fetchLabs } from '../../api/api_laboratorio';

import './Projetos.css'; 

interface TipoProjetos {
  [key: string]: string;
}

interface Laboratorios {
  [key: string]: string;
}

const Projetos: React.FC = () => {
    const editInstanceClick = (Id: string, proj_nome: string, id_tipro_projeto: string, id_lab_projeto: string) => {
        setDataPlaceholders({ 
            Id: { data_type: "string", value: Id, readOnly: true},
            proj_nome: { data_type: "string", value: proj_nome, readOnly: false },
            id_tipro_projeto: { data_type: "id_tipro_projeto", value: id_tipro_projeto, readOnly: false },
            id_lab_projeto: { data_type: "id_lab_projeto", value: id_lab_projeto, readOnly: false } 
        });
        setEditModalOpen(true);
    };

    const editInstanceConfirm = async (dataa: string) => {
        console.log(dataa)
        let jsonData = JSON.parse(dataa);
        const id = jsonData.Id.value;
        jsonData = {proj_nome: jsonData.proj_nome.value, id_tipro_projeto: jsonData.id_tipro_projeto.value, id_lab_projeto: jsonData.id_lab_projeto.value}
        console.log(jsonData)
        try {
            await editProjeto(id, jsonData);
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
        jsonData = {proj_nome: jsonData.proj_nome.value, id_tipro_projeto: jsonData.id_tipro_projeto.value, id_lab_projeto: jsonData.id_lab_projeto.value}
        console.log(jsonData)
        try {
            await createProjeto(jsonData);
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
            await deleteProjeto(deleteDataId);
            await fetchData();
        } catch (error) {
            console.error('Error deleting lab:', error);
        }
        setDeleteModalOpen(false);
    }

    const [tipoProjetosData, setTipoProjetosData] = useState<TipoProjetos>({}); // [ { id: 1, name: "Tipo 1" }, { id: 2, name: "Tipo 2" }, ... ]
    const fecthDataTipoProjetos = async () => {
        try {
            const data = await fetchTipoProjetos();
            const transformedData: { [key: string]: string } = data.reduce((acc: { [key: string]: string }, cur: { [key: string]: string }) => {
              acc[cur.id.toString()] = cur.tipro_nome;
              return acc;
          }, {});
            setTipoProjetosData(transformedData);
            console.log(transformedData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    const [laboratoriosData, setLaboratoriosData] = useState<Laboratorios>({}); // [ { id: 1, name: "Laboratorio 1" }, { id: 2, name: "Laboratorio 2" }, ... ]
    const fecthDataLaboratorios = async () => {
        try {
            const data = await fetchLabs();
            const transformedData: { [key: string]: string } = data.reduce((acc: { [key: string]: string }, cur: { [key: string]: string }) => {
              acc[cur.id.toString()] = cur.name;
              return acc;
          }, {});
            setLaboratoriosData(transformedData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    const [projData, setProjData] = useState([]);

    const fetchData = async () => {
        try {
            const data = await fetchProjetos();
            setProjData(data);
        } catch (error) {
            console.error('Error fetching labs:', error);
        }
    };
    
    useEffect(() => {
        fetchData();
        fecthDataTipoProjetos();
        fecthDataLaboratorios();
    }, []);

    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const [isCreateModalOpen, setCreateModalOpen] = useState(false);

    const [dataPlaceholders, setDataPlaceholders] = useState({
        Id: { data_type: "string", value: "", readOnly: true },
        proj_nome: { data_type: "string", value: "", readOnly: false },
        id_tipro_projeto: { data_type: "id_tipro_projeto", value: "", readOnly: false },
        id_lab_projeto: { data_type: "id_lab_projeto", value: "", readOnly: false } 
    });

    return (
        <div style={{ paddingLeft: '15%', paddingRight: '15%'}}>
            <h1 
            style={{ marginTop: '100px', marginBottom: '40px' }}>
            Projetos
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

            {projData.map((proj: any) => (
                <IndividualInstance
                    key={proj.id}
                    title={proj.proj_nome}
                    subtitle={"Projeto de " + tipoProjetosData[proj.id_tipro_projeto] + " do Laboratório " + laboratoriosData[proj.id_lab_projeto]}
                    onEdit={() => editInstanceClick(proj.id, proj.proj_nome, proj.id_tipro_projeto, proj.id_lab_projeto)}
                    onDelete={() => deleteInstanceClick(proj.id)}
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

export default Projetos;
