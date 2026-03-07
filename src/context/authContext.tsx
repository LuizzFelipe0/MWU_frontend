import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { UserSession, LoginInput, LoginOutput } from '../types/userTypes.ts';
import { authService } from '../services/authService';

interface AuthContextData {
  user: UserSession | null;
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
  const [user, setUser] = useState<UserSession | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('@MWU:user');
    const savedToken = localStorage.getItem('@MWU:token');

    if (savedUser && savedToken) {
      try {
        setUser(JSON.parse(savedUser) as UserSession);
      } catch {
        localStorage.clear();
      }
    }
    setLoading(false);
  }, []);

  const login = async (credentials: LoginInput) => {
    const response: LoginOutput = await authService.login(credentials);
    const { access_token, user: sessionData } = response;

    setUser(sessionData);

    localStorage.setItem('@MWU:token', access_token);
    localStorage.setItem('@MWU:user', JSON.stringify(sessionData));
  };

  const logout = () => {
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
