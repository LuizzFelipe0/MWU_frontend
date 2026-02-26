import React from 'react';
import * as S from './styles';

interface SearchBarProps {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
}

const TextInput: React.FC<SearchBarProps> = ({
  placeholder,
  value,
  onChange,
}) => {

  return (
      <S.Input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
  );
};

export default TextInput;
