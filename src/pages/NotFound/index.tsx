import React from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from './styles';

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <S.Container>
      <S.ErrorCode>404</S.ErrorCode>
      <S.Message>Ops! Página não encontrada.</S.Message>
      <S.HomeButton onClick={() => navigate('/')}>
        Voltar para o Início
      </S.HomeButton>
    </S.Container>
  );
};

export default NotFoundPage;
