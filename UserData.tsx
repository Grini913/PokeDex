import React, { createContext, useContext, useState, ReactNode } from 'react';

// datos del usuario
type UserDataType = {
  username: string;
  userima: string;
  password: string;
  email: string; 
  registrationDate: string; 
};

// tipo para el contexto
type UserContextType = {
  userData: UserDataType;
  updateUserData: (newData: Partial<UserDataType>) => void;
};

// Creamos el contexto
const UserContext = createContext<UserContextType | undefined>(undefined);

// Proveedor del contexto
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [userData, setUserData] = useState<UserDataType>({
    userima: 'https://i.etsystatic.com/36891720/r/il/eed175/5920731322/il_570xN.5920731322_lbvq.jpg',
    username: 'Grini',
    password: '12345',
    email: 'inme@example.com', // Añadimos un email inicial
    registrationDate: '01/01/2025',
  });

  const updateUserData = (newData: Partial<UserDataType>) => {
    setUserData((prev) => ({ ...prev, ...newData }));
  };

  return (
    <UserContext.Provider value={{ userData, updateUserData }}>
      {children}
    </UserContext.Provider>
  );
};

// Hook personalizado para usar el contexto
export const useUserData = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUserData must be used within a UserProvider');
  }
  return context;
};