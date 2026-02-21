import axios from 'axios';

export const mwu_api = axios.create({
  baseURL: import.meta.env.VITE_MWU_API_ENDPOINT,
  headers: {
    'Content-Type': 'application/json',
  },
});


mwu_api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('@MWU:token');

    if (token) {

      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);


mwu_api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('@MWU:token');
      localStorage.removeItem('@MWU:user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  },
);
