import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  width: 100%;
`;

export const Input = styled.input`
  width: 100%;
  background-color: #efeff4;
  border: none;
  border-radius: 9px;
  font-size: 1rem;
  color: #000;
  outline: none;
  transition: all 0.2s ease-in-out;
  box-sizing: border-box;
  padding: 0.5rem 1.2rem;

  &::placeholder {
    color: #7e7e7e;
  }

  &:focus {
    cursor: pointer;
    background-color: #e5e5ea;
    box-shadow: 0 0 0 0.125rem rgb(146, 144, 144);
  }
`;

export const ToggleButton = styled.button`
  position: absolute;
  right: 0.8rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #32d177; 
  font-size: 0.75rem;
  font-weight: 600;
  cursor: pointer;
  text-transform: uppercase;

  &:active {
    opacity: 0.6;
  }
`;
