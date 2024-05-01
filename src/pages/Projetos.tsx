import React, { useState, useEffect } from 'react';

import IndividualInstance from '../components/shared/IndividualInstance/IndividualInstance';
import EditModal from '../components/shared/Modal/EditModal';
import DeleteModal from '../components/shared/Modal/DeleteModal';
import Popup from '../components/shared/Modal/Popup';

import { fetchProjetos, editProjeto, deleteProjeto, createProjeto } from '../api/api_projetos';
import { fetchTipoProjetos } from '../api/api_tipo_projetos';
import { fetchLabs } from '../api/api_laboratorio';

import './Styles.css'; 
import Dropdown from '../components/shared/Modal/Dropdown';

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
            setEditModalOpen(false)
            handleSuccess("Projeto Editado com Sucesso!");
        } catch (error) {
            console.error('Error editing lab:', error);
            handleError("Erro ao editar projeto!");
        }
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
            setCreateModalOpen(false)
            handleSuccess("Projeto Criado com Sucesso!");
        } catch (error) {
            console.error('Error creating lab:', error);
            handleError("Erro ao criar projeto!");
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
            setDeleteModalOpen(false);
            handleSuccess("Projeto Deletado com Sucesso!");
        } catch (error) {
            console.error('Error deleting lab:', error);
            handleError("Erro ao deletar projeto!");
        }
    }

    const [tipoProjetosData, setTipoProjetosData] = useState<TipoProjetos>({}); // [ { id: 1, name: "Tipo 1" }, { id: 2, name: "Tipo 2" }, ... ]
    const [tipoProjetosPlainData, setTipoProjetosPlainData] = useState([]); // [ { id: 1, name: "Tipo 1" }, { id: 2, name: "Tipo 2" }, ...
    const fecthDataTipoProjetos = async () => {
        try {
            const data = await fetchTipoProjetos();
            let plain_data = data 
            plain_data.unshift({ id: "Nenhum", tipro_nome: "Sem Filtro" });
            setTipoProjetosPlainData(plain_data);
            const transformedData: { [key: string]: string } = data.reduce((acc: { [key: string]: string }, cur: { [key: string]: string }) => {
              acc[cur.id.toString()] = cur.tipro_nome;
              return acc;
          }, {});
            setTipoProjetosData(transformedData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    const [laboratoriosData, setLaboratoriosData] = useState<Laboratorios>({}); // [ { id: 1, name: "Laboratorio 1" }, { id: 2, name: "Laboratorio 2" }, ... ]
    const [laboratoriosPlainData, setLaboratoriosPlainData] = useState([]); // [ { id: 1, name: "Laboratorio 1" }, { id: 2, name: "Laboratorio 2" }, ...
    const fecthDataLaboratorios = async () => {
        try {
            const data = await fetchLabs();
            let plain_data = data 
            plain_data.unshift({ id: "Nenhum", name: "Sem Filtro" });
            setLaboratoriosPlainData(plain_data);
            console.log(plain_data)
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
        let tipo = selectedTipoProjetoFilter === "Nenhum" ? "" : selectedTipoProjetoFilter;
        let lab = selectedLaboratorioFilter === "Nenhum" ? "" : selectedLaboratorioFilter;
        console.log(tipo, lab)
        console.log("Fetching data")
        try {
            const data = await fetchProjetos(lab, tipo, "");
            setProjData(data);
        } catch (error) {
            console.error('Error fetching labs:', error);
        }
    };
    
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const [isCreateModalOpen, setCreateModalOpen] = useState(false);

    const [dataPlaceholders, setDataPlaceholders] = useState({
        Id: { data_type: "string", value: "", readOnly: true },
        proj_nome: { data_type: "string", value: "", readOnly: false },
        id_tipro_projeto: { data_type: "id_tipro_projeto", value: "", readOnly: false },
        id_lab_projeto: { data_type: "id_lab_projeto", value: "", readOnly: false } 
    });

    const [selectedTipoProjetoFilter, setSelectedTipoProjetoFilter] = useState(""); // "" or id
    const [selectedLaboratorioFilter, setSelectedLaboratorioFilter] = useState(""); // "" or id

    useEffect(() => {
        fetchData();
        fecthDataTipoProjetos();
        fecthDataLaboratorios();
    }, [selectedTipoProjetoFilter, selectedLaboratorioFilter]);

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
            Projetos
            </h1>

            <div className="filters">
                <div key="filter-1" className="input-field-filter">
                    <label className="label">Filtro por tipo</label>
                    <Dropdown 
                        key = "filter1"
                        data={tipoProjetosPlainData} 
                        idKey="id" 
                        displayKey="tipro_nome" 
                        onSelectionChange={setSelectedTipoProjetoFilter} 
                        defaultValue={"Nenhum"}
                    />
                </div>
                <div key="filter-2" className="input-field-filter">
                    <label className="label">Filtro por laboratório</label>
                    <Dropdown 
                        key = "filter2"
                        data={laboratoriosPlainData} 
                        idKey="id" 
                        displayKey="name" 
                        onSelectionChange={setSelectedLaboratorioFilter} 
                        defaultValue={"Nenhum"}
                    />
                </div>
            </div>

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
            title="Editar Projeto"
            />
            <DeleteModal
            isOpen = {isDeleteModalOpen}
            onClose={() => setDeleteModalOpen(false)}
            onConfirm={deleteInstanceConfirm}
            />
            <EditModal
            data = {{
                Id: { data_type: "string", value: "", readOnly: true },
                proj_nome: { data_type: "string", value: "", readOnly: false },
                id_tipro_projeto: { data_type: "id_tipro_projeto", value: "", readOnly: false },
                id_lab_projeto: { data_type: "id_lab_projeto", value: "", readOnly: false } 
            }}
            isOpen = {isCreateModalOpen}
            onClose={() => setCreateModalOpen(false)}
            onConfirm={createInstanceConfirm}
            title="Adicionar Projeto"
            />
            <Popup message={successMessage} type="positive" show={showSuccess} />
            <Popup message={errorMessage} type="negative" show={showError} />
        
        </div>
    );
};

export default Projetos;
