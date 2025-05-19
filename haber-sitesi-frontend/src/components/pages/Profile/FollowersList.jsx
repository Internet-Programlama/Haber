import React from 'react';

export const FollowersList = ({ followers }) => {
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
                    Takipçiler
                </h2>
                <span style={{
                    backgroundColor: '#f0f0f0',
                    color: '#555',
                    fontSize: '0.85rem',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '999px',
                    fontWeight: '500'
                }}>
                    {followers.length}
                </span>
            </div>

            <ul style={{
                listStyle: 'none',
                padding: '0',
                margin: '0'
            }}>
                {followers.map(follower => (
                    <li key={follower.id} style={{
                        padding: '0.75rem 0',
                        borderBottom: '1px solid #f0f0f0',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem'
                    }}>
                        <div style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            overflow: 'hidden',
                            backgroundColor: '#f0f0f0'
                        }}>
                            <img
                                src={follower.avatar}
                                alt={follower.name}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover'
                                }}
                            />
                        </div>
                        <div style={{
                            flex: '1'
                        }}>
                            <p style={{
                                margin: '0',
                                fontSize: '0.95rem',
                                fontWeight: '500',
                                color: '#333'
                            }}>
                                {follower.name}
                            </p>
                        </div>
                        <button style={{
                            padding: '0.35rem 0.75rem',
                            backgroundColor: 'transparent',
                            border: '1px solid #ddd',
                            borderRadius: '4px',
                            fontSize: '0.75rem',
                            color: '#666',
                            cursor: 'pointer'
                        }}>
                            Profil
                        </button>
                    </li>
                ))}
            </ul>

            {followers.length > 3 && (
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
                    Tüm Takipçileri Görüntüle
                </button>
            )}
        </div>
    );
};