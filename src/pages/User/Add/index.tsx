import React, { useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { useApi } from '../../../hooks/useApi';
import { User, UserInput } from '../../../types/userTypes';

import CardBox from '../../../components/CardBox';
import Button from '../../../components/Button/DefaultButton';
import TextInput from '../../../components/Input/TextInput';
import PasswordInput from '../../../components/Input/PasswordInput'; // UX Sênior
import Overlay from '../../../components/Overlay';
import Form from '../../../components/Form';
import NumberInput from '../../../components/Input/NumberInput';
import { parseCurrencyToNumber } from '../../../utils/currency';
import { userService } from '../../../services/userService.tsx';

const AddUserPage: React.FC = () => {
  const navigate = useNavigate();
  const outletContext = useOutletContext<{ refresh: () => void } | null>();

  const { add, loading } = useApi<User, UserInput>(userService);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [password, setPassword] = useState('');
  const [balanceFormatted, setBalanceFormatted] = useState('0,00');

  const handleClose = () => navigate('..');

  const handleSave = async () => {
    if (
      !firstName.trim() ||
      !lastName.trim() ||
      !email.trim() ||
      !password.trim()
    ) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    const numericBalance = parseCurrencyToNumber(balanceFormatted);

    await add({
      first_name: firstName,
      last_name: lastName,
      email: email,
      cpf: cpf,
      password: password,
      manual_balance: numericBalance,
    });

    if (outletContext?.refresh) {
      outletContext.refresh();
    }

    if (!outletContext) {
      alert('Conta criada com sucesso! Faça login.');
      navigate('/login');
    } else {
      handleClose();
    }
  };

  return (
    <Overlay onClose={handleClose}>
      <CardBox title="Cadastrar Usuário">
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            handleSave();
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
            <label>Senha</label>

            <PasswordInput
              value={password}
              onChange={setPassword}
              placeholder="******"
            />
            <a>
              A senha deve conter 1 número, 1 letra maiúscula, 1 letra
              minúscula, 1 número e 1 caractere especial.
            </a>
          </Form.Field>

          <Form.Field>
            <label>Saldo Inicial (Opcional)</label>
            <NumberInput
              value={balanceFormatted}
              onChange={setBalanceFormatted}
            />
          </Form.Field>

          <Form.Actions $align="stretch">
            <Button variant="danger" type="button" onClick={handleClose}>
              Cancelar
            </Button>
            <Button type="submit" disabled={loading} icon="add">
              {loading ? 'Criando...' : 'Cadastrar Usuário'}
            </Button>
          </Form.Actions>
        </Form>
      </CardBox>
    </Overlay>
  );
};

export default AddUserPage;
