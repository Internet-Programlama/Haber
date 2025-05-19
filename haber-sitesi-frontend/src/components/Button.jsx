import React from 'react';
import { styles } from '../basics/styles';

export const Button = ({
    children,
    onClick,
    style = {},
    variant = 'default'
}) => {
    const buttonStyles = {
        default: styles.navButton,
        danger: { ...styles.navButton, backgroundColor: '#e74c3c' },
        fullWidth: { ...styles.navButton, width: '100%', marginTop: '10px' },
        category: { ...styles.navButton, width: '100%', marginBottom: '10px' }
    };

    return (
        <button
            onClick={onClick}
            style={{ ...buttonStyles[variant], ...style }}
            className="hover:opacity-80 transition-opacity"
        >
            {children}
        </button>
    );
};
export default Button;