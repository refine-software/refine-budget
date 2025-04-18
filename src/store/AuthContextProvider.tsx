import { PropsWithChildren, useEffect, useState } from "react";
import { Role } from "../types";
import { getRole } from "../utils/localStorage/role";
import { getAccessToken, getDeviceId, setAccessToken } from "../utils";
import { refreshTokens } from "../api";
import axios from "axios";
import { AuthContext } from "./auth-context";

export default function AuthContextProvider({ children }: PropsWithChildren) {
    const [authenticated, setAuthenticated] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const [role, setRole] = useState<Role>(Role.user);
    const localStorageRole = getRole();

    useEffect(() => {
        (async () => {
            const deviceId = getDeviceId();
            if (!deviceId) {
                setAuthenticated(false);
                setLoading(false);
                return;
            }

            if (localStorageRole) setRole(localStorageRole);

            const tokenObj = getAccessToken();
            if (tokenObj !== null && tokenObj.accessTokenExp > new Date()) {
                setAuthenticated(true);
                setRole(localStorageRole || Role.user);
                setLoading(false);
                return;
            }

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
    }, [localStorageRole]);

    const login = () => setAuthenticated(true);
    const logout = () => setAuthenticated(false);
    const setAdmin = () => setRole(Role.admin);

    return (
        <AuthContext.Provider
            value={{ authenticated, loading, role, login, logout, setAdmin }}
        >
            {children}
        </AuthContext.Provider>
    );
}
