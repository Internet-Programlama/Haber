import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Bell, User, ChevronDown, LogOut } from "lucide-react";
import { Sidebar } from "./Sidebar";
import { AddNews } from "./AddNews";

// Comments Component
const Comments = ({ theme }) => {
    return (
        <div style={{ padding: '1rem' }}>
            <h2 style={{ marginBottom: '1rem', color: theme.colors.primary }}>Yorum Yönetimi</h2>
            <p>Burada yorum yönetimi araçları olacak.</p>
        </div>
    );
};

// Dashboard Component
const Dashboard = ({ theme }) => {
    const [articles, setArticles] = useState([
        {
            id: 1,
            title: "Türkiye'de Teknoloji Yatırımları Artıyor",
            category: "Teknoloji",
            publishDate: "2025-05-10",
            status: "Yayında",
            views: 1240,
            comments: 32,
            imageUrl: "/api/placeholder/300/200"
        },
        {
            id: 2,
            title: "Yeni Nesil Elektrikli Araçlar Tanıtıldı",
            category: "Otomotiv",
            publishDate: "2025-05-08",
            status: "Yayında",
            views: 856,
            comments: 17,
            imageUrl: "/api/placeholder/300/200"
        },
        {
            id: 3,
            title: "İklim Değişikliği ile Mücadelede Yeni Adımlar",
            category: "Çevre",
            publishDate: "2025-05-05",
            status: "Yayında",
            views: 623,
            comments: 41,
            imageUrl: "/api/placeholder/300/200"
        },
        {
            id: 4,
            title: "Sağlıklı Beslenmenin Püf Noktaları",
            category: "Sağlık",
            publishDate: "2025-05-01",
            status: "Taslak",
            views: 0,
            comments: 0,
            imageUrl: "/api/placeholder/300/200"
        }
    ]);

    const [statsData, setStatsData] = useState({
        totalArticles: 24,
        publishedArticles: 18,
        drafts: 6,
        totalViews: 12576,
        totalComments: 342
    });

    const [filterStatus, setFilterStatus] = useState("Tümü");

    const filteredArticles = filterStatus === "Tümü"
        ? articles
        : articles.filter(article => article.status === filterStatus);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('tr-TR', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    return (
        <div style={{ padding: '0.5rem' }}>
            <h2 style={{ color: theme.colors.primary, marginBottom: '1.5rem' }}>Genel Bakış</h2>

            {/* Stats Cards */}
            <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '1rem',
                marginBottom: '2rem'
            }}>
                <StatCard title="Toplam Haber" value={statsData.totalArticles} theme={theme} icon="📰" />
                <StatCard title="Yayında" value={statsData.publishedArticles} theme={theme} icon="✅" />
                <StatCard title="Taslaklar" value={statsData.drafts} theme={theme} icon="📝" />
                <StatCard title="Toplam Görüntülenme" value={statsData.totalViews.toLocaleString()} theme={theme} icon="👁️" />
                <StatCard title="Toplam Yorum" value={statsData.totalComments.toLocaleString()} theme={theme} icon="💬" />
            </div>

            {/* Articles Section */}
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '1rem'
            }}>
                <h3 style={{ color: theme.colors.dark }}>Haberlerim</h3>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    {["Tümü", "Yayında", "Taslak"].map(status => (
                        <button
                            key={status}
                            onClick={() => setFilterStatus(status)}
                            style={{
                                padding: '0.5rem 1rem',
                                border: 'none',
                                borderRadius: '0.5rem',
                                cursor: 'pointer',
                                backgroundColor: filterStatus === status ? theme.colors.primary : theme.colors.gray,
                                color: filterStatus === status ? theme.colors.light : theme.colors.dark,
                                fontSize: '0.875rem',
                                transition: 'all 0.2s ease'
                            }}
                        >
                            {status}
                        </button>
                    ))}
                </div>
            </div>

            {/* Articles Table */}
            <div style={{
                backgroundColor: theme.colors.light,
                borderRadius: '0.75rem',
                overflow: 'hidden',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                border: `1px solid ${theme.colors.gray}`
            }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ backgroundColor: theme.colors.gray }}>
                            <th style={tableHeaderStyle}>Haber</th>
                            <th style={tableHeaderStyle}>Kategori</th>
                            <th style={tableHeaderStyle}>Yayın Tarihi</th>
                            <th style={tableHeaderStyle}>Durum</th>
                            <th style={tableHeaderStyle}>Görüntüleme</th>
                            <th style={tableHeaderStyle}>Yorumlar</th>
                            <th style={tableHeaderStyle}>İşlemler</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredArticles.length > 0 ? (
                            filteredArticles.map((article) => (
                                <tr key={article.id} style={{ borderBottom: `1px solid ${theme.colors.gray}` }}>
                                    <td style={tableCellStyle}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                            <img
                                                src={article.imageUrl}
                                                alt={article.title}
                                                style={{
                                                    width: '3rem',
                                                    height: '2rem',
                                                    objectFit: 'cover',
                                                    borderRadius: '0.25rem'
                                                }}
                                            />
                                            <span style={{ fontWeight: 500 }}>{article.title}</span>
                                        </div>
                                    </td>
                                    <td style={tableCellStyle}>
                                        <span style={{
                                            padding: '0.25rem 0.5rem',
                                            backgroundColor: getCategoryColor(article.category, theme),
                                            borderRadius: '0.25rem',
                                            fontSize: '0.75rem',
                                            color: theme.colors.light
                                        }}>
                                            {article.category}
                                        </span>
                                    </td>
                                    <td style={tableCellStyle}>{formatDate(article.publishDate)}</td>
                                    <td style={tableCellStyle}>
                                        <span style={{
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            gap: '0.25rem',
                                            padding: '0.25rem 0.5rem',
                                            backgroundColor: article.status === "Yayında"
                                                ? 'rgba(16, 185, 129, 0.1)'
                                                : 'rgba(245, 158, 11, 0.1)',
                                            borderRadius: '0.25rem',
                                            fontSize: '0.75rem',
                                            color: article.status === "Yayında"
                                                ? 'rgb(16, 185, 129)'
                                                : 'rgb(245, 158, 11)'
                                        }}>
                                            {article.status === "Yayında" ? "●" : "○"} {article.status}
                                        </span>
                                    </td>
                                    <td style={tableCellStyle}>{article.views.toLocaleString()}</td>
                                    <td style={tableCellStyle}>{article.comments}</td>
                                    <td style={tableCellStyle}>
                                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                                            <button style={{
                                                padding: '0.25rem 0.5rem',
                                                background: 'none',
                                                border: `1px solid ${theme.colors.primary}`,
                                                borderRadius: '0.25rem',
                                                color: theme.colors.primary,
                                                cursor: 'pointer',
                                                fontSize: '0.75rem'
                                            }}>
                                                Düzenle
                                            </button>
                                            <button style={{
                                                padding: '0.25rem 0.5rem',
                                                background: 'none',
                                                border: `1px solid ${theme.colors.darkGray}`,
                                                borderRadius: '0.25rem',
                                                color: theme.colors.darkGray,
                                                cursor: 'pointer',
                                                fontSize: '0.75rem'
                                            }}>
                                                İncele
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" style={{ ...tableCellStyle, textAlign: 'center', padding: '2rem' }}>
                                    Bu filtreye uygun haber bulunamadı.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

// StatCard Component
const StatCard = ({ title, value, theme, icon }) => {
    return (
        <div style={{
            flex: '1 1 200px',
            backgroundColor: theme.colors.light,
            borderRadius: '0.75rem',
            padding: '1.5rem',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
            border: `1px solid ${theme.colors.gray}`,
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem'
        }}>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <h4 style={{
                    color: theme.colors.darkGray,
                    margin: 0,
                    fontSize: '0.875rem'
                }}>
                    {title}
                </h4>
                <span style={{ fontSize: '1.5rem' }}>{icon}</span>
            </div>
            <div style={{
                fontSize: '1.5rem',
                fontWeight: 'bold',
                color: theme.colors.dark
            }}>
                {value}
            </div>
        </div>
    );
};

// Table Styles
const tableHeaderStyle = {
    padding: '0.75rem 1rem',
    textAlign: 'left',
    fontSize: '0.875rem',
    fontWeight: 500
};

const tableCellStyle = {
    padding: '0.75rem 1rem',
    fontSize: '0.875rem',
    color: '#4B5563'
};

// Category Colors
const getCategoryColor = (category, theme) => {
    const colors = {
        'Teknoloji': '#3B82F6',
        'Otomotiv': '#6366F1',
        'Çevre': '#10B981',
        'Sağlık': '#EC4899',
        'Ekonomi': '#F59E0B',
        'Spor': '#EF4444',
        'Kültür': '#8B5CF6'
    };
    return colors[category] || theme.colors.primary;
};

// Main EditorPanel Component
export const EditorPanel = ({ user, onLogout }) => {
    const [activeSection, setActiveSection] = useState('dashboard');
    const [showUserMenu, setShowUserMenu] = useState(false);
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
            highlight: '#FEF2F2'
        }
    };

    const editorSections = {
        'dashboard': <Dashboard theme={theme} />,
        'add-article': <AddNews theme={theme} />,
        'comments': <Comments theme={theme} />
    };

    const sectionTitles = {
        'dashboard': 'Genel Bakış',
        'add-article': 'Yeni Haber Ekle',
        'comments': 'Yorum Yönetimi'
    };

    const navigateToHome = () => {
        navigate('/');
    };

    useEffect(() => {
        const mainContent = document.getElementById('editor-main-content');
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
            <Sidebar
                activeSection={activeSection}
                setActiveSection={setActiveSection}
                onLogout={onLogout}
                navigateToHome={navigateToHome}
                theme={theme}
            />

            <div style={{
                marginLeft: '4.5rem',
                padding: '1rem',
                width: 'calc(100% - 4.5rem)',
                position: 'relative',
                minHeight: '100vh',
                transition: 'margin-left 0.3s ease-in-out, width 0.3s ease-in-out'
            }}>
                <div
                    id="editor-main-content"
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
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '1rem 1.5rem',
                        background: `linear-gradient(to right, ${theme.colors.primary}, ${theme.colors.secondary})`,
                        position: 'relative',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <h1 style={{
                                fontSize: '1.5rem',
                                fontWeight: 700,
                                color: theme.colors.light,
                                display: 'flex',
                                alignItems: 'center'
                            }}>
                                <span>Haber</span>
                                <span style={{ marginRight: '1rem' }}>Portal</span>
                                <span style={{
                                    fontSize: '1.25rem',
                                    paddingLeft: '1rem',
                                    borderLeft: '2px solid rgba(255, 255, 255, 0.5)'
                                }}>
                                    {sectionTitles[activeSection]}
                                </span>
                            </h1>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <button style={bellButtonStyle(theme)}>
                                <Bell size={16} style={{ color: theme.colors.light }} />
                                <span style={bellDotStyle(theme)}></span>
                            </button>

                            <div style={{ position: 'relative' }}>
                                <button
                                    onClick={() => setShowUserMenu(!showUserMenu)}
                                    style={userMenuButtonStyle(theme)}
                                >
                                    <div style={avatarStyle(theme)}>
                                        <User size={14} style={{ color: theme.colors.primary }} />
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                                        <span style={{ color: theme.colors.light, fontWeight: 600, fontSize: '0.875rem' }}>
                                            {user?.name || 'Editör Adı'}
                                        </span>
                                        <span style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.75rem' }}>
                                            Editör
                                        </span>
                                    </div>
                                    <ChevronDown size={16} style={{ color: theme.colors.light }} />
                                </button>

                                {showUserMenu && (
                                    <div style={userMenuStyle(theme)}>
                                        <div style={{ borderBottom: `1px solid ${theme.colors.gray}`, padding: '0.75rem 1rem' }}>
                                            <div style={{ fontWeight: 600, color: theme.colors.dark, fontSize: '0.875rem' }}>
                                                {user?.name || 'Editör Adı'}
                                            </div>
                                            <div style={{ color: theme.colors.darkGray, fontSize: '0.75rem' }}>
                                                {user?.email || 'editor@haberportal.com'}
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => navigate('/profile')}
                                            style={userMenuItemStyle(theme)}
                                        >
                                            <User size={14} />
                                            <span>Profil</span>
                                        </button>
                                        <button onClick={onLogout} style={{
                                            ...userMenuItemStyle(theme),
                                            color: theme.colors.primary,
                                            borderBottom: 'none'
                                        }}>
                                            <LogOut size={14} />
                                            <span>Çıkış Yap</span>
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div style={{
                        flex: 1,
                        padding: '1.5rem',
                        overflowY: 'auto',
                        color: theme.colors.dark,
                        maxHeight: 'calc(100vh - 6rem)'
                    }}>
                        {editorSections[activeSection]}
                    </div>
                </div>
            </div>
        </div>
    );
};

// Style Functions
const bellButtonStyle = (theme) => ({
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
});

const bellDotStyle = (theme) => ({
    position: 'absolute',
    top: '0',
    right: '0',
    backgroundColor: theme.colors.light,
    width: '0.75rem',
    height: '0.75rem',
    borderRadius: '50%',
    border: `2px solid ${theme.colors.primary}`,
    boxShadow: '0 0 0 2px rgba(255, 255, 255, 0.5)'
});

const userMenuButtonStyle = (theme) => ({
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
});

const avatarStyle = (theme) => ({
    width: '1.75rem',
    height: '1.75rem',
    backgroundColor: theme.colors.light,
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
});

const userMenuStyle = (theme) => ({
    position: 'absolute',
    top: 'calc(100% + 0.5rem)',
    right: 0,
    backgroundColor: theme.colors.light,
    border: `1px solid ${theme.colors.gray}`,
    borderRadius: '0.5rem',
    width: '12rem',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    zIndex: 50,
    overflow: 'hidden'
});

const userMenuItemStyle = (theme) => ({
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
    textAlign: 'left'
});