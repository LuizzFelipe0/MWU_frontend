import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';
import * as S from './styles.ts';

const Layout: React.FC = () => {
  return (
    <S.Layout>
      <Header />
      <S.Container>
        <Outlet /> {/* Páginas setadas nas rotas */}
      </S.Container>
      <Footer />
    </S.Layout>
  );
};

export default Layout;
