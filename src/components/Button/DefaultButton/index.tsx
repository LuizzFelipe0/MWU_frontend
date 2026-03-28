import React, { ButtonHTMLAttributes } from 'react';
import * as S from './styles';

// @ts-ignore
import trashIcon from '../../../assets/bin.png';
// @ts-ignore
import plusIcon from '../../../assets/plus.png';
// @ts-ignore
import pencilIcon from '../../../assets/pencil.png';
// @ts-ignore
import clearFilterIcon from '../../../assets/clear-filter.png';
// @ts-ignore
import settingsIcon from '../../../assets/settings.png';

const iconMap = {
  delete: trashIcon,
  add: plusIcon,
  update: pencilIcon,
  clear: clearFilterIcon,
  settings: settingsIcon,
};

export type IconType = keyof typeof iconMap;

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: S.ButtonVariant;
  icon?: IconType;
  children?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  icon,
  children,
  ...rest
}) => {
  return (
    <S.Button $variant={variant} {...rest}>
      {children && <span>{children}</span>}
      {icon && <S.Icon src={iconMap[icon]} alt={`${icon} icon`} />}
    </S.Button>
  );
};

export default Button;
