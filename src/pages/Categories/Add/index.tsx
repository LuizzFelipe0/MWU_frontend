import React, { useState, useEffect } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';

import { useApi } from '../../../hooks/useApi';
import { useAuth } from '../../../hooks/useAuth.tsx';
import { categoryService } from '../../../services/categoryService';
import { categoryTypeService } from '../../../services/categoryTypeService';

import { Category, CategoryInput } from '../../../types/categoryTypes';
import {
  CategoryType,
  CategoryTypeInput,
} from '../../../types/categoryTypeTypes';

import CardBox from '../../../components/CardBox';
import Button from '../../../components/Button/DefaultButton';
import TextInput from '../../../components/Input/TextInput';
import Overlay from '../../../components/Overlay';
import Form from '../../../components/Form';
import ListInput from '../../../components/Input/SelectInput';

const AddCategoryPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { refresh: refreshParentList } = useOutletContext<{
    refresh: () => void;
  }>();

  const { add, loading: isSaving } = useApi<Category, CategoryInput>(
    categoryService,
  );

  const {
    data: categoryTypes,
    refresh: fetchTypes,
    loading: isLoadingTypes,
  } = useApi<CategoryType, CategoryTypeInput>(categoryTypeService);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [categoryTypeId, setCategoryTypeId] = useState('');

  useEffect(() => {
    fetchTypes();
  }, [fetchTypes]);

  const handleClose = () => navigate('..');

  const handleSave = async () => {
    if (!name.trim() || !categoryTypeId) {
      alert('Por favor, preencha o nome e selecione um tipo.');
      return;
    }

    if (!user?.id) return;

    await add({
      name,
      user_id: user.id,
      category_type_id: categoryTypeId,
      description: description,
    });

    refreshParentList();
    handleClose();
  };

  const typeOptions = categoryTypes.map((type) => ({
    value: type.id,
    label: type.name,
  }));

  return (
    <Overlay onClose={handleClose}>
      <CardBox title="Nova Categoria">
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            handleSave();
          }}
        >
          <Form.Field>
            <label>Nome</label>
            <TextInput
              placeholder="Ex: Salário, Contas mensais..."
              value={name}
              onChange={setName}
            />
          </Form.Field>

          <Form.Field>
            <label>Descrição (Opcional)</label>
            <TextInput
              placeholder="Detalhe sua categoria..."
              value={description}
              onChange={setDescription}
            />
          </Form.Field>

          <Form.Field>
            <label>Tipo de Categoria</label>
            <ListInput
              options={typeOptions}
              placeholder={
                isLoadingTypes ? 'Carregando tipos...' : 'Selecione o tipo...'
              }
              value={categoryTypeId}
              onChange={setCategoryTypeId}
              required
            />
          </Form.Field>

          <Form.Actions $align="stretch">
            <Button variant="danger" type="button" onClick={handleClose}>
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={isSaving || isLoadingTypes}
              icon="add"
            >
              {isSaving ? 'Salvando...' : 'Salvar'}
            </Button>
          </Form.Actions>
        </Form>
      </CardBox>
    </Overlay>
  );
};

export default AddCategoryPage;
