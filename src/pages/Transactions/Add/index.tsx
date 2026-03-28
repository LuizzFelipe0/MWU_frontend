import React, { useState, useEffect } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';

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

import { parseCurrencyToNumber } from '../../../utils/currency';
import { recurrence_intervals } from '../../../utils/mappings.ts';

const AddTransactionPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { refresh: refreshParentList } = useOutletContext<{
    refresh: () => void;
  }>();

  const { add, loading: isSaving } = useApi<Transaction, TransactionInput>(
    transactionService,
  );
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
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [categoryId, setCategoryId] = useState('');
  const [accountId, setAccountId] = useState('');

  const [isRecurring, setIsRecurring] = useState(false);
  const [recurrenceInterval, setRecurrenceInterval] = useState('');
  const [nextDueDate, setNextDueDate] = useState('');
  const [endDate, setEndDate] = useState('');


  useEffect(() => {
    getCategories();
    getAccounts();
  }, [getCategories, getAccounts]);

  const handleClose = () => navigate('..');

  const handleSave = async () => {
    if (!name.trim() || !categoryId || amountFormatted === '0,00') {
      alert('Preencha os campos obrigatórios: Nome, Valor e Categoria.');
      return;
    }

     if (isRecurring && !recurrenceInterval) {
      alert('Para transações recorrentes, preencha o intervalo de recorrência.');
      return;
    }

    if (!user?.id) return;

    await add({
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

  return (
    <Overlay onClose={handleClose}>
      <CardBox title="Nova Transação">
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            handleSave();
          }}
        >
          <Form.Field>
            <label>Nome</label>
            <TextInput
              placeholder="Ex: Aluguel, Supermercado..."
              value={name}
              onChange={setName}
            />
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
              options={categories.map((c) => ({ value: c.id, label: c.name }))}
              placeholder="Selecionar categoria..."
              value={categoryId}
              onChange={setCategoryId}
              required
            />
          </Form.Field>

          <Form.Field>
            <label>Conta Bancária (Opcional)</label>
            <SelectInput
              options={accounts.map((a) => ({ value: a.id, label: a.name }))}
              placeholder="Selecionar conta..."
              value={accountId}
              onChange={setAccountId}
            />
          </Form.Field>

          <Form.Field>
            <label>Descrição (Opcional)</label>
            <TextInput
              placeholder="Descreva esta transação..."
              value={description}
              onChange={setDescription}
            />
          </Form.Field>

          <Form.Field>
            <label>É uma transação recorrente?</label>
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
                <label>Intervalo de Repetição</label>
                <SelectInput
                  options={recurrence_intervals}
                  placeholder="Selecione o intervalo..."
                  value={recurrenceInterval}
                  onChange={setRecurrenceInterval}
                  required
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
            <Button variant="danger" type="button" onClick={handleClose}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isSaving} icon="add">
              {isSaving ? 'Salvando...' : 'Salvar Transação'}
            </Button>
          </Form.Actions>
        </Form>
      </CardBox>
    </Overlay>
  );
};

export default AddTransactionPage;
