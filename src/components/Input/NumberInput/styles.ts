import styled from 'styled-components';

export const Input = styled.input`
  width: 100%;
  background-color: #efeff4;
  border: none;
  border-radius: 9px;
  padding: 0.5rem 1.2rem;
  font-size: 1rem;
  color: #000;
  outline: none;
  transition: all 0.2s ease-in-out;
  box-sizing: border-box;

  &::placeholder {
    color: #7e7e7e;
  }

  &:focus {
    cursor: pointer;
    background-color: #e5e5ea;
    box-shadow: 0 0 0 0.125rem rgb(146, 144, 144);
  }
`;
