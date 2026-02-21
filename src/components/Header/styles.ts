import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 1.2rem 2%;
  margin-bottom: 1rem;

  background-color: #ffff;

  border-bottom: 0.0625rem solid #c5c9c7;

  box-sizing: border-box;
`;

export const HeaderLink = styled(Link)`
  text-decoration: none;
  display: flex;
  align-items: center;
`;

export const Title = styled.h1`
  font-size: clamp(1.5rem, 4vw, 2.125rem);

  font-weight: 700;
  color: #32d177;

  margin: 0.0625rem;

  font-family:
    -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', Roboto,
    Helvetica, Arial, sans-serif;

  transition: font-size 0.2s ease-in-out;
`;

export const UserArea = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  color: #000;

  strong {
    color: #32d177;
  }
`;