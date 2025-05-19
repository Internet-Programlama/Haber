import axios from 'axios';

const API_URL = 'http://localhost:9090/api/haber';

// Tüm haberleri getir
export const getTumHaberler = async () => {
  const response = await axios.get(`${API_URL}/tum`);
  return response.data;
};

// Yeni haber yayınla (JSON formatlı)
export const AddNews = async (haberRequest) => {
  const response = await axios.post(`${API_URL}/yayinla`, haberRequest);
  return response.data;
};

// Yeni haber yayınla (Görselli multipart/form-data)
export const yayinlaHaberGorselli = async (formData) => {
  const response = await axios.post(`${API_URL}/yayinla-gorselli`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  return response.data;
};

// Haberi güncelle
export const guncelleHaber = async (id, haberRequest) => {
  const response = await axios.put(`${API_URL}/${id}`, haberRequest);
  return response.data;
};

// Haberi sil
export const silHaber = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};

// Haber ara (kelime ile)
export const haberAra = async (kelime) => {
  const response = await axios.get(`${API_URL}/ara`, { params: { kelime } });
  return response.data;
};

// Kategoriye göre haber getir
export const kategoriyeGoreGetir = async (kategoriId) => {
  const response = await axios.get(`${API_URL}/kategori/${kategoriId}`);
  return response.data;
};

// Yazara göre haber getir
export const yazaraGoreGetir = async (email) => {
  const response = await axios.get(`${API_URL}/yazar/${email}`);
  return response.data;
};

// Popüler haberleri getir
export const populerHaberleriGetir = async (limit = 10) => {
  const response = await axios.get(`${API_URL}/populer`, { params: { limit } });
  return response.data;
};

// Kategori ve kelimeye göre haber filtrele
export const kategoriVeKelimeyeGoreGetir = async (kategoriId, kelime) => {
  const response = await axios.get(`${API_URL}/filtrele`, { params: { kategoriId, kelime } });
  return response.data;
};

// Etikete göre haber getir
export const etiketeGoreGetir = async (etiket) => {
  const response = await axios.get(`${API_URL}/etiket/${etiket}`);
  return response.data;
};
