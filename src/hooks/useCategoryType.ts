import { useState, useEffect } from 'react';
import { CategoryType, CategoryTypeCreate } from '../types/categoryTypeTypes.ts';
import { categoryTypeService } from '../services/categoryTypeService';

export const useCategoryTypes = () => {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [loading, setLoading] = useState(true);

  const loadCategories = async () => {
    try {
      const data = await categoryTypeService.getAll();
      setCategories(data);
    } finally {
      setLoading(false);
    }
  };

  const addCategory = async (data: CategoryTypeCreate) => {
    const newCat = await categoryTypeService.create(data);
    setCategories([...categories, newCat]);
  };

  const removeCategory = async (id: string) => {
    await categoryTypeService.delete(id);
    setCategories(categories.filter(c => c.id !== id));
  };

  useEffect(() => { loadCategories(); }, []);

  return { categories, loading, addCategory, removeCategory, refresh: loadCategories };
};