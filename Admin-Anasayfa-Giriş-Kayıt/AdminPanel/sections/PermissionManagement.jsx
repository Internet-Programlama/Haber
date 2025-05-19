import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { USER_ROLES } from "../../../../basics/USER_ROLES.js";

export const PermissionManagement = ({ users = [], currentUserRole }) => {
    const navigate = useNavigate();

    // Admin olmayan kullanıcılar için yönlendirme
    useEffect(() => {
        if (!currentUserRole) return; // Rol henüz gelmemişse bekle
        if (currentUserRole !== USER_ROLES.ADMIN) {
            navigate('/');
        }
    }, [currentUserRole, navigate]);

    const handleRoleChange = (userId, newRole) => {
        console.log(`User ID: ${userId} - New Role: ${newRole}`);
        // API çağrısı burada yapılabilir
    };

    if (!users || users.length === 0) {
        return (
            <div className="p-6 max-w-4xl mx-auto">
                <h1 className="text-2xl font-bold mb-6">Kullanıcı İzin Yönetimi</h1>
                <p>Kullanıcı listesi yüklenemedi veya boş.</p>
            </div>
        );
    }

    return (
        <div className="p-6 max-w-6xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Kullanıcı İzin Yönetimi</h1>

            <div className="overflow-x-auto bg-white rounded-lg shadow">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Kullanıcı Adı</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rol</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">İşlemler</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {users.map(user => (
                            <tr key={user.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    {user.name}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    <select
                                        value={user.role}
                                        onChange={(e) => handleRoleChange(user.id, e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="editor">Editör</option>
                                        <option value="admin">Admin</option>
                                        <option value="guest">Misafir</option>
                                    </select>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                                    <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                                        Düzenle
                                    </button>
                                    <button className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors">
                                        Sil
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
