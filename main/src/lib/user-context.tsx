'use client';
import { createContext, useContext, useState } from 'react';
import { SessionData } from './session';

// Define context type to match SessionData structure
type UserContextType = {
  user: SessionData | null;
  setUser: React.Dispatch<React.SetStateAction<SessionData | null>>;
};

// Create context with the new type, initially undefined
const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ 
  children, 
  initialUserData 
}: { 
  children: React.ReactNode, 
  initialUserData: SessionData
}) {
  const [user, setUser] = useState<SessionData | null>(initialUserData);
  
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  
  return context;
}