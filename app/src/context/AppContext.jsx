import { LinearProgress } from '@mui/material';
import React, { useState, createContext, useEffect } from 'react';
// import GetCookie from '../hooks/getCookie'

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [login, setLogin] = useState({
    name: 'nico',
  });
  const [isDarkTheme, setIsDarkTheme] = useState(true);

  // const [processes, setProcesses] = useState(); //Array de Objetos
  const [loading, setloading] = useState(true);

  // Retorna el ultimo objeto insertado
  const [lastObject, setLastObject] = useState({});

  useEffect(() => {
    setloading(false);
    /* axios.get('get/processes').then((res) => {
      //console.log(res.data)
      //setName(res.data[0].name)
      //setDescription(res.data[0].description)
      try {
        setLogin(JSON.parse(GetCookie('usrin')));
      } catch (error) {}
      setloading(false);
      setProcesses(res.data);
    }); */
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
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
