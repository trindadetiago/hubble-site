import React, { useState, useEffect } from 'react';
import './Modal.css';

import Dropdown from './Dropdown';
import DateInput from './DateInput';

import { fetchTipoProjetos } from '../../../api/api_tipo_projetos';
import { fetchLabs } from '../../../api/api_laboratorio';
import { fetchCursos } from '../../../api/api_cursos';
import { fetchPessoas } from '../../../api/api_pessoas';
import { fetchProjetos } from '../../../api/api_projetos';

interface EditModalProps {
    data: any;
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (data: string) => void;
}

interface Field {
    data_type: 'string' | 'integer' | 'id_tipro_projeto' | 'id_lab_projeto' | 'id_curso' | "role" | "id_pessoa_vinculo" | "id_projeto_vinculo" | "bool" | "vinc_data_inicio" | "vinc_data_fim";
    value: string;
}

interface Fields {
    [key: string]: Field;
}

type LabelKeys = {
    [key: string]: string;
};

const labels: LabelKeys = {
    "Nome": "Nome do Laboratório",
    "Descricao": "Descrição",
    "proj_nome": "Nome do Projeto",
    "id_tipro_projeto": "Tipo de Projeto",
    "id_lab_projeto": "Laboratório",
    "tipro_nome": "Tipo de Projeto",
    "PessNome": "Nome",
    "PessEmail": "Email",
    "IdCurso": "Curso",
    "PessMatricula": "Matricula",
    "PessRole": "Cargo",
    "vinc_cargo": "Cargo",
    "vinc_carga_horaria": "Carga Horária",
    "vinc_remunerado": "Remunerado",
    "vinc_data_inicio": "Data de Início",
    "vinc_data_fim": "Data de Fim",
    "id_pessoa_vinculo": "Pessoa",
    "id_projeto_vinculo": "Projeto",
};

