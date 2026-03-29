import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthState, UserRole } from '../types';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string, role: UserRole) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: true,
  });

  useEffect(() => {
    const savedAuth = localStorage.getItem('auth');
    if (savedAuth) {
      const { user, token } = JSON.parse(savedAuth);
      setState({
        user,
        token,
        isAuthenticated: true,
        isLoading: false,
      });
    } else {
      setState(s => ({ ...s, isLoading: false }));
    }
  }, []);

  const login = async (email: string, _password: string) => {
    // Mock login logic
    const mockUser: User = {
      id: 'u1',
      email,
      name: email.split('@')[0],
      role: 'ADMIN', // In real app, fetch from DB
      companyId: 'c1',
    };
    const token = 'mock-jwt-token';
    const authData = { user: mockUser, token };
    localStorage.setItem('auth', JSON.stringify(authData));
    setState({
      ...authData,
      isAuthenticated: true,
      isLoading: false,
    });
  };

  const signup = async (name: string, email: string, _password: string, role: UserRole) => {
    // Mock signup logic
    const mockUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      name,
      role,
      companyId: 'c1',
    };
    const token = 'mock-jwt-token';
    const authData = { user: mockUser, token };
    localStorage.setItem('auth', JSON.stringify(authData));
    setState({
      ...authData,
      isAuthenticated: true,
      isLoading: false,
    });
  };

  const logout = () => {
    localStorage.removeItem('auth');
    setState({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
    });
  };

  return (
    <AuthContext.Provider value={{ ...state, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
