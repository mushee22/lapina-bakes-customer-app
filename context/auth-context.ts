import { User } from "@/type/user";
import { createContext } from "react";

export type AuthContextType = {
  isAuthenticated: boolean;
  isAuthenticating: boolean;
  user?: User;
  token?: string;
  onSuccessFullyLogin?: (user?:User, token?: string) => void;
  onGotoHomePage: () => void;
  onLogout: () => void;
};


export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  isAuthenticating: true,
  onLogout: () => {},
  onGotoHomePage: () => {}
});