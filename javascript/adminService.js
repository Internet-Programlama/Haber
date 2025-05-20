const API_BASE_URL = 'http://localhost:9090/api/admin';

// Tüm kullanıcıları çek
export const fetchKullanicilar = async (token) => {
  const response = await fetch(`${API_BASE_URL}/kullanicilar`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  if (!response.ok) throw new Error('Kullanıcılar getirilemedi');
  return await response.json();
};

// Rol güncelle
export const updateRol = async (request, token) => {
  const response = await fetch(`${API_BASE_URL}/rol-guncelle`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(request),
  });
  if (!response.ok) throw new Error('Rol güncellenemedi');
  return await response.text();
};

// Kullanıcı sil
export const deleteKullanici = async (id, token) => {
  const response = await fetch(`${API_BASE_URL}/kullanici/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  if (!response.ok) throw new Error('Kullanıcı silinemedi');
  return await response.text();
};
