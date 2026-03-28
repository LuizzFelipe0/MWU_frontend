export interface GoalsAnalysis {
  id: string;
  name: string;
  description: string;
  target_amount: number;
  progress_percentage: string;
  sum_of_balances: number;
  difference_to_achieve_target: number;
  deadline: string;
  monthly_saving_required: number;
}

export interface ExpensesAnalysis {
  year: number;
  month: number;
  category_name: string;
  category_type_name: string;
  is_positive: boolean;
  percentage: number;
  total_amount: number;
}
