export interface CategoryType {
  id: string;
  name: string;
  is_positive: boolean;
}

export interface CategoryTypeCreate {
  name: string;
  is_positive: boolean;
}

export interface CategoryTypeUpdate {
  name?: string;
  is_positive?: boolean;
}