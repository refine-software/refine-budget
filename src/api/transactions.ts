import { getAccessToken } from "../utils";
import api from "./axiosConfig";
import {
	DepositTypes,
	SortTypes,
	Transaction,
	TransactionsRes,
	TransactionTypes,
} from "../types";

export type TransactionsReqQueries = {
	page: number;
	limit: number;
	sort: SortTypes;
	transactionType?: TransactionTypes;
	depositTypes?: DepositTypes[];
};

export async function getTransactions(req: TransactionsReqQueries): Promise<TransactionsRes> {
	const accTokenObj = getAccessToken();
	if (!accTokenObj) throw new Error("You're not authorized");
	const queries: string[] = [];

	if (req.page) queries.push("page=" + req.page);
	if (req.limit) queries.push("limit=" + req.limit);
	if (req.sort) queries.push("sort=" + req.sort);
	if (req.transactionType) queries.push("trans-type=" + req.transactionType);
	if (
		req.depositTypes &&
		req.transactionType !== TransactionTypes.withdrawal &&
		req.depositTypes.length > 0
	) {
		req.depositTypes.forEach((depType) =>
			queries.push("deposit-type=" + depType)
		);
	}

	const res = await api.get("/transaction/history?" + queries.join("&"), {
		headers: {
			Authorization: `Bearer ${accTokenObj.accessToken}`,
		},
	});
	return res.data as TransactionsRes;
}

export async function getTransactionById(transactionId: number): Promise<Transaction> {
	const accTokenObj = getAccessToken();
	if (!accTokenObj) throw new Error("You're not authorized");

	const res = await api.get("/transaction/" + transactionId, {
		headers: {
			Authorization: `Bearer ${accTokenObj.accessToken}`,
		},
	});
	return res.data as Transaction;
}