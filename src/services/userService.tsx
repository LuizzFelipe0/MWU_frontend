import { mwu_api } from '../api';
import { User, UserInput } from '../types/userTypes.ts';
import { BaseService } from '../hooks/useApi';

export const userService: BaseService<User, UserInput> = {
  getAll: async () => {
    const res = await mwu_api.get('/users/all');
    return res.data;
  },
  getById: async (id: string) => {
    const res = await mwu_api.get(`/users/${id}`);
    return res.data;
  },
  create: async (data: UserInput) => {
    const res = await mwu_api.post('/users/create', data);
    return res.data;
  },
  update: async (id: string, data: UserInput) => {
    const res = await mwu_api.patch(`/users/${id}/update`, data);
    return res.data;
  },
  delete: async (id: string) => {
    await mwu_api.delete(`/users/${id}/delete`);
  },
};
