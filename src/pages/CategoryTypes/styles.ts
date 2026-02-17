import styled from 'styled-components';

export const Container = styled.div`
  padding: 1rem;
`;


export const List = styled.div`
  background: #fff;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
`;

export const ListItem = styled.div`
  padding: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 0.0625rem solid #c5c9c7;
  
  &:last-child { border-bottom: none; }

  .info {
    display: flex;
    flex-direction: column;
    span { font-size: 17px; color: #000; }
    small { 
      font-size: 13px; 
      color: ${(props) => props.color || '#8e8e93'}; 
    }
  }
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