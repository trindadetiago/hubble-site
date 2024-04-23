import React from 'react';
import './Modal.css';

interface DeleteModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({ isOpen, onClose, onConfirm }) => {
    const handleConfirm = () => {
        console.log('Confirm');
        onConfirm();
    }

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
        <div className="modal-content">
            <div className="modal-header">Deletar</div>
            <div>Você tem certeza que deseja deletar?</div>
            <div className="modal-button-container">
                <button className="modal-button modal-close-button" onClick={onClose}>Cancelar</button>
                <button className="modal-button modal-confirm-delete-button" onClick={handleConfirm}>Confirmar</button>
            </div>
        </div>
        </div>
    );
};

export default DeleteModal;
