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

export const ItemTitle = styled.span`
  font-weight: 500;
  color: #000;
  font-size: 1.05rem;
  letter-spacing: -0.01em;
`;

export const EmptyState = styled.p`
  text-align: center;
  color: #929090;
  padding: 2.5rem 1rem;
  font-size: 0.95rem;
  border-radius: 12px;
  margin-top: 1rem;
`;
