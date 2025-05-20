import axios from 'axios';
import { getToken } from './authService';

const API_URL = 'http://localhost:9090/api/yorum';

const authHeaders = () => ({
  headers: { Authorization: `Bearer ${getToken()}` }
});

export const yorumEkle = async (haberId, icerik, parentYorumId = null) => {
  await axios.post(`${API_URL}/ekle`, { haberId, icerik, parentYorumId }, authHeaders());
};

export const yorumSil = async (yorumId) => {
  await axios.delete(`${API_URL}/${yorumId}`, authHeaders());
};

export const yorumGuncelle = async (yorumId, icerik) => {
  await axios.put(`${API_URL}/${yorumId}`, { icerik }, authHeaders());
};

export const habereYorumlariGetir = async (haberId) => {
  const response = await axios.get(`${API_URL}/haber/${haberId}`);
  return response.data;
};

export const yorumCevaplariGetir = async (yorumId) => {
  const response = await axios.get(`${API_URL}/cevaplar/${yorumId}`);
  return response.data;
};
