import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  flex-direction: column;
`;

export const ErrorCode = styled.h1`
  font-size: clamp(5rem, 15vw, 8rem);
  font-weight: 800;
  color: #32d177;
  margin: 0;
  letter-spacing: -0.05em;
`;

export const Message = styled.h2`
  font-size: 1.2rem;
  font-weight: 600;
  color: #929090;
  margin-top: 1rem;
  margin-bottom: 2rem;
`;

