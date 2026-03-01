import React from 'react';
import { Routes, Route, Outlet, Navigate } from 'react-router-dom';
import CategoryTypesPage from './pages/CategoryTypes';
import Layout from './components/Layout';
import NotFoundPage from './pages/NotFound';
import HomePage from './pages/Home';
import { useAuth } from './hooks/useAuth.tsx';
import LoginPage from './pages/Login';
import AddCategoryTypePage from './pages/CategoryTypes/Add';
import UpdateCategoryTypePage from './pages/CategoryTypes/Update';
import FinancialGoalsPage from './pages/FinancialGoals';
import AddFinancialGoalPage from './pages/FinancialGoals/Add';
import UpdateFinancialGoalPage from './pages/FinancialGoals/Update';
import CategoriesPage from './pages/Categories';
import AddCategoryPage from './pages/Categories/Add';
import UpdateCategoryPage from './pages/Categories/Update';
import AccountsPage from './pages/Accounts';
import AddAccountPage from './pages/Accounts/Add';
import UpdateAccountPage from './pages/Accounts/Update';

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

          <Route path="accounts" element={<AccountsPage />}>
            <Route path="add" element={<AddAccountPage />} />
            <Route path=":id" element={<UpdateAccountPage />} />
          </Route>

          <Route path="categories" element={<CategoriesPage />}>
            <Route path="add" element={<AddCategoryPage />} />
            <Route path=":id" element={<UpdateCategoryPage />} />
          </Route>

          <Route path="category/types" element={<CategoryTypesPage />}>
            <Route path="add" element={<AddCategoryTypePage />} />
            <Route path=":id" element={<UpdateCategoryTypePage />} />
          </Route>

          <Route path="financial-goals" element={<FinancialGoalsPage />}>
            <Route path="add" element={<AddFinancialGoalPage />} />
            <Route path=":id" element={<UpdateFinancialGoalPage />} />
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default MWURoutes;
