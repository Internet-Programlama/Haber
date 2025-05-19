import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Home, Users, FileText, Folder, MessageSquare,
    Lock, Settings, LogOut
} from 'lucide-react';

export const theme = {
    colors: {
        primary: '#DC2626',
        secondary: '#F87171',
        light: '#FFFFFF',
        dark: '#111827',
        gray: '#E5E7EB',
        midGray: '#9CA3AF',
        darkGray: '#4B5563',
        highlight: '#FEF2F2',
        hoverBg: 'rgba(255,255,255,0.1)'
    }
};

export function AdminSidebar({ activeSection, setActiveSection }) {
    const navigate = useNavigate();
    const [hoveredItem, setHoveredItem] = useState(null);

    const menuItems = [
        { id: 'dashboard', label: 'Genel Bakış', icon: <Home size={20} /> },
        { id: 'content', label: 'Haber Yönetimi', icon: <FileText size={20} /> },
        { id: 'categories', label: 'Kategori Yönetimi', icon: <Folder size={20} /> },
        { id: 'users', label: 'Kullanıcılar', icon: <Users size={20} /> },
        { id: 'comments', label: 'Yorumlar', icon: <MessageSquare size={20} /> },
        { id: 'permissions', label: 'Yetkiler', icon: <Lock size={20} /> }
    ];

    const footerItems = [
        { id: 'home', label: 'Siteye Dön', icon: <Home size={20} />, onClick: () => navigate('/') },
        { id: 'logout', label: 'Çıkış Yap', icon: <LogOut size={20} />, onClick: () => navigate('/login') }
    ];

    return (
        <aside
            style={{
                width: '4rem',
                backgroundColor: theme.colors.dark,
                color: theme.colors.light,
                height: '100vh',
                position: 'fixed',
                overflow: 'hidden',
                transition: 'width 0.3s ease',
                boxShadow: '4px 0 10px rgba(0, 0, 0, 0.1)'
            }}
            onMouseEnter={(e) => e.currentTarget.style.width = '16rem'}
            onMouseLeave={(e) => e.currentTarget.style.width = '4rem'}
        >
            {/* Logo */}
            <div style={{
                padding: '1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem'
            }}>
                <Settings size={24} />
                <span
                    style={{
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        transition: 'opacity 0.3s ease',
                        opacity: '0',
                        visibility: 'hidden'
                    }}
                    className="sidebar-label"
                >
                    Admin Paneli
                </span>
            </div>

            {/* Menü */}
            <nav style={{ flex: 1, padding: '0.5rem' }}>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    {menuItems.map(item => (
                        <li key={item.id}>
                            <button
                                onClick={() => setActiveSection(item.id)}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.75rem',
                                    width: '100%',
                                    padding: '0.75rem',
                                    backgroundColor: activeSection === item.id ? theme.colors.primary : 'transparent',
                                    color: theme.colors.light,
                                    border: 'none',
                                    borderRadius: '0.5rem',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s ease',
                                    marginBottom: '0.25rem'
                                }}
                            >
                                {item.icon}
                                <span
                                    style={{
                                        whiteSpace: 'nowrap',
                                        overflow: 'hidden',
                                        opacity: '0',
                                        visibility: 'hidden',
                                        transition: 'opacity 0.3s ease'
                                    }}
                                    className="sidebar-label"
                                >
                                    {item.label}
                                </span>
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>

            {/* Alt Menü */}
            <div style={{ padding: '1rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                {footerItems.map(item => (
                    <button
                        key={item.id}
                        onClick={item.onClick}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.75rem',
                            width: '100%',
                            padding: '0.75rem',
                            backgroundColor: 'transparent',
                            color: theme.colors.light,
                            border: 'none',
                            borderRadius: '0.5rem',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                            marginBottom: '0.25rem'
                        }}
                    >
                        {item.icon}
                        <span
                            style={{
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                opacity: '0',
                                visibility: 'hidden',
                                transition: 'opacity 0.3s ease'
                            }}
                            className="sidebar-label"
                        >
                            {item.label}
                        </span>
                    </button>
                ))}
            </div>

            {/* JS ile Hover Durumunda Label'ları Göster */}
            <style>
                {`
                aside:hover .sidebar-label {
                    opacity: 1 !important;
                    visibility: visible !important;
                }
                `}
            </style>
        </aside>
    );
}
