import React from 'react';
import * as S from './styles';

interface Option {
  label: string;
  value: boolean;
  variant: 'positive' | 'negative' | 'neutral';
}

interface ToggleButtonProps {
  options: [Option, Option];
  selectedValue: boolean;
  onChange: (value: boolean) => void;
}

const ToggleButton: React.FC<ToggleButtonProps> = ({
  options,
  selectedValue,
  onChange,
}) => {
  return (
    <S.Container>
      {options.map((option) => (
        <S.Button
          key={String(option.value)}
          $active={selectedValue === option.value}
          $variant={option.variant}
          onClick={() => onChange(option.value)}
          type="button"
        >
          {option.label}
        </S.Button>
      ))}
    </S.Container>
  );
};

export default ToggleButton;
