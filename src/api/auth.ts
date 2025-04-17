import { Role } from "../store/auth-context";
import api from "./axiosConfig";
import axios, { AxiosError, AxiosResponse } from "axios";

type LoginResType = {
    access_token: string;
    role: Role;
}

type RefreshResType = {
    access_token: string;
    role: Role;
}

type LoginReqType = {
    email: string;
    password: string;
    deviceId: string;
}

async function register(name: string, email: string, password: string, image: string): Promise<number> {
    const res = api.post("auth/register", {
        name,
        email,
        password,
        image
    });

    const status = (await res).status;
    return status;
}

async function login({ email, password, deviceId }: LoginReqType): Promise<LoginResType | AxiosError | Error> {
    try {
        const res: AxiosResponse = await api.post("auth/login", {
            "email": email,
            "password": password
        }, {
            headers: {
                "Device-ID": deviceId
            }
        });
        return res.data as LoginResType;
    } catch (err) {
        if (axios.isAxiosError(err)) {
            return err;
        } else {
            return new Error("An unknown error occurred");
        }
    }
}
async function refreshTokens(deviceId: string): Promise<RefreshResType | AxiosError | Error> {
    try {
        const res: AxiosResponse = await api.post("auth/refresh", {}, {
            headers: {
                "Device-ID": deviceId
            },
        });
        return res.data as RefreshResType;
    } catch (err) {
        if (axios.isAxiosError(err)) {
            return err as AxiosError;
        } else {
            return new Error("An unknown error occurred") as Error;
        }
    }
}
export { register, login, refreshTokens };
