import styled from 'styled-components';

export const PanelContainer = styled.div`
  background: #fff;
  border-radius: 12px;
  padding: 1.5rem;

  display: flex;
  flex-direction: column;
  gap: 1.5rem; 

  width: 100%;
  max-width: 20rem;

  box-shadow: 0 0.25rem 0.375rem rgba(0, 0, 0, 0.05);
  border: 0.0625rem solid #e5e5ea;
  box-sizing: border-box;
`;

export const PanelHeader = styled.header`
  margin-bottom: 1.875rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  h3 {
    font-size: clamp(1.2rem, 4vw, 1.875rem);
    font-weight: 700;
    color: #929090;
    margin: 0;
  }
`;

export const FieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;

  label {
    font-size: 0.85rem;
    font-weight: 600;
    color: #8e8e93;
    padding-left: 0.2rem;
  }
`;
