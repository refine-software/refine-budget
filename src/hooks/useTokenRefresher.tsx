import { useEffect, useRef, useCallback } from "react";
import { getAccessToken, setAccessToken } from "../utils";
import { refreshTokens } from "../api";
import axios from "axios";

const useTokenRefresher = (deviceId: string | null) => {
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const scheduleRefresh = useCallback(async () => {
        const accessToken = getAccessToken();
        if (!accessToken || !deviceId) return;

        const delay = accessToken.accessTokenExp.getTime() - Date.now() - 5000;
        if (delay <= 0) return;

        timeoutRef.current = setTimeout(async () => {
            try {
                console.log("refreshing token");
                const res = await refreshTokens(deviceId);
                if (!axios.isAxiosError(res) && !(res instanceof Error)) {
                    setAccessToken({
                        accessToken: res.access_token,
                        accessTokenExp: new Date(Date.now() + 600_000),
                    });

                    scheduleRefresh();
                } else {
                    console.error("Token refresh failed:", res);
                }
            } catch (err) {
                console.error("Error refreshing token:", err);
            }
        }, delay);
    }, [deviceId]);

    useEffect(() => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        scheduleRefresh();

        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, [scheduleRefresh]);
};

export default useTokenRefresher;

