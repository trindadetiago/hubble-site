import React, { useState, useEffect } from 'react';
import './Modal.css';

interface DateInputProps {
    initialValue?: string;          // Optional initial value for the date input
    onDateChange: (date: string) => void;  // Callback to handle date changes
}

function DateInput({
    initialValue,
    onDateChange
}: DateInputProps) {
    const [date, setDate] = useState<string>('');

    useEffect(() => {
        // Initialize the component with the initial value if provided
        if (initialValue) {
            const formattedDate = formatDate(initialValue);
            setDate(formattedDate);
            onDateChange(formattedDate);
        }
    }, [initialValue, onDateChange]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newDate = formatDate(event.target.value);
        setDate(newDate);
        onDateChange(newDate);
    };

    // Format the date string to "yyyy-mm-dd" which is the expected format for input[type="date"]
    const formatDate = (dateStr: string): string => {
        const dateObj = new Date(dateStr);
        return dateObj.toISOString().split('T')[0];
    };

    return (
        <div className="date-input-container">
            <input
                type="date"
                value={date}
                onChange={handleChange}
                className="date-input"
            />
        </div>
    );
}

export default DateInput;
