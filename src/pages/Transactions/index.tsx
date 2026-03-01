import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useApi } from '../../hooks/useApi';
import { transactionService } from '../../services/transactionService';
import { Transaction, TransactionInput } from '../../types/transactionTypes';

import * as S from './styles';
import CardBox from '../../components/CardBox';
import Button from '../../components/Button/DefaultButton';
import SearchBar from '../../components/SearchBar';
import List from '../../components/List';

const TransactionsPage: React.FC = () => {
  const navigate = useNavigate();
  const { data, refresh } = useApi<Transaction, TransactionInput>(transactionService);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    refresh();
  }, [refresh]);

  const filteredData = data.filter((tra) =>
    tra.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <S.Container>
      <CardBox title="Transações">
        <S.HeaderActions>
          <SearchBar
            placeholder="Buscar transação..."
            value={searchTerm}
            onChange={setSearchTerm}
          />
          <Button icon="add" onClick={() => navigate('add')}></Button>
        </S.HeaderActions>

        <List>
          {filteredData.map((tra) => (
            <List.Item key={tra.id}>
              <List.Info>
                <S.ItemTitle>{tra.name}</S.ItemTitle>
                <small>
                  {tra.date}
                </small>
              </List.Info>

              <List.Actions>
                <Button
                  icon="update"
                  variant="warning"
                  onClick={() => navigate(tra.id)}
                ></Button>
              </List.Actions>
            </List.Item>
          ))}
        </List>

        {filteredData.length === 0 && (
          <S.EmptyState>Nenhuma Transação encontrada.</S.EmptyState>
        )}
      </CardBox>

      <Outlet context={{ refresh }} />
    </S.Container>
  );
};

export default TransactionsPage;
