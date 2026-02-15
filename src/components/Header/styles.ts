import styled from 'styled-components';

export const Header = styled.header`
  /* Layout */
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  /* Espaçamento usando rem e % para responsividade */
  padding: 1.2rem 2%;
  margin-bottom: 1rem;

  background-color: #ffff;

  border-bottom: 0.0625rem solid #c5c9c7;

  /* Fixar no topo se desejar, removendo o margin-bottom se fizer isso */
  position: sticky;
  top: 0;
  z-index: 100;

  /* Garante que o padding não quebre a largura total */
  box-sizing: border-box;
`;

export const Title = styled.h1`
  /* Responsividade fluida: 
     Minimo: 1.5rem, Ideal: 4vw, Máximo: 2.125rem (~34px) 
  */
  font-size: clamp(1.5rem, 4vw, 2.125rem);

  font-weight: 700;
  color: #32d177;

  /* Ajuste de kerning (espaçamento entre letras) estilo iOS Display */
  margin: 0.0625rem;

  /* Fonte do sistema Apple */
  font-family:
    -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', Roboto,
    Helvetica, Arial, sans-serif;

  /* Toque de design: uma leve transição ao redimensionar */
  transition: font-size 0.2s ease-in-out;
`;
