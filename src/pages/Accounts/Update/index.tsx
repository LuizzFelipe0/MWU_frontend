import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useOutletContext } from 'react-router-dom';
import { useApi } from '../../../hooks/useApi';
import { useAuth } from '../../../hooks/useAuth';
import { accountService } from '../../../services/accountService';
import {
  Account,
  AccountInput,
} from '../../../types/accountTypes';
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
import SelectInput from '../../../components/Input/SelectInput';

const UpdateAccountPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { refresh } = useOutletContext<{ refresh: () => void }>();

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const { getOne, edit, remove, item, loading } = useApi<Account, AccountInput>(accountService);

  const [name, setName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [balanceFormatted, setBalanceFormatted] = useState('0,00');
  const [type, setType] = useState('');

  const account_type_options = [
    { value: 'Corrente', label: 'Conta Corrente' },
    { value: 'Poupança', label: 'Conta Poupança' },
    { value: 'Digital', label: 'Conta Digital' },
    { value: 'Salário', label: 'Conta Salário' },
    { value: 'Investimento', label: 'Conta de Investimentos' },
  ];

  useEffect(() => {
    if (id) getOne(id);
  }, [id, getOne]);

  useEffect(() => {
    if (item) {
      setName(item.name);

      setAccountNumber(item.account_number || '');

      setType(item.type);

      setBalanceFormatted(formatNumberToCurrency(item.balance));
    }
  }, [item]);

  const handleClose = () => navigate('..');

  const handleUpdate = async () => {
    if (!name.trim() || !id || !user?.id) return;

    const numericAmount = parseCurrencyToNumber(balanceFormatted);

    await edit(id, {
      name: name,
      account_number: accountNumber,
      balance: numericAmount,
      type: type,
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
              <label>Nome da Conta Bancária</label>
              <TextInput
                placeholder="Ex: Minha Conta Bancária..."
                value={name}
                onChange={setName}
              />
            </Form.Field>

            <Form.Field>
              <label>Tipo da Conta</label>
              <SelectInput
                placeholder="Selecione o tipo..."
                value={type}
                onChange={setType}
                options={account_type_options}
                required
              />
            </Form.Field>

            <Form.Field>
              <label>Número da Conta (Opcional)</label>
              <TextInput
                placeholder="Insira o número da Conta..."
                value={accountNumber}
                onChange={setAccountNumber}
              />
            </Form.Field>

            <Form.Field>
              <label>Saldo da Conta ($)</label>
              <NumberInput
                placeholder="0,00"
                value={balanceFormatted}
                onChange={setBalanceFormatted}
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
        message={`Tem certeza que deseja apagar a conta "${name}"? Esta ação não pode ser desfeita.`}
        confirmText="Sim, Apagar"
        confirmVariant="danger"
        confirmIcon="delete"
        isLoading={loading}
      />
    </>
  );
};

export default UpdateAccountPage;
