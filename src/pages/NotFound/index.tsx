import React from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from './styles';
import Button from '../../components/Button';

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <S.Container>
      <S.ErrorCode>404</S.ErrorCode>
      <S.Message>Ops! Página não encontrada.</S.Message>
      <Button onClick={() => navigate('/')}>
        Voltar para o Início
      </Button>
    </S.Container>
  );
};

export default NotFoundPage;
