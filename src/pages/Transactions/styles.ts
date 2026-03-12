import styled from 'styled-components';

export const PageLayout = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem; 
  width: 100%;
  align-items: flex-start;

  @media (max-width: 1024px) {
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
  }
`;

export const Container = styled.div`
  width: 100%;
  max-width: 40rem;
`;

export const Sidebar = styled.aside`
  position: sticky;
  top: 2rem;

  @media (max-width: 1024px) {
    width: 100%;
    position: static;
    display: flex;
    justify-content: center;
  }
`;

export const HeaderActions = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
  align-items: center;
`;


export const ItemTitle = styled.span`
  font-weight: 500;
  color: #000;
`;


export const EmptyState = styled.p`
  text-align: center;
  color: #8e8e93;
  padding: 2rem;
`;
