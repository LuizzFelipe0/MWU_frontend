import { mwu_api } from '../api';
import { Category, CategoryInput } from '../types/categoryTypes.ts';
import { BaseService } from '../hooks/useApi';

export const categoryService: BaseService<Category, CategoryInput> =
  {
    getAll: async () => {
      const res = await mwu_api.get('/categories/all');
      return res.data;
    },
    getById: async (id: string) => {
      const res = await mwu_api.get(`/categories/${id}`);
      return res.data;
    },
    create: async (data: CategoryInput) => {
      const res = await mwu_api.post('/categories/create', data);
      return res.data;
    },
    update: async (id: string, data: CategoryInput) => {
      const res = await mwu_api.patch(`/categories/${id}/update`, data);
      return res.data;
    },
    delete: async (id: string) => {
      await mwu_api.delete(`/categories/${id}/delete`);
    },
  };