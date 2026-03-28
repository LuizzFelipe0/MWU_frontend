import React from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from './styles';
import { useAuth } from '../../hooks/useAuth.tsx';

// @ts-ignore
import logoIcon from '../../assets/mwu-piggy-bank.png';
// @ts-ignore
import settingsIcon from '../../assets/settings.png';
import SelectInput from '../Input/SelectInput';

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Opções do menu de configurações
  const settingsOptions = [
    { value: 'profile', label: '👤 Editar Perfil' },
    { value: 'logout', label: '🚪 Sair da Conta' },
  ];

  const handleMenuAction = (value: string) => {
    if (value === 'profile') {
      navigate('/profile');
    } else if (value === 'logout') {
      logout();
    }
  };

  return (
    <S.Header>
      <S.HeaderLink to="/">
        <S.LogoIcon src={logoIcon} alt="MWU Logo" />
        <S.Title>MWU - Money With U</S.Title>
      </S.HeaderLink>

      {user && (
        <S.UserArea>
          <S.UserGreeting>
            {user.is_admin ? (
              <>
                Olá <strong>Admin</strong>, {user.first_name}
              </>
            ) : (
              <>Olá, {user.first_name}</>
            )}
          </S.UserGreeting>

          <S.MenuWrapper title="Configurações">
            <SelectInput
              options={settingsOptions}
              value=""
              onChange={handleMenuAction}
              placeholder=""
              icon={settingsIcon}
            />
          </S.MenuWrapper>
        </S.UserArea>
      )}
    </S.Header>
  );
};

export default Header;
