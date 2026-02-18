import React, { useState, useEffect } from 'react';

import { useApi } from '../../hooks/useApi';
import { categoryTypeService } from '../../services/categoryTypeService';
import { CategoryType, CategoryTypeInput } from '../../types/categoryTypeTypes.ts';

import * as S from './styles';
import CardBox from '../../components/CardBox';
import Button from '../../components/Button';

const CategoryTypesPage: React.FC = () => {
  const {
        data,
        loading,
        refresh,
        add,
        remove
  } = useApi <
    CategoryType,
    CategoryTypeInput
  > (categoryTypeService);

  const [newName, setNewName] = useState('');

  useEffect(() => {
    refresh();
  }, [refresh]);

  const handleAdd = async () => {
    if (!newName.trim()) return;

    const payload: CategoryTypeInput = {
      name: newName,
      is_positive: false,
    };

    await add(payload);
    setNewName('');
  };

  return (
    <S.Container>
      <CardBox title="Tipo de Categoria">
        <S.InputGroup>
          <input
            placeholder="Novo Tipo de Categoria..."
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
          <Button onClick={handleAdd} disabled={loading}>
            {loading ? '...' : 'Adicionar'}
          </Button>
        </S.InputGroup>

        {loading && data.length === 0 ? (
          <p>Carregando...</p>
        ) : (
          <S.List>
            {data.map((cat) => (
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
        )}
      </CardBox>
    </S.Container>
  );
};

export default CategoryTypesPage;
