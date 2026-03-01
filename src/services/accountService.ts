import { mwu_api } from '../api';
import { Account, AccountInput } from '../types/accountTypes.ts';
import { BaseService } from '../hooks/useApi';

export const accountService = {
  getAll: async () => {
    const res = await mwu_api.get('/accounts/all');
    return res.data;
  },

  getById: async (id: string) => {
    const res = await mwu_api.get(`/accounts/${id}`);
    return res.data;
  },

  create: async (data: AccountInput) => {
    const res = await mwu_api.post('/accounts/create', data);
    return res.data;
  },

  update: async (id: string, data: AccountInput) => {
    const res = await mwu_api.patch(`/accounts/${id}/update`, data);
    return res.data;
  },

  delete: async (id: string) => {
    await mwu_api.delete(`/accounts/${id}/delete`);
  },
} satisfies BaseService<Account, AccountInput>;
