import axios from 'axios';
import { CategoryType, CategoryTypeCreate, CategoryTypeUpdate } from '../types/categoryTypeTypes.ts';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000'
});


export const categoryTypeService = {
  getAll: async (): Promise<CategoryType[]> => {
    const response = await api.get('/category_types/all');
    return response.data;
  },

  create: async (data: CategoryTypeCreate): Promise<CategoryType> => {
    const response = await api.post('/category_types/create', data);
    return response.data;
  },

  update: async (id: string, data: CategoryTypeUpdate): Promise<CategoryType> => {
    const response = await api.patch(`/category_types/${id}/update`, data);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/category_types/${id}/delete`);
  }
};