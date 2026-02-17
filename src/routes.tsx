import React from 'react';
import { Routes, Route } from 'react-router-dom';
import CategoryTypesPage from './pages/CategoryTypes';
import Layout from './components/Layout';
import NotFoundPage from './pages/NotFound';
import HomePage from './pages/Home';

const MWURoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="category/types" element={<CategoryTypesPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};

export default MWURoutes;
