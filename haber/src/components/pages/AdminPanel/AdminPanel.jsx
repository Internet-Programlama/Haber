import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserManagement } from './sections/UserManagement';
import { ContentManagement } from './sections/ContentManagement';
import { Dashboard } from './sections/Dashboard.jsx';
import { CategoryManagement } from './sections/CategoryManagement';
import { CommentModeration } from './sections/CommentModeration';
import { PermissionManagement } from './sections/PermissionManagement';
import { USER_ROLES } from '../../../basics/USER_ROLES.js';
import {
    User, Bell, Settings, LogOut, ChevronDown, Home,
    Users, FileText, Folder, MessageSquare, Lock
} from 'lucide-react';

export const AdminPanel = ({ user, users }) => {
    const [activeSection, setActiveSection] = useState('dashboard');
    const [showUserMenu, setShowUserMenu] = useState(false);
    const [hoveredItem, setHoveredItem] = useState(null);
    const [isLogoHovered, setIsLogoHovered] = useState(false);
    const [sidebarExpanded, setSidebarExpanded] = useState(false);
    const navigate = useNavigate();


    const theme = {
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

    useEffect(() => {
        if (!user || user.role !== USER_ROLES.ADMIN) {
            navigate('/');
        }
    }, [user, navigate]);

    // Sidebar
    const menuItems = [
        {
            id: 'dashboard',
            label: 'Genel Bakış',
            icon: <Home size={18} />
        },
        {
            id: 'content',
            label: 'Haber Yönetimi',
            icon: <FileText size={18} />
        },
        {
            id: 'categories',
            label: 'Kategori Yönetimi',
            icon: <Folder size={18} />
        },
        {
            id: 'users',
            label: 'Kullanıcılar',
            icon: <Users size={18} />
        },
        {
            id: 'comments',
            label: 'Yorumlar',
            icon: <MessageSquare size={18} />
        },
        {
            id: 'permissions',
            label: 'Yetkiler',
            icon: <Lock size={18} />
        }
    ];

    const adminSections = {
        dashboard: <Dashboard />,
        users: <UserManagement />,
        content: <ContentManagement />,
        categories: <CategoryManagement />,
        comments: <CommentModeration userRole={user?.role} />,
        permissions: <PermissionManagement users={users} currentUserRole={user?.role} />
    };

    const sectionTitles = {
        dashboard: 'Genel Bakış',
        users: 'Kullanıcı Yönetimi',
        content: 'İçerik Yönetimi',
        categories: 'Kategori Yönetimi',
        comments: 'Yorum Denetimi',
        permissions: 'Yetki Yönetimi'
    };

    // Ana sayfa
    const navigateToHome = () => navigate('/');

    // çıkış
    const handleLogout = () => {
        navigate('/login');
        setShowUserMenu(false);
    };

    // Profil
    const navigateToProfile = () => {
        navigate('/profile');
        setShowUserMenu(false);
    };

    // Admin paneli
    const navigateToAdminSettings = () => {
        navigate('/admin/settings');
        setShowUserMenu(false);
    };

    // Genel Bakış
    const navigateToAdminDashboard = () => {
        setActiveSection('dashboard');
    };

    useEffect(() => {
        const mainContent = document.getElementById('admin-main-content');
        if (mainContent) {
            mainContent.style.opacity = '0';
            mainContent.style.transform = 'translateY(20px)';
            setTimeout(() => {
                mainContent.style.opacity = '1';
                mainContent.style.transform = 'translateY(0)';
            }, 100);
        }
    }, [activeSection]);

    return (
        <div style={{
            position: 'relative',
            display: 'flex',
            minHeight: '100vh',
            backgroundColor: theme.colors.light,
            overflow: 'hidden'
        }}>
            {/* Sidebar */}
            <aside
                style={{
                    width: sidebarExpanded ? '16rem' : '4rem',
                    backgroundColor: theme.colors.dark,
                    color: theme.colors.light,
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100vh',
                    position: 'fixed',
                    boxShadow: '4px 0 10px rgba(0, 0, 0, 0.1)',
                    zIndex: 20,
                    transition: 'width 0.3s ease',
                    overflow: 'hidden'
                }}
                onMouseEnter={() => setSidebarExpanded(true)}
                onMouseLeave={() => setSidebarExpanded(false)}
            >
                {/* Logo - Başlık */}
                <div
                    style={{
                        padding: sidebarExpanded ? '1.5rem' : '1rem',
                        borderBottom: `1px solid rgba(255,255,255,0.1)`,
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        backgroundColor: isLogoHovered ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.2)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: sidebarExpanded ? 'flex-start' : 'center'
                    }}
                    onClick={navigateToAdminDashboard}
                    onMouseEnter={() => setIsLogoHovered(true)}
                    onMouseLeave={() => setIsLogoHovered(false)}
                >
                    <div style={{
                        backgroundColor: isLogoHovered ? theme.colors.secondary : theme.colors.primary,
                        color: theme.colors.light,
                        padding: '0.5rem',
                        borderRadius: '0.375rem',
                        marginRight: sidebarExpanded ? '0.5rem' : '0',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'background-color 0.3s ease'
                    }}>
                        <Settings
                            size={20}
                            style={{
                                transform: isLogoHovered ? 'rotate(45deg)' : 'rotate(0)',
                                transition: 'transform 0.3s ease'
                            }}
                        />
                    </div>
                    {sidebarExpanded && (
                        <h2 style={{
                            fontSize: '1.25rem',
                            fontWeight: 'bold',
                            margin: 0,
                            opacity: sidebarExpanded ? 1 : 0,
                            transition: 'opacity 0.3s ease',
                            whiteSpace: 'nowrap'
                        }}>
                            Admin Paneli
                        </h2>
                    )}
                </div>

                {/*Ana Menü */}
                <nav style={{
                    flex: 1,
                    overflowY: 'auto',
                    padding: '1rem 0.5rem'
                }}>
                    <ul style={{
                        listStyle: 'none',
                        margin: 0,
                        padding: 0,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.25rem'
                    }}>
                        {menuItems.map((item) => {
                            const isActive = activeSection === item.id;
                            const isHovered = hoveredItem === item.id;

                            return (
                                <li key={item.id}>
                                    <button
                                        onClick={() => setActiveSection(item.id)}
                                        onMouseEnter={() => setHoveredItem(item.id)}
                                        onMouseLeave={() => setHoveredItem(null)}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            width: '100%',
                                            padding: '0.75rem',
                                            borderRadius: '0.5rem',
                                            transition: 'all 0.3s ease',
                                            backgroundColor: isActive
                                                ? theme.colors.primary
                                                : isHovered
                                                    ? theme.colors.hoverBg
                                                    : 'transparent',
                                            color: isActive
                                                ? theme.colors.light
                                                : isHovered
                                                    ? theme.colors.light
                                                    : 'rgba(255,255,255,0.7)',
                                            border: 'none',
                                            cursor: 'pointer',
                                            textAlign: 'left',
                                            fontWeight: isActive ? '600' : 'normal',
                                            justifyContent: sidebarExpanded ? 'flex-start' : 'center'
                                        }}
                                    >
                                        <span style={{
                                            marginRight: sidebarExpanded ? '0.75rem' : '0',
                                            display: 'flex',
                                            alignItems: 'center',
                                            transform: isHovered ? 'scale(1.2)' : 'scale(1)',
                                            transition: 'transform 0.3s ease'
                                        }}>
                                            {item.icon}
                                        </span>
                                        {sidebarExpanded && (
                                            <span style={{
                                                fontWeight: isActive ? 'bold' : (isHovered ? 'medium' : 'normal'),
                                                transition: 'all 0.3s ease',
                                                opacity: sidebarExpanded ? 1 : 0,
                                                whiteSpace: 'nowrap'
                                            }}>
                                                {item.label}
                                            </span>
                                        )}
                                    </button>
                                </li>
                            );
                        })}
                    </ul>
                </nav>

                {/* Alt kısım */}
                <div style={{
                    padding: '1rem',
                    borderTop: '1px solid rgba(255,255,255,0.1)'
                }}>
                    {[
                        { id: 'home', label: 'Siteye Dön', icon: <Home size={18} />, onClick: navigateToHome },
                        { id: 'logout', label: 'Çıkış Yap', icon: <LogOut size={18} />, onClick: handleLogout }
                    ].map((item) => {
                        const isHovered = hoveredItem === item.id;

                        return (
                            <button
                                key={item.id}
                                onClick={item.onClick}
                                onMouseEnter={() => setHoveredItem(item.id)}
                                onMouseLeave={() => setHoveredItem(null)}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    width: '100%',
                                    padding: '0.75rem',
                                    marginBottom: '0.25rem',
                                    borderRadius: '0.5rem',
                                    transition: 'all 0.3s ease',
                                    backgroundColor: isHovered ? theme.colors.hoverBg : 'transparent',
                                    color: isHovered ? theme.colors.light : 'rgba(255,255,255,0.7)',
                                    border: 'none',
                                    cursor: 'pointer',
                                    textAlign: 'left',
                                    justifyContent: sidebarExpanded ? 'flex-start' : 'center'
                                }}
                            >
                                <span style={{
                                    marginRight: sidebarExpanded ? '0.75rem' : '0',
                                    display: 'flex',
                                    alignItems: 'center',
                                    transform: isHovered ? 'scale(1.2)' : 'scale(1)',
                                    transition: 'transform 0.3s ease'
                                }}>
                                    {item.icon}
                                </span>
                                {sidebarExpanded && (
                                    <span style={{
                                        fontWeight: isHovered ? 'medium' : 'normal',
                                        transition: 'font-weight 0.3s ease',
                                        opacity: sidebarExpanded ? 1 : 0,
                                        whiteSpace: 'nowrap'
                                    }}>
                                        {item.label}
                                    </span>
                                )}
                            </button>
                        );
                    })}
                </div>
            </aside>

            {/*  İçerik */}
            <div style={{
                flex: 1,
                marginLeft: sidebarExpanded ? '16rem' : '4rem',
                padding: '1rem',
                width: sidebarExpanded ? 'calc(100% - 16rem)' : 'calc(100% - 4rem)',
                position: 'relative',
                transition: 'margin-left 0.3s ease, width 0.3s ease'
            }}>
                <div
                    id="admin-main-content"
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        backgroundColor: theme.colors.light,
                        border: `1px solid ${theme.colors.gray}`,
                        borderRadius: '12px',
                        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                        overflow: 'hidden',
                        transition: 'opacity 0.5s ease, transform 0.5s ease',
                        height: 'calc(100vh - 2rem)'
                    }}
                >
                    {/*  Başlık */}
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '1rem 1.5rem',
                        background: `linear-gradient(to right, ${theme.colors.primary}, ${theme.colors.secondary})`,
                        position: 'relative',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}>
                        <div style={{ position: 'relative', zIndex: 1 }}>
                            <h1 style={{
                                fontSize: '1.5rem',
                                fontWeight: 700,
                                color: theme.colors.light,
                                marginBottom: '0.25rem',
                                display: 'flex',
                                alignItems: 'center'
                            }}>
                                <span style={{
                                    color: theme.colors.light
                                }}>
                                    Haber
                                </span>
                                <span style={{ color: theme.colors.light, marginRight: '1rem' }}>Portal</span>
                                <span style={{
                                    fontSize: '1.25rem',
                                    color: theme.colors.light,
                                    paddingLeft: '1rem',
                                    borderLeft: '2px solid rgba(255, 255, 255, 0.5)'
                                }}>
                                    {sectionTitles[activeSection]}
                                </span>
                            </h1>
                        </div>

                        <div style={{
                            position: 'relative',
                            zIndex: 1,
                            display: 'flex',
                            alignItems: 'center',
                            gap: '1rem'
                        }}>
                            <button
                                style={{
                                    backgroundColor: 'rgba(255, 255, 255, 0.25)',
                                    border: '1px solid rgba(255, 255, 255, 0.8)',
                                    borderRadius: '50%',
                                    width: '2.5rem',
                                    height: '2.5rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    position: 'relative',
                                    cursor: 'pointer',
                                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                                    transition: 'all 0.2s ease'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'scale(1.1)';
                                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.35)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'scale(1)';
                                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.25)';
                                }}
                            >
                                <Bell size={16} style={{ color: theme.colors.light }} />
                                <span style={{
                                    position: 'absolute',
                                    top: '0',
                                    right: '0',
                                    backgroundColor: theme.colors.light,
                                    width: '0.75rem',
                                    height: '0.75rem',
                                    borderRadius: '50%',
                                    border: `2px solid ${theme.colors.primary}`,
                                    boxShadow: '0 0 0 2px rgba(255, 255, 255, 0.5)'
                                }}></span>
                            </button>

                            {/* Profile menüsü */}
                            <div style={{ position: 'relative' }}>
                                <button
                                    onClick={() => setShowUserMenu(!showUserMenu)}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                        backgroundColor: 'rgba(255, 255, 255, 0.25)',
                                        border: '1px solid rgba(255, 255, 255, 0.8)',
                                        borderRadius: '2rem',
                                        padding: '0.5rem 1rem',
                                        cursor: 'pointer',
                                        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                                        transition: 'all 0.2s ease'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.35)';
                                        e.currentTarget.style.transform = 'translateY(-2px)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.25)';
                                        e.currentTarget.style.transform = 'translateY(0)';
                                    }}
                                >
                                    <div style={{
                                        width: '1.75rem',
                                        height: '1.75rem',
                                        backgroundColor: theme.colors.light,
                                        borderRadius: '50%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        transition: 'transform 0.3s ease'
                                    }}>
                                        <User size={14} style={{ color: theme.colors.primary }} />
                                    </div>
                                    <div style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'flex-start'
                                    }}>
                                        <span style={{
                                            color: theme.colors.light,
                                            fontWeight: 600,
                                            fontSize: '0.875rem'
                                        }}>
                                            {user?.name || 'Admin'}
                                        </span>
                                        <span style={{
                                            color: 'rgba(255, 255, 255, 0.8)',
                                            fontSize: '0.75rem'
                                        }}>
                                            Yönetici
                                        </span>
                                    </div>
                                    <ChevronDown size={16} style={{
                                        color: theme.colors.light,
                                        transition: 'transform 0.3s ease',
                                        transform: showUserMenu ? 'rotate(180deg)' : 'rotate(0deg)'
                                    }} />
                                </button>


                                {showUserMenu && (
                                    <div style={{
                                        position: 'absolute',
                                        top: 'calc(100% + 0.5rem)',
                                        right: 0,
                                        backgroundColor: theme.colors.light,
                                        border: `1px solid ${theme.colors.gray}`,
                                        borderRadius: '0.5rem',
                                        width: '12rem',
                                        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                                        zIndex: 50,
                                        overflow: 'hidden',
                                        animation: 'fadeIn 0.2s ease-out'
                                    }}>
                                        <div style={{
                                            borderBottom: `1px solid ${theme.colors.gray}`,
                                            padding: '0.75rem 1rem'
                                        }}>
                                            <div style={{ fontWeight: 600, color: theme.colors.dark, fontSize: '0.875rem' }}>
                                                {user?.name || 'Admin'}
                                            </div>
                                            <div style={{ color: theme.colors.darkGray, fontSize: '0.75rem' }}>
                                                {user?.email || 'admin@haberportal.com'}
                                            </div>
                                        </div>
                                        <button
                                            onClick={navigateToProfile}
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '0.5rem',
                                                padding: '0.75rem 1rem',
                                                width: '100%',
                                                color: theme.colors.dark,
                                                fontSize: '0.875rem',
                                                background: 'transparent',
                                                border: 'none',
                                                borderBottom: `1px solid ${theme.colors.gray}`,
                                                cursor: 'pointer',
                                                transition: 'all 0.2s ease'
                                            }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.backgroundColor = theme.colors.highlight;
                                                e.currentTarget.style.paddingLeft = '1.25rem';
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.backgroundColor = 'transparent';
                                                e.currentTarget.style.paddingLeft = '1rem';
                                            }}
                                        >
                                            <User size={14} />
                                            <span>Profil</span>
                                        </button>
                                        <button
                                            onClick={handleLogout}
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '0.5rem',
                                                padding: '0.75rem 1rem',
                                                width: '100%',
                                                color: theme.colors.primary,
                                                fontSize: '0.875rem',
                                                background: 'transparent',
                                                border: 'none',
                                                cursor: 'pointer',
                                                transition: 'all 0.2s ease'
                                            }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.backgroundColor = theme.colors.highlight;
                                                e.currentTarget.style.paddingLeft = '1.25rem';
                                                e.currentTarget.style.color = theme.colors.secondary;
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.backgroundColor = 'transparent';
                                                e.currentTarget.style.paddingLeft = '1rem';
                                                e.currentTarget.style.color = theme.colors.primary;
                                            }}
                                        >
                                            <LogOut size={14} />
                                            <span>Çıkış Yap</span>
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* İçerik Alanı */}
                    <div style={{
                        flex: 1,
                        padding: '1.5rem',
                        overflowY: 'auto',
                        color: theme.colors.dark
                    }}>
                        {adminSections[activeSection]}
                    </div>
                </div>
            </div>
            <style jsx>{`
            @keyframes fadeIn {
                from {
                    opacity: 0;
                    transform: translateY(-10px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            .settings-icon:hover {
                transform: rotate(90deg);
            }
        `}</style>
        </div>
    );
};