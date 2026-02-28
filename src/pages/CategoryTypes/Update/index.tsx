import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useOutletContext } from 'react-router-dom';
import { useApi } from '../../../hooks/useApi';
import { categoryTypeService } from '../../../services/categoryTypeService';
import {
  CategoryType,
  CategoryTypeInput,
} from '../../../types/categoryTypeTypes';

import CardBox from '../../../components/CardBox';
import Button from '../../../components/Button/DefaultButton';
import TextInput from '../../../components/Input/TextInput';
import Overlay from '../../../components/Overlay';
import ToggleButton from '../../../components/Button/ToggleButton';
import Form from '../../../components/Form';
import ConfirmModal from '../../../components/Modal/ConfirmModal';

const UpdateCategoryTypePage: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // ID of URL
  const navigate = useNavigate();
  const { refresh } = useOutletContext<{ refresh: () => void }>();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const { getOne, edit, remove, item, loading } = useApi<
    CategoryType,
    CategoryTypeInput
  >(categoryTypeService);

  const [name, setName] = useState('');
  const [isPositive, setIsPositive] = useState(false);

  useEffect(() => {
    if (id) getOne(id);
  }, [id, getOne]);

  useEffect(() => {
    if (item) {
      setName(item.name);
      setIsPositive(item.is_positive);
    }
  }, [item]);

  const handleClose = () => navigate('..');

  const handleUpdate = async () => {
    if (!name.trim() || !id) return;

    await edit(id, {
      name: name,
      is_positive: isPositive,
    });

    refresh();
    handleClose();
  };

  const handleConfirmDelete = async () => {
    if (!id) return;
    await remove(id);
    setIsDeleteModalOpen(false);
    refresh();
    navigate('..');
  };

  return (
    <>
      <Overlay onClose={handleClose}>
        <CardBox title={item ? `${item.name}` : 'Carregando...'}>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              handleUpdate();
            }}
          >
            <Form.Field>
              <label>Nome</label>
              <TextInput
                placeholder="Ex: Despesas, Receita..."
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
                disabled={loading}
                icon="update"
                variant="warning"
              >
                {loading ? 'Salvando...' : 'Atualizar'}
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
        message={`Tem certeza que deseja apagar o tipo de categoria "${name}"? Esta ação não pode ser desfeita.`}
        confirmText="Sim, Apagar"
        confirmVariant="danger"
        confirmIcon="delete"
        isLoading={loading}
      />
    </>
  );
};

export default UpdateCategoryTypePage;
