import React from 'react';

import './IndividualInstance.css';

import editIcon from '../../../assets/images/icons/edit-icon.svg';
import trashIcon from '../../../assets/images/icons/trash-icon.svg';

interface IndividualInstanceProps {
    title: string;
    subtitle: string;
}

const IndividualInstance: React.FC<IndividualInstanceProps> = ({ title, subtitle }) => {
    const handleEdit = () => {
        console.log('Edit');
    };

    const handleDelete = () => {
        console.log('Delete');
    };
  
    return (
    <div className='individual-instance-container'>
        <div className='ii-left-container'>
            <h1 className='ii-title'>{title}</h1>
            <h2 className='ii-subtitle'>{subtitle}</h2>
        </div>
        <div className='ii-right-container'>
            <div className='ii-images-container'>
                <button className='ii-button' onClick={handleEdit}>
                    <img src={editIcon} alt='Edit Icon' className='ii-image' />
                </button>
                <button className='ii-button' onClick={handleDelete}>
                    <img src={trashIcon} alt='Trash Icon' className='ii-image' />
                </button>
            </div>
        </div>
    </div>
  );
};

export default IndividualInstance;
