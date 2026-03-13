import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  progress: {
    completedLessons: string[];
    totalMinutesLearned: number;
    streak: number;
    lastActivity: Date;
  };
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for saved user in localStorage
    const savedUser = localStorage.getItem('signLanguageUser');
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        // Convert string date back to Date object
        parsedUser.progress.lastActivity = new Date(parsedUser.progress.lastActivity);
        setUser(parsedUser);
      } catch (error) {
        console.error('Failed to parse saved user', error);
        localStorage.removeItem('signLanguageUser');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock user for demo purposes
    const mockUser: User = {
      id: '1',
      name: 'Demo User',
      email,
      progress: {
        completedLessons: ['basic-1', 'basic-2'],
        totalMinutesLearned: 120,
        streak: 5,
        lastActivity: new Date(),
      }
    };
    
    setUser(mockUser);
    localStorage.setItem('signLanguageUser', JSON.stringify(mockUser));
    setLoading(false);
  };

  const signup = async (name: string, email: string, password: string) => {
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Create new user
    const newUser: User = {
      id: `user_${Date.now()}`,
      name,
      email,
      progress: {
        completedLessons: [],
        totalMinutesLearned: 0,
        streak: 0,
        lastActivity: new Date(),
      }
    };
    
    setUser(newUser);
    localStorage.setItem('signLanguageUser', JSON.stringify(newUser));
    setLoading(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('signLanguageUser');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};