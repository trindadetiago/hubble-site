import React, { useState, useEffect } from 'react';
import './EditModal.css';

interface EditModalProps {
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

const EditModal: React.FC<EditModalProps> = ({ data, isOpen, onClose }) => {
// Initialize state with the JSON structure
const [fields, setFields] = useState<Fields>({});

// Effect to set initial field values based on props
useEffect(() => {
    setFields(data);
    }, [data]);

// Handle change in input fields
const handleChange = (key: string, value: string | number) => {
    setFields(prev => ({
        ...prev,
        [key]: { ...prev[key], value }
    }));
    };

    // Render the modal only if it is open
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
        <div className="modal-content">
            <div className="modal-header">Edit Your Data</div>
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
            <button onClick={onClose}>Close</button>
        </div>
        </div>
    );
};

export default EditModal;
