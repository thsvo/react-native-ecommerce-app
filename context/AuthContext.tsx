import React, { createContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}

interface AuthContextData {
  token: string | null;
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStorageData = async () => {
      const storedToken = await AsyncStorage.getItem('@Auth:token');
      const storedUser = await AsyncStorage.getItem('@Auth:user');

      if (storedToken && storedUser) {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
      }
      setLoading(false);
    };

    loadStorageData();
  }, []);

  const login = async (email: string, password: string) => {
    const response = await fetch('http://localhost:3000/api/server/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      setToken(data.token);
      setUser(data.user);

      await AsyncStorage.setItem('@Auth:token', data.token);
      await AsyncStorage.setItem('@Auth:user', JSON.stringify(data.user));
    } else {
      throw new Error(data.message || 'Failed to login');
    }
  };

  const logout = async () => {
    await AsyncStorage.removeItem('@Auth:token');
    await AsyncStorage.removeItem('@Auth:user');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
