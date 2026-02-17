import styled from 'styled-components';

export const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 64rem; /* ~1024px */
  margin: 0 auto;
`;

export const WelcomeSection = styled.section`
  padding: 1.5rem 0;

  h2 {
    font-size: clamp(1.5rem, 5vw, 2rem);
    font-weight: 700;
    color: #000;
    margin: 0;
  }

  p {
    color: #929090;
    font-size: 1rem;
    margin-top: 0.25rem;
  }
`;

export const CarouselWrapper = styled.div`
  display: flex;
  gap: 1.25rem;
  overflow-x: auto;
  padding: 1rem 0.5rem 2rem 0.5rem;

  /* Efeito Carrossel Nativo */
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;

  /* Esconder barra de scroll mas manter funcionalidade */
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;

  @media (min-width: 48rem) {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr));
    overflow-x: visible;
    scroll-snap-type: none;
  }
`;

export const MenuCard = styled.div`
  /* Estilo do Card iOS */
  min-width: 16rem; /* Garante o aspecto de card no mobile */
  background: #fff;
  border-radius: 1.5rem; /* 24px - Bem arredondado estilo Apple */
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 12rem;

  scroll-snap-align: center;
  border: 0.0625rem solid #e5e5ea;
  box-shadow: 0 0.5rem 1.5rem rgba(0, 0, 0, 0.05);
  cursor: pointer;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;

  &:active {
    transform: scale(0.95);
    background-color: #f2f2f7;
  }

  .icon-area {
    width: 3.5rem;
    height: 3.5rem;
    background-color: #32d177; /* Verde Primário */
    border-radius: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    color: white;
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
    min-width: unset; /* No desktop ele respeita o grid */
  }
`;
