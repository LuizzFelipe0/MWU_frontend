import React, { ReactNode } from 'react';
import * as S from './styles';

interface CardBoxProps {
  title?: string;
  children: ReactNode;
}

const CardBox: React.FC<CardBoxProps> = ({ title, children }) => {
  return (
    <S.Container>
      {title && (
        <S.CardHeader>
          <h1>{title}</h1>
        </S.CardHeader>
      )}
      <S.Content>{children}</S.Content>
    </S.Container>
  );
};

export default CardBox;
