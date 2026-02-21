import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
`;


export const InputGroup = styled.div`
  background: white;
  padding: 10px;
  border-radius: 10px;
  margin-bottom: 20px;
  display: flex;
  gap: 10px;

  input {
    flex: 1;
    border: 1px solid #ccc;
    border-radius: 6px;
    padding: 8px 12px;
    background: #f2f2f7;
    outline: none;
  }
`;
