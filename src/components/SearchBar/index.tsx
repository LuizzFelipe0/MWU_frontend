import React from 'react';
import * as S from './styles';

interface SearchBarProps {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = 'Buscar...',
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

export default SearchBar;
