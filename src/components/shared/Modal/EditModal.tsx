import React, { useState, useEffect } from 'react';
import './Modal.css';

interface EditModalProps {
    data: any;
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (data: string) => void;
}

interface Field {
    data_type: 'string' | 'integer';
    value: string | number;
}

interface Fields {
    [key: string]: Field;
}

const EditModal: React.FC<EditModalProps> = ({ data, isOpen, onClose, onConfirm }) => {
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
        const updatedFields = JSON.stringify(fields);
        onConfirm(updatedFields);
    }

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">Editar</div>
                {Object.keys(fields).map((key) => {
                    // Only render input fields for keys other than "Id"
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
