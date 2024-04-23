import React, { useState, useEffect } from 'react';
import './Modal.css';

interface CreateModalProps {
    data: any;
    isOpen: boolean;
    onClose: () => void;
}

interface Field {
    data_type: 'string' | 'integer';
    value: string | number;
}

interface Fields {
    [key: string]: Field;
}

const CreateModal: React.FC<CreateModalProps> = ({ data, isOpen, onClose }) => {
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
        console.log('Confirm');
        onClose();
    }

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
        <div className="modal-content">
            <div className="modal-header">Criar</div>
            {Object.keys(fields).map((key) => (
            <div key={key} className="input-field">
                <label className="label">{key}</label>
                <input
                type={fields[key].data_type === 'integer' ? 'number' : 'text'}
                className="input"
                value={fields[key].value}
                onChange={(e) => handleChange(key, e.target.value)}
                />
            </div>
            ))}
            <div className="modal-button-container">
                <button className="modal-button modal-close-button" onClick={onClose}>Cancelar</button>
                <button className="modal-button modal-confirm-edit-button" onClick={handleConfirm}>Criar</button>
            </div>
        </div>
        </div>
    );
};

export default CreateModal;
