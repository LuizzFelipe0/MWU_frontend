import { mwu_api } from '../api';
import { LoginInput, LoginOutput } from '../types/authTypes';

export const authService = {
  login: async (data: LoginInput): Promise<LoginOutput> => {
    const res = await mwu_api.post('/auth/login', data);
    return res.data;
  },
};
