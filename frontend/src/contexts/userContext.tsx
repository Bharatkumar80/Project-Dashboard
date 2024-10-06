import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { fetchUserData, updateUserProfile, updateProfilePicture } from '../Services/api';

export interface User1 {
  name: string;
  email: string;
  bio?: string;
  avatarUrl: string;
}

export interface UserContextType {
  user: User1 | null;
  loading: boolean;
  updateUser: (userData: Partial<User1>) => Promise<void>;
  updateAvatar: (file: File) => Promise<void>;
}

const defaultUserContext: UserContextType = {
  user: null,
  loading: true,
  updateUser: async () => {},
  updateAvatar: async () => {},
};

export const UserContext = createContext<UserContextType>(defaultUserContext);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User1 | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const userData = await fetchUserData();
      setUser(userData);
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateUser = async (userData: Partial<User1>) => {
    try {
      const updatedUser = await updateUserProfile(userData);
      setUser(updatedUser);
    } catch (error) {
      console.error('Error updating user data:', error);
      throw error;
    }
  };

  const updateAvatar = async (file: File) => {
    try {
      const updatedUser = await updateProfilePicture(file);
      setUser(updatedUser);
    } catch (error) {
      console.error('Error updating profile picture:', error);
      throw error;
    }
  };

  const contextValue: UserContextType = {
    user,
    loading,
    updateUser,
    updateAvatar,
  };

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
};