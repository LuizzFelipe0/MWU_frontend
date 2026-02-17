import styled from 'styled-components';

export const Footer = styled.footer`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  padding: 1.5rem 2%;

  background-color: #ffffff;

  border-top: 0.0625rem solid #c5c9c7;

  box-sizing: border-box;
  margin-top: auto; /* Garante que ele fique no final do flex */

  @media (min-width: 48rem) {
    flex-direction: column;
    justify-content: space-between;
  }
`;

export const Copyright = styled.p`
  font-size: clamp(0.875rem, 2.5vw, 1rem);

  font-weight: 450;
  color: #929090;
  margin: 0.0625rem;

  font-family:
    -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', Roboto,
    Helvetica, Arial, sans-serif;
`;
