import styled from 'styled-components';

export const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const ListItem = styled.div`
  padding: 1rem 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 0.0625rem solid #f2f2f7;
  transition: background 0.2s ease;

  &:hover {
    background-color: #f9f9f9;
  }

  &:last-child {
    border-bottom: none;
  }
`;

export const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  span {
    font-weight: 500;
    color: #000;
    font-size: 1rem;
  }

  small {
    font-weight: 600;
    font-size: 0.8rem;
    color: #929090;
  }
`;

export const Actions = styled.div`
  display: flex;
  gap: 0.5rem;
`;