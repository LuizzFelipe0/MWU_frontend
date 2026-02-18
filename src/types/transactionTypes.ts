export interface Transaction {
  id: string;
  user_id: string;
  account_id: string;
  category_id: string;
  name: string;
  description: string;
  amount: number;
  date: string;
  is_recurring: boolean;
  recurrence_interval: string;
  next_due_date: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface TransactionInput {
  user_id: string;
  account_id: string;
  category_id: string;
  name: string;
  description: string;
  amount: number;
  date: string;
  is_recurring: boolean;
  recurrence_interval: string;
  next_due_date: string;
}
