export interface Category {
  id: string;
  user_id: string;
  category_type_id: string;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface CategoryInput {
  user_id: string;
  category_type_id: string;
  name: string;
  description: string;
}
