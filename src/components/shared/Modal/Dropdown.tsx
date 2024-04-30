import React, { useState, useEffect } from 'react';

import './Modal.css';

interface DropdownProps<T> {
    data: T[];
    idKey: keyof T;          // Key to use for option value (id)
    displayKey: keyof T;     // Key to use for displaying option text
    onSelectionChange: (selectedId: any) => void;
    defaultValue?: any;      // Optional defaultValue for pre-selecting an option
}

function Dropdown<T extends { [key: string]: any }>({
    data,
    idKey,
    displayKey,
    onSelectionChange,
    defaultValue
}: DropdownProps<T>) {
    const [selectedId, setSelectedId] = useState<any>();

    useEffect(() => {
        // Set the default selection based on defaultValue
        if (defaultValue && !selectedId) {
            setSelectedId(defaultValue);
            onSelectionChange(defaultValue);
        } else if (!selectedId && data.length > 0) {
            setSelectedId(data[0][idKey]); // Fallback to the first item's id if no defaultValue
        }
    }, [data, idKey, defaultValue]);

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const id = event.target.value;
        setSelectedId(id);
        onSelectionChange(id);
        console.log("Selected ID: ", id)
    };

    return (
        <div className="dropdown">
            <select onChange={handleChange} value={selectedId}>
                {data.map(item => (
                    <option key={item[idKey]} value={item[idKey]}>
                        {item[displayKey]}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default Dropdown;
