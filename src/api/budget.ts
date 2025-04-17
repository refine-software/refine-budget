import axios, { AxiosError } from "axios";
import api from "./axiosConfig";
import { getAccessToken } from "../utils";

type Budget = {
    id: number;
    amount: number;
    created_at: string;
}

export async function getBudget(): Promise<Budget | AxiosError | Error> {
    try {
        const accTokenObj = getAccessToken();
        if (accTokenObj === null) throw new Error("you're not authorized");
        const res = await api.get("/budget", {
            headers: {
                Authorization: accTokenObj.accessToken,
            }
        });
        console.log(res.data);
        return res.data as Budget;
    } catch (err) {
        if (axios.isAxiosError(err))
            return err as AxiosError;
        else
            return err as Error;
    }
}
