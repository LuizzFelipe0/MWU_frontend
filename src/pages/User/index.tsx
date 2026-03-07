import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useApi } from '../../hooks/useApi';
import { userService } from '../../services/userService';
import { User, UserInput } from '../../types/userTypes';

import * as S from './styles';
import CardBox from '../../components/CardBox';
import Button from '../../components/Button/DefaultButton';
import SearchBar from '../../components/SearchBar';
import List from '../../components/List';
import { useFilter } from '../../hooks/useFilter.tsx';

const UsersPage: React.FC = () => {
  const navigate = useNavigate();
  const { data, refresh } = useApi<User, UserInput>(userService, true);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredData = useFilter(data, searchTerm, 'first_name');

  return (
    <S.Container>
      <CardBox title="Usuários">
        <S.HeaderActions>
          <SearchBar
            placeholder="Buscar usuários..."
            value={searchTerm}
            onChange={setSearchTerm}
          />
          <Button icon="add" onClick={() => navigate('add')}></Button>
        </S.HeaderActions>

        <List>
          {filteredData.map((users) => (
            <List.Item key={users.id}>
              <List.Info>
                <S.ItemTitle>{users.first_name + ' ' + users.last_name}</S.ItemTitle>
                <small>{users.cpf}</small>
              </List.Info>
              <List.Actions>
                <Button
                  icon="update"
                  variant="warning"
                  onClick={() => navigate(users.id)}
                ></Button>
              </List.Actions>
            </List.Item>
          ))}
        </List>

        {filteredData.length === 0 && (
          <S.EmptyState>Nenhuma Usuário encontrada.</S.EmptyState>
        )}
      </CardBox>

      <Outlet context={{ refresh }} />
    </S.Container>
  );
};

export default UsersPage;
