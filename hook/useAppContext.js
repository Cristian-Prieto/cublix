import { useContext } from "react";
import { AppContext } from "../utils/myList";

export const useAppContext = () => {
  const { addToMyList, removeFromMyList } = useContext(AppContext);
  return { addToMyList, removeFromMyList };
};
