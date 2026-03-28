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
    gap: 0.8rem;
    color: #000;
`;

export const UserGreeting = styled.span`
  font-size: 0.95rem;
  
  @media (max-width: 600px) {
    display: none; /* Esconde o texto no mobile para priorizar o ícone */
  }

  strong {
    color: #32d177;
  }
`;

export const MenuWrapper = styled.div`
  width: 2.8rem;

  select {
    padding: 0.6rem;
    height: 2.4rem;
    background-position: center;
    background-size: 1.2rem;
    color: transparent; 

    option {
      color: #000; 
    }
  }
`;

export const LogoIcon = styled.img`
  height: 2.2rem;
  width: auto;
  margin-right: 0.8rem;
  object-fit: contain;

  @media (max-width: 768px) {
    height: 1.8rem;
    margin-right: 0.5rem;
  }
`;