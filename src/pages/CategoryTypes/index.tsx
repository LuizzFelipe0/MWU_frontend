import React, { useState } from 'react';
import { useCategoryTypes } from '../../hooks/useCategoryType';
import * as S from './styles';
import CardBox from '../../components/CardBox';
import Button from '../../components/Button';

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
      <CardBox title="Tipo de Categoria">
        <S.InputGroup>
          <input
            placeholder="Novo Tipo de Categoria..."
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
          <Button onClick={handleAdd}>Adicionar</Button>
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
                <Button variant="danger" onClick={() => removeCategory(cat.id)}>
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