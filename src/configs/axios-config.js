import axios from 'axios';
import { clearStorage } from '../utils/storage';

// URL dasar dari backend service
// const service = 'https://konas-service.vercel.app';
export const service = process.env.REACT_APP_SERVICE_URL;

// Membuat instance Axios dengan konfigurasi
const interceptedAxiosInstance = axios.create({
  baseURL: service,
  withCredentials: true,  // Mengizinkan pengiriman cookie dalam permintaan
});

interceptedAxiosInstance.CancelToken = axios.CancelToken;
interceptedAxiosInstance.isCancel = axios.isCancel;

// Interseptor permintaan
interceptedAxiosInstance.interceptors.request.use(function (config) {
  // Kamu bisa menambahkan logika tambahan di sini sebelum permintaan dikirim
  return config;
});

// Interseptor respons
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
const uninterceptedAxiosInstance = axios.create({
  baseURL: service,
  withCredentials: true,  // Mengizinkan pengiriman cookie dalam permintaan
});

// Interseptor respons untuk instance kedua
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