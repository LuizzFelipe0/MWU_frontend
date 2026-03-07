export interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  cpf: string;
  is_admin: boolean; // Auth field
  manual_balance: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface UserInput extends Pick <
  User,
  'email' | 'first_name' | 'last_name' | 'cpf'
> {
  password: string;
  manual_balance?: number;
}

export type UserSession = Pick<
  User,
  'id' | 'email' | 'first_name' | 'cpf' | 'is_admin'
>;


export interface LoginInput {
  email: string;
  password: string;
}

export interface LoginOutput {
  access_token: string;
  token_type: string;
  user: UserSession;
}
