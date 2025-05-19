// src/components/common/NewsButton.jsx
export const NewsButton = ({ children, onClick }) => {
    return (
        <button
            onClick={onClick}
            style={{
                backgroundColor: '#e63946',
                color: 'white',
                border: 'none',
                padding: '0.75rem 1.5rem',
                borderRadius: '4px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                fontSize: '1rem',
                '&:hover': {
                    backgroundColor: '#c1121f',
                    transform: 'translateY(-2px)'
                }
            }}
        >
            {children}
        </button>
    );
};