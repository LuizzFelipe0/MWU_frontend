import React, { ReactNode } from 'react';
import * as S from './styles';

interface OverlayProps {
  children: ReactNode;
  onClose: () => void;
  maxWidth?: string;
}

const Overlay: React.FC<OverlayProps> = ({ children, onClose, maxWidth }) => {
  return (
    <S.Backdrop onClick={onClose}>
      <S.Content $maxWidth={maxWidth} onClick={(e) => e.stopPropagation()}>
        {children}
      </S.Content>
    </S.Backdrop>
  );
};

export default Overlay;
