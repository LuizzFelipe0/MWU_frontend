import React from 'react';
import * as S from './styles.ts';

interface NumberInputProps {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
}

const NumberInput: React.FC<NumberInputProps> = ({
  placeholder,
  value,
  onChange,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let digits = e.target.value.replace(/\D/g, '');

    const amount = Number(digits) / 100;

    const formatted = new Intl.NumberFormat('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);

    onChange(formatted);
  };

  return (
    <S.Input
      type="text"
      inputMode="numeric"
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
    />
  );
};

export default NumberInput;
