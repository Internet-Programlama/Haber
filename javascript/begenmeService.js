import axios from 'axios';
import { getToken } from './authService';

const API_URL = 'http://localhost:9090/api/begenme';

// Haberi beğen veya beğeniyi kaldır
export const toggleBegenme = async (haberId) => {
  const token = getToken();
  const response = await axios.post(`${API_URL}/${haberId}`, null, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};

// Haber beğeni sayısını getir
export const getBegenmeSayisi = async (haberId) => {
  const response = await axios.get(`${API_URL}/sayisi/${haberId}`);
  return response.data;
};
