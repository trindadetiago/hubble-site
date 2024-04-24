import React, { useState, useEffect } from 'react';
import './Modal.css';

import Dropdown from './Dropdown';

import { fetchTipoProjetos } from '../../../api/api_tipo_projetos';
import { fetchLabs } from '../../../api/api_laboratorio';

interface EditModalProps {
    data: any;
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (data: string) => void;
}

interface Field {
    data_type: 'string' | 'integer' | 'id_tipro_projeto' | 'id_lab_projeto';
    value: string | number;
}

interface Fields {
    [key: string]: Field;
}



const EditModal: React.FC<EditModalProps> = ({ data, isOpen, onClose, onConfirm }) => {
    const [selectedTipoProjeto, setSelectedTipoProjeto] = useState('');
    const [selectedLaboratorio, setSelectedLaboratorio] = useState('');
    
    const [fields, setFields] = useState<Fields>({});

    useEffect(() => {
        setFields(data);
        }, [data]);

    const handleChange = (key: string, value: string | number) => {
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

    useEffect(() => {
        if (isOpen) {
            fecthDataTipoProjetos();
            fecthDataLaboratorios();
        }
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">Editar</div>
                {Object.keys(fields).map((key) => {
                    if (fields[key].data_type === "id_tipro_projeto") {
                        return (
                            <div key={key} className="input-field">
                                <label className="label">{key}</label>
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
                        return (
                            <div key={key} className="input-field">
                                <label className="label">{key}</label>
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
                    if (key !== "Id") {
                        return (
                            <div key={key} className="input-field">
                                <label className="label">{key}</label>
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
