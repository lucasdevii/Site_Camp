import { createContext } from "react";

export interface LoginContextType {
  nameUser: string;
  description: string;
  isLogged: boolean;
}

export const LoginContext = createContext<LoginContextType | undefined>(
  undefined
);
