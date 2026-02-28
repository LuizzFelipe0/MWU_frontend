import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useApi } from '../../hooks/useApi';
import { financialGoalService } from '../../services/financialGoalService';
import { FinancialGoal, FinancialGoalInput } from '../../types/financialGoalTypes';

import * as S from './styles';
import CardBox from '../../components/CardBox';
import Button from '../../components/Button/DefaultButton';
import SearchBar from '../../components/SearchBar';
import List from '../../components/List';

const FinancialGoalsPage: React.FC = () => {
  const navigate = useNavigate();
  const { data, refresh } = useApi<FinancialGoal, FinancialGoalInput>(
    financialGoalService,
  );
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    refresh();
  }, [refresh]);

  const filteredData = data.filter((fingoals) =>
    fingoals.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <S.Container>
      <CardBox title="Metas Financeiras">
        <S.HeaderActions>
          <SearchBar
            placeholder="Buscar meta financeira..."
            value={searchTerm}
            onChange={setSearchTerm}
          />
          <Button icon="add" onClick={() => navigate('add')}></Button>
        </S.HeaderActions>

        <List>
          {filteredData.map((fingoals) => (
            <List.Item key={fingoals.id}>
              <List.Info>
                <S.ItemTitle>{fingoals.name}</S.ItemTitle>
                <small
                >
                  {fingoals.description}
                </small>
              </List.Info>
              <List.Actions>
                <Button
                  icon="update"
                  variant="warning"
                  onClick={() => navigate(fingoals.id)}
                ></Button>
              </List.Actions>
            </List.Item>
          ))}
        </List>

        {filteredData.length === 0 && (
          <S.EmptyState>Nenhuma Meta Financeira encontrada.</S.EmptyState>
        )}
      </CardBox>

      <Outlet context={{ refresh }} />
    </S.Container>
  );
};

export default FinancialGoalsPage;
