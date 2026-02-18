import { mwu_api } from '../api';
import { CategoryType, CategoryTypeInput } from '../types/categoryTypeTypes.ts';
import { BaseService } from '../hooks/useApi';

export const categoryTypeService: BaseService<CategoryType, CategoryTypeInput> =
  {
    getAll: async () => {
      const res = await mwu_api.get('/category_types/all');
      return res.data;
    },
    getById: async (id: string) => {
      const res = await mwu_api.get(`/category_types/${id}`);
      return res.data;
    },
    create: async (data: CategoryTypeInput) => {
      const res = await mwu_api.post('/category_types/create', data);
      return res.data;
    },
    update: async (id: string, data: CategoryTypeInput) => {
      const res = await mwu_api.patch(`/category_types/${id}/update`, data);
      return res.data;
    },
    delete: async (id: string) => {
      await mwu_api.delete(`/category_types/${id}/delete`);
    },
  };
