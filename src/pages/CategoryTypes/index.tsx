import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useApi } from '../../hooks/useApi';
import { categoryTypeService } from '../../services/categoryTypeService';
import { CategoryType, CategoryTypeInput } from '../../types/categoryTypeTypes';

import * as S from './styles';
import CardBox from '../../components/CardBox';
import Button from '../../components/Button/DefaultButton';
import SearchBar from '../../components/SearchBar';
import List from '../../components/List';

const CategoryTypesPage: React.FC = () => {
  const navigate = useNavigate();
  const { data, refresh } = useApi<CategoryType, CategoryTypeInput>(
    categoryTypeService,
  );
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    refresh();
  }, [refresh]);

  const filteredData = data.filter((cat) =>
    cat.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <S.Container>
      <CardBox title="Tipo de Categoria">
        <S.HeaderActions>
          <SearchBar
            placeholder="Buscar tipo de categoria..."
            value={searchTerm}
            onChange={setSearchTerm}
          />
          <Button icon="add" onClick={() => navigate('add')}></Button>
        </S.HeaderActions>

        <List>
          {filteredData.map((cat) => (
            <List.Item key={cat.id}>
              <List.Info>
                <S.ItemTitle>{cat.name}</S.ItemTitle>
                <small
                  style={{ color: cat.is_positive ? '#32d177' : '#ff3b30' }}
                >
                  {cat.is_positive ? 'Positivo' : 'Negativo'}
                </small>
              </List.Info>

              <List.Actions>
                <Button
                  icon="update"
                  variant="warning"
                  onClick={() => navigate(cat.id)}
                ></Button>
              </List.Actions>
            </List.Item>
          ))}
        </List>

        {filteredData.length === 0 && (
          <S.EmptyState>Nenhum Tipo de Categoria encontrado.</S.EmptyState>
        )}
      </CardBox>

      <Outlet context={{ refresh }} />
    </S.Container>
  );
};

export default CategoryTypesPage;
