import styled from 'styled-components';

export const Select = styled.select<{ $icon: string }>`
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
  cursor: pointer;

  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;

  background-image: url(${(props) => props.$icon});
  background-repeat: no-repeat;
  background-position: right 1rem center;
  background-size: 0.8rem;

  &:focus {
    background-color: #e5e5ea;
    box-shadow: 0 0 0 0.125rem rgb(146, 144, 144);
  }

  &:invalid {
    color: #7e7e7e;
  }

  option {
    background-color: #fff;
    color: #000;
    padding: 10px;
  }
`;
