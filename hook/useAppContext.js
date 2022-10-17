import { useContext } from "react";
import { AppContext } from "../utils/myList";

export const useAppContext = () => {
  const { addToMyList, removeFromMyList, stateList } = useContext(AppContext);
  return { addToMyList, removeFromMyList, stateList };
};
