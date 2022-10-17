import { createContext, useState, useEffect } from "react";
import {
  saveMyListToLocalStorage,
  getMyListFromLocalStorage,
} from "./localStorage";

export const INITIAL_MY_LIST = [];

export const AppContext = createContext();

const AppContextComponent = ({ children }) => {
  const [stateList, setStateList] = useState(getMyListFromLocalStorage());

  useEffect(() => {
    saveMyListToLocalStorage(stateList);
  }, [stateList]);

  const addToMyList = (itemToAdd, category) => {
    const alreadyExist = stateList.find((entry) => itemToAdd.id === entry.id);
    setStateList((prevState) => {
      if (alreadyExist) {
        return prevState;
      }
      itemToAdd.category = category;
      return [...prevState, itemToAdd];
    });
  };

  const removeFromMyList = (itemToRemove) => {
    const alreadyExist = stateList.find((item) => itemToRemove.id === item.id);

    setStateList((prevState) => {
      if (alreadyExist) {
        return prevState.filter((item) => item.id !== itemToRemove.id);
      }
      return prevState;
    });
  };

  return (
    <AppContext.Provider
      value={{
        addToMyList,
        removeFromMyList,
        stateList,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextComponent;
