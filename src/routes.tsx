import React from 'react';
import { Routes, Route, Outlet, Navigate } from 'react-router-dom';
import CategoryTypesPage from './pages/CategoryTypes';
import Layout from './components/Layout';
import NotFoundPage from './pages/NotFound';
import HomePage from './pages/Home';
import { useAuth } from './hooks/useAuth.tsx';
import LoginPage from './pages/Login';
import AddCategoryTypePage from './pages/CategoryTypes/Add';

const PrivateRoute = () => {
  const { user, loading } = useAuth();

  if (loading) return null;
  return user ? <Outlet /> : <Navigate to="/login" />;
};

const MWURoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      <Route element={<PrivateRoute />}>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
              <Route path="category/types" element={<CategoryTypesPage />}>
              <Route path="add" element={<AddCategoryTypePage />} />
          </Route>

          <Route path="*" element={<NotFoundPage />} />

        </Route>
      </Route>
    </Routes>
  );
};

export default MWURoutes;
