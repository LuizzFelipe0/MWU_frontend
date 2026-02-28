// Converts "1.250,50" to 1250.50 (float)
export const parseCurrencyToNumber = (value: string): number => {
  if (!value) return 0;

  const cleanValue = value.replace(/\./g, '').replace(',', '.');

  const result = parseFloat(cleanValue);

  return isNaN(result) ? 0 : result;
};


// Converts number to BRL string
export const formatNumberToCurrency = (value: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};