import React, { ReactNode } from 'react';
import * as S from './styles';
import Button from '../Button/DefaultButton';

interface FilterPanelProps {
  children: ReactNode;
  onClear: () => void;
  title?: string;
}

const FilterPanel: React.FC<FilterPanelProps> & {
  Field: typeof S.FieldWrapper;
} = ({ children, onClear, title = 'Filtros' }) => {
  return (
    <S.PanelContainer>
      <S.PanelHeader>
        <h3>{title}</h3>
        <Button icon="clear" onClick={onClear} variant="neutral"></Button>
      </S.PanelHeader>

      {children}
    </S.PanelContainer>
  );
};

FilterPanel.Field = S.FieldWrapper;

export default FilterPanel;
