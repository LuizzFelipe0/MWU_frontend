import React from 'react';
import { useApi } from '../../hooks/useApi';
import { GoalsAnalysis, ExpensesAnalysis } from '../../types/analyticsTypes';

import CardBox from '../../components/CardBox';
import * as S from './styles';
import { goalAnalysisService } from '../../services/analysis/goalsAnalysis.ts';
import { expensesAnalysisService } from '../../services/analysis/expensesAnalysis.ts';
import ExpensesAnalysisChart from './Expenses';
import GoalsAnalysisChart from './Goals';

const DashboardPage: React.FC = () => {
  const { data: goals, loading: loadingGoals } = useApi<GoalsAnalysis>(
    goalAnalysisService,
    true,
  );
  const { data: expenses, loading: loadingExpenses } = useApi<ExpensesAnalysis>(
    expensesAnalysisService,
    true,
  );

  return (
    <S.DashboardContainer>
      <CardBox title="Gastos e Receitas por Mês" >
        {loadingExpenses ? (
          <S.LoadingPlaceholder>
            Processando dados financeiros...
          </S.LoadingPlaceholder>
        ) : (
          <ExpensesAnalysisChart data={expenses} />
        )}
      </CardBox>

      <CardBox title="Progresso das Metas" >
        {loadingGoals ? (
          <S.LoadingPlaceholder>Carregando metas...</S.LoadingPlaceholder>
        ) : (
          <GoalsAnalysisChart goals={goals} />
        )}
      </CardBox>
    </S.DashboardContainer>
  );
};

export default DashboardPage;
