import React from 'react';
import * as S from './styles';
import { useAuth } from '../../hooks/useAuth.tsx';
import Button from '../Button/DefaultButton';

const Header: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <S.Header>
      <S.HeaderLink to="/">
        <S.Title>MWU - Money With U</S.Title>
      </S.HeaderLink>

      {user && (
        <S.UserArea>
          <span>
            {user.is_admin ? (
              <>
                Olá <strong>Admin</strong>, {user.first_name}
              </>
            ) : (
              <>Olá, {user.first_name}</>
            )}
          </span>
          <Button variant="danger" onClick={logout}>
            Sair
          </Button>
        </S.UserArea>
      )}
    </S.Header>
  );
};

export default Header;
