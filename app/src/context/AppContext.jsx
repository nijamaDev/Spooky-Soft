// import { LinearProgress } from '@mui/material';
// import { update } from 'lodash';
import React, { useState, createContext, useEffect } from 'react';
import GetCookie from '../hooks/getCookie'

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [update, setUpdate] = useState(true);
  const [scrapping, setScrapping] = useState([]);
  const [login, setLogin] = useState({ found : "waiting"});
  const [isDarkTheme, setIsDarkTheme] = useState(true);

  // const [processes, setProcesses] = useState(); //Array de Objetos
  // const [loading, setloading] = useState(true);

  // Retorna el ultimo objeto insertado
  const [lastObject, setLastObject] = useState({}); 

  useEffect(() => {
    try {
      setLogin({...JSON.parse(GetCookie('usrin')),found:true});
    } catch (error) {
      setLogin({found:false});
    }
  }, []);

  //

  /* if (loading) {
    return <LinearProgress />;
  } else {
    
  } */
  return (
    <AppContext.Provider
      value={{
        login,
        setLogin,
        isDarkTheme,
        setIsDarkTheme,
        lastObject,
        setLastObject,
        update,
        setUpdate,
        scrapping,
        setScrapping
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
