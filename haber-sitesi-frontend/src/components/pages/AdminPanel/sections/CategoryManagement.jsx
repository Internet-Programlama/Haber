import React, { useState } from 'react';
import Button from '../../../Button';
import { styles } from '../../../../basics/styles';

export const CategoryManagement = () => {
    const [categories, setCategories] = useState(['Güncel', 'Ekonomi', 'Spor']);
    const [newCategory, setNewCategory] = useState('');

    const handleAddCategory = () => {
        if (newCategory.trim()) {
            setCategories([...categories, newCategory.trim()]);
            setNewCategory('');
        }
    };

    const handleDeleteCategory = (category) => {
        setCategories(categories.filter(cat => cat !== category));
    };

    return (
        <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
            overflow: 'hidden',
            maxWidth: '600px',
            margin: '0 auto',
            padding: '2rem',
        }}>
            <h2 style={{
                fontSize: '1.5rem',
                fontWeight: 700,
                color: '#2D3748',
                marginBottom: '1.5rem',
                borderBottom: '2px solid #E2E8F0',
                paddingBottom: '0.5rem',
                textAlign: 'center',
            }}>
                Kategori Yönetimi
            </h2>

            <div style={{ marginBottom: '2rem' }}>
                <h3 style={{
                    fontSize: '1.1rem',
                    fontWeight: 500,
                    color: '#4A5568',
                    marginBottom: '1rem',
                }}>
                    Yeni Kategori Ekle
                </h3>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <input
                        type="text"
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)}
                        placeholder="Kategori adı girin"
                        style={{
                            flex: 1,
                            padding: '0.75rem 1rem',
                            border: '1px solid #E2E8F0',
                            borderRadius: '8px',
                            fontSize: '1rem',
                            outline: 'none',
                            transition: 'all 0.3s ease',
                            boxShadow: 'inset 0 1px 2px rgba(0, 0, 0, 0.05)',
                            backgroundColor: '#F9FAFB',
                            color: '#2D3748',
                        }}
                    />
                    <Button
                        onClick={handleAddCategory}
                        style={{
                            backgroundColor: '#E11D48',
                            color: '#FFFFFF',
                            padding: '0.75rem 1.5rem',
                            borderRadius: '8px',
                            fontWeight: 600,
                            fontSize: '1rem',
                            border: 'none',
                            boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
                            transition: 'all 0.2s ease-in-out',
                            cursor: 'pointer',
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#BE123C'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#E11D48'}
                    >
                        Kategori Ekle
                    </Button>
                </div>
            </div>

            <div>
                <h3 style={{
                    fontSize: '1.1rem',
                    fontWeight: 500,
                    color: '#4A5568',
                    marginBottom: '1rem',
                }}>
                    Mevcut Kategoriler
                </h3>
                <div style={{
                    border: '1px solid #E2E8F0',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    backgroundColor: '#F9FAFB',
                }}>
                    {categories.length > 0 ? (
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                            {categories.map((category, index) => (
                                <li key={index} style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    padding: '0.75rem 1rem',
                                    borderBottom: index < categories.length - 1 ? '1px solid #E2E8F0' : 'none',
                                    backgroundColor: index % 2 === 0 ? '#FFFFFF' : '#F9FAFB',
                                    transition: 'background-color 0.3s ease',
                                }}>
                                    <span style={{
                                        fontSize: '1rem',
                                        color: '#2D3748',
                                    }}>
                                        {category}
                                    </span>
                                    <Button
                                        onClick={() => handleDeleteCategory(category)}
                                        variant="danger"
                                        style={{
                                            padding: '0.5rem 1rem',
                                            fontSize: '0.875rem',
                                            backgroundColor: '#EF4444',
                                            color: '#FFFFFF',
                                            borderRadius: '6px',
                                            fontWeight: 500,
                                            border: 'none',
                                            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.08)',
                                            transition: 'all 0.2s ease-in-out',
                                            cursor: 'pointer',
                                        }}
                                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#DC2626'}
                                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#EF4444'}
                                    >
                                        Sil
                                    </Button>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <div style={{
                            padding: '1rem',
                            textAlign: 'center',
                            color: '#A0AEC0',
                            fontSize: '1rem',
                        }}>
                            Henüz kategori eklenmemiş
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
