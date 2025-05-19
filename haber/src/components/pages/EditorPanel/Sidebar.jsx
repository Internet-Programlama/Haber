import React, { useState, useEffect } from 'react';
import {
    User, LogOut, Home, MessageSquare, Plus
} from 'lucide-react';

export const Sidebar = ({ activeSection, setActiveSection, onLogout, navigateToHome, theme }) => {
    const [expanded, setExpanded] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    // Check if the device is mobile
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        handleResize(); // Initial check
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    // Define menu items - "Haberlerim" ve "Profil Düzenle" kaldırıldı
    const menuItems = [
        { id: 'dashboard', label: 'Genel Bakış', icon: <Home size={20} /> },
        { id: 'add-article', label: 'Yeni Haber Ekle', icon: <Plus size={20} /> },
        { id: 'comments', label: 'Yorum Yönetimi', icon: <MessageSquare size={20} /> }
    ];

    return (
        <div
            onMouseEnter={() => !isMobile && setExpanded(true)}
            onMouseLeave={() => !isMobile && setExpanded(false)}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                height: '100vh',
                width: expanded ? '16rem' : '4.5rem',
                backgroundColor: theme.colors.dark,
                color: theme.colors.light,
                transition: 'width 0.3s ease-in-out',
                zIndex: 40,
                display: 'flex',
                flexDirection: 'column',
                boxShadow: '4px 0 15px rgba(0, 0, 0, 0.1)'
            }}
        >
            {/* Sidebar Header */}
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: expanded ? 'flex-start' : 'center',
                    padding: '1.5rem',
                    borderBottom: `1px solid rgba(255, 255, 255, 0.1)`
                }}
            >
                <div
                    onClick={navigateToHome}
                    style={{
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                    }}
                >
                    <div style={{
                        width: '2.5rem',
                        height: '2.5rem',
                        backgroundColor: theme.colors.primary,
                        borderRadius: '0.5rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 'bold',
                        fontSize: '1.25rem'
                    }}>
                        HP
                    </div>
                    {expanded && (
                        <div style={{
                            fontSize: '1.25rem',
                            fontWeight: 'bold',
                            marginLeft: '0.25rem'
                        }}>
                            HaberPortal
                        </div>
                    )}
                </div>
            </div>

            {/* Menu Items */}
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                flex: 1,
                padding: '1rem 0',
                overflowY: 'auto'
            }}>
                {menuItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => setActiveSection(item.id)}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.75rem',
                            padding: expanded ? '0.75rem 1.5rem' : '0.75rem',
                            backgroundColor: activeSection === item.id ?
                                'rgba(255, 255, 255, 0.1)' : 'transparent',
                            border: 'none',
                            color: activeSection === item.id ?
                                theme.colors.light : 'rgba(255, 255, 255, 0.7)',
                            cursor: 'pointer',
                            borderLeft: activeSection === item.id ?
                                `4px solid ${theme.colors.primary}` : '4px solid transparent',
                            transition: 'background-color 0.2s ease, border-left 0.2s ease',
                            justifyContent: expanded ? 'flex-start' : 'center',
                            width: '100%',
                            textAlign: 'left'
                        }}
                    >
                        <div style={{
                            minWidth: expanded ? 'auto' : '100%',
                            display: 'flex',
                            justifyContent: expanded ? 'flex-start' : 'center'
                        }}>
                            {item.icon}
                        </div>
                        {expanded && (
                            <span style={{ whiteSpace: 'nowrap' }}>{item.label}</span>
                        )}
                    </button>
                ))}
            </div>

            {/* Logout Section */}
            <div style={{
                padding: expanded ? '1rem 1.5rem' : '1rem',
                display: 'flex',
                alignItems: 'center',
                borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                justifyContent: expanded ? 'flex-start' : 'center',
                gap: '0.75rem'
            }}>
                <button
                    onClick={onLogout}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        padding: '0.5rem',
                        backgroundColor: 'transparent',
                        border: 'none',
                        color: 'rgba(255, 255, 255, 0.7)',
                        cursor: 'pointer',
                        width: '100%',
                        justifyContent: expanded ? 'flex-start' : 'center'
                    }}
                >
                    <LogOut size={20} />
                    {expanded && <span>Çıkış Yap</span>}
                </button>
            </div>
        </div>
    );
};