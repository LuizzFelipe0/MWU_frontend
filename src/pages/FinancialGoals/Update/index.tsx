import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useOutletContext } from 'react-router-dom';
import { useApi } from '../../../hooks/useApi';
import { useAuth } from '../../../hooks/useAuth';
import { financialGoalService } from '../../../services/financialGoalService';
import {
  FinancialGoal,
  FinancialGoalInput,
} from '../../../types/financialGoalTypes';
import {
  parseCurrencyToNumber, formatNumberToCurrency
} from '../../../utils/currency';

import CardBox from '../../../components/CardBox';
import Button from '../../../components/Button/DefaultButton';
import TextInput from '../../../components/Input/TextInput';
import Overlay from '../../../components/Overlay';
import Form from '../../../components/Form';
import ConfirmModal from '../../../components/Modal/ConfirmModal';
import NumberInput from '../../../components/Input/NumberInput';
import DateInput from '../../../components/Input/DateInput';

const UpdateFinancialGoalPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { refresh } = useOutletContext<{ refresh: () => void }>();

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const { getOne, edit, remove, item, loading } = useApi<
    FinancialGoal,
    FinancialGoalInput
  >(financialGoalService);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [targetAmountFormatted, setTargetAmountFormatted] = useState('0,00');
  const [deadline, setDeadline] = useState('');

  useEffect(() => {
    if (id) getOne(id);
  }, [id, getOne]);

  useEffect(() => {
    if (item) {
      setName(item.name);
      
      setDescription(item.description || '');
      
      if (item.deadline) {
        setDeadline(item.deadline.split('T')[0]);
      }
      
      setTargetAmountFormatted(formatNumberToCurrency(item.target_amount));
    }
  }, [item]);

  const handleClose = () => navigate('..');

  const handleUpdate = async () => {
    if (!name.trim() || !id || !user?.id) return;

    const numericAmount = parseCurrencyToNumber(targetAmountFormatted);

    await edit(id, {
      user_id: user.id,
      name: name,
      description: description,
      target_amount: numericAmount,
      deadline: deadline,
    });

    refresh();
    handleClose();
  };

  const handleConfirmDelete = async () => {
    if (!id) return;
    await remove(id);
    setIsDeleteModalOpen(false);
    refresh();
    handleClose();
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
              <label>Nome da Meta</label>
              <TextInput
                placeholder="Ex: Fazer uma viagem..."
                value={name}
                onChange={setName}
              />
            </Form.Field>

            <Form.Field>
              <label>Descrição (Opcional)</label>
              <TextInput
                placeholder="Detalhe sua meta financeira..."
                value={description}
                onChange={setDescription}
              />
            </Form.Field>

            <Form.Field>
              <label>Valor Alvo (R$)</label>
              <NumberInput
                placeholder="0,00"
                value={targetAmountFormatted}
                onChange={setTargetAmountFormatted}
              />
            </Form.Field>

            <Form.Field>
              <label>Data Limite</label>
              <DateInput value={deadline} onChange={setDeadline} />
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
        message={`Tem certeza que deseja apagar a meta "${name}"? Esta ação não pode ser desfeita.`}
        confirmText="Sim, Apagar"
        confirmVariant="danger"
        confirmIcon="delete"
        isLoading={loading}
      />
    </>
  );
};

export default UpdateFinancialGoalPage;
