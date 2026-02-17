import React from 'react';

import * as S from './globalStyles.ts';

import MWURoutes from './routes.tsx';

const App: React.FC = () => {
  return (
    <>
      <S.GlobalStyle />
      <MWURoutes />
    </>
  );
};

export default App;