import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
`;

export const GoalCard = styled.div`
  background: #ffffff;
  border-radius: 20px;
  border: 1px solid #e5e5ea;
  padding: 1rem;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.02);

  @media (max-width: 600px) {
    flex-direction: column;
    text-align: center;
  }
`;

export const ChartArea = styled.div`
  flex: 0 0 160px;
`;

export const InfoArea = styled.div`
  flex: 1;
  padding: 0 1rem;

  h3 {
    margin: 0;
    font-size: 1.2rem;
    color: #1c1c1e;
  }

  .description {
    font-size: 0.85rem;
    color: #8e8e93;
    margin: 0.2rem 0 1rem 0;
  }
`;

export const MetricsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.8rem;

  .metric {
    display: flex;
    flex-direction: column;

    small {
      font-size: 0.7rem;
      text-transform: uppercase;
      color: #c5c9c7;
      font-weight: 700;
    }

    span {
      font-size: 0.95rem;
      font-weight: 600;
      color: #3a3a3c;
    }

    .current {
      color: #32d177;
    }
    .danger {
      color: #ff3b30;
    }
  }

  .highlight {
    background: #f2f2f7;
    padding: 0.4rem 0.8rem;
    border-radius: 10px;
  }
`;

export const Deadline = styled.div`
  margin-top: 1rem;
  font-size: 0.8rem;
  font-weight: 600;
  color: #8e8e93;
  text-align: right;
`;
