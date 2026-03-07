import { mwu_api } from '../api';
import { LoginInput, LoginOutput } from '../types/userTypes.ts';

export const authService = {
  login: async (data: LoginInput): Promise<LoginOutput> => {
    const res = await mwu_api.post('/auth/login', data);
    return res.data;
  },
};
