import React, { useEffect, useState } from 'react';
import './Modal.css';

interface PopupProps {
    message: string;
    type: string;
    show: boolean;
}

const Popup: React.FC<PopupProps> = ({ message, type, show }) => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (show) {
            setVisible(true);
            const timer = setTimeout(() => {
                setVisible(false);
            }, 3000); // Popup disappears after 3000 ms = 3 seconds
            return () => clearTimeout(timer);
        }
    }, [show]);

    if (!visible) return null;

    return (
        <div className={`popup ${type}`}>
            {message}
        </div>
    );
};

export default Popup;
