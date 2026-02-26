import styled from 'styled-components';

export const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  label {
    font-size: 0.85rem;
    font-weight: 600;
    color: #8e8e93;
    padding-left: 0.2rem;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  flex-direction: row-reverse;
  gap: 0.5rem;
`;

export const FooterActions = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  margin-top: 1rem;

  p {
    font-size: 0.9rem;
    color: #8e8e93;

    a {
      color: #32d177;
      text-decoration: none;
      font-weight: 600;
      &:hover {
        text-decoration: underline;
      }
    }
  }
`;
