import React, { useState, useEffect } from 'react';
import { Trash2, Eye, MessageSquare, Search, Calendar, ChevronDown, Edit } from 'lucide-react';

export const ContentManagement = () => {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

    useEffect(() => {
        setTimeout(() => {
            setNews([
                { id: 1, title: 'Ekonomide Son Gelişmeler', author: 'Ali Yılmaz', category: 'Ekonomi', categoryId: 2, publishDate: '2023-05-10', views: 1542, comments: 23, status: 'published' },
                { id: 2, title: 'Yeni Teknoloji Trendleri', author: 'Mehmet Öz', category: 'Teknoloji', categoryId: 4, publishDate: '2023-05-09', views: 892, comments: 14, status: 'draft' },
                { id: 3, title: 'Sağlık Haberleri', author: 'Ayşe Demir', category: 'Sağlık', categoryId: 5, publishDate: '2023-05-08', views: 723, comments: 9, status: 'published' },
                { id: 4, title: 'Güncel Politika Analizi', author: 'Hasan Kaya', category: 'Gündem', categoryId: 1, publishDate: '2023-05-07', views: 2105, comments: 45, status: 'published' }
            ]);
            setLoading(false);
        }, 500);
    }, []);

    const handleDelete = (id) => {
        if (window.confirm('Bu haberi silmek istediğinize emin misiniz?')) {
            setNews(news.filter(item => item.id !== id));
        }
    };

    const handleSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const toggleStatus = (id) => {
        setNews(news.map(item =>
            item.id === id ? { ...item, status: item.status === 'published' ? 'draft' : 'published' } : item
        ));
    };

    const getFilteredNews = () => {
        let filtered = [...news];
        if (searchTerm) {
            filtered = filtered.filter(item =>
                item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.author.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (sortConfig.key) {
            filtered.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
                if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
                return 0;
            });
        }

        return filtered;
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('tr-TR');
    };

    const getCategoryColor = (categoryId) => {
        const colors = {
            1: '#DC2626',
            2: '#2563EB',
            3: '#D97706',
            4: '#7C3AED',
            5: '#059669',
            6: '#9333EA'
        };
        return colors[categoryId] || '#6B7280';
    };

    const getStatusBadge = (status) => ({
        backgroundColor: status === 'published' ? '#D1FAE5' : '#FEF3C7',
        color: status === 'published' ? '#065F46' : '#92400E',
        padding: '2px 8px',
        borderRadius: '12px',
        fontSize: '12px',
        marginLeft: '8px'
    });

    return (
        <div style={{ background: '#fff', border: '1px solid #ddd', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', margin: '20px' }}>
            <div style={{ padding: '16px', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
                <div>
                    <h2 style={{ fontSize: '18px', margin: 0 }}>Haber Yönetimi</h2>
                    <p style={{ fontSize: '14px', color: '#666' }}>
                        Toplam {news.length} haber | Yayında: {news.filter(n => n.status === 'published').length} | Taslak: {news.filter(n => n.status === 'draft').length}
                    </p>
                </div>
                <div style={{ position: 'relative', width: '250px' }}>
                    <Search size={16} style={{ position: 'absolute', left: '8px', top: '50%', transform: 'translateY(-50%)', color: '#888' }} />
                    <input
                        type="text"
                        placeholder="Haber ara..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{
                            padding: '8px 8px 8px 30px',
                            width: '100%',
                            border: '1px solid #ccc',
                            borderRadius: '4px',
                            fontSize: '14px'
                        }}
                    />
                </div>
            </div>

            {loading ? (
                <div style={{ padding: '32px', textAlign: 'center' }}>
                    <div style={{ border: '4px solid #f3f3f3', borderTop: '4px solid #dc2626', borderRadius: '50%', width: '32px', height: '32px', margin: 'auto', animation: 'spin 1s linear infinite' }} />
                </div>
            ) : (
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead style={{ backgroundColor: '#f9f9f9' }}>
                        <tr>
                            {['title', 'publishDate'].map(key => (
                                <th
                                    key={key}
                                    onClick={() => handleSort(key)}
                                    style={{ cursor: 'pointer', padding: '12px', textAlign: 'left', fontSize: '13px', color: '#666' }}
                                >
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        {key === 'title' ? 'Haber Başlığı' : 'Yayın Tarihi'}
                                        <ChevronDown size={16} style={{
                                            marginLeft: '4px',
                                            transform: sortConfig.key === key && sortConfig.direction === 'desc' ? 'rotate(180deg)' : 'none',
                                            transition: 'transform 0.2s'
                                        }} />
                                    </div>
                                </th>
                            ))}
                            <th style={{ padding: '12px', fontSize: '13px', color: '#666' }}>Yazar</th>
                            <th style={{ padding: '12px', fontSize: '13px', color: '#666' }}>Kategori</th>
                            <th style={{ padding: '12px', fontSize: '13px', color: '#666' }}>İstatistikler</th>
                            <th style={{ padding: '12px', fontSize: '13px', color: '#666', textAlign: 'right' }}>İşlemler</th>
                        </tr>
                    </thead>
                    <tbody>
                        {getFilteredNews().map(item => (
                            <tr key={item.id} style={{ borderBottom: '1px solid #eee', transition: 'background 0.2s' }}>
                                <td style={{ padding: '12px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <span style={{ fontWeight: 500 }}>{item.title}</span>
                                        <span style={getStatusBadge(item.status)}>{item.status === 'published' ? 'Yayında' : 'Taslak'}</span>
                                    </div>
                                </td>
                                <td style={{ padding: '12px', color: '#666' }}>{item.author}</td>
                                <td style={{ padding: '12px' }}>
                                    <span style={{
                                        backgroundColor: getCategoryColor(item.categoryId) + '20',
                                        color: getCategoryColor(item.categoryId),
                                        padding: '2px 8px',
                                        borderRadius: '12px',
                                        fontSize: '12px'
                                    }}>
                                        {item.category}
                                    </span>
                                </td>
                                <td style={{ padding: '12px', color: '#666' }}>
                                    <Calendar size={14} style={{ marginRight: '6px', verticalAlign: 'middle' }} />
                                    {formatDate(item.publishDate)}
                                </td>
                                <td style={{ padding: '12px', color: '#666' }}>
                                    <Eye size={14} style={{ marginRight: '4px', verticalAlign: 'middle', color: '#aaa' }} /> {item.views.toLocaleString()}
                                    &nbsp;&nbsp;
                                    <MessageSquare size={14} style={{ marginRight: '4px', verticalAlign: 'middle', color: '#aaa' }} /> {item.comments}
                                </td>
                                <td style={{ padding: '12px', textAlign: 'right' }}>
                                    <button title="Düzenle" style={{ color: '#2563EB', border: 'none', background: 'none', marginRight: '8px', cursor: 'pointer' }}>
                                        <Edit size={16} />
                                    </button>
                                    <button title="Sil" onClick={() => handleDelete(item.id)} style={{ color: '#DC2626', border: 'none', background: 'none', cursor: 'pointer' }}>
                                        <Trash2 size={16} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {getFilteredNews().length === 0 && (
                            <tr>
                                <td colSpan="6" style={{ padding: '32px', textAlign: 'center', color: '#aaa' }}>
                                    <Search size={24} style={{ marginBottom: '8px' }} />
                                    Arama kriterlerinize uygun haber bulunamadı
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            )}
        </div>
    );
};