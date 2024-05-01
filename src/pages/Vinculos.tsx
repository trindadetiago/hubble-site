import React, { useState, useEffect } from 'react';

import IndividualInstance from '../components/shared/IndividualInstance/IndividualInstance';
import EditModal from '../components/shared/Modal/EditModal';
import DeleteModal from '../components/shared/Modal/DeleteModal';
import Popup from '../components/shared/Modal/Popup';

import { fetchVinculos, editVinculo, deleteVinculo, createVinculo } from '../api/api_vinculos';
import { fetchProjetos } from '../api/api_projetos';
import { fetchLabs } from '../api/api_laboratorio';
import { fetchPessoas } from '../api/api_pessoas';

import './Styles.css'; 
import Dropdown from '../components/shared/Modal/Dropdown';

interface Projetos {
    [key: string]: string;
}

interface Laboratorios {
    [key: string]: string;
}

interface Pessoas {
    [key: string]: string;
}

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
            setEditModalOpen(false)
            handleSuccess("Vínculo Editado com Sucesso!");
        } catch (error) {
            console.error('Error editing lab:', error);
            handleError("Erro ao editar Vínculo!");
        }
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
            setCreateModalOpen(false)
            handleSuccess("Vínculo Criado com Sucesso!");
        } catch (error) {
            console.error('Error creating lab:', error);
            handleError("Erro ao criar Vínculo!");
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
            setDeleteModalOpen(false);
            handleSuccess("Vínculo Deletado com Sucesso!");
        } catch (error) {
            console.error('Error deleting lab:', error);
            handleError("Erro ao deletar Vínculo!");
        }
    }

    const [vincData, setVincData] = useState([]);

    const fetchData = async () => {
        let proj = selectedProjetoFilter === "Nenhum" ? "" : selectedProjetoFilter;
        

        try {
            const data = await fetchVinculos(proj);
            setVincData(data);
        } catch (error) {
            console.error('Error fetching labs:', error);
        }
    };

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

    const [laboratoriosData, setLaboratoriosData] = useState<Laboratorios>({}); // [ { id: 1, name: "Laboratorio 1" }, { id: 2, name: "Laboratorio 2" }, ... ]
    const [laboratoriosPlainData, setLaboratoriosPlainData] = useState([]); // [ { id: 1, name: "Laboratorio 1" }, { id: 2, name: "Laboratorio 2" }, ...
    
    const fecthDataLaboratorios = async () => {
        try {
            const data = await fetchLabs();
            let plain_data = data 
            plain_data.unshift({ id: "Nenhum", name: "Todos" });
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

    const [projetosData, setProjetosData] = useState<Projetos>({}); // [ { id: 1, name: "Projeto 1" }, { id: 2, name: "Projeto 2" }, ... 
    const [projetosPlainData, setProjetosPlainData] = useState([]); // [ { id: 1, name: "Projeto 1" }, { id: 2, name: "Projeto 2" }, ...

    const fecthDataProjetos = async () => {
        let lab = selectedLaboratorioFilter === "Nenhum" ? "" : selectedLaboratorioFilter;
        
        try {
            const data = await fetchProjetos(lab, "", "");
            let plain_data = data 
            plain_data.unshift({ id: "Nenhum", proj_nome: "Sem Filtro" });
            setProjetosPlainData(plain_data);
            console.log(plain_data)
            const transformedData: { [key: string]: string } = data.reduce((acc: { [key: string]: string }, cur: { [key: string]: string }) => {
                acc[cur.id.toString()] = cur.proj_nome;
                return acc;
            }, {});
            setProjetosData(transformedData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    const [pessoasData, setPessoasData] = useState<Pessoas>({}); // [ { id: 1, name: "Pessoa 1" }, { id: 2, name: "Pessoa 2" }, ...
    const fetchDataPessoas = async () => {
        try {
            const data = await fetchPessoas();
            const transformedData: { [key: string]: string } = data.reduce((acc: { [key: string]: string }, cur: { [key: string]: string }) => {
                acc[cur.id.toString()] = cur.pess_nome;
                return acc;
            }, {});
            console.log(transformedData)
            setPessoasData(transformedData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    const [selectedLaboratorioFilter, setSelectedLaboratorioFilter] = useState(""); // "" or id
    const [selectedProjetoFilter, setSelectedProjetoFilter] = useState(""); // "" or id

    useEffect(() => {
        fetchData();
        fecthDataLaboratorios();
        fecthDataProjetos();
        fetchDataPessoas();
    }, [selectedLaboratorioFilter, selectedProjetoFilter]);

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
            Vínculos
            </h1>

            <div className="filters">
                <div key="filter-1" className="input-field-filter">
                    <label className="label">Selecionar laboratório</label>
                    <Dropdown 
                        key="filter1"
                        data={laboratoriosPlainData} 
                        idKey="id" 
                        displayKey="name" 
                        onSelectionChange={setSelectedLaboratorioFilter} 
                        defaultValue={"Nenhum"}
                    />
                </div>
                <div key="filter-2" className="input-field-filter">
                    <label className="label">Filtro por projeto</label>
                    <Dropdown 
                        key="filter2"
                        data={projetosPlainData} 
                        idKey="id" 
                        displayKey="proj_nome" 
                        onSelectionChange={setSelectedProjetoFilter} 
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

            {vincData.map((vinc: any) => (
                <IndividualInstance
                    key={vinc.id}
                    title={pessoasData[vinc.id_pessoa_vinculo] + " para o cargo '" + vinc.vinc_cargo + "'"}
                    subtitle={"Carga horária: " + vinc.vinc_carga_horaria + " horas, " + (vinc.vinc_remunerado === 'true' ? 'Remunerado' : 'Não Remunerado') + ", Projeto: " + projetosData[vinc.id_projeto_vinculo]}
                    onEdit={() => editInstanceClick(vinc.id, vinc.vinc_cargo, vinc.vinc_carga_horaria, vinc.vinc_remunerado, vinc.vinc_data_inicio, vinc.vinc_data_fim, vinc.id_pessoa_vinculo, vinc.id_projeto_vinculo)}
                    onDelete={() => deleteInstanceClick(vinc.id)}
                />
            ))}

            <button 
            className='add-button'
            onClick={createInstanceClick}
            >Adicionar</button>

            <EditModal
            data={dataPlaceholders}
            isOpen={isEditModalOpen}
            onClose={() => setEditModalOpen(false)}
            onConfirm={editInstanceConfirm}
            title="Editar Vínculo"
            />
            <DeleteModal
            isOpen={isDeleteModalOpen}
            onClose={() => setDeleteModalOpen(false)}
            onConfirm={deleteInstanceConfirm}
            />
            <EditModal
            data={{
                Id: { data_type: "string", value: "", readOnly: true },
                vinc_cargo: { data_type: "string", value: "", readOnly: false },
                vinc_carga_horaria: { data_type: "string", value: "", readOnly: false },
                vinc_remunerado: { data_type: "bool", value: "", readOnly: false },
                vinc_data_inicio: { data_type: "vinc_data_inicio", value: "", readOnly: false },
                vinc_data_fim: { data_type: "vinc_data_fim", value: "", readOnly: false },
                id_pessoa_vinculo: { data_type: "id_pessoa_vinculo", value: "", readOnly: false },
                id_projeto_vinculo: { data_type: "id_projeto_vinculo", value: "", readOnly: false }
            }}
            isOpen={isCreateModalOpen}
            onClose={() => setCreateModalOpen(false)}
            onConfirm={createInstanceConfirm}
            title="Adicionar Vínculo"
            />
            <Popup message={successMessage} type="positive" show={showSuccess} />
            <Popup message={errorMessage} type="negative" show={showError} />
        
        </div>
    );
};

export default Vinculos;
