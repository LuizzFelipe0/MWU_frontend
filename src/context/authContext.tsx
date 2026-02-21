import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { User, LoginInput, LoginOutput } from '../types/authTypes';
import { authService } from '../services/authService';

interface AuthContextData {
  user: User | null;
  login: (credentials: LoginInput) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData,
);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verify if the user is already logged
    const savedUser = localStorage.getItem('@MWU:user');
    const savedToken = localStorage.getItem('@MWU:token');

    if (savedUser && savedToken) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (credentials: LoginInput) => {
    const response: LoginOutput = await authService.login(credentials);

    const { access_token, user: userData } = response;

    // Saves in the state and at local storage
    setUser(userData);
    localStorage.setItem('@MWU:token', access_token);
    localStorage.setItem('@MWU:user', JSON.stringify(userData));
  };

  const logout = () => {
    // Clean all
    localStorage.removeItem('@MWU:token');
    localStorage.removeItem('@MWU:user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
