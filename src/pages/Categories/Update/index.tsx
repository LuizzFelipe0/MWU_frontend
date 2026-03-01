import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useOutletContext } from 'react-router-dom';

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
import SelectInput from '../../../components/Input/SelectInput';
import ConfirmModal from '../../../components/Modal/ConfirmModal';

const UpdateCategoryPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { refresh: refreshParentList } = useOutletContext<{
    refresh: () => void;
  }>();

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const {
    getOne,
    edit,
    remove,
    item,
    loading: isBusy,
  } = useApi<Category, CategoryInput>(categoryService);

  const { data: categoryTypes, refresh: fetchTypes } = useApi<
    CategoryType,
    CategoryTypeInput
  >(categoryTypeService);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [categoryTypeId, setCategoryTypeId] = useState('');

  useEffect(() => {
    if (id) {
      getOne(id);
      fetchTypes();
    }
  }, [id, getOne, fetchTypes]);

  useEffect(() => {
    if (item) {
      setName(item.name);
      setDescription(item.description || '');
      setCategoryTypeId(item.category_type_id);
    }
  }, [item]);

  const handleClose = () => navigate('..');

  const handleUpdate = async () => {
    if (!name.trim() || !id || !user?.id || !categoryTypeId) return;

    await edit(id, {
      user_id: user.id,
      name,
      category_type_id: categoryTypeId,
      description: description,
    });

    refreshParentList();
    handleClose();
  };

  const handleConfirmDelete = async () => {
    if (!id) return;
    await remove(id);
    setIsDeleteModalOpen(false);
    refreshParentList();
    handleClose();
  };

  const typeOptions = categoryTypes.map((t) => ({
    value: t.id,
    label: t.name,
  }));

  return (
    <>
      <Overlay onClose={handleClose}>
        <CardBox title={item ? `Editar: ${item.name}` : 'Carregando...'}>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              handleUpdate();
            }}
          >
            <Form.Field>
              <label>Nome</label>
              <TextInput
                placeholder="Ex: Alimentação..."
                value={name}
                onChange={setName}
              />
            </Form.Field>

            <Form.Field>
              <label>Descrição (Opcional)</label>
              <TextInput
                placeholder="Detalhes..."
                value={description}
                onChange={setDescription}
              />
            </Form.Field>

            <Form.Field>
              <label>Tipo de Categoria</label>
              <SelectInput
                options={typeOptions}
                placeholder="Selecione o tipo da categoria..."
                value={categoryTypeId}
                onChange={setCategoryTypeId}
                required
              />
            </Form.Field>

            <Form.Actions $align="stretch">
              <Button
                variant="danger"
                type="button"
                icon="delete"
                onClick={() => setIsDeleteModalOpen(true)}
              >
                Apagar
              </Button>

              <Button
                type="submit"
                disabled={isBusy}
                icon="update"
                variant="warning"
              >
                {isBusy ? 'Salvando...' : 'Atualizar'}
              </Button>
            </Form.Actions>
          </Form>
        </CardBox>
      </Overlay>

      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Confirmar Exclusão"
        message={`Tem certeza que deseja apagar a categoria "${name}"? Esta ação não pode ser desfeita.`}
        confirmText="Sim, Apagar"
        confirmVariant="danger"
        confirmIcon="delete"
        isLoading={isBusy}
      />
    </>
  );
};

export default UpdateCategoryPage;
