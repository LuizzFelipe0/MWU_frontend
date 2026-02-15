import React from 'react';
import * as S from './AppStyles';
import CategoryTypesPage from './pages/CategoryTypes';
import Header from './components/Header';
import Footer from './components/Footer'; 

const App: React.FC = () => {
  return (
    <>
      <S.GlobalStyle />
      <Header />
      <S.AppContainer>
        {/* Aqui renderizamos a página de tipos de categoria */}
        <S.Card>
          <CategoryTypesPage />
        </S.Card>
      </S.AppContainer>
      <Footer />
    </>
  );
};

export default App;