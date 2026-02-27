import React, { useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { useApi } from '../../../hooks/useApi';
import { categoryTypeService } from '../../../services/categoryTypeService';
import { CategoryType,CategoryTypeInput} from '../../../types/categoryTypeTypes';

import CardBox from '../../../components/CardBox';
import Button from '../../../components/Button/DefaultButton';
import TextInput from '../../../components/Input/TextInput';
import Overlay from '../../../components/Overlay';
import ToggleButton from '../../../components/Button/ToggleButton';
import Form from '../../../components/Form';

const AddCategoryTypePage: React.FC = () => {
  const navigate = useNavigate();
  const { refresh } = useOutletContext<{ refresh: () => void }>();
  const { add, loading } = useApi<CategoryType, CategoryTypeInput>(
    categoryTypeService,
  );

  const [name, setName] = useState('');
  const [isPositive, setIsPositive] = useState(false);

  const handleClose = () => navigate('..');

  const handleSave = async () => {
    if (!name.trim()) return;
    await add({ name, is_positive: isPositive });
    refresh();
    handleClose();
  };

  return (
    <Overlay onClose={handleClose}>
      <CardBox title="Novo Tipo de Categoria">
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            handleSave();
          }}
        >
          <Form.Field>
            <label>Nome</label>
            <TextInput
              placeholder="Ex: Receita, Investimentos..."
              value={name}
              onChange={setName}
            />
          </Form.Field>

          <Form.Field>
            <label>Tipo de Fluxo</label>
            <ToggleButton
              selectedValue={isPositive}
              onChange={setIsPositive}
              options={[
                { label: 'Negativo (-)', value: false, variant: 'negative' },
                { label: 'Positivo (+)', value: true, variant: 'positive' },
              ]}
            />
          </Form.Field>

          <Form.Actions $align="stretch">
            <Button variant="danger" type="button" onClick={handleClose}>
              Cancelar
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Salvando...' : 'Salvar'}
            </Button>
          </Form.Actions>
        </Form>
      </CardBox>
    </Overlay>
  );
};

export default AddCategoryTypePage;
