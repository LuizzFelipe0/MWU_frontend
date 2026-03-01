export interface Account {
  id: string;
  name: string;
  account_number: string;
  type: string;
  balance: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface AccountInput {
  name: string;
  account_number: string;
  type: string;
  balance: number;
}
