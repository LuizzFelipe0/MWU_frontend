import { mwu_api } from '../../api';
import { ExpensesAnalysis } from '../../types/analyticsTypes';
import { ReadOnlyService } from '../../hooks/useApi';

export const expensesAnalysisService: ReadOnlyService<ExpensesAnalysis> = {
  getAll: async (): Promise<ExpensesAnalysis[]> => {
    const res = await mwu_api.get('/expenses/monthly/category-type');
    return res.data;
  },
};
