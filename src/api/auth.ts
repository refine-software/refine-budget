import { redirect } from "react-router";
import api from "./axiosConfig";

// -------------------------------------------------------
// API endpoints for user authentication -----------------
// -------------------------------------------------------

const register = async (name: string, email: string, password: string, image: string): Promise<number> => {
    const res = api.post("auth/register", {
        name,
        email,
        password,
        image
    });

    const status = (await res).status;
    return status;
};

const login = async (email: string, password: string): Promise<string> => {
    const res = api.post("auth/login", {
        email,
        password
    });

    const token = (await res).data.token;
    return token;
};

export { register, login };

// -------------------------------------------------------
// Token management --------------------------------------
// -------------------------------------------------------

function getAccessToken(): string | null {
    return localStorage.getItem("accessToken");
}

function authLoader() {
    const accessToken = getAccessToken();
    redirect(accessToken === null || accessToken === "" ? "/login" : "/");
    return accessToken;
}

function checkAuthLoader(): null | Response {
    const accessToken = getAccessToken();
    return accessToken ? null : redirect("/login");
}

export { getAccessToken, authLoader, checkAuthLoader };