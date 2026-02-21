export interface LoginInput {
  email: string;
  password: string;
}

export interface User {
  id: string;
  email: string;
  first_name: string;
  cpf: string;
  created_at: string;
}

export interface LoginOutput {
  access_token: string;
  token_type: string;
  user: User;
}
