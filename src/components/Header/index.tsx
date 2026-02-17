import React from 'react';
import * as S from './styles';

const Header: React.FC = () => {
  return (
    <S.Header>
        <S.HeaderLink to="/">
          <S.Title>MWU - Money With U</S.Title>
        </S.HeaderLink>
    </S.Header>
  );
};

export default Header;