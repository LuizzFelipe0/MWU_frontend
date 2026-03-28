import React, { useMemo } from 'react';
import Chart from 'react-apexcharts';
import { formatNumberToCurrency } from '../../../utils/currency';
import * as S from './styles';
import { ExpensesAnalysis } from '../../../types/analyticsTypes.ts';

interface Props {
  data: ExpensesAnalysis[];
}

const ExpensesAnalysisChart: React.FC<Props> = ({ data }) => {
  const chartConfig = useMemo(() => {
    const monthLabels = [
      'Jan',
      'Fev',
      'Mar',
      'Abr',
      'Mai',
      'Jun',
      'Jul',
      'Ago',
      'Set',
      'Out',
      'Nov',
      'Dez',
    ];
    const months = Array.from({ length: 12 }, (_, i) => i + 1);

    const uniqueCategories = Array.from(
      new Set(data.map((d) => d.category_type_name)),
    );

    const greens = ['#32d177', '#66e09b', '#1d8f50'];
    const reds = ['#ff6b6b', '#ff8787', '#ffb3b3'];

    const series = uniqueCategories.map((catName, index) => {
      const isPositive = data.find(
        (d) => d.category_type_name === catName,
      )?.is_positive;

      return {
        name: catName,
        color: isPositive
          ? greens[index % greens.length]
          : reds[index % reds.length],
        data: months.map((m) => {
          const entry = data.find(
            (d) => d.month === m && d.category_type_name === catName,
          );
          return entry ? entry.total_amount : 0;
        }),
      };
    });

    return { series, monthLabels };
  }, [data]);

  const options: ApexCharts.ApexOptions = {
    chart: {
      type: 'bar',
      toolbar: { show: false },
      fontFamily: 'SF Pro Display, sans-serif',
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '18rem',
        dataLabels: { position: 'top' },
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent'],
    },
    xaxis: {
      categories: chartConfig.monthLabels,
      axisBorder: { show: false },
    },
    yaxis: {
      labels: {
        formatter: (val) =>
          `R$ ${val >= 1000 ? (val / 1000).toFixed(0) + 'k' : val}`,
      },
    },
    fill: { opacity: 1 },
    tooltip: {
      y: {
        formatter: (val) => `R$ ${formatNumberToCurrency(val)}`,
      },
    },
    legend: {
      position: 'top',
      horizontalAlign: 'right',
    },
  };

  return (
    <S.ChartCard>
      <Chart
        options={options}
        series={chartConfig.series}
        type="bar"
        height={400}
        width={600}
      />
    </S.ChartCard>
  );
};

export default ExpensesAnalysisChart;
