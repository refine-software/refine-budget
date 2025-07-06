import { PropsWithChildren, useCallback, useEffect, useRef, useState } from "react";
import { Role, User } from "../types";
import { getAccessToken, getDeviceId, getRole, removeAllStorage, setAccessToken } from "../utils";
import { getUser, refreshTokens } from "../api";
import axios from "axios";
import { AuthContext } from "./auth-context";

export default function AuthContextProvider({ children }: PropsWithChildren) {
	console.log("Auth Context Provider is being executed");
	const [authenticated, setAuthenticated] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(true);
	const [role, setRole] = useState<Role>(Role.USER);
	const [user, setUser] = useState<User>({} as User);
	const unauthenticate = () => {
		setAuthenticated(false);
		setUser({} as User);
		setRole(Role.USER);
		removeAllStorage();
	};

	const handleAuthenticated = async () => {
		setAuthenticated(true);
		try {
			const userRes = await getUser();
			setUser(userRes);
			setRole(userRes.role);
		} catch (err) {
			console.error(err);
			unauthenticate();
		}
	};

	const tryRefresh = async () => {
		try {
			const res = await refreshTokens();
			if (axios.isAxiosError(res) || res instanceof Error) {
				return unauthenticate();
			}

			setAccessToken({
				accessToken: res.access_token,
				accessTokenExp: new Date(Date.now() + 1000 * 600),
			});

			await handleAuthenticated();
		} catch (err) {
			console.error("Refresh failed", err);
			unauthenticate();
		}
	};

	// Load from localStorage just once
	useEffect(() => {
		const roleFromStorage = getRole();
		if (roleFromStorage) setRole(roleFromStorage);

		const init = async () => {
			const deviceId = getDeviceId();
			if (!deviceId) return unauthenticate();

			const token = getAccessToken();
			if (token && token.accessTokenExp > new Date()) {
				return handleAuthenticated();
			}

			await tryRefresh();
		};

		init().finally(() => setLoading(false));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	const scheduleRefresh = useCallback(async () => {
		const accessToken = getAccessToken();
		if (!accessToken) {
			console.warn("No access token available for refresh scheduling");
			return;
		}

		const delay = accessToken.accessTokenExp.getTime() - Date.now() - 10_000;
		console.log("Scheduled token refresh in:", delay, "ms");

		if (delay <= 0) {
			console.warn("Delay for token refresh is non-positive, skipping");
			return;
		}

		timeoutRef.current = setTimeout(async () => {
			try {
				console.log("Attempting to refresh token");
				const res = await refreshTokens();
				setAccessToken({
					accessToken: res.access_token,
					accessTokenExp: new Date(Date.now() + 600_000),
				});

				scheduleRefresh(); // Reschedule
			} catch (err) {
				console.error("Error refreshing token:", err);
				setAuthenticated(false);
				setLoading(false);
			}
		}, delay);
	}, []);


	useEffect(() => {
		if (!authenticated) return; // ✅ only schedule if logged in
		if (timeoutRef.current) clearTimeout(timeoutRef.current);
		scheduleRefresh();

		return () => {
			if (timeoutRef.current) clearTimeout(timeoutRef.current);
		};
	}, [scheduleRefresh, authenticated]);

	const login = () => setAuthenticated(true);
	const logout = unauthenticate;
	const setAdmin = () => setRole(Role.ADMIN);
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
