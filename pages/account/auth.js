import { useRouter } from "next/router";
import { useAppContext } from "../../hook/useAppContext";

export default function AccountAuth() {
  const router = useRouter();
  const { setSessionId } = useAppContext();

  const sessionId = router.query?.session_id;

  if (sessionId) {
    window.localStorage.setItem("sessionId", sessionId);
    setSessionId(sessionId);
    router.push("/my-list");
  }

  return null;
}
