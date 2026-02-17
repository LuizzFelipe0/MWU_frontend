import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import CategoryTypesPage from './pages/CategoryTypes';
import Layout from './components/Layout';
import NotFoundPage from './pages/NotFound';

const MWURoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="category/types" element={<CategoryTypesPage />} />

        <Route path="/" element={<Navigate to="/category/types" replace />} />

        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};

export default MWURoutes;
