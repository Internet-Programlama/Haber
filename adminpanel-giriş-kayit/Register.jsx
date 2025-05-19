
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Lock, User, ChevronRight, AlertCircle, Mail, Calendar, Check } from 'lucide-react';


export const theme = {
    colors: {
        white: '#ffffff',
        black: '#000000',
        dark: '#1a1a1a',
        primary: '#e63946',
        light: '#f1f1f1',
        textPrimary: '#121212',
        textSecondary: '#4a4a4a',
    }
};

// Common styles
const styles = {
    inputContainer: {
        position: 'relative',
    },
    inputIcon: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        paddingLeft: '0.75rem',
        display: 'flex',
        alignItems: 'center',
        pointerEvents: 'none'
    },
    input: {
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
    },
    inputWithButton: {
        paddingRight: '2.5rem'
    },
    inputButton: {
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
        cursor: 'pointer'
    },
    label: {
        display: 'block',
        color: theme.colors.textSecondary,
        fontSize: '0.875rem',
        fontWeight: 500,
        marginBottom: '0.25rem'
    },
    formGroup: {
        display: 'flex',
        flexDirection: 'column',
        gap: '0.25rem'
    }
};

export const Register = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        username: '',
        email: '',
        birthdate: '',
        password: '',
        confirmPassword: '',
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [termsAccepted, setTermsAccepted] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const validateForm = () => {
        if (formData.password !== formData.confirmPassword) {
            setError('Şifreler eşleşmiyor!');
            return false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            setError('Geçerli bir e-posta adresi giriniz!');
            return false;
        }

        if (formData.password.length < 8) {
            setError('Şifre en az 8 karakter olmalıdır!');
            return false;
        }

        if (!termsAccepted) {
            setError('Kullanıcı sözleşmesini kabul etmelisiniz!');
            return false;
        }

        return true;
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsLoading(true);
        setError('');

        try {
            // API call
            const response = await fetch('http://localhost:5000/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (data.success) {
                navigate('/login', { state: { message: 'Kayıt başarılı! Giriş yapabilirsiniz.' } });
            } else {
                setError(data.message || 'Kayıt başarısız!');
            }
        } catch (err) {
            setError('Sunucuya bağlanılamadı!');
        } finally {
            setIsLoading(false);
        }
    };

    // Input component
    const InputField = ({ name, label, type = 'text', icon, value, placeholder, required = false, minLength, showToggle = false, toggleState, onToggle }) => (
        <div style={styles.formGroup}>
            <label htmlFor={name} style={styles.label}>
                {label}
            </label>
            <div style={styles.inputContainer}>
                <div style={styles.inputIcon}>
                    {icon}
                </div>
                <input
                    id={name}
                    name={name}
                    type={showToggle ? (toggleState ? 'text' : 'password') : type}
                    value={value}
                    onChange={handleChange}
                    style={{
                        ...styles.input,
                        ...(showToggle ? styles.inputWithButton : {})
                    }}
                    placeholder={placeholder}
                    required={required}
                    minLength={minLength}
                />
                {showToggle && (
                    <button
                        type="button"
                        onClick={onToggle}
                        style={styles.inputButton}
                    >
                        {toggleState ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                )}
            </div>
        </div>
    );

    return (
        <div style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            backgroundColor: theme.colors.white,
            padding: '1rem',
            overflow: 'hidden'
        }}>
            {/* Background gradient */}
            <div style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: 'url(/api/placeholder/1600/900)',
                backgroundSize: 'cover',
                opacity: 0.05
            }}></div>
            <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to bottom right, rgba(230, 57, 70, 0.1), rgba(255, 255, 255, 0.9), rgba(248, 248, 248, 1))'
            }}></div>

            <div style={{
                position: 'relative',
                width: '100%',
                maxWidth: '500px',
                zIndex: 10
            }}>
                <form
                    onSubmit={handleRegister}
                    style={{
                        backgroundColor: theme.colors.white,
                        border: '1px solid rgba(0, 0, 0, 0.1)',
                        borderRadius: '12px',
                        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                        overflow: 'hidden'
                    }}
                >
                    {/* Header */}
                    <div style={{
                        background: `linear-gradient(to right, ${theme.colors.primary}, #c1121f)`,
                        padding: '2rem',
                        textAlign: 'center',
                        position: 'relative',
                        overflow: 'hidden'
                    }}>
                        <h1 style={{
                            fontSize: 'clamp(1.75rem, 5vw, 2.5rem)',
                            fontWeight: 800,
                            color: theme.colors.white,
                            letterSpacing: '-0.025em',
                            margin: 0
                        }}>
                            <span>Haber</span>
                            <span>Portal</span>
                        </h1>
                        <p style={{
                            color: 'rgba(255, 255, 255, 0.9)',
                            marginTop: '0.5rem',
                            fontSize: '0.875rem',
                            fontWeight: 500
                        }}>Profesyonel Haber Platformu</p>
                    </div>

                    {/* Form Content */}
                    <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                        <h2 style={{
                            fontSize: '1.25rem',
                            fontWeight: 700,
                            textAlign: 'center',
                            color: theme.colors.textPrimary,
                            margin: 0
                        }}>
                            <span style={{
                                borderBottom: `2px solid ${theme.colors.primary}`,
                                paddingBottom: '0.25rem'
                            }}>Yeni Hesap Oluştur</span>
                        </h2>

                        {/* Error Message */}
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

                        {/* Two Column Layout */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <InputField
                                name="fullName"
                                label="Ad Soyad"
                                icon={<User size={18} style={{ color: 'rgba(0, 0, 0, 0.5)' }} />}
                                value={formData.fullName}
                                placeholder="Adınız Soyadınız"
                                required
                            />
                            <InputField
                                name="username"
                                label="Kullanıcı Adı"
                                icon={<User size={18} style={{ color: 'rgba(0, 0, 0, 0.5)' }} />}
                                value={formData.username}
                                placeholder="kullanici_adiniz"
                                required
                            />
                        </div>

                        <InputField
                            name="email"
                            label="E-posta"
                            type="email"
                            icon={<Mail size={18} style={{ color: 'rgba(0, 0, 0, 0.5)' }} />}
                            value={formData.email}
                            placeholder="ornek@email.com"
                            required
                        />

                        <InputField
                            name="birthdate"
                            label="Doğum Tarihi"
                            type="date"
                            icon={<Calendar size={18} style={{ color: 'rgba(0, 0, 0, 0.5)' }} />}
                            value={formData.birthdate}
                            required
                        />

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <InputField
                                name="password"
                                label="Şifre"
                                icon={<Lock size={18} style={{ color: 'rgba(0, 0, 0, 0.5)' }} />}
                                value={formData.password}
                                placeholder="••••••••"
                                required
                                minLength={8}
                                showToggle={true}
                                toggleState={showPassword}
                                onToggle={() => setShowPassword(!showPassword)}
                            />
                            <InputField
                                name="confirmPassword"
                                label="Şifre Tekrarı"
                                icon={<Lock size={18} style={{ color: 'rgba(0, 0, 0, 0.5)' }} />}
                                value={formData.confirmPassword}
                                placeholder="••••••••"
                                required
                                showToggle={true}
                                toggleState={showConfirmPassword}
                                onToggle={() => setShowConfirmPassword(!showConfirmPassword)}
                            />
                        </div>

                        {/* Password Tips */}
                        <div style={{
                            fontSize: '0.75rem',
                            color: theme.colors.textSecondary,
                            backgroundColor: 'rgba(0, 0, 0, 0.03)',
                            borderRadius: '0.5rem',
                            padding: '0.75rem',
                            marginTop: '-0.5rem'
                        }}>
                            <p style={{ margin: '0 0 0.5rem 0', fontWeight: 500 }}>Güçlü şifre için:</p>
                            <ul style={{ margin: 0, paddingLeft: '1rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.25rem' }}>
                                <li>En az 8 karakter</li>
                                <li>En az 1 büyük harf</li>
                                <li>En az 1 küçük harf</li>
                                <li>En az 1 rakam</li>
                            </ul>
                        </div>

                        {/* Terms Agreement */}
                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', marginTop: '0.5rem' }}>
                            <input
                                id="terms"
                                type="checkbox"
                                checked={termsAccepted}
                                onChange={(e) => setTermsAccepted(e.target.checked)}
                                style={{
                                    marginTop: '0.25rem',
                                    height: '1rem',
                                    width: '1rem',
                                    borderRadius: '0.25rem',
                                    accentColor: theme.colors.primary
                                }}
                                required
                            />
                            <label htmlFor="terms" style={{
                                fontSize: '0.875rem',
                                color: theme.colors.textSecondary,
                                lineHeight: '1.4'
                            }}>
                                <a href="#" style={{ color: theme.colors.primary, textDecoration: 'none' }}>Kullanıcı sözleşmesini</a> ve <a href="#" style={{ color: theme.colors.primary, textDecoration: 'none' }}>gizlilik politikasını</a> okudum ve kabul ediyorum.
                            </label>
                        </div>

                        {/* Register Button */}
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
                                color: theme.colors.white,
                                fontWeight: 600,
                                padding: '0.75rem 1rem',
                                borderRadius: '0.5rem',
                                border: 'none',
                                cursor: isLoading ? 'not-allowed' : 'pointer',
                                transition: 'all 0.3s ease',
                                opacity: isLoading ? 0.7 : 1,
                                boxShadow: '0 4px 6px rgba(230, 57, 70, 0.2)',
                                marginTop: '0.75rem'
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
                                    <span>Kaydınız Oluşturuluyor...</span>
                                </>
                            ) : (
                                <>
                                    <span>Kayıt Ol</span>
                                    <ChevronRight size={18} />
                                </>
                            )}
                        </button>

                        {/* Login Link */}
                        <div style={{
                            textAlign: 'center',
                            fontSize: '0.875rem',
                            color: theme.colors.textSecondary,
                            marginTop: '0.5rem'
                        }}>
                            Zaten bir hesabınız var mı?{' '}
                            <a href="/login" style={{
                                fontWeight: 500,
                                color: theme.colors.primary,
                                textDecoration: 'none'
                            }}>
                                Giriş Yap
                            </a>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export const registerUtils = {
    validateEmail: (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    },
    validatePassword: (password) => {
        const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
        return re.test(password);
    }
};