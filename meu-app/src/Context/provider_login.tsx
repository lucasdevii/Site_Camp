import { useEffect, useState } from "react";
import axios from "axios";
import type { ReactNode } from "react";
import { LoginContext } from "./context_login"; // Certifique-se de que a interface foi atualizada

interface LoginProviderProps {
  children: ReactNode;
}

export const LoginProvider = ({ children }: LoginProviderProps) => {
  const [isLogged, setIsLogged] = useState<boolean>(false);
  const [nameUser, setNameUser] = useState<string>("");
  const [description, setDescription] = useState<string>("");

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
        setNameUser(res.data.name || "");
        setDescription(res.data.description || "");
      })
      .catch(() => {
        setNameUser("");
        setDescription("");
      });
  }, []);

  return (
    <LoginContext.Provider value={{ nameUser, description, isLogged, setIsLogged }}>
      {children}
    </LoginContext.Provider>
  );
};
