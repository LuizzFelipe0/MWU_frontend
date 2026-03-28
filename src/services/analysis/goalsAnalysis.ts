import { mwu_api } from '../../api';
import { GoalsAnalysis } from '../../types/analyticsTypes';
import { ReadOnlyService } from '../../hooks/useApi';

export const goalAnalysisService: ReadOnlyService<GoalsAnalysis> = {
  getAll: async (): Promise<GoalsAnalysis[]> => {
    const res = await mwu_api.get('/goals-analysis/all');
    return res.data;
  },
};
