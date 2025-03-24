import { createContext } from "react";

export type AuthContextType = {
  authenticated: boolean;
  role: "admin" | "user";
  login(): void;
  logout(): void;
  setToUser(): void;
  setToAdmin(): void;
}

export const AuthContext = createContext<AuthContextType>({
  authenticated: false,
  role: "user",
  login(): void { },
  logout(): void { },
  setToUser(): void { },
  setToAdmin(): void { },
});
