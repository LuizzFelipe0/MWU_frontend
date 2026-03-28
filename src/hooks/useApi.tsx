import { useState, useCallback, useEffect } from 'react';

export interface ReadOnlyService<T> {
  getAll: () => Promise<T[]>;
}

export interface BaseService<T, I> extends ReadOnlyService<T> {
  getById: (id: string) => Promise<T>;
  create: (data: I) => Promise<T>;
  update: (id: string, data: I) => Promise<T>;
  delete: (id: string) => Promise<void>;
}

function isFullService<T, I>(
  service: ReadOnlyService<T> | BaseService<T, I>,
): service is BaseService<T, I> {
  return 'getById' in service;
}

export function useApi<T>(
  service: ReadOnlyService<T>,
  autoFetch?: boolean,
): {
  data: T[];
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
};
export function useApi<T, I>(
  service: BaseService<T, I>,
  autoFetch?: boolean,
): {
  data: T[];
  item: T | null;
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
  getOne: (id: string) => Promise<T | undefined>;
  add: (newData: I) => Promise<T>;
  edit: (id: string, updateData: I) => Promise<T>;
  remove: (id: string) => Promise<void>;
};

export function useApi<T, I = never>(
  service: ReadOnlyService<T> | BaseService<T, I>,
  autoFetch = false,
) {
  const [data, setData] = useState<T[]>([]);
  const [item, setItem] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      const result = await service.getAll();
      setData(result);
    } catch {
      setError('Falha ao carregar lista.');
    } finally {
      setLoading(false);
    }
  }, [service]);

  const getOne = useCallback(
    async (id: string) => {
      if (!isFullService(service)) return;
      setLoading(true);
      try {
        const result = await service.getById(id);
        setItem(result);
        return result;
      } catch {
        setError('Falha ao buscar item.');
      } finally {
        setLoading(false);
      }
    },
    [service],
  );

  const add = async (newData: I) => {
    if (!isFullService(service)) return;
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
    if (!isFullService(service)) return;
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
    if (!isFullService(service)) return;
    setLoading(true);
    try {
      await service.delete(id);
      setData((prev) => prev.filter((i: any) => i.id !== id));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (autoFetch) refresh();
  }, [autoFetch, refresh]);

  return { data, item, loading, error, refresh, getOne, add, edit, remove };
}
