import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useApi } from '../../hooks/useApi';
import { accountService } from '../../services/accountService.ts';
import { Account, AccountInput } from '../../types/accountTypes.ts';

import * as S from './styles';
import CardBox from '../../components/CardBox';
import Button from '../../components/Button/DefaultButton';
import SearchBar from '../../components/SearchBar';
import List from '../../components/List';
import { useFilter } from '../../hooks/useFilter.tsx';

const AccountsPage: React.FC = () => {
  const navigate = useNavigate();
  const { data, refresh } = useApi<Account, AccountInput>(
    accountService,
    true,
  );
  const [searchTerm, setSearchTerm] = useState('');

  const filteredData = useFilter(data, searchTerm, 'name');

  return (
    <S.Container>
      <CardBox title="Contas Bancárias">
        <S.HeaderActions>
          <SearchBar
            placeholder="Buscar conta bancária..."
            value={searchTerm}
            onChange={setSearchTerm}
          />
          <Button icon="add" onClick={() => navigate('add')}></Button>
        </S.HeaderActions>

        <List>
          {filteredData.map((accounts) => (
            <List.Item key={accounts.id}>
              <List.Info>
                <S.ItemTitle>{accounts.name}</S.ItemTitle>
                <small
                >
                  {accounts.type}
                </small>
              </List.Info>
              <List.Actions>
                <Button
                  icon="update"
                  variant="warning"
                  onClick={() => navigate(accounts.id)}
                ></Button>
              </List.Actions>
            </List.Item>
          ))}
        </List>

        {filteredData.length === 0 && (
          <S.EmptyState>Nenhuma Conta Bancária encontrada.</S.EmptyState>
        )}
      </CardBox>

      <Outlet context={{ refresh }} />
    </S.Container>
  );
};

export default AccountsPage;
