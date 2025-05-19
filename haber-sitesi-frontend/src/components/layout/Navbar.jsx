import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, User, LogOut, ChevronDown } from 'lucide-react';

// Navbar özel stilleri
const navbarStyles = {
    navbar: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#1a1a1a',
        color: 'white',
        padding: '1rem 2rem',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        position: 'sticky',
        top: 0,
        zIndex: 1000
    },
    navLink: {
        color: '#ffffff',
        textDecoration: 'none',
        fontWeight: '500',
        transition: 'color 0.3s ease',
        ':hover': {
            color: '#e63946'
        }
    },
    dropdownMenu: {
        position: 'absolute',
        right: 0,
        top: '100%',
        backgroundColor: '#ffffff',
        minWidth: '200px',
        borderRadius: '4px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        padding: '0.5rem 0',
        zIndex: 100,
        display: 'none'
    },
    dropdownMenuOpen: {
        display: 'block'
    },
    dropdownItem: {
        display: 'block',
        padding: '0.5rem 1rem',
        color: '#333333',
        textDecoration: 'none',
        transition: 'all 0.3s ease',
        ':hover': {
            backgroundColor: '#f8f9fa',
            color: '#e63946'
        }
    },
    userButton: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        backgroundColor: '#e63946',
        color: 'white',
        padding: '0.5rem 1rem',
        borderRadius: '4px',
        border: 'none',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        ':hover': {
            backgroundColor: '#c1121f'
        }
    },
    loginButton: {
        backgroundColor: '#e63946',
        color: 'white',
        padding: '0.5rem 1rem',
        borderRadius: '4px',
        textDecoration: 'none',
        fontWeight: '500',
        transition: 'all 0.3s ease',
        ':hover': {
            backgroundColor: '#c1121f'
        }
    }
};

export const Navbar = ({ user, isAuthenticated, onLogout }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

    // Dropdown dışına tıklandığında kapat
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <nav style={navbarStyles.navbar}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                <Link to="/" style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#ffffff', textDecoration: 'none' }}>
                    <span style={{ color: '#e63946' }}>HABER</span>PORTAL
                </Link>

                <div style={{ display: 'flex', gap: '1.5rem' }}>
                    <Link to="/" style={navbarStyles.navLink}>Ana Sayfa</Link>
                    <Link to="/category" style={navbarStyles.navLink}>Kategoriler</Link>
                    <Link to="/search" style={navbarStyles.navLink}>Ara</Link>
                </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                {isAuthenticated ? (
                    <div style={{ position: 'relative' }} ref={dropdownRef}>
                        <button
                            onClick={toggleDropdown}
                            style={navbarStyles.userButton}
                        >
                            <User size={18} />
                            <span>{user.username}</span>
                            <ChevronDown size={16} style={{
                                transition: 'transform 0.3s ease',
                                transform: dropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)'
                            }} />
                        </button>

                        <div style={{
                            ...navbarStyles.dropdownMenu,
                            ...(dropdownOpen ? navbarStyles.dropdownMenuOpen : {})
                        }}>
                            <Link
                                to="/profile"
                                style={navbarStyles.dropdownItem}
                                onClick={() => setDropdownOpen(false)}
                            >
                                Profilim
                            </Link>
                            {user?.role === 'admin' && (
                                <Link
                                    to="/admin"
                                    style={navbarStyles.dropdownItem}
                                    onClick={() => setDropdownOpen(false)}
                                >
                                    Admin Paneli
                                </Link>
                            )}
                            {user?.role === 'editor' && (
                                <Link
                                    to="/editor"
                                    style={navbarStyles.dropdownItem}
                                    onClick={() => setDropdownOpen(false)}
                                >
                                    Editör Paneli
                                </Link>
                            )}
                            <button
                                onClick={() => {
                                    onLogout();
                                    setDropdownOpen(false);
                                }}
                                style={{
                                    ...navbarStyles.dropdownItem,
                                    width: '100%',
                                    textAlign: 'left',
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer'
                                }}
                            >
                                Çıkış Yap
                            </button>
                        </div>
                    </div>
                ) : (
                    <Link
                        to="/login"
                        style={navbarStyles.loginButton}
                    >
                        Giriş Yap
                    </Link>
                )}
            </div>
        </nav>
    );
};