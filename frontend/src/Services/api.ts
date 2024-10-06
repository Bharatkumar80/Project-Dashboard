import { User1 } from '../contexts/userContext';

const mockUser: User1 = {
  name: 'John Doe',
  email: 'john@example.com',
  bio: 'I am a software developer',
  avatarUrl: '/image.jpg',
};

export const fetchUserData = async (): Promise<User1> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockUser), 500);
  });
};

export const updateUserProfile = async (userData: Partial<User1>): Promise<User1> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      const updatedUser: User1 = { ...mockUser, ...userData };
      resolve(updatedUser);
    }, 1000);
  });
};

export const updateProfilePicture = async (file: File): Promise<User1> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      const updatedUser: User1 = { ...mockUser, avatarUrl: URL.createObjectURL(file) };
      resolve(updatedUser);
    }, 1000);
  });
};