import { useEffect, useState } from "react";

type AuthStatus = "checking" | "authenticated" | "not-authenticated";

export function useCheckAuth() {
  const [status, setStatus] = useState<AuthStatus>("checking");

  useEffect(() => {
    const token = localStorage.getItem("csrfToken");

    if (token) {
      setStatus("authenticated");
    } else {
      setStatus("not-authenticated");
    }
  }, []);

  return { status };
}
