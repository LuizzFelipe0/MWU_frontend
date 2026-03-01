import React, { useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { useApi } from '../../../hooks/useApi';
import { useAuth } from '../../../hooks/useAuth';
import { financialGoalService } from '../../../services/financialGoalService';
import {
  FinancialGoal,
  FinancialGoalInput,
} from '../../../types/financialGoalTypes';

import CardBox from '../../../components/CardBox';
import Button from '../../../components/Button/DefaultButton';
import TextInput from '../../../components/Input/TextInput';
import Overlay from '../../../components/Overlay';
import Form from '../../../components/Form';
import NumberInput from '../../../components/Input/NumberInput';
import DateInput from '../../../components/Input/DateInput';
import { parseCurrencyToNumber } from '../../../utils/currency.ts';

const AddFinancialGoalPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { refresh } = useOutletContext<{ refresh: () => void }>();
  const { add, loading } = useApi<FinancialGoal, FinancialGoalInput>(
    financialGoalService,
  );

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [targetAmountFormatted, setTargetAmountFormatted] = useState('0,00');
  const [deadline, setDeadline] = useState('');

  const handleClose = () => navigate('..');

  const handleSave = async () => {
    if (!name.trim() || targetAmountFormatted === '0,00' || !deadline) {
      alert('Preencha todos os campos obrigatórios.');
      return;
    }

    if (!user?.id) {
      alert('Erro: Usuário não identificado.');
      return;
    }

    const numericAmount = parseCurrencyToNumber(targetAmountFormatted);

    await add({
      user_id: user.id,
      name: name,
      description: description,
      target_amount: numericAmount,
      deadline: deadline,
    });

    refresh();
    handleClose();
  };

  return (
    <Overlay onClose={handleClose}>
      <CardBox title="Nova Meta Financeira">
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            handleSave();
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
              placeholder="Detalhe como pretende alcançar..."
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
            <Button variant="danger" type="button" onClick={handleClose}>
              Cancelar
            </Button>
            <Button type="submit" disabled={loading} icon="add">
              {loading ? 'Salvando...' : 'Criar Meta'}
            </Button>
          </Form.Actions>
        </Form>
      </CardBox>
    </Overlay>
  );
};

export default AddFinancialGoalPage;
