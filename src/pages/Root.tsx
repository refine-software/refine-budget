import { useContext, useEffect } from "react";
import { Location, Outlet, useLocation } from "react-router";
import Navbar from "../components/navbar/Navbar";
import { AuthContext } from "../store/auth-context";
import { getAccessToken, getDeviceId, setAccessToken } from "../utils";
import { refreshTokens } from "../api";
import axios from "axios";

const Root = () => {
    const location = useLocation();
    const auth = useContext(AuthContext);
    const deviceId = getDeviceId();

    useEffect(() => {
        const accessToken = getAccessToken();
        let interval: ReturnType<typeof setInterval>;
        if (accessToken && deviceId && accessToken.accessTokenExp > new Date()) {
            interval = setInterval(async () => {
                const res = await refreshTokens(deviceId);
                console.log(res);
                if (axios.isAxiosError(res) || res instanceof Error) {
                    throw new Error("Couldn't refresh token");
                }
                // TODO: Error handling
                setAccessToken({ accessToken: res.access_token, accessTokenExp: new Date(Date.now() + 600_000) })
            }, (accessToken.accessTokenExp.getTime() - Date.now()) - 5000);
        }
        return () => {
            if (interval)
                clearInterval(interval)
        }
    }, [deviceId, auth]);

    return (
        <div className="relative">
            <header className="bg-primary h-72 absolute top-0 w-full z-10">
                <h2 className="flex items-center justify-center px-10 h-20 text-2xl font-medium">{getHeaderTitle(location)}</h2>
            </header>
            <main className="min-h-container absolute top-20 w-full z-20 bg-dark rounded-t-[50px] py-10 px-8">
                <Outlet />
            </main>
            {auth.authenticated ? <Navbar /> : <></>}
        </div>
    );
};

function getHeaderTitle(location: Location): string {
    switch (location.pathname) {
        case "/":

            return "Sup Username";
        case "/login":
            return "Login";
        case "/register":
            return "Register";
        default:
            return "";
    }
};

export default Root;
