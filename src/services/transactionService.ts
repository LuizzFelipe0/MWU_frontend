import { mwu_api } from '../api';
import { Transaction, TransactionInput } from '../types/transactionTypes';
import { BaseService } from '../hooks/useApi';

export const transactionService = {
  getAll: async () => {
    const res = await mwu_api.get('/transactions/all');
    return res.data;
  },

  getById: async (id: string) => {
    const res = await mwu_api.get(`/transactions/${id}`);
    return res.data;
  },

  create: async (data: TransactionInput) => {
    const res = await mwu_api.post('/transactions/create', data);
    return res.data;
  },

  update: async (id: string, data: TransactionInput) => {
    const res = await mwu_api.patch(`/transactions/${id}/update`, data);
    return res.data;
  },

  delete: async (id: string) => {
    await mwu_api.delete(`/transactions/${id}/delete`);
  },

  getDeleted: async (): Promise<Transaction[]> => {
    const res = await mwu_api.get('/transactions/deleted');
    return res.data;
  },

  getByUser: async (userId: string): Promise<Transaction[]> => {
    const res = await mwu_api.get(`/transactions/${userId}/user`);
    return res.data;
  },

  restore: async (id: string): Promise<Transaction> => {
    const res = await mwu_api.post(`/transactions/${id}/restore`);
    return res.data;
  },

  forceDelete: async (id: string): Promise<void> => {
    await mwu_api.delete(`/transactions/${id}/force-delete`);
  },
} satisfies BaseService<Transaction, TransactionInput>;
