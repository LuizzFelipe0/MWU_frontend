import React from 'react';
import * as S from './styles';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <S.Footer>
      <S.Copyright>© {currentYear} Todos os direitos reservados.</S.Copyright>
      <S.Copyright>Desenvolvido por Luiz Felipe Canário Costa</S.Copyright>
    </S.Footer>
  );
};

export default Footer;
