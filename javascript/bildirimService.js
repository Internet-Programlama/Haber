import axios from 'axios';
import { getToken } from './authService';

const API_URL = 'http://localhost:9090/api/bildirim';

// Okunmayan bildirimleri getir
export const getOkunmayanBildirimler = async () => {
  const token = getToken();
  const response = await axios.get(`${API_URL}/okunmayanlar`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};

// Tüm bildirimleri getir
export const getTumBildirimler = async () => {
  const token = getToken();
  const response = await axios.get(`${API_URL}/tum`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};
