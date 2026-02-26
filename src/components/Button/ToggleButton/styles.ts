import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  background-color: #efeff4; /* Cinza suave iOS */
  padding: 0.125rem;
  border-radius: 0.625rem;
  border: 0.0625rem solid #e5e5ea;
  width: 100%;
`;

interface ButtonProps {
  $active: boolean;
  $variant: 'positive' | 'negative' | 'neutral';
}

export const Button = styled.button<ButtonProps>`
  flex: 1;
  border: none;
  padding: 0.6rem;
  border-radius: 0.5rem;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);

  background-color: ${(props) => (props.$active ? '#fff' : 'transparent')};

  color: ${(props) => {
    if (!props.$active) return '#7e7e7e';
    if (props.$variant === 'positive') return '#32d177';
    if (props.$variant === 'negative') return '#ff3b30';
    return '#000';
  }};

  box-shadow: ${(props) =>
    props.$active ? '0 0.125rem 0.5rem rgba(0,0,0,0.12)' : 'none'};

  &:active {
    transform: scale(0.98);
  }
`;
