import React, { useState, useEffect } from 'react';

// Roller
const USER_ROLES = {
    ADMIN: 'admin',
    EDITOR: 'editor',
    USER: 'user',
};

export const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedUser, setSelectedUser] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        role: USER_ROLES.USER,
        isActive: true
    });
    const [searchTerm, setSearchTerm] = useState('');
    const [filterRole, setFilterRole] = useState('all');

    useEffect(() => {
        setTimeout(() => {
            setUsers([
                { id: 1, name: 'Admin Kullanıcı', email: 'admin@example.com', role: USER_ROLES.ADMIN, isActive: true, lastLogin: '2023-05-10 15:30', articles: 12 },
                { id: 2, name: 'Editör Kullanıcı', email: 'editor@example.com', role: USER_ROLES.EDITOR, isActive: true, lastLogin: '2023-05-09 10:15', articles: 34 },
                { id: 3, name: 'Normal Kullanıcı', email: 'user@example.com', role: USER_ROLES.USER, isActive: true, lastLogin: '2023-05-08 19:45', articles: 0 },
                { id: 4, name: 'Pasif Kullanıcı', email: 'inactive@example.com', role: USER_ROLES.USER, isActive: false, lastLogin: '2023-04-20 11:30', articles: 0 },
                { id: 5, name: 'Test Editör', email: 'test.editor@example.com', role: USER_ROLES.EDITOR, isActive: true, lastLogin: '2023-05-01 14:20', articles: 8 },
            ]);
            setLoading(false);
        }, 500);
    }, []);

    const openModal = (user = null) => {
        if (user) {
            setFormData({
                name: user.name,
                email: user.email,
                role: user.role,
                isActive: user.isActive
            });
            setSelectedUser(user);
        } else {
            setFormData({
                name: '',
                email: '',
                role: USER_ROLES.USER,
                isActive: true
            });
            setSelectedUser(null);
        }
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setSelectedUser(null);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (selectedUser) {
            setUsers(users.map((user) => user.id === selectedUser.id ? { ...user, ...formData } : user));
        } else {
            const newUser = {
                id: users.length + 1,
                ...formData,
                lastLogin: 'Henüz Giriş Yapmadı',
                articles: 0
            };
            setUsers([...users, newUser]);
        }
        closeModal();
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleDelete = (userId) => {
        if (window.confirm('Bu kullanıcıyı silmek istediğinize emin misiniz?')) {
            setUsers(users.filter(user => user.id !== userId));
        }
    };

    const toggleUserStatus = (userId) => {
        setUsers(
            users.map((user) =>
                user.id === userId ? { ...user, isActive: !user.isActive } : user
            )
        );
    };

    const filteredUsers = users.filter(user => {
        const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesRole = filterRole === 'all' || user.role === filterRole;
        return matchesSearch && matchesRole;
    });

    return (
        <div style={styles.wrapper}>
            <div style={styles.header}>
                <h2>Kullanıcı Yönetimi</h2>
                <button onClick={() => openModal()} style={styles.primaryButton}>+ Yeni Kullanıcı</button>
            </div>

            <div style={styles.filters}>
                <input
                    type="text"
                    placeholder="Kullanıcı ara..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={styles.input}
                />
                <select
                    value={filterRole}
                    onChange={(e) => setFilterRole(e.target.value)}
                    style={styles.select}
                >
                    <option value="all">Tüm Roller</option>
                    <option value={USER_ROLES.ADMIN}>Admin</option>
                    <option value={USER_ROLES.EDITOR}>Editör</option>
                    <option value={USER_ROLES.USER}>Kullanıcı</option>
                </select>
            </div>

            {loading ? (
                <p style={{ padding: 20 }}>Yükleniyor...</p>
            ) : (
                <table style={styles.table}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>İsim</th>
                            <th>Email</th>
                            <th>Rol</th>
                            <th>Durum</th>
                            <th>Son Giriş</th>
                            <th>Makale</th>
                            <th>İşlem</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.length > 0 ? filteredUsers.map((user) => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td><span style={getRoleStyle(user.role)}>{getRoleName(user.role)}</span></td>
                                <td>
                                    <button onClick={() => toggleUserStatus(user.id)} style={user.isActive ? styles.activeStatus : styles.inactiveStatus}>
                                        {user.isActive ? 'Aktif' : 'Pasif'}
                                    </button>
                                </td>
                                <td>{user.lastLogin}</td>
                                <td>{user.articles}</td>
                                <td>
                                    <button onClick={() => openModal(user)} style={styles.editButton}>Düzenle</button>
                                    <button onClick={() => handleDelete(user.id)} style={styles.deleteButton}>Sil</button>
                                </td>
                            </tr>
                        )) : (
                            <tr><td colSpan="8" style={{ padding: 20 }}>Kullanıcı bulunamadı</td></tr>
                        )}
                    </tbody>
                </table>
            )}

            {modalOpen && (
                <div style={styles.modalOverlay}>
                    <div style={styles.modal}>
                        <div style={styles.modalHeader}>
                            <h3>{selectedUser ? 'Kullanıcı Düzenle' : 'Yeni Kullanıcı Ekle'}</h3>
                            <button onClick={closeModal} style={styles.closeButton}>&times;</button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div style={styles.formGroup}>
                                <label>İsim</label>
                                <input name="name" value={formData.name} onChange={handleChange} required style={styles.input} />
                            </div>
                            <div style={styles.formGroup}>
                                <label>Email</label>
                                <input name="email" type="email" value={formData.email} onChange={handleChange} required style={styles.input} />
                            </div>
                            <div style={styles.formGroup}>
                                <label>Rol</label>
                                <select name="role" value={formData.role} onChange={handleChange} style={styles.select}>
                                    <option value={USER_ROLES.ADMIN}>Admin</option>
                                    <option value={USER_ROLES.EDITOR}>Editör</option>
                                    <option value={USER_ROLES.USER}>Kullanıcı</option>
                                </select>
                            </div>
                            <div style={styles.formGroupCheckbox}>
                                <input type="checkbox" name="isActive" checked={formData.isActive} onChange={handleChange} />
                                <label> Aktif</label>
                            </div>
                            <div style={styles.formActions}>
                                <button type="button" onClick={closeModal} style={styles.cancelButton}>İptal</button>
                                <button type="submit" style={styles.submitButton}>{selectedUser ? 'Güncelle' : 'Ekle'}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

const getRoleStyle = (role) => {
    const base = {
        padding: '3px 8px',
        borderRadius: '8px',
        color: 'white',
        fontSize: '12px',
        display: 'inline-block'
    };
    switch (role) {
        case USER_ROLES.ADMIN:
            return { ...base, backgroundColor: '#e74c3c' };
        case USER_ROLES.EDITOR:
            return { ...base, backgroundColor: '#2980b9' };
        case USER_ROLES.USER:
            return { ...base, backgroundColor: '#2ecc71' };
        default:
            return base;
    }
};

const getRoleName = (role) => {
    switch (role) {
        case USER_ROLES.ADMIN: return 'Admin';
        case USER_ROLES.EDITOR: return 'Editör';
        case USER_ROLES.USER: return 'Kullanıcı';
        default: return 'Bilinmiyor';
    }
};

const styles = {
    wrapper: {
        padding: '30px',
        background: '#f5f5f5',
        fontFamily: 'Arial, sans-serif',
        color: '#333',
        minHeight: '100vh'
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px'
    },
    primaryButton: {
        backgroundColor: '#e74c3c',
        color: 'white',
        border: 'none',
        padding: '8px 16px',
        borderRadius: '5px',
        cursor: 'pointer'
    },
    filters: {
        display: 'flex',
        gap: '10px',
        marginBottom: '20px'
    },
    input: {
        padding: '8px',
        borderRadius: '4px',
        border: '1px solid #ccc',
        flex: 1
    },
    select: {
        padding: '8px',
        borderRadius: '4px',
        border: '1px solid #ccc'
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
        background: 'white',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
    },
    editButton: {
        marginRight: '8px',
        backgroundColor: '#3498db',
        color: 'white',
        border: 'none',
        padding: '5px 10px',
        borderRadius: '4px',
        cursor: 'pointer'
    },
    deleteButton: {
        backgroundColor: '#e74c3c',
        color: 'white',
        border: 'none',
        padding: '5px 10px',
        borderRadius: '4px',
        cursor: 'pointer'
    },
    activeStatus: {
        backgroundColor: '#2ecc71',
        color: 'white',
        padding: '4px 8px',
        borderRadius: '6px',
        border: 'none',
        cursor: 'pointer'
    },
    inactiveStatus: {
        backgroundColor: '#95a5a6',
        color: 'white',
        padding: '4px 8px',
        borderRadius: '6px',
        border: 'none',
        cursor: 'pointer'
    },
    modalOverlay: {
        position: 'fixed',
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.4)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000
    },
    modal: {
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '8px',
        width: '400px',
        boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
        position: 'relative'
    },
    modalHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px'
    },
    closeButton: {
        background: 'none',
        border: 'none',
        fontSize: '24px',
        cursor: 'pointer'
    },
    formGroup: {
        marginBottom: '15px',
        display: 'flex',
        flexDirection: 'column'
    },
    formGroupCheckbox: {
        marginBottom: '15px'
    },
    formActions: {
        display: 'flex',
        justifyContent: 'flex-end',
        gap: '10px'
    },
    cancelButton: {
        backgroundColor: '#bdc3c7',
        color: '#2c3e50',
        border: 'none',
        padding: '8px 12px',
        borderRadius: '4px',
        cursor: 'pointer'
    },
    submitButton: {
        backgroundColor: '#2ecc71',
        color: 'white',
        border: 'none',
        padding: '8px 12px',
        borderRadius: '4px',
        cursor: 'pointer'
    }
};