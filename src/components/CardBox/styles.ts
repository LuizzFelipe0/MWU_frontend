import styled from 'styled-components';

export const Container = styled.div`
  background: #fff;
  border-radius: 12px; 
  padding: 1.5rem;

  /* Responsividade */
  max-width: 50rem;
  
  box-shadow: 0 0.25rem 0.375rem rgba(0, 0, 0, 0.05);
  border: 0.0625rem solid #e5e5ea;
    
  box-sizing: border-box;
`;

export const CardHeader = styled.header`
  margin-bottom: 1.875rem; /* 30px */
  display: flex;
  align-items: center;

  h1 {
    font-size: clamp(1.2rem, 4vw, 1.875rem); /* Max 30px */
    font-weight: 700;
    color: #929090;
    margin: 0;
    text-align: center;
  }
`;

export const Content = styled.div`
`;
