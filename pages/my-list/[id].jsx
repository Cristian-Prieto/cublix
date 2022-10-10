import { useEffect } from "react";
import { useRouter } from "next/router";
import { getMyListFromLocalStorage } from "../../utils/localStorage";

export default function MyListDetail() {
  const router = useRouter();
  const id = router.query.id;

  useEffect(() => {
    const myList = getMyListFromLocalStorage();
    const listItem = myList.find((item) => item.id === Number(router.query.id));

    if (listItem) {
      router.replace(`/${listItem.category}/${listItem.id}`);
    }
  }, [router, id]);

  return null;
}
