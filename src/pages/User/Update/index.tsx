import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useOutletContext } from 'react-router-dom';

import { useApi } from '../../../hooks/useApi';
import { useAuth } from '../../../hooks/useAuth.tsx';
import { userService } from '../../../services/userService.tsx';

import { User, UserInput } from '../../../types/userTypes';

import CardBox from '../../../components/CardBox';
import Button from '../../../components/Button/DefaultButton';
import TextInput from '../../../components/Input/TextInput';
import PasswordInput from '../../../components/Input/PasswordInput';
import Overlay from '../../../components/Overlay';
import Form from '../../../components/Form';
import NumberInput from '../../../components/Input/NumberInput';
import ConfirmModal from '../../../components/Modal/ConfirmModal';

import {
  parseCurrencyToNumber,
  formatNumberToCurrency,
} from '../../../utils/currency';

const UpdateUserPage: React.FC = () => {
  const { id: paramsId } = useParams<{ id: string }>();
  const { user: loggedUser } = useAuth();
  const navigate = useNavigate();
  const outletContext = useOutletContext<{ refresh: () => void } | null>();

  const targetId = paramsId || loggedUser?.id;

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const { getOne, edit, remove, item, loading } = useApi<User, UserInput>(
    userService,
  );

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [password, setPassword] = useState('');
  const [balanceFormatted, setBalanceFormatted] = useState('0,00');

  useEffect(() => {
    if (targetId) {
      getOne(targetId);
    }
  }, [targetId, getOne]);

  useEffect(() => {
    if (item) {
      setFirstName(item.first_name);
      setLastName(item.last_name);
      setEmail(item.email);
      setCpf(item.cpf);
      setBalanceFormatted(formatNumberToCurrency(item.manual_balance));
    }
  }, [item]);

  const handleClose = () => navigate('..');

  const handleUpdate = async () => {
    if (!firstName.trim() || !lastName.trim() || !email.trim() || !targetId) {
      alert('Preencha os campos obrigatórios.');
      return;
    }

    const numericBalance = parseCurrencyToNumber(balanceFormatted);

    const payload: any = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      cpf: cpf,
      manual_balance: numericBalance,
    };

    if (password.trim()) {
      payload.password = password;
    }

    await edit(targetId, payload);

    if (outletContext?.refresh) {
      outletContext.refresh();
    }

    alert('Dados atualizados com sucesso!');
    handleClose();
  };

  const handleConfirmDelete = async () => {
    if (!targetId) return;
    await remove(targetId);
    setIsDeleteModalOpen(false);

    if (outletContext?.refresh) {
      outletContext.refresh();
    }
    handleClose();
  };

  return (
    <>
      <Overlay onClose={handleClose}>
        <CardBox title={item ? `Editar: ${item.first_name}` : 'Carregando...'}>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              handleUpdate();
            }}
          >
            <div style={{ display: 'flex', gap: '1rem' }}>
              <Form.Field style={{ flex: 1 }}>
                <label>Nome</label>
                <TextInput
                  placeholder="Ex: João Pedro"
                  value={firstName}
                  onChange={setFirstName}
                />
              </Form.Field>

              <Form.Field style={{ flex: 1 }}>
                <label>Sobrenome</label>
                <TextInput
                  placeholder="Ex: Silva"
                  value={lastName}
                  onChange={setLastName}
                />
              </Form.Field>
            </div>

            <Form.Field>
              <label>E-mail</label>
              <TextInput
                placeholder="exemplo@email.com"
                value={email}
                onChange={setEmail}
              />
            </Form.Field>

            <Form.Field>
              <label>CPF</label>
              <TextInput
                placeholder="000.000.000-00"
                value={cpf}
                onChange={setCpf}
              />
            </Form.Field>

            <Form.Field>
              <label>Nova Senha (Deixe em branco para manter)</label>
              <PasswordInput
                value={password}
                onChange={setPassword}
                placeholder="******"
              />
              <small
                style={{
                  color: '#8e8e93',
                  fontSize: '0.75rem',
                  marginTop: '0.2rem',
                }}
              >
                A senha deve conter no mínimo 8 caracteres, maiúsculas,
                minúsculas e símbolos.
              </small>
            </Form.Field>

            <Form.Field>
              <label>Saldo Manual (R$)</label>
              <NumberInput
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
                Excluir Conta
              </Button>
              <Button
                type="submit"
                disabled={loading}
                icon="update"
                variant="warning"
              >
                {loading ? 'Salvando...' : 'Atualizar Dados'}
              </Button>
            </Form.Actions>
          </Form>
        </CardBox>
      </Overlay>

      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Excluir Usuário"
        message={`Deseja realmente apagar a conta de "${firstName}"? Todos os dados vinculados serão perdidos.`}
        confirmText="Sim, Excluir"
        confirmVariant="danger"
        confirmIcon="delete"
        isLoading={loading}
      />
    </>
  );
};

export default UpdateUserPage;
