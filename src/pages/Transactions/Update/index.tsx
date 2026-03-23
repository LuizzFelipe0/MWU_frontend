import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useOutletContext } from 'react-router-dom';

import { useApi } from '../../../hooks/useApi';
import { useAuth } from '../../../hooks/useAuth.tsx';
import { transactionService } from '../../../services/transactionService';
import { categoryService } from '../../../services/categoryService';
import { accountService } from '../../../services/accountService';

import { Transaction, TransactionInput } from '../../../types/transactionTypes';
import { Category, CategoryInput } from '../../../types/categoryTypes';
import { Account, AccountInput } from '../../../types/accountTypes';

import CardBox from '../../../components/CardBox';
import Button from '../../../components/Button/DefaultButton';
import TextInput from '../../../components/Input/TextInput';
import NumberInput from '../../../components/Input/NumberInput';
import DateInput from '../../../components/Input/DateInput';
import SelectInput from '../../../components/Input/SelectInput';
import ToggleButton from '../../../components/Button/ToggleButton';
import Overlay from '../../../components/Overlay';
import Form from '../../../components/Form';
import ConfirmModal from '../../../components/Modal/ConfirmModal';

import { parseCurrencyToNumber } from '../../../utils/currency';
import { recurrence_intervals } from '../../../utils/mappings.ts';

const UpdateTransactionPage: React.FC = () => {
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
  } = useApi<Transaction, TransactionInput>(transactionService);
  const { data: categories, refresh: getCategories } = useApi<
    Category,
    CategoryInput
  >(categoryService);
  const { data: accounts, refresh: getAccounts } = useApi<
    Account,
    AccountInput
  >(accountService);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [amountFormatted, setAmountFormatted] = useState('0,00');
  const [date, setDate] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [accountId, setAccountId] = useState('');
  const [isRecurring, setIsRecurring] = useState(false);
  const [recurrenceInterval, setRecurrenceInterval] = useState('');
  const [nextDueDate, setNextDueDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    if (id) {
      getOne(id);
      getCategories();
      getAccounts();
    }
  }, [id, getOne, getCategories, getAccounts]);

  useEffect(() => {
    if (item) {
      setName(item.name);
      setDescription(item.description || '');
      setCategoryId(item.category_id);
      setAccountId(item.account_id || '');
      setIsRecurring(!!item.recurrence_id);
      setRecurrenceInterval(item.recurrence_interval || '');

      setDate(item.date.split('T')[0]);

      if (item.next_due_date) {
        setNextDueDate(item.next_due_date.split('T')[0]);
      }

      if (item.end_date) {
        setEndDate(item.end_date.split('T')[0]);
      }

      setAmountFormatted(
        new Intl.NumberFormat('pt-BR', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }).format(item.amount),
      );
    }
  }, [item]);

  const handleClose = () => navigate('..');

  const handleUpdate = async () => {
    if (!name.trim() || !id || !user?.id || !categoryId) return;

    await edit(id, {
      user_id: user.id,
      name,
      description: description || undefined,
      amount: parseCurrencyToNumber(amountFormatted),
      date: new Date(date).toISOString(),
      category_id: categoryId,
      account_id: accountId || undefined,
      is_recurring: isRecurring,
      recurrence_interval: isRecurring ? recurrenceInterval : undefined,
      next_due_date:
        isRecurring && nextDueDate
          ? new Date(nextDueDate).toISOString()
          : undefined,
      end_date:
        isRecurring && endDate ? new Date(endDate).toISOString() : undefined,
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
              <TextInput value={name} onChange={setName} />
            </Form.Field>

            <Form.Field>
              <label>Valor ($)</label>
              <NumberInput
                value={amountFormatted}
                onChange={setAmountFormatted}
              />
            </Form.Field>

            <Form.Field>
              <label>Data</label>
              <DateInput value={date} onChange={setDate} />
            </Form.Field>

            <Form.Field>
              <label>Categoria</label>
              <SelectInput
                options={categories.map((c) => ({
                  value: c.id,
                  label: c.name,
                }))}
                value={categoryId}
                onChange={setCategoryId}
                required
              />
            </Form.Field>

            <Form.Field>
              <label>Conta Bancária (Opcional)</label>
              <SelectInput
                options={accounts.map((a) => ({ value: a.id, label: a.name }))}
                value={accountId}
                onChange={setAccountId}
              />
            </Form.Field>

            <Form.Field>
              <label>Descrição</label>
              <TextInput value={description} onChange={setDescription} />
            </Form.Field>

            <Form.Field>
              <label>Transação Recorrente?</label>
              <ToggleButton
                selectedValue={isRecurring}
                onChange={setIsRecurring}
                options={[
                  { label: 'Não', value: false, variant: 'neutral' },
                  { label: 'Sim', value: true, variant: 'positive' },
                ]}
              />
            </Form.Field>

            {isRecurring && (
              <>
                <Form.Field>
                  <label>Intervalo</label>
                  <SelectInput
                    options={recurrence_intervals}
                    value={recurrenceInterval}
                    onChange={setRecurrenceInterval}
                  />
                </Form.Field>
                <Form.Field>
                  <label>Próximo Vencimento (Opcional)</label>
                  <DateInput value={nextDueDate} onChange={setNextDueDate} />
                </Form.Field>
                <Form.Field>
                  <label>Último Vencimento (Opcional)</label>
                  <DateInput value={endDate} onChange={setEndDate} />
                </Form.Field>
              </>
            )}

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
                variant="warning"
                icon="update"
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
        title="Apagar Transação"
        message={`Tem certeza que deseja apagar a transação "${name}"? Esta ação não pode ser desfeita.`}
        confirmText="Excluir"
        confirmIcon="delete"
        isLoading={isBusy}
      />
    </>
  );
};

export default UpdateTransactionPage;