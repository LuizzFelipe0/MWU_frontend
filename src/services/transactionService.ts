import {
  Transaction,
  TransactionInput
} from '../types/transactionTypes.ts';
import { mwu_api } from '../api.ts';


export const transactionService = {
  getAll: async (): Promise<Transaction[]> => {
    const response = await mwu_api.get('/transactions/all');
    return response.data;
  },

  create: async (data: TransactionInput): Promise<Transaction> => {
    const response = await mwu_api.post('/transactions/create', data);
    return response.data;
  },

  update: async (id: string, data: TransactionInput): Promise<Transaction> => {
    const response = await mwu_api.patch(`/transactions/${id}/update`, data);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await mwu_api.delete(`/transactions/${id}/delete`);
  },
};