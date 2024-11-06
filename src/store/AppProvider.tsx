import React, {createContext, useContext, useState} from 'react';

import {removeToken} from '../lib/asyncStorage';

type AppContextType = {
  token: string;
  setToken: (token: string) => void;
  handleLogout: () => void;
};

const AppContext = createContext<AppContextType | null>(null);
export const useAppContext = () => useContext(AppContext) as AppContextType;

interface AppProviderProps extends React.PropsWithChildren {}

const AppProvider = ({children}: AppProviderProps) => {
  const [token, setToken] = useState('');

  const handleLogout = () => {
    removeToken();
    setToken('');
  };

  return (
    <AppContext.Provider value={{token, setToken, handleLogout}}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
