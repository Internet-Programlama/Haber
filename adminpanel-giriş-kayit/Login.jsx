






import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { Eye, EyeOff, Lock, User, ChevronRight, AlertCircle } from 'lucide-react';

// Updated theme with white background and black content
export const theme = {
    colors: {
        white: '#ffffff',
        black: '#000000',
        dark: '#1a1a1a',
        primary: '#e63946', // Red accent color
        light: '#f1f1f1',
        textPrimary: '#121212', // Near black for main text
        textSecondary: '#4a4a4a', // Softer black for secondary text
    }
};

// Kullanıcı kimlik bilgileri - direkt kod içerisine eklenmiş
const validCredentials = {
    admin: {
        password: 'admin123',
        role: 'admin'
    },
    editor: {
        password: 'editor123',
        role: 'editor'
    },
    user: {
        password: 'user123',
        role: 'user'
    }
};

export const Login = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    // Register sayfasından gelen başarılı kayıt mesajını alma
    useEffect(() => {
        if (location.state?.message) {
            setSuccessMessage(location.state.message);
            // URL'de state'i temizle
            window.history.replaceState({}, document.title);
        }
    }, [location.state]);

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        setSuccessMessage('');

        // API'ye bağlanmadan simüle edilmiş kimlik doğrulama işlemi
        // 1 saniye bekleyerek gerçek bir API çağrısı gibi görünmesini sağlayalım
        setTimeout(() => {
            try {
                // Kullanıcı adını kontrol et
                if (!validCredentials[username]) {
                    setError('Kullanıcı adı bulunamadı!');
                    setIsLoading(false);
                    return;
                }

                // Şifreyi kontrol et
                if (validCredentials[username].password !== password) {
                    setError('Şifre yanlış!');
                    setIsLoading(false);
                    return;
                }

                // Başarılı giriş
                const userData = {
                    username: username,
                    role: validCredentials[username].role
                };

                // Kullanıcı rolüne göre yönlendirme
                if (userData.role === 'admin') {
                    navigate('/admin');
                } else if (userData.role === 'editor') {
                    navigate('/editor');
                } else {
                    navigate('/');
                }

                // onLogin callback varsa kullan
                if (onLogin) {
                    onLogin(userData);
                }

                // Başarılı giriş mesajı
                setSuccessMessage('Giriş başarılı! Yönlendiriliyorsunuz...');

            } catch (err) {
                setError('Giriş sırasında bir hata oluştu!');
            } finally {
                setIsLoading(false);
            }
        }, 1000); // 1 saniye gecikme
    };


    return (
        <div style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            backgroundColor: theme.colors.white, // White background
            padding: '1rem',
            overflow: 'hidden'
        }}>
            {/* Arkaplan efektleri - daha hafif */}
            <div style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: 'url(/api/placeholder/1600/900)',
                backgroundSize: 'cover',
                opacity: 0.05 // Lighter background
            }}></div>

            <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to bottom right, rgba(230, 57, 70, 0.1), rgba(255, 255, 255, 0.9), rgba(248, 248, 248, 1))'
            }}></div>

            <div style={{
                position: 'relative',
                width: '100%',
                maxWidth: '440px',
                zIndex: 10
            }}>
                <form
                    onSubmit={handleLogin}
                    style={{
                        backgroundColor: theme.colors.white,
                        border: '1px solid rgba(0, 0, 0, 0.1)',
                        borderRadius: '12px',
                        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                        overflow: 'hidden',
                        transition: 'all 0.3s ease'
                    }}
                >
                    {/* Başlık Bölümü */}
                    <div style={{
                        background: `linear-gradient(to right, ${theme.colors.primary}, #c1121f)`,
                        padding: '2rem',
                        textAlign: 'center',
                        position: 'relative',
                        overflow: 'hidden' // Glow efektlerinin taşmasını engeller
                    }}>
                        <div style={{
                            position: 'absolute',
                            top: '-1.5rem',
                            left: '-1.5rem',
                            width: '3rem',
                            height: '3rem',
                            backgroundColor: theme.colors.primary,
                            borderRadius: '50%',
                            filter: 'blur(1rem)',
                            opacity: 0.7
                        }}></div>

                        <div style={{
                            position: 'absolute',
                            bottom: '-1.5rem',
                            right: '-1.5rem',
                            width: '3rem',
                            height: '3rem',
                            backgroundColor: '#ff8a8a',
                            borderRadius: '50%',
                            filter: 'blur(1rem)',
                            opacity: 0.5
                        }}></div>

                        <h1 style={{
                            fontSize: 'clamp(1.75rem, 5vw, 2.5rem)', // Responsive font size
                            fontWeight: 800,
                            color: theme.colors.white, // White text on red background
                            letterSpacing: '-0.025em',
                            margin: 0
                        }}>
                            <span style={{
                                backgroundClip: 'text',
                                WebkitBackgroundClip: 'text',
                                color: theme.colors.white,
                            }}>
                                Haber
                            </span>
                            <span style={{ color: theme.colors.white }}>Portal</span>
                        </h1>

                        <p style={{
                            color: 'rgba(255, 255, 255, 0.9)',
                            marginTop: '0.5rem',
                            fontSize: '0.875rem',
                            fontWeight: 500
                        }}>Profesyonel Haber Platformu</p>
                    </div>

                    {/* Form İçeriği */}
                    <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                        <h2 style={{
                            fontSize: '1.25rem',
                            fontWeight: 700,
                            textAlign: 'center',
                            color: theme.colors.textPrimary, // Black text
                            margin: 0
                        }}>
                            <span style={{
                                borderBottom: `2px solid ${theme.colors.primary}`,
                                paddingBottom: '0.25rem'
                            }}>Giriş Yapın</span>
                        </h2>

                        {/* Başarı Mesajı */}
                        {successMessage && (
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                backgroundColor: 'rgba(72, 187, 120, 0.1)',
                                border: '1px solid rgba(72, 187, 120, 0.5)',
                                color: '#2f855a',
                                padding: '0.75rem 1rem',
                                borderRadius: '0.5rem',
                                fontSize: '0.875rem',
                                wordBreak: 'break-word'
                            }}>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                                </svg>
                                <span>{successMessage}</span>
                            </div>
                        )}

                        {/* Hata Mesajı */}
                        {error && (
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                backgroundColor: 'rgba(230, 57, 70, 0.1)',
                                border: '1px solid rgba(230, 57, 70, 0.5)',
                                color: theme.colors.primary,
                                padding: '0.75rem 1rem',
                                borderRadius: '0.5rem',
                                fontSize: '0.875rem',
                                wordBreak: 'break-word'
                            }}>
                                <AlertCircle size={18} style={{ flexShrink: 0, color: theme.colors.primary }} />
                                <span>{error}</span>
                            </div>
                        )}

                        {/* Kullanıcı Adı Alanı */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                            <label htmlFor="username" style={{
                                display: 'block',
                                color: theme.colors.textSecondary,
                                fontSize: '0.875rem',
                                fontWeight: 500,
                                marginBottom: '0.25rem'
                            }}>
                                Kullanıcı Adı
                            </label>
                            <div style={{ position: 'relative' }}>
                                <div style={{
                                    position: 'absolute',
                                    top: 0,
                                    bottom: 0,
                                    left: 0,
                                    paddingLeft: '0.75rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    pointerEvents: 'none'
                                }}>
                                    <User size={18} style={{ color: 'rgba(0, 0, 0, 0.5)' }} />
                                </div>
                                <input
                                    id="username"
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    style={{
                                        display: 'block',
                                        width: '100%',
                                        paddingLeft: '2.5rem',
                                        paddingRight: '0.75rem',
                                        paddingTop: '0.75rem',
                                        paddingBottom: '0.75rem',
                                        backgroundColor: 'rgba(0, 0, 0, 0.05)',
                                        border: '1px solid rgba(0, 0, 0, 0.2)',
                                        borderRadius: '0.5rem',
                                        color: theme.colors.textPrimary,
                                        fontSize: '1rem',
                                        transition: 'all 0.2s ease',
                                        boxSizing: 'border-box'
                                    }}
                                    placeholder="kullanici_adiniz"
                                    required
                                />
                            </div>
                        </div>

                        {/* Şifre Alanı */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                            <label htmlFor="password" style={{
                                display: 'block',
                                color: theme.colors.textSecondary,
                                fontSize: '0.875rem',
                                fontWeight: 500,
                                marginBottom: '0.25rem'
                            }}>
                                Şifre
                            </label>
                            <div style={{ position: 'relative' }}>
                                <div style={{
                                    position: 'absolute',
                                    top: 0,
                                    bottom: 0,
                                    left: 0,
                                    paddingLeft: '0.75rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    pointerEvents: 'none'
                                }}>
                                    <Lock size={18} style={{ color: 'rgba(0, 0, 0, 0.5)' }} />
                                </div>
                                <input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    style={{
                                        display: 'block',
                                        width: '100%',
                                        paddingLeft: '2.5rem',
                                        paddingRight: '2.5rem',
                                        paddingTop: '0.75rem',
                                        paddingBottom: '0.75rem',
                                        backgroundColor: 'rgba(0, 0, 0, 0.05)',
                                        border: '1px solid rgba(0, 0, 0, 0.2)',
                                        borderRadius: '0.5rem',
                                        color: theme.colors.textPrimary,
                                        fontSize: '1rem',
                                        transition: 'all 0.2s ease',
                                        boxSizing: 'border-box'
                                    }}
                                    placeholder="••••••••"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    style={{
                                        position: 'absolute',
                                        top: 0,
                                        bottom: 0,
                                        right: 0,
                                        paddingRight: '0.75rem',
                                        display: 'flex',
                                        alignItems: 'center',
                                        color: 'rgba(0, 0, 0, 0.5)',
                                        background: 'none',
                                        border: 'none',
                                        cursor: 'pointer',
                                        transition: 'color 0.2s ease'
                                    }}
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        {/* Ekstra Seçenekler */}
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            flexWrap: 'wrap',
                            gap: '0.5rem'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <input
                                    id="remember-me"
                                    type="checkbox"
                                    checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                    style={{
                                        height: '1rem',
                                        width: '1rem',
                                        borderRadius: '0.25rem',
                                        accentColor: theme.colors.primary
                                    }}
                                />
                                <label htmlFor="remember-me" style={{
                                    marginLeft: '0.5rem',
                                    fontSize: '0.875rem',
                                    color: theme.colors.textSecondary
                                }}>
                                    Beni hatırla
                                </label>
                            </div>
                            <button
                                type="button"
                                onClick={() => navigate('/forgot-password')}
                                style={{
                                    fontSize: '0.875rem',
                                    color: theme.colors.primary,
                                    textDecoration: 'none',
                                    transition: 'color 0.2s ease',
                                    background: 'none',
                                    border: 'none',
                                    padding: 0,
                                    cursor: 'pointer'
                                }}
                            >
                                Şifremi unuttum?
                            </button>
                        </div>

                        {/* Giriş Butonu */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            style={{
                                width: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '0.5rem',
                                background: `linear-gradient(to right, ${theme.colors.primary}, #c1121f)`,
                                color: theme.colors.white, // White text on red button
                                fontWeight: 600,
                                padding: '0.75rem 1rem',
                                borderRadius: '0.5rem',
                                border: 'none',
                                cursor: isLoading ? 'not-allowed' : 'pointer',
                                transition: 'all 0.3s ease',
                                opacity: isLoading ? 0.7 : 1,
                                boxShadow: '0 4px 6px rgba(230, 57, 70, 0.2)',
                                marginTop: '0.5rem'
                            }}
                        >
                            {isLoading ? (
                                <>
                                    <div style={{
                                        height: '1.25rem',
                                        width: '1.25rem',
                                        border: '2px solid white',
                                        borderTop: '2px solid transparent',
                                        borderRadius: '50%',
                                        animation: 'spin 1s linear infinite'
                                    }}></div>
                                    <span>Giriş Yapılıyor...</span>
                                </>
                            ) : (
                                <>
                                    <span>Giriş Yap</span>
                                    <ChevronRight size={18} style={{ marginTop: '0.125rem' }} />
                                </>
                            )}
                        </button>

                        {/* Kayıt Ol Linki */}
                        <div style={{
                            textAlign: 'center',
                            fontSize: '0.875rem',
                            color: theme.colors.textSecondary,
                            marginTop: '0.5rem'
                        }}>
                            Hesabınız yok mu?{' '}
                            <Link
                                to="/register"
                                style={{
                                    fontWeight: 500,
                                    color: theme.colors.primary,
                                    textDecoration: 'none',
                                    transition: 'color 0.2s ease'
                                }}
                            >
                                Yeni hesap oluştur
                            </Link>
                        </div>
                    </div>
                </form>

                {/* Sosyal Medya Girişleri */}
                <div style={{
                    marginTop: '1.5rem',
                    marginBottom: '1.5rem',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '0.75rem'
                }}>
                    <button style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '0.5rem',
                        backgroundColor: theme.colors.white,
                        border: '1px solid rgba(0, 0, 0, 0.2)',
                        borderRadius: '0.5rem',
                        cursor: 'pointer',
                        transition: 'background-color 0.2s ease',
                        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
                    }}>
                        <svg style={{ width: '1.25rem', height: '1.25rem', color: '#4267B2' }} fill="currentColor" viewBox="0 0 24 24">
                            <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                        </svg>
                    </button>
                    <button style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '0.5rem',
                        backgroundColor: theme.colors.white,
                        border: '1px solid rgba(0, 0, 0, 0.2)',
                        borderRadius: '0.5rem',
                        cursor: 'pointer',
                        transition: 'background-color 0.2s ease',
                        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
                    }}>
                        <svg style={{ width: '1.25rem', height: '1.25rem', color: '#E1306C' }} fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                        </svg>
                    </button>
                    <button style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '0.5rem',
                        backgroundColor: theme.colors.white,
                        border: '1px solid rgba(0, 0, 0, 0.2)',
                        borderRadius: '0.5rem',
                        cursor: 'pointer',
                        transition: 'background-color 0.2s ease',
                        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
                    }}>
                        <svg style={{ width: '1.25rem', height: '1.25rem', color: '#1DA1F2' }} fill="currentColor" viewBox="0 0 24 24">
                            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.054 10.054 0 01-3.127 1.184 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Animasyon stilleri için global stil */}
            <style jsx="true">{`
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
};

// Named exports (theme already exported above)
export const handleLoginFunctions = {
    validateCredentials: (username, password) => {
        return validCredentials[username] && validCredentials[username].password === password;
    },
    forgetPassword: () => {
        // İleride şifre sıfırlama fonksiyonu eklenmesi için hazır
        console.log('Şifre sıfırlama fonksiyonu');
    }
};

// Ekstra yardımcı fonksiyonlar
export const loginUtils = {
    createUserSession: (userData) => {
        return {
            id: Math.random().toString(36).substr(2, 9),
            username: userData.username,
            loggedInAt: new Date().toISOString(),
            role: userData.role
        };
    },
    validateEmail: (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }
};