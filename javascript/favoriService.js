import axios from 'axios';
import { getToken } from './authService';

const API_URL = 'http://localhost:9090/api/favori';

// Favoriye ekle veya çıkar (toggle)
export const toggleFavori = async (haberId) => {
  const token = getToken();
  await axios.post(`${API_URL}/${haberId}`, {}, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

// Kullanıcının favori haberlerini getir
export const getFavoriHaberler = async () => {
  const token = getToken();
  const response = await axios.get(`${API_URL}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};
