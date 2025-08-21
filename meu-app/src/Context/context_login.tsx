import { createContext } from "react";

export interface LoginContextType {
  nameUser: string;
  description: string;
  isLogged: boolean;
  setIsLogged: (value: boolean) => void;
  codeInvite: string;
}

export const LoginContext = createContext<LoginContextType | undefined>(
  undefined
);
