
import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  username: string;
  savedPlans: string[];
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => boolean;
  register: (username: string, password: string) => boolean;
  logout: () => void;
  savePlan: (plan: string) => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check if user is already logged in
    const savedUser = localStorage.getItem('quakeiq_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = (username: string, password: string): boolean => {
    // Simple validation - in a real app, this would hit an API
    const users = JSON.parse(localStorage.getItem('quakeiq_users') || '{}');
    
    if (users[username] && users[username].password === password) {
      const userData = {
        username,
        savedPlans: users[username].savedPlans || []
      };
      setUser(userData);
      localStorage.setItem('quakeiq_user', JSON.stringify(userData));
      return true;
    }
    return false;
  };

  const register = (username: string, password: string): boolean => {
    const users = JSON.parse(localStorage.getItem('quakeiq_users') || '{}');
    
    if (users[username]) {
      return false; // User already exists
    }
    
    users[username] = {
      password,
      savedPlans: []
    };
    
    localStorage.setItem('quakeiq_users', JSON.stringify(users));
    
    const userData = {
      username,
      savedPlans: []
    };
    setUser(userData);
    localStorage.setItem('quakeiq_user', JSON.stringify(userData));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('quakeiq_user');
  };

  const savePlan = (plan: string) => {
    if (!user) return;
    
    const updatedUser = {
      ...user,
      savedPlans: [...user.savedPlans, plan]
    };
    
    setUser(updatedUser);
    localStorage.setItem('quakeiq_user', JSON.stringify(updatedUser));
    
    // Also update the users database
    const users = JSON.parse(localStorage.getItem('quakeiq_users') || '{}');
    if (users[user.username]) {
      users[user.username].savedPlans = updatedUser.savedPlans;
      localStorage.setItem('quakeiq_users', JSON.stringify(users));
    }
  };

  return (
    <AuthContext.Provider 
      value={{
        user,
        login,
        register,
        logout,
        savePlan,
        isAuthenticated: !!user
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
