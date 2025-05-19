import React from 'react';
import { styles } from '../basics/styles';

export const Input = ({
    type = 'text',
    placeholder,
    value,
    onChange,
    name,
    className = ''
}) => {
    return (
        <input
            type={type}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            style={styles.input}
            className={`focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
        />
    );
};
export default Input;