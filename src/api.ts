import axios from 'axios';

export const mwu_api = axios.create({
  baseURL: import.meta.env.VITE_MWU_API_ENDPOINT,
});
