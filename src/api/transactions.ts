import axios, { AxiosError } from "axios";
import { getAccessToken } from "../utils";
import api from "./axiosConfig";
import {
	TransactionsReqQueries,
	TransactionsRes,
	TransactionTypes,
} from "../types";

export async function getTransactions(
	this: TransactionsReqQueries
): Promise<TransactionsRes> {
	const accTokenObj = getAccessToken();
	if (!accTokenObj) throw new Error("You're not authorized");
	const queries: string[] = [];

	if (this.page) queries.push("page=" + this.page);
	if (this.limit) queries.push("limit=" + this.limit);
	if (this.sort) queries.push("sort=" + this.sort);
	if (this.transactionType)
		queries.push("trans-type=" + this.transactionType);

	if (
		this.depositTypes &&
		this.transactionType !== TransactionTypes.withdrawal &&
		this.depositTypes.length > 0
	) {
		this.depositTypes.forEach((depType) =>
			queries.push("deposit-type=" + depType)
		);
	}

	try {
		const res = await api.get("/transaction/history?" + queries.join("&"), {
			headers: {
				Authorization: `Bearer ${accTokenObj.accessToken}`,
			},
		});
		return res.data as TransactionsRes;
	} catch (err) {
		if (axios.isAxiosError(err)) {
			throw err as AxiosError;
		} else {
			throw err as Error;
		}
	}
}
