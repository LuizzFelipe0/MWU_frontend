import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    background-color: #f2f2f7; /* Cor de fundo padrão iOS */
  }
`;

export const AppContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;


export const Card = styled.div`
  background: white;
  border-radius: 10px;
  padding: 10px;
  width: 60%;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  margin-top: 1rem;
  margin-bottom: 2rem;
`;
