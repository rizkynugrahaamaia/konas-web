import axios from 'axios';
import { clearStorage, getLogged } from '../utils/storage';

export const service = process.env.REACT_APP_SERVICE_URL;

const redirectToLogin = () => {
  clearStorage();
  window.location.replace('/login'); // Menggunakan replace untuk menghindari history
};

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
interceptedAxiosInstance.interceptors.request.use(
  function (config) {
    const logged = getLogged();
    // Cek apakah token ada dan valid
    if (!logged || !logged.token) {
      redirectToLogin();
      return Promise.reject('Authentication failed');
    }
    config.headers.Authorization = `Bearer ${logged.token}`;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Ini digunakan untuk menangani respons dari server
interceptedAxiosInstance.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (err) {
    if (axios.isCancel(err)) {
      return Promise.reject('request canceled');
    }

    if (err.response) {
      // Handle unauthorized atau token invalid
      if (err.response.status === 401 || err.response.status === 403) {
        redirectToLogin();
        return Promise.reject('Session expired');
      }
      return Promise.reject(err.response.data);
    }
    return Promise.reject({
      code: 500,
      status: 'error',
      message: 'Failed to fetch data. Please contact developer.',
    });
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