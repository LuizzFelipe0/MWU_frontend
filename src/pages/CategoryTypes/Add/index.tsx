import React, { useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { useApi } from '../../../hooks/useApi';
import { categoryTypeService } from '../../../services/categoryTypeService';
import {
  CategoryType,
  CategoryTypeInput,
} from '../../../types/categoryTypeTypes';
import CardBox from '../../../components/CardBox';
import Button from '../../../components/Button';
import * as S from './styles';

const AddCategoryTypePage: React.FC = () => {
  const navigate = useNavigate();
  const { refresh } = useOutletContext<{ refresh: () => void }>();
  const { add, loading } = useApi<CategoryType, CategoryTypeInput>(
    categoryTypeService,
  );

  const [name, setName] = useState('');
  const [isPositive, setIsPositive] = useState(false);

  const handleSave = async () => {
    if (!name.trim()) return;

    await add({
      name: name,
      is_positive: isPositive,
    });

    refresh();
    navigate('..');
  };

  return (
    <S.Overlay onClick={() => navigate('..')}>
      <S.ModalContent onClick={(e) => e.stopPropagation()}>
        <CardBox title="Novo Tipo de Categoria">
          <S.Form>
            <S.Field>
              <label>Nome</label>
              <input
                placeholder="Ex: Receita, Investimentos..."
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoFocus
              />
            </S.Field>

            <S.Field>
              <label>Tipo de Fluxo</label>
              <S.SegmentedControl>
                <S.SegmentButton
                  $active={!isPositive}
                  $type="negative"
                  onClick={() => setIsPositive(false)}
                >
                  Negativo (-)
                </S.SegmentButton>
                <S.SegmentButton
                  $active={isPositive}
                  $type="positive"
                  onClick={() => setIsPositive(true)}
                >
                  Positivo (+)
                </S.SegmentButton>
              </S.SegmentedControl>
            </S.Field>

            <S.Actions>
              <Button variant="danger" onClick={() => navigate('..')}>
                Cancelar
              </Button>
              <Button onClick={handleSave} disabled={loading}>
                {loading ? 'Salvando...' : 'Salvar'}
              </Button>
            </S.Actions>
          </S.Form>
        </CardBox>
      </S.ModalContent>
    </S.Overlay>
  );
};

export default AddCategoryTypePage;
