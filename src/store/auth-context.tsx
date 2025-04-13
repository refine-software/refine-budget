import { createContext, PropsWithChildren, useEffect, useState } from "react";
import { getAccessToken, getDeviceId, setAccessToken } from "../utils";
import { refreshTokens } from "../api";
import axios from "axios";
import { getRole } from "../utils/localStorage/role";

export type Role = "user" | "admin";

export type AuthContextType = {
  authenticated: boolean;
  loading: boolean;
  role: Role;
  login(): void;
  logout(): void;
  setAdmin(): void;
}

export const AuthContext = createContext<AuthContextType>({
  authenticated: false,
  loading: true,
  role: "user",
  login(): void { },
  logout(): void { },
  setAdmin(): void { },
});

export default function AuthContextProvider({ children }: PropsWithChildren) {
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [role, setRole] = useState<Role>("user");
  const localStorageRole = getRole();

  useEffect(() => {
    console.log("USE EFFECT RUNNING...");

    (async () => {
      const deviceId = getDeviceId();
      if (!deviceId) {
        setAuthenticated(false);
        setLoading(false);
        return;
      }

      const tokenObj = getAccessToken();
      if (tokenObj !== null && tokenObj.accessTokenExp > new Date()) {
        setAuthenticated(true);
        setRole(localStorageRole || "user");
        setLoading(false);
        return;
      }

      if (localStorageRole) setRole(localStorageRole)
      else return;

      const res = await refreshTokens(deviceId);
      if (axios.isAxiosError(res) || res instanceof Error) {
        setAuthenticated(false);
      } else {
        setAccessToken({
          accessToken: res.access_token,
          accessTokenExp: new Date(Date.now() + 1000 * 600), // now + 10 Minutes
        });
        setRole(res.role);
        setAuthenticated(true);
      }

      setLoading(false);
    })();
  }, [])

  const login = () => setAuthenticated(true);
  const logout = () => setAuthenticated(false);
  const setAdmin = () => setRole("admin");

  return (
    <AuthContext.Provider value={{ authenticated, loading, role, login, logout, setAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};
