import axios from 'axios';
import { clearStorage, getLogged } from '../utils/storage';

export const service = process.env.REACT_APP_SERVICE_URL;

// Membuat instance Axios dengan konfigurasi tertentu
// Ini digunakan untuk mengatur URL dasar dan header yang akan digunakan dalam setiap permintaan
const interceptedAxiosInstance = axios.create({
  baseURL: service,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
} //
});

interceptedAxiosInstance.CancelToken = axios.CancelToken; // Menambahkan CancelToken ke instance Axios
interceptedAxiosInstance.isCancel = axios.isCancel; // Menambahkan isCancel ke instance Axios

// Interseptor permintaan
// Ini digunakan untuk menambahkan token otentikasi ke setiap permintaan
interceptedAxiosInstance.interceptors.request.use(function (config) {
  // Mengambil token dari localStorage
  const { token } = getLogged();
  if (token) {
    // Menambahkan token ke header Authorization jika ada
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Ini digunakan untuk menangani respons dari server
interceptedAxiosInstance.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (err) {
    if (axios.isCancel(err)) {
      return Promise.reject('request canceled');
    }

    if (err.response && err.response.data) {
      if (err.response.status === 401 || err.response.status === 403) {
        clearStorage();
        window.location.href = '/login';
      }
      return Promise.reject(err.response.data);
    } else {
      return Promise.reject({
        code: 500,
        status: 'error',
        message: 'Failed to fetch data. Please contact developer.',
      });
    }
  }
);


// Membuat instance Axios kedua tanpa interseptor permintaan
// Ini digunakan untuk permintaan yang tidak memerlukan token otentikasi
const uninterceptedAxiosInstance = axios.create({
  baseURL: service,
  headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
  }
});

// Interseptor respons untuk instance kedua
// Ini digunakan untuk menangani respons dari server
uninterceptedAxiosInstance.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (err) {
    if (axios.isCancel(err)) {
      return Promise.reject('request canceled');
    }

    if (err.response && err.response.data) {
      if (err.response.status === 401 || err.response.status === 403) {
        clearStorage();
        window.location.href = '/login';
      }
      return Promise.reject(err.response.data);
    } else {
      return Promise.reject({
        code: 500,
        status: 'error',
        message: 'Failed to fetch data. Please contact developer.',
        });;
    }
  }
);

export { interceptedAxiosInstance, uninterceptedAxiosInstance };