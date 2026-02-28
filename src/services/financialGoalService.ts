import { mwu_api } from '../api';
import { FinancialGoal, FinancialGoalInput } from '../types/financialGoalTypes.ts';
import { BaseService } from '../hooks/useApi';

export const financialGoalService = {
  getAll: async () => {
    const res = await mwu_api.get('/financial_goals/all');
    return res.data;
  },

  getById: async (id: string) => {
    const res = await mwu_api.get(`/financial_goals/${id}`);
    return res.data;
  },

  create: async (data: FinancialGoalInput) => {
    const res = await mwu_api.post('/financial_goals/create', data);
    return res.data;
  },

  update: async (id: string, data: FinancialGoalInput) => {
    const res = await mwu_api.patch(`/financial_goals/${id}/update`, data);
    return res.data;
  },

  delete: async (id: string) => {
    await mwu_api.delete(`/financial_goals/${id}/delete`);
  },
} satisfies BaseService<FinancialGoal, FinancialGoalInput>;
