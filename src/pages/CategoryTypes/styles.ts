import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  max-width: 40rem;
  margin: 0 auto;
`;

export const HeaderActions = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  align-items: center;
`;

export const List = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ListItem = styled.div`
  padding: 1rem 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #f2f2f7;
  .info {
    display: flex;
    flex-direction: column;
    span {
      font-weight: 500;
      color: #000;
    }
    small {
      font-weight: 600;
      font-size: 0.8rem;
    }
  }
`;
