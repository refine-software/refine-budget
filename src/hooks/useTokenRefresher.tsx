import { useEffect, useRef, useCallback } from "react";
import { getAccessToken, setAccessToken } from "../utils";
import { refreshTokens } from "../api";

const useTokenRefresher = () => {
	const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	const scheduleRefresh = useCallback(async () => {
		const accessToken = getAccessToken();
		if (!accessToken) return;

		const delay = accessToken.accessTokenExp.getTime() - Date.now() - 10000;

		if (delay <= 0) return;
		timeoutRef.current = setTimeout(async () => {
			try {
				console.log("attempting to refresh token");
				const res = await refreshTokens();
				setAccessToken({
					accessToken: res.access_token,
					accessTokenExp: new Date(Date.now() + 600_000),
				});

				scheduleRefresh();
			} catch (err) {
				console.error("Error refreshing token:", err);
			}
		}, delay);
	}, []);

	useEffect(() => {
		if (timeoutRef.current) clearTimeout(timeoutRef.current);
		scheduleRefresh();

		return () => {
			if (timeoutRef.current) clearTimeout(timeoutRef.current);
		};
	}, [scheduleRefresh]);
};

export default useTokenRefresher;
