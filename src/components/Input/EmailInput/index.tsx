import React from 'react';
import { Input } from './styles';

interface EmailInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const EmailInput: React.FC<EmailInputProps> = ({
  value,
  onChange,
  placeholder,
}) => {
  return (
    <Input
      type="email"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder || 'seu@email.com'}
      autoComplete="email"
    />
  );
};

export default EmailInput;
