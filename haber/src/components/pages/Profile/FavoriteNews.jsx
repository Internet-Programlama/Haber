import React from 'react';

export const FavoriteNews = ({ articles }) => {
    return (
        <div style={{
            backgroundColor: '#fff',
            padding: '1.5rem',
            borderRadius: '8px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
        }}>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '1rem',
                borderBottom: '1px solid #eee',
                paddingBottom: '0.75rem'
            }}>
                <h2 style={{
                    margin: '0',
                    fontSize: '1.25rem',
                    fontWeight: '600',
                    color: '#333'
                }}>
                    Favori Haberler
                </h2>
                <span style={{
                    backgroundColor: '#f0f0f0',
                    color: '#555',
                    fontSize: '0.85rem',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '999px',
                    fontWeight: '500'
                }}>
                    {articles.length}
                </span>
            </div>

            <ul style={{
                listStyle: 'none',
                padding: '0',
                margin: '0'
            }}>
                {articles.map(article => (
                    <li key={article.id} style={{
                        padding: '0.75rem 0',
                        borderBottom: '1px solid #f0f0f0'
                    }}>
                        <a href="#" style={{
                            textDecoration: 'none',
                            color: 'inherit',
                            display: 'block'
                        }}>
                            <h3 style={{
                                margin: '0 0 0.35rem 0',
                                fontSize: '1rem',
                                fontWeight: '500',
                                color: '#333'
                            }}>
                                {article.title}
                            </h3>
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                fontSize: '0.8rem',
                                color: '#666'
                            }}>
                                <span>{article.date}</span>
                                <span style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.25rem'
                                }}>
                                    <svg
                                        width="14"
                                        height="14"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                        <circle cx="12" cy="12" r="3" />
                                    </svg>
                                    {article.readCount.toLocaleString()}
                                </span>
                            </div>
                        </a>
                    </li>
                ))}
            </ul>

            <button style={{
                width: '100%',
                padding: '0.75rem',
                backgroundColor: '#f5f5f5',
                border: 'none',
                borderRadius: '4px',
                marginTop: '1rem',
                color: '#555',
                fontWeight: '500',
                cursor: 'pointer',
                fontSize: '0.875rem'
            }}>
                Tüm Favori Haberleri Görüntüle
            </button>
        </div>
    );
};