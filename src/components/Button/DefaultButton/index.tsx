import React, { ButtonHTMLAttributes } from 'react';
import * as S from './styles.ts';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: S.ButtonVariant;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  children,
  ...rest
}) => {
  return (
    <S.Button $variant={variant} {...rest}>
      {children}
    </S.Button>
  );
};

export default Button;
