import React, { useState } from 'react';
import * as S from './styles';

interface PasswordInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;

}
const PasswordInput: React.FC<PasswordInputProps> = ({
  value,
  onChange,
  placeholder,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <S.Container>
      <S.Input
        type={showPassword ? 'text' : 'password'}
        value={value}
        onChange={(e: { target: { value: string } }) =>
          onChange(e.target.value)
        }
        placeholder={placeholder || '••••••••'}
      />
      <S.ToggleButton
        type="button"
        onClick={() => setShowPassword(!showPassword)}
      >
        {showPassword ? 'Ocultar' : 'Exibir'}
      </S.ToggleButton>
    </S.Container>
  );
};

export default PasswordInput;
