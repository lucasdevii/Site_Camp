import { createContext } from "react";

export interface LoginContextType {
  nameUser: string | null;
  isLogged: boolean;
}

export const LoginContext = createContext<LoginContextType | undefined>(
  undefined
);
