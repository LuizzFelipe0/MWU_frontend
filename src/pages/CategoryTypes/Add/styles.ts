import styled from 'styled-components';

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(4px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ModalContent = styled.div`
  width: 90%;
  max-width: 420px;
  animation: slideUp 0.3s ease-out;

  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;

  label {
    font-size: 0.85rem;
    font-weight: 600;
    color: #8e8e93;
    padding-left: 4px;
  }

  input {
    padding: 0.8rem;
    border-radius: 10px;
    border: 1px solid #e5e5ea;
    background: #f2f2f7;
    font-size: 1rem;
    outline: none;
    transition: all 0.2s;
    &:focus {
      border-color: #32d177;
      background: #fff;
      box-shadow: 0 0 0 4px rgba(50, 209, 119, 0.1);
    }
  }
`;

export const SegmentedControl = styled.div`
  display: flex;
  background: #efeff4;
  padding: 2px;
  border-radius: 10px;
  border: 1px solid #e5e5ea;
`;

export const SegmentButton = styled.button<{
  $active: boolean;
  $type: 'positive' | 'negative';
}>`
  flex: 1;
  border: none;
  padding: 0.6rem;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);

  background: ${(props) => (props.$active ? '#fff' : 'transparent')};
  color: ${(props) => {
    if (!props.$active) return '#8e8e93';
    return props.$type === 'positive' ? '#32d177' : '#ff3b30';
  }};
  box-shadow: ${(props) =>
    props.$active ? '0 2px 8px rgba(0,0,0,0.12)' : 'none'};

  &:active {
    transform: scale(0.98);
  }
`;

export const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 0.5rem;
`;
