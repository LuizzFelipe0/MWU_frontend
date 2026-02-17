import styled from 'styled-components';

export const Container = styled.div`
  text-align: center;
  flex-direction: column;
`;

export const ErrorCode = styled.h1`
  font-size: clamp(5rem, 15vw, 8rem);
  font-weight: 800;
  color: #32d177;
  margin: 0;
  letter-spacing: -0.05em;
`;

export const Message = styled.h2`
  font-size: clamp(1.2rem, 4vw, 1.5rem);
  color: #000;
  margin-top: 1rem;
  font-weight: 400;
`;

export const HomeButton = styled.button`
  margin-top: 2rem;
  background-color: #32d177;
  color: white;
  border: none;
  padding: 0.8rem 2rem;
  border-radius: 10px; 
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.2s ease;

  &:active {
    opacity: 0.7;
    transform: scale(0.98);
  }
`;
