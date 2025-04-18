import axios, { AxiosError } from "axios";
import api from "./axiosConfig";
import { getAccessToken } from "../utils";
import { Debt } from "../types";


export async function getUserDebt(): Promise<Debt> {
    try {
        const accTokenObj = getAccessToken();
        if (accTokenObj === null) throw new Error("you're not authorized");
        const res = await api.get("/user/debt", {
            headers: {
                Authorization: accTokenObj.accessToken,
            }
        });
        return res.data as Debt;
    } catch (err) {
        if (axios.isAxiosError(err))
            throw err as AxiosError;
        else
            throw err as Error;
    }
}