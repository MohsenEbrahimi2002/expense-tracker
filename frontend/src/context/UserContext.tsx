import React, { useState, createContext } from "react";

export interface UserType {
  _id: string;
  fullName: string;
  email: string;
  password: string;
  profileImageUrl?: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
export interface UserContextType {
  user: UserType | null;
  updateUser: (userData: UserType) => void;
  clearUser: () => void;
}

export const UserContext = createContext({} as UserContextType );

function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserType | null>(null);

  // Function to update user data
  const updateUser = (userData: UserType) => {
    setUser(userData);
  };

  const clearUser = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, updateUser, clearUser }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;
