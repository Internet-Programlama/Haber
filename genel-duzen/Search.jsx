import React, { useState } from 'react';

// Placeholder Input 
const Input = ({ placeholder, value, onChange }) => (
    <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        style={{
            width: '100%',
            padding: '0.75rem',
            backgroundColor: '#111',
            border: '1px solid #333',
            borderRadius: '0.5rem',
            color: '#fff',
            fontSize: '1rem',
            transition: 'all 0.2s ease',
            boxSizing: 'border-box',
        }}
    />
);

// Placeholder Button
const Button = ({ children, onClick }) => (
    <button
        onClick={onClick}
        style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            background: 'linear-gradient(to right, #e63946, #c1121f)',
            color: '#ffffff',
            fontWeight: 600,
            padding: '0.75rem 1.5rem',
            borderRadius: '0.5rem',
            border: 'none',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 6px rgba(230, 57, 70, 0.2)',
        }}
    >
        {children}
    </button>
);

// Theme
const theme = {
    colors: {
        white: '#ffffff',
        black: '#000000',
        dark: '#111111',
        primary: '#e63946',
        light: '#1e1e1e',
        textPrimary: '#f1f1f1',
        textSecondary: '#cccccc',
    },
};

// Styles
const updatedStyles = {
    homeContainer: {
        backgroundColor: theme.colors.dark,
        padding: '2rem',
        borderRadius: '0.75rem',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
        width: '100%',
        maxWidth: '800px',
        margin: '0 auto',
    },
    newsCard: {
        backgroundColor: theme.colors.light,
        borderRadius: '0.5rem',
        border: `1px solid ${theme.colors.black}`,
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
        transition: 'transform 0.2s ease',
        cursor: 'pointer',
        position: 'relative',
        overflow: 'hidden',
    },
    title: {
        color: theme.colors.textPrimary,
        fontSize: '1.5rem',
        fontWeight: 700,
        marginBottom: '1rem',
    },
    subtitle: {
        color: theme.colors.textPrimary,
        fontSize: '1.25rem',
        fontWeight: 600,
        marginBottom: '1rem',
    },
    resultTitle: {
        color: theme.colors.textPrimary,
        fontSize: '1.125rem',
        fontWeight: 500,
        marginBottom: '0.25rem',
    },
    resultCategory: {
        color: theme.colors.primary,
        fontSize: '0.875rem',
        fontWeight: 500,
    },
};

// Named Export
export const Search = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const handleSearch = () => {
        const mockResults = [
            { id: 1, title: 'Teknoloji gelişmeleri', category: 'Teknoloji' },
            { id: 2, title: 'Ekonomi haberleri', category: 'Ekonomi' },
            { id: 3, title: 'Spor müsabakaları', category: 'Spor' },
        ];

        setSearchResults(
            mockResults.filter((item) =>
                item.title.toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
    };

    return (
        <div style={updatedStyles.homeContainer}>
            <h2 style={updatedStyles.title}>Haber Ara</h2>

            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', width: '100%' }}>
                <div style={{ flex: 1 }}>
                    <Input
                        placeholder="Arama yap..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <Button onClick={handleSearch}>Ara</Button>
            </div>

            {searchResults.length > 0 && (
                <div>
                    <h3 style={updatedStyles.subtitle}>Arama Sonuçları</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {searchResults.map((result) => (
                            <div
                                key={result.id}
                                style={{
                                    ...updatedStyles.newsCard,
                                    padding: '1rem',
                                    borderLeft: `4px solid ${theme.colors.primary}`,
                                }}
                            >
                                <h4 style={updatedStyles.resultTitle}>{result.title}</h4>
                                <p style={updatedStyles.resultCategory}>{result.category}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};
