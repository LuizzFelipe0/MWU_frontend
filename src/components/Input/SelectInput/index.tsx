import React from 'react';
import * as S from './styles';

// @ts-ignore
import arrowDownIcon from '../../../assets/arrow-down.png';

interface Option {
  value: string | number;
  label: string;
}

interface SelectInputProps {
  options: Option[];
  value: string | number;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
}

const SelectInput: React.FC<SelectInputProps> = ({
  options,
  value,
  onChange,
  placeholder = 'Selecione uma opção...',
  required = false,
}) => {
  return (
    <S.Select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      required={required}
      $icon={arrowDownIcon}
    >
      <option value="" disabled>
        {placeholder}
      </option>

      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </S.Select>
  );
};

export default SelectInput;
