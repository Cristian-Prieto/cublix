import { INITIAL_MY_LIST } from "./myList";

export const saveMyListToLocalStorage = (itemAdded) => {
  if (typeof window !== "undefined") {
    window.localStorage.setItem("myList", JSON.stringify(itemAdded));
  }
};

export const getMyListFromLocalStorage = () => {
  if (typeof window !== "undefined") {
    const myListFilled = window.localStorage.getItem("myList");

    if (myListFilled) {
      const myListFromLS = JSON.parse(myListFilled);

      return myListFromLS;
    }
    return INITIAL_MY_LIST;
  }
};
