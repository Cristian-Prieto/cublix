import { useContext } from "react";
import { AppContext } from "../../utils/myList";

export const useAppContext = () => {
  const { addToMyList } = useContext(AppContext);

  return { addToMyList };
};
