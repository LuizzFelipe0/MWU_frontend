import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useApi } from '../../hooks/useApi';
import { categoryService } from '../../services/categoryService.ts';
import { Category, CategoryInput } from '../../types/categoryTypes.ts';

import * as S from './styles';
import CardBox from '../../components/CardBox';
import Button from '../../components/Button/DefaultButton';
import SearchBar from '../../components/SearchBar';
import List from '../../components/List';

const CategoriesPage: React.FC = () => {
  const navigate = useNavigate();
  const { data, refresh } = useApi<Category, CategoryInput>(categoryService);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    refresh();
  }, [refresh]);

  const filteredData = data.filter((cat) =>
    cat.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <S.Container>
      <CardBox title="Categorias">
        <S.HeaderActions>
          <SearchBar
            placeholder="Buscar categoria..."
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
                <small>
                  {cat.description}
                </small
                 >
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
          <S.EmptyState>Nenhuma Categoria encontrada.</S.EmptyState>
        )}
      </CardBox>

      <Outlet context={{ refresh }} />
    </S.Container>
  );
};

export default CategoriesPage;
