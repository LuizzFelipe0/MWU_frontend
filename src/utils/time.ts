export const getYearOptionsFromData = <T>(data: T[], dateKey: keyof T) => {
  if (!data || data.length === 0) return [];

  const years = data
    .map((item) => {
      const dateValue = item[dateKey];
      return dateValue
        ? new Date(String(dateValue)).getFullYear().toString()
        : '';
    })
    .filter(Boolean);

  const uniqueYears = Array.from(new Set(years)).sort().reverse();

  return uniqueYears.map((year) => ({
    value: year,
    label: year,
  }));
};