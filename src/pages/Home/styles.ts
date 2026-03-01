import styled from 'styled-components';

export const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 64rem;
  margin: 0 auto;
  padding: 1rem;
`;

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  padding: 1rem 0;

  @media (min-width: 48rem) {
    grid-template-columns: repeat(auto-fill, minmax(18rem, 1fr));
    gap: 1.5rem;
  }
`;

export const MenuCard = styled.div`
  background: #fff;
  border-radius: 24px;
  padding: 1.2rem;
  display: flex;
  align-items: center;
  gap: 1.2rem;

  border: 0.0625rem solid #e5e5ea;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
  cursor: pointer;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
  &:active {
    transform: scale(0.95);
    background-color: #f2f2f7;
  }

  .icon-area {
    width: 3rem;
    height: 3rem;
    min-width: 3rem;
    background-color: #32d177;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    color: #fff;
  }

  .text-content {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
  }

  h3 {
    font-size: 1.25rem;
    font-weight: 600;
    color: #000;
    margin: 0;
  }

  p {
    font-size: 0.875rem;
    color: #929090;
    margin-top: 0.5rem;
  }

  @media (min-width: 48rem) {
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    height: 11rem;
    padding: 1.5rem;

    .icon-area {
      width: 3.5rem;
      height: 3.5rem;
    }

    h3 {
      font-size: 1.25rem;
    }
  }
`;
