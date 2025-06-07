import { PropsWithChildren, useEffect, useState } from "react";
import { Role, User } from "../types";
import { getRole } from "../utils/localStorage/role";
import { getAccessToken, getDeviceId, setAccessToken } from "../utils";
import { getUser, refreshTokens } from "../api";
import axios from "axios";
import { AuthContext } from "./auth-context";

export default function AuthContextProvider({ children }: PropsWithChildren) {
	const [authenticated, setAuthenticated] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(true);
	const [role, setRole] = useState<Role>(Role.user);
	const [user, setUser] = useState<User>({} as User);
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
				const userRes = await getUser();
				if (axios.isAxiosError(userRes)) {
					console.error(userRes);
				} else if (userRes instanceof Error) {
					console.error(userRes);
				} else {
					setRole(localStorageRole || userRes.role || Role.user);
					setUser(userRes);
				}

				setLoading(false);
				return;
			}

			const res = await refreshTokens();
			if (axios.isAxiosError(res) || res instanceof Error) {
				setAuthenticated(false);
			} else {
				setAccessToken({
					accessToken: res.access_token,
					accessTokenExp: new Date(Date.now() + 1000 * 600), // now + 10 Minutes
				});
				setRole(res.role);
				setAuthenticated(true);

				const userRes = await getUser();
				if (axios.isAxiosError(userRes)) {
					console.error(userRes);
				} else if (userRes instanceof Error) {
					console.error(userRes);
				} else {
					setUser(userRes);
				}
			}

			setLoading(false);
		})();
	}, [localStorageRole]);

	const login = () => setAuthenticated(true);
	const logout = () => {
		setAuthenticated(false);
		setRole(Role.user);
		setUser({} as User);
		localStorage.removeItem("role");
		localStorage.removeItem("accessToken");
		localStorage.removeItem("accessTokenExp");
		localStorage.removeItem("deviceId");
	};
	const setAdmin = () => setRole(Role.admin);
	const setUserCtx = (u: User) => setUser(u);

	return (
		<AuthContext.Provider
			value={{
				user,
				authenticated,
				loading,
				role,
				login,
				logout,
				setAdmin,
				setUserCtx,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}
