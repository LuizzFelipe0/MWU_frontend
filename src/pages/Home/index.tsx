import React from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from './styles';

interface MenuItem {
  id: number;
  title: string;
  description: string;
  path: string;
  icon: string;
}

const menuItems: MenuItem[] = [
  {
    id: 1,
    title: 'Dashboard',
    description:
      'Analise seu dinheiro com detalhes e insights através de gráficos.',
    path: '/dashboard',
    icon: '📈',
  },
  {
    id: 2,
    title: 'Transações',
    description: 'Veja seu extrato de transações detalhado.',
    path: '/transactions',
    icon: '💸',
  },
  {
    id: 3,
    title: 'Categorias',
    description:
      'Organize seus gastos por grupo baseadas nas cateorias do sistema.',
    path: '/categories',
    icon: '🗂️',
  },
  {
    id: 4,
    title: 'Tipos de Categoria',
    description: 'Categorias do sistema.',
    path: '/category/types',
    icon: '🏷️',
  },
  {
    id: 5,
    title: 'Metas Financeiras',
    description: 'Planeje seus sonhos e objetivos.',
    path: '/financial-goals',
    icon: '🎯',
  },
  {
    id: 6,
    title: 'Contas Bancárias',
    description: 'Controle seus saldos e bancos.',
    path: '/accounts',
    icon: '🏦',
  },
];

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <S.HomeContainer>
      <S.GridContainer>
        {menuItems.map((item) => (
          <S.MenuCard key={item.id} onClick={() => navigate(item.path)}>
            <div className="icon-area">{item.icon}</div>
            <div className="text-content">
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          </S.MenuCard>
        ))}
      </S.GridContainer>
    </S.HomeContainer>
  );
};

export default HomePage;