import { useState, useCallback } from 'react';

export interface BaseService<T, I> {
  getAll: () => Promise<T[]>;
  getById: (id: string) => Promise<T>;
  create: (data: I) => Promise<T>;
  update: (id: string, data: I) => Promise<T>;
  delete: (id: string) => Promise<void>;
}

export function useApi<T, I>(service: BaseService<T, I>) {
  const [data, setData] = useState<T[]>([]);
  const [item, setItem] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      const result = await service.getAll();
      setData(result);
    } catch (err) {
      setError('Falha ao carregar lista.');
    } finally {
      setLoading(false);
    }
  }, [service]);

  const getOne = useCallback(
    async (id: string) => {
      setLoading(true);
      try {
        const result = await service.getById(id);
        setItem(result);
        return result;
      } catch (err) {
        setError('Falha ao buscar item.');
      } finally {
        setLoading(false);
      }
    },
    [service],
  );

  const add = async (newData: I) => {
    setLoading(true);
    try {
      const created = await service.create(newData);
      setData((prev) => [...prev, created]);
      return created;
    } finally {
      setLoading(false);
    }
  };

  const edit = async (id: string, updateData: I) => {
    setLoading(true);
    try {
      const updated = await service.update(id, updateData);
      setData((prev) => prev.map((i: any) => (i.id === id ? updated : i)));
      return updated;
    } finally {
      setLoading(false);
    }
  };

  const remove = async (id: string) => {
    setLoading(true);
    try {
      await service.delete(id);
      setData((prev) => prev.filter((i: any) => i.id !== id));
    } finally {
      setLoading(false);
    }
  };

  return { data, item, loading, error, refresh, getOne, add, edit, remove };
}
