import axios from 'axios';
import { getToken } from './authService';

const API_URL = 'http://localhost:9090/api/kullanici';

export const getProfil = async () => {
  const token = getToken();
  const response = await axios.get(`${API_URL}/profil`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};

export const guncelleProfil = async (adSoyad, sifre) => {
  const token = getToken();
  await axios.put(`${API_URL}/profil`, { adSoyad, sifre }, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

export const sifreDegistir = async (mevcutSifre, yeniSifre) => {
  const token = getToken();
  await axios.put(`${API_URL}/sifre`, { mevcutSifre, yeniSifre }, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};
