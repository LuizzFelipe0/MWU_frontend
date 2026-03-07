import { useMemo } from 'react';


export function useFilter<T>(data: T[], searchTerm: string, key: keyof T) {
  return useMemo(() => {

    if (!data) return [];

    if (!searchTerm.trim()) return data;

    const lowerTerm = searchTerm.toLowerCase();

    return data.filter((item) => {
      const value = item[key];

      return String(value).toLowerCase().includes(lowerTerm);
    });
  }, [data, searchTerm, key]);
}
