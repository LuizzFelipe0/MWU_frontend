import React from 'react';
import * as S from './styles';
import { useAuth } from '../../hooks/useAuth.tsx';
import Button from '../Button';

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
            Olá, <strong>{user.first_name}</strong>
          </span>
          <Button variant='danger' onClick={logout}>Sair</Button>
        </S.UserArea>
      )}
    </S.Header>
  );
};

export default Header;