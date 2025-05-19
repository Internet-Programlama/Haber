// src/basics/styles.js
export const styles = {
    colors: {
        primary: '#e63946',
        dark: '#1a1a1a',
        light: '#f8f9fa',
        text: '#333333',
        muted: '#6c757d',
        white: '#ffffff'
    },
    homeContainer: {
        maxWidth: '1200px',
        margin: '2rem auto',
        padding: '0 1rem'
    },
    newsCard: {
        backgroundColor: '#ffffff',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        overflow: 'hidden',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        ':hover': {
            transform: 'translateY(-5px)',
            boxShadow: '0 10px 15px rgba(0,0,0,0.1)'
        }
    },
    headline: {
        fontSize: '2rem',
        fontWeight: '700',
        margin: '1rem 0',
        color: '#1a1a1a',
        lineHeight: '1.2'
    },
    sectionTitle: {
        fontSize: '1.5rem',
        fontWeight: '600',
        marginBottom: '1.5rem',
        color: '#e63946',
        position: 'relative',
        paddingBottom: '0.5rem',
        '::after': {
            content: '""',
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '50px',
            height: '3px',
            backgroundColor: '#e63946'
        }
    }
};