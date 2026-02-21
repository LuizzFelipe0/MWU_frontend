export interface LoginInput {
  email: string;
  password: string;
}

export interface User {
  id: string;
  email: string;
  first_name: string;
  cpf: string;
  is_admin: boolean;
}

export interface LoginOutput {
  access_token: string;
  token_type: string;
  user: User;
}
