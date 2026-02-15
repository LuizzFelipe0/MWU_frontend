import React, { useState } from 'react';
import { useCategoryTypes } from '../../hooks/useCategoryType';
import * as S from './styles';

const CategoryTypesPage: React.FC = () => {
  const { categories, loading, addCategory, removeCategory } = useCategoryTypes();
  const [newName, setNewName] = useState('');

  const handleAdd = async () => {
    if (!newName) return;
    await addCategory({ name: newName, is_positive: false });
    setNewName('');
  };

  return (
    <S.Container>
      <S.Header>
        <h1>Tipo de Categoria</h1>
      </S.Header>

      <S.InputGroup>
        <input
          placeholder="Novo Tipo de Categoria..."
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />
        <S.ActionButton onClick={handleAdd}>Adicionar</S.ActionButton>
      </S.InputGroup>

      {loading ? (
        <p>Carregando...</p>
      ) : (
        <S.List>
          {categories.map((cat) => (
            <S.ListItem key={cat.id}>
              <div className="info">
                <span>{cat.name}</span>
                <small color={cat.is_positive ? '#32d177' : '#ff3b30'}>
                  {cat.is_positive ? 'Positivo' : 'Negativo'}
                </small>
              </div>
              <S.ActionButton
                variant="danger"
                onClick={() => removeCategory(cat.id)}
              >
                Apagar
              </S.ActionButton>
            </S.ListItem>
          ))}
        </S.List>
      )}
    </S.Container>
  );
};

export default CategoryTypesPage;