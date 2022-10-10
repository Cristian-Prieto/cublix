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

  const addToMyList = (itemToAdd, category) => {
    const alreadyExist = state.find((entry) => itemToAdd.id === entry.id);
    setState((prevState) => {
      if (alreadyExist) {
        return prevState;
      }
      itemToAdd.category = category;
      return [...prevState, itemToAdd];
    });
  };

  const removeFromMyList = (itemToRemove) => {
    const alreadyExist = state.find((item) => itemToRemove.id === item.id);

    setState((prevState) => {
      if (alreadyExist) {
        return prevState.filter((item) => item.id !== itemToRemove.id);
      }
      return prevState;
    });
    console.log("Borrado");
  };

  return (
    <AppContext.Provider
      value={{
        addToMyList,
        removeFromMyList,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextComponent;
