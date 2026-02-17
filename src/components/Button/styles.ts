import styled from 'styled-components';

export type ButtonVariant = 'primary' | 'danger';

export const Button = styled.button<{ $variant: ButtonVariant }>`
  background-color: ${(props) =>
    props.$variant === 'danger' ? '#ff3b30' : '#32d177'};

  color: #ffffff;
  border: none;

  padding: 0.6rem 1.2rem;
  border-radius: 9px; 

  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;

  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  &:hover {
    filter: brightness(0.9);
  }

  &:active {
    opacity: 0.7;
    transform: scale(0.96);
  }

  &:disabled {
    background-color: #c5c9c7;
    cursor: not-allowed;
  }
`;
