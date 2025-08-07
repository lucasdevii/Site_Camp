import { useEffect, useState } from "react";
import axios from "axios";
import type { ReactNode } from "react";
import { LoginContext } from "./context_login"; //

interface LoginProviderProps {
  children: ReactNode;
}

export const LoginProvider = ({ children }: LoginProviderProps) => {
  const [isLogged, setIsLogged] = useState<boolean>(false);
  const [nameUser, setNameUser] = useState<string | null>(null);

  useEffect(() => {
    axios
      .post(
        "http://localhost:4001/Cadaster/Verifycation",
        {},
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        setIsLogged(!!res.data?.success);
        setNameUser(res.data?.name);
      })
      .catch(() => {
        setIsLogged(false);
        setNameUser(null);
      });
  }, []);

  return (
    <LoginContext.Provider value={{ nameUser: nameUser, isLogged: isLogged }}>
      {children}
    </LoginContext.Provider>
  );
};
