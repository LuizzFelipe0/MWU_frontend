export interface FinancialGoal {
  id: string;
  user_id: string;
  name: string;
  description: string;
  target_amount: number;
  deadline: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface FinancialGoalInput {
  user_id: string;
  name: string;
  description: string | null;
  target_amount: number;
  deadline: string;
}
