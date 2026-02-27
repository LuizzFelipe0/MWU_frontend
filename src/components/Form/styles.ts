import styled from 'styled-components';

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem; 
  width: 100%;
`;

export const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;

  label {
    font-size: 0.85rem;
    font-weight: 600;
    color: #8e8e93;
    padding-left: 0.2rem;
  }
`;

export const Actions = styled.div<{ $align?: 'center' | 'right' | 'stretch' }>`
  display: flex;
  gap: 1rem;
  margin-top: 0.5rem;
  justify-content: ${(props) =>
    props.$align === 'center'
      ? 'center'
      : props.$align === 'right'
        ? 'flex-end'
        : 'stretch'};

  & > button {
    flex: ${(props) => (props.$align === 'stretch' ? 1 : 'unset')};
  }
`;

export const Footer = styled.div`
  margin-top: 0.5rem;
  text-align: center;

  p {
    font-size: 0.9rem;
    color: #8e8e93;
  }

  a {
    color: #32d177;
    text-decoration: none;
    font-weight: 600;
    &:hover {
      text-decoration: underline;
    }
  }
`;