const EditModal: React.FC<EditModalProps> = ({ data, isOpen, onClose, onConfirm }) => {
    const [selectedTipoProjeto, setSelectedTipoProjeto] = useState('');
    const [selectedLaboratorio, setSelectedLaboratorio] = useState('');
    const [selectedCurso, setSelectedCurso] = useState('');
    const [selectedRole, setSelectedRole] = useState('');
    const [selectedPessoa, setSelectedPessoa] = useState(''); 
    const [selectedProjeto, setSelectedProjeto] = useState(''); 
    const [selectedVincRemunerado, setSelectedVincRemunerado] = useState('');
    const [selectedDataInicio, setSelectedDataInicio] = useState('');
    const [selectedDataFim, setSelectedDataFim] = useState('');

    const [fields, setFields] = useState<Fields>({});

    useEffect(() => {
        setFields(data);
        }, [data]);

    const handleChange = (key: string, value: string) => {
        setFields(prev => ({
            ...prev,
            [key]: { ...prev[key], value }
        }));
    };

    const handleConfirm = () => {
        if (fields.hasOwnProperty('id_tipro_projeto')) {
            fields['id_tipro_projeto'].value = selectedTipoProjeto;
        }
        if (fields.hasOwnProperty('id_lab_projeto')) {
            fields['id_lab_projeto'].value = selectedLaboratorio;
        }
        if (fields.hasOwnProperty('IdCurso')) {
            fields['IdCurso'].value = selectedCurso;
        }
        if (fields.hasOwnProperty('PessRole')) {
            fields['PessRole'].value = selectedRole;
        }
        if (fields.hasOwnProperty('id_pessoa_vinculo')) {
            fields['id_pessoa_vinculo'].value = selectedPessoa;
        }
        if (fields.hasOwnProperty('id_projeto_vinculo')) {
            fields['id_projeto_vinculo'].value = selectedProjeto;
        }
        if (fields.hasOwnProperty('vinc_remunerado')) {
            fields['vinc_remunerado'].value = selectedVincRemunerado;
            fields['vinc_remunerado'].value = fields['vinc_remunerado'].value === 'Sim' ? 'true' : 'false'
        }
        if (fields.hasOwnProperty('vinc_data_inicio')) {
            fields['vinc_data_inicio'].value = selectedDataInicio;
        }
        if (fields.hasOwnProperty('vinc_data_fim')) {
            fields['vinc_data_fim'].value = selectedDataFim;
        }
        const updatedFields = JSON.stringify(fields);
        console.log("SENDING", updatedFields)
        onConfirm(updatedFields);
    }

    const [tipoProjetosData, setTipoProjetosData] = useState([]); // [ { id: 1, name: "Tipo 1" }, { id: 2, name: "Tipo 2" }, ... ]
    const fecthDataTipoProjetos = async () => {
        try {
            const data = await fetchTipoProjetos();
            console.log(data);
            setTipoProjetosData(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    const [laboratoriosData, setLaboratoriosData] = useState([]); // [ { id: 1, name: "Laboratorio 1" }, { id: 2, name: "Laboratorio 2" }, ... ]
    const fecthDataLaboratorios = async () => {
        try {
            const data = await fetchLabs();
            console.log(data);
            setLaboratoriosData(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    const [cursosData, setCursosData] = useState([]); // [ { id: 1, name: "Curso 1" }, { id: 2, name: "Curso 2" }, ... ]
    const fecthDataCursos = async () => {
        try {
            const data = await fetchCursos();
            console.log(data);
            setCursosData(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    const [pessoasData, setPessoasData] = useState([]); // [ { id: 1, name: "Pessoa 1" }, { id: 2, name: "Pessoa 2" }, ... ]
    const fecthDataPessoas = async () => {
        try {
            const data = await fetchPessoas();
            console.log(data);
            setPessoasData(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    const [projetosData, setProjetosData] = useState([]); // [ { id: 1, name: "Projeto 1" }, { id: 2, name: "Projeto 2" }, ... ]
    const fecthDataProjetos = async () => {
        try {
            const data = await fetchProjetos();
            console.log(data);
            setProjetosData(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    useEffect(() => {
        if (isOpen) {
            fecthDataTipoProjetos();
            fecthDataLaboratorios();
            fecthDataCursos();
            fecthDataPessoas();
            fecthDataProjetos();
        }
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">Editar</div>
                {Object.keys(fields).map((key) => {
                    if (fields[key].data_type === "id_tipro_projeto") {
                        const label = labels[key as keyof LabelKeys];
                        return (
                            <div key={key} className="input-field">
                                <label className="label">{label}</label>
                                <Dropdown 
                                    key = {key}
                                    data={tipoProjetosData} 
                                    idKey="id" 
                                    displayKey="tipro_nome" 
                                    onSelectionChange={setSelectedTipoProjeto} 
                                    defaultValue={fields[key].value}
                                />
                            </div>
                        );
                    }
                    if (fields[key].data_type === "id_lab_projeto") {
                        const label = labels[key as keyof LabelKeys];
                        return (
                            <div key={key} className="input-field">
                                <label className="label">{label}</label>
                                <Dropdown 
                                    key = {key}
                                    data={laboratoriosData} 
                                    idKey="id" 
                                    displayKey="name" 
                                    onSelectionChange={setSelectedLaboratorio} 
                                    defaultValue={fields[key].value}
                                />
                            </div>
                        );
                    }
                    if (fields[key].data_type === "id_curso") {
                        const label = labels[key as keyof LabelKeys];
                        return (
                            <div key={key} className="input-field">
                                <label className="label">{label}</label>
                                <Dropdown 
                                    key = {key}
                                    data={cursosData} 
                                    idKey="id" 
                                    displayKey="nome" 
                                    onSelectionChange={setSelectedCurso} 
                                    defaultValue={fields[key].value}
                                />
                            </div>
                        );
                    }
                    if (fields[key].data_type === "role") {
                        const label = labels[key as keyof LabelKeys];
                        return (
                            <div key={key} className="input-field">
                                <label className="label">{label}</label>
                                <Dropdown 
                                    key = {key}
                                    data={[{ id: "aluno", name: "aluno" }, { id: "professor", name: "professor" }]} 
                                    idKey="id" 
                                    displayKey="name" 
                                    onSelectionChange={setSelectedRole} 
                                    defaultValue={fields[key].value}
                                />
                            </div>
                        );
                    }
                    if (fields[key].data_type === "id_pessoa_vinculo") {
                        const label = labels[key as keyof LabelKeys];
                        return (
                            <div key={key} className="input-field">
                                <label className="label">{label}</label>
                                <Dropdown 
                                    key = {key}
                                    data={pessoasData} 
                                    idKey="id" 
                                    displayKey="pess_nome" 
                                    onSelectionChange={setSelectedPessoa} 
                                    defaultValue={fields[key].value}
                                />
                            </div>
                        );
                    }
                    if (fields[key].data_type === "id_projeto_vinculo") {
                        const label = labels[key as keyof LabelKeys];
                        return (
                            <div key={key} className="input-field">
                                <label className="label">{label}</label>
                                <Dropdown 
                                    key = {key}
                                    data={projetosData} 
                                    idKey="id" 
                                    displayKey="proj_nome" 
                                    onSelectionChange={setSelectedProjeto} 
                                    defaultValue={fields[key].value}
                                />
                            </div>
                        );
                    }
                    if (fields[key].data_type === "bool") {
                        const label = labels[key as keyof LabelKeys];
                        return (
                            <div key={key} className="input-field">
                                <label className="label">{label}</label>
                                <Dropdown 
                                    key = {key}
                                    data={[{"ids": "true", "name": "Sim"}, {"ids": "false", "name": "Não"}]} 
                                    idKey="ids" 
                                    displayKey="name" 
                                    onSelectionChange={setSelectedVincRemunerado} 
                                    defaultValue={fields[key].value === 'true' ? 'Sim' : 'Não'}
                                />
                            </div>
                        );
                    }
                    if (key === "vinc_data_inicio") {
                        const label = labels[key as keyof LabelKeys];
                        return (
                            <div key={key} className="input-field">
                                <label className="label">{label}</label>
                                <DateInput
                                    initialValue={fields[key].value}
                                    onDateChange={setSelectedDataInicio}
                                />
                            </div>
                        );
                    }
                    if (key === "vinc_data_fim") {
                        const label = labels[key as keyof LabelKeys];
                        return (
                            <div key={key} className="input-field">
                                <label className="label">{label}</label>
                                <DateInput
                                    initialValue={fields[key].value}
                                    onDateChange={setSelectedDataFim}
                                />
                            </div>
                        );
                    }
                    if (key !== "Id") {
                        const label = labels[key as keyof LabelKeys];
                        return (
                            <div key={key} className="input-field">
                                <label className="label">{label}</label>
                                <input
                                    type={fields[key].data_type === 'integer' ? 'number' : 'text'}
                                    className="input"
                                    value={fields[key].value}
                                    onChange={(e) => handleChange(key, e.target.value)}
                                />
                            </div>
                        );
                    }
                    return null; // Return null for "Id", so nothing is rendered
                })}
                <div className="modal-button-container">
                    <button className="modal-button modal-close-button" onClick={onClose}>Cancelar</button>
                    <button className="modal-button modal-confirm-edit-button" onClick={handleConfirm}>Confirmar</button>
                </div>
            </div>
        </div>
    );
};

export default EditModal;
