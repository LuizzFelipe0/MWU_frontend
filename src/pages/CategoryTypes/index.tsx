import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useApi } from '../../hooks/useApi';
import { categoryTypeService } from '../../services/categoryTypeService';
import { CategoryType, CategoryTypeInput } from '../../types/categoryTypeTypes';

import * as S from './styles';
import CardBox from '../../components/CardBox';
import Button from '../../components/Button';
import SearchBar from '../../components/SearchBar';

const CategoryTypesPage: React.FC = () => {
  const navigate = useNavigate();
  const { data, refresh, remove } = useApi<
    CategoryType,
    CategoryTypeInput
  >(categoryTypeService);
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
          <Button onClick={() => navigate('add')}>Adicionar</Button>
        </S.HeaderActions>

        <S.List>
          {filteredData.map((cat) => (
            <S.ListItem key={cat.id}>
              <div className="info">
                <span>{cat.name}</span>
                <small
                  style={{ color: cat.is_positive ? '#32d177' : '#ff3b30' }}
                >
                  {cat.is_positive ? 'Positivo' : 'Negativo'}
                </small>
              </div>
              <Button variant="danger" onClick={() => remove(cat.id)}>
                Apagar
              </Button>
            </S.ListItem>
          ))}
        </S.List>
      </CardBox>

      {/* O Outlet renderiza a página 'Add' por cima desta quando a rota for /add */}
      <Outlet context={{ refresh }} />
    </S.Container>
  );
};

export default CategoryTypesPage;
