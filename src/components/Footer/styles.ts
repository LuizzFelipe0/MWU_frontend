import styled from 'styled-components';

export const Footer = styled.footer`
  /* Layout */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;

  /* Espaçamento consistente com o Header (2% nas laterais) */
  padding: 1.5rem 2%;

  background-color: #ffffff;

  /* Borda superior para separar do conteúdo, igual à espessura do Header */
  border-top: 0.0625rem solid #c5c9c7;

  /* Garante que o padding não quebre a largura total */
  box-sizing: border-box;

  @media (min-width: 48rem) {
    flex-direction: column;
    justify-content: space-between;
  }
`;

export const Copyright = styled.p`
  /* Fonte menor que o título, mas ainda responsiva */
  font-size: clamp(0.875rem, 2.5vw, 1rem);

  font-weight: 500;
  color: #929090; /* Sua cor secundária */
  margin: 0.0625rem;

  font-family:
    -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', Roboto,
    Helvetica, Arial, sans-serif;
`;
