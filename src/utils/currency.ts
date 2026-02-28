// Converts "1.250,50" to 1250.50 (float)
export const parseCurrencyToNumber = (value: string): number => {
  if (!value) return 0;

  const cleanValue = value.replace(/\./g, '').replace(',', '.');

  const result = parseFloat(cleanValue);

  return isNaN(result) ? 0 : result;
};
