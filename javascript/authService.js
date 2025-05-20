import axios from 'axios';

const API_URL = 'http://localhost:9090/api/auth';

// Kullanıcı kayıt ol
export const register = async (adSoyad, email, sifre, rol) => {
  const response = await axios.post(`${API_URL}/register`, {
    adSoyad,
    email,
    sifre,
    rol
  });
  return response.data;
};

// Kullanıcı giriş yap
export const login = async (email, sifre) => {
  const response = await axios.post(`${API_URL}/login`, {
    email,
    sifre
  });

  const token = response.data;
  // Token'ı localStorage'a kaydet
  localStorage.setItem('token', token);

  return token;
};

// Çıkış yap
export const logout = () => {
  localStorage.removeItem('token');
};

// Giriş yapmış kullanıcı mı?
export const isAuthenticated = () => {
  return !!localStorage.getItem('token');
};

// Token'ı getir
export const getToken = () => {
  return localStorage.getItem('token');
};
