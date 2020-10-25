import { TLibrary } from './../api';
import React, { createContext, Dispatch, ReactNode, SetStateAction, useContext } from "react";

type TContext = {
  dataAllLibs: TLibrary[],
  setDataAllLibs: Dispatch<SetStateAction<TLibrary[]>>
}

const AppContext = createContext<TContext | undefined>(undefined);

export const useAppContext = () => {
  const c = useContext(AppContext);
  if(!c) throw new Error ("Контекст = undefined");
  return c
}

export const AppContextProvider: React.FC<ReactNode> = ({children}) => {
  
  const [dataAllLibs, setDataAllLibs] = React.useState<TLibrary[]>([]);
  

  return (
  <AppContext.Provider value={{
    dataAllLibs,
    setDataAllLibs
  }}>
    {children}
  </AppContext.Provider>)
}

