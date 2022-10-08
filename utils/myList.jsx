import { createContext, useState, useEffect } from "react";
import {
  saveMyListToLocalStorage,
  getMyListFromLocalStorage,
} from "./localStorage";

export const INITIAL_MY_LIST = [];

export const AppContext = createContext();

const AppContextComponent = ({ children }) => {
  const [state, setState] = useState(getMyListFromLocalStorage());

  useEffect(() => {
    saveMyListToLocalStorage(state);
  }, [state]);

  const addToMyList = (itemToAdd) => {
    setState((prevState) => [...prevState, itemToAdd]);
  };

  const removeFromMyList = (itemToRemove) => {
    setState(prev);
  };

  return (
    <AppContext.Provider
      value={{
        addToMyList,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextComponent;
