import React from 'react';
import * as S from './styles';

interface DateInputProps {
  value: string; // YYYY-MM-DD
  onChange: (value: string) => void;
}

const DateInput: React.FC<DateInputProps> = ({ value, onChange }) => {
  return (
    <S.Input
      type="date"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

export default DateInput;
