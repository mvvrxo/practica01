import { createContext, useState, ReactNode } from 'react';
import React from 'react';
import { UserDataProps, UserGoogleProps, UserProps } from '../types/index';

export interface AuthContextProps {
  user: UserProps | null;
  login: (props: { userSpa?: UserDataProps; google?: UserGoogleProps }) => void;
  logout: () => void;
  calendarId: string | null;
  setCalendarId: (calendarId: string) => void;
}

export const AuthContext = createContext<AuthContextProps>({
  user: null,
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserProps | null>(localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') as string) : null);
  const [calendarId, setCalendarId] = React.useState<string | null>(null);

  const login = (props: { userSpa?: UserDataProps; google?: UserGoogleProps }) => {
    const { userSpa, google } = props;
    const userData: UserProps = { ...user };
  
    if (google) {
      userData.google = { 
        ...google
      };
    } 
    
    if ( userSpa ) {
      userData.userData = {
        ...userSpa,
        isAuthenticated: true,
      };
    }

    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    console.log("Usuario autenticado:", userData);
    
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, calendarId, setCalendarId }}>
      {children}
    </AuthContext.Provider>
  );
};
