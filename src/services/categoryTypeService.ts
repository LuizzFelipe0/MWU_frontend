import { CategoryType, CategoryTypeCreate, CategoryTypeUpdate } from '../types/categoryTypeTypes.ts';
import { mwu_api } from '../api.ts';


export const categoryTypeService = {
  getAll: async (): Promise<CategoryType[]> => {
    const response = await mwu_api.get('/category_types/all');
    return response.data;
  },

  create: async (data: CategoryTypeCreate): Promise<CategoryType> => {
    const response = await mwu_api.post('/category_types/create', data);
    return response.data;
  },

  update: async (id: string, data: CategoryTypeUpdate): Promise<CategoryType> => {
    const response = await mwu_api.patch(`/category_types/${id}/update`, data);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await mwu_api.delete(`/category_types/${id}/delete`);
  }
};