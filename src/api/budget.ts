import axios, { AxiosError } from "axios";
import api from "./axiosConfig";
import { getAccessToken } from "../utils";
import { Budget } from "../types";

export async function getBudget(): Promise<Budget> {
	try {
		const accTokenObj = getAccessToken();
		if (accTokenObj === null) throw new Error("you're not authorized");
		const res = await api.get("budget", {
			headers: {
				Authorization: `Bearer ${accTokenObj.accessToken}`,
			},
		});
		return res.data as Budget;
	} catch (err) {
		if (axios.isAxiosError(err)) throw err as AxiosError;
		else throw err as Error;
	}
}
