import React from 'react';
import Chart from 'react-apexcharts';
import { GoalsAnalysis } from '../../../types/analyticsTypes.ts';
import { formatNumberToCurrency } from '../../../utils/currency.ts';
import * as S from './styles.ts';

interface Props {
  goals: GoalsAnalysis[];
}

const GoalsAnalysisChart: React.FC<Props> = ({ goals }) => {
  return (
    <S.Container>
      {goals.map((goal) => {

        const percentage = parseFloat(
          goal.progress_percentage.replace('%', ''),
        );

        const chartOptions: ApexCharts.ApexOptions = {
          chart: { type: 'radialBar' },
          colors: ['#32d177'],
          plotOptions: {
            radialBar: {
              hollow: { size: '65%' },
              track: { background: '#f2f2f7' },
              dataLabels: {
                name: { show: false },
                value: {
                  fontSize: '1rem',
                  fontWeight: '700',
                  offsetY: 8,
                  formatter: (val) => `${val}%`,
                },
              },
            },
          },
          stroke: { lineCap: 'round' },
        };

        return (
          <S.GoalCard key={goal.id}>
            <S.ChartArea>
              <Chart
                options={chartOptions}
                series={[percentage]}
                type="radialBar"
                height={180}
              />
            </S.ChartArea>

            <S.InfoArea>
              <h3>{goal.name}</h3>
              <p className="description">{goal.description}</p>

              <S.MetricsGrid>
                <div className="metric">
                  <small>Alvo</small>
                  <span>R$ {formatNumberToCurrency(goal.target_amount)}</span>
                </div>
                <div className="metric">
                  <small>Já possui</small>
                  <span className="current">
                    R$ {formatNumberToCurrency(goal.sum_of_balances)}
                  </span>
                </div>
                <div className="metric">
                  <small>Faltam</small>
                  <span className="danger">
                    R${' '}
                    {formatNumberToCurrency(goal.difference_to_achieve_target)}
                  </span>
                </div>
                <div className="metric highlight">
                  <small>Guardar p/ mês</small>
                  <span>
                    R$ {formatNumberToCurrency(goal.monthly_saving_required)}
                  </span>
                </div>
              </S.MetricsGrid>

              <S.Deadline>
                Prazo: {new Date(goal.deadline).toLocaleDateString('pt-BR')}
              </S.Deadline>
            </S.InfoArea>
          </S.GoalCard>
        );
      })}
    </S.Container>
  );
};

export default GoalsAnalysisChart;
